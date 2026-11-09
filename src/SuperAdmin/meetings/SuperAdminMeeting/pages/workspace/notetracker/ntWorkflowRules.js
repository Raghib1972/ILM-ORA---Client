// Workflow node rules, labels and helpers (pure functions, no React).
// The client mirrors the server rules for fast feedback; the SERVER stays
// authoritative and its message is always shown on a 400.
import { TRIGGER_LABELS, extendedKind, isFatalError } from "./ntUtils";

export const WF_LIMITS = {
  minNodes: 2,
  maxNodes: 12,
  maxAiNodes: 5,
  instruction: 500,
  saveTitle: 120,
  ifText: 200,
  maxTasksPerRun: 20,
};

const ID_RE = /^[A-Za-z0-9_-]{1,40}$/;

export const TRIGGER_OPTIONS = [
  { value: "MANUAL", label: TRIGGER_LABELS.MANUAL },
  { value: "REPORT_READY", label: TRIGGER_LABELS.REPORT_READY },
];

export const AI_KINDS = [
  { value: "SUMMARY", label: "Summary" },
  { value: "ACTION_ITEMS", label: "Action items" },
  { value: "DECISIONS", label: "Decisions" },
  { value: "BLOCKERS", label: "Blockers" },
  { value: "STANDUP_UPDATES", label: "Stand-up updates" },
  { value: "FOLLOW_UP_EMAIL", label: "Follow-up email draft" },
  { value: "MINUTES", label: "Meeting minutes" },
];

export const IF_FIELDS = [
  { value: "participants_count", label: "Number of participants", numeric: true },
  { value: "spoke_count", label: "Number of people who spoke", numeric: true },
  { value: "duration_minutes", label: "Meeting length (minutes)", numeric: true },
  { value: "transcript_contains", label: "Transcript contains", numeric: false },
];

export const IF_OPS = [
  { value: "<", label: "is less than", short: "<" },
  { value: ">", label: "is greater than", short: ">" },
  { value: "<=", label: "is at most", short: "≤" },
  { value: ">=", label: "is at least", short: "≥" },
  { value: "==", label: "is exactly", short: "=" },
];

const aiLabel = (kind) => AI_KINDS.find((k) => k.value === kind)?.label || kind;
const ifField = (field) => IF_FIELDS.find((f) => f.value === field);
const isTextField = (field) => field === "transcript_contains";

/** Items for the "Add step" select. */
export const PALETTE = [
  ...AI_KINDS.map((k) => ({
    id: `ai:${k.value}`,
    type: "ai",
    kind: k.value,
    label: `AI step: ${k.label}`,
  })),
  { id: "action:SAVE_TO_NOTES", type: "action", kind: "SAVE_TO_NOTES", label: "Save to notes" },
  { id: "action:CREATE_TASKS", type: "action", kind: "CREATE_TASKS", label: "Create tasks" },
  { id: "control:IF", type: "control", kind: "IF", label: "Condition (IF)" },
  { id: "control:STOP", type: "control", kind: "STOP", label: "Stop" },
];

// ───────────── parsing / building ─────────────

/** nodes / result may arrive as an array or as a JSON string. Always returns an array. */
export const asArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }
  return [];
};

/** Deep copy of the nodes of a WorkflowDto for editing. */
export const parseNodes = (v) =>
  asArray(v)
    .filter((n) => n && typeof n === "object")
    .map((n) => ({
      id: String(n.id ?? ""),
      type: n.type,
      kind: n.kind,
      ...(n.config && typeof n.config === "object" ? { config: { ...n.config } } : {}),
    }));

/** Smallest unused "n<k>" id. */
export const nextNodeId = (nodes) => {
  const used = new Set(nodes.map((n) => n.id));
  let k = 1;
  while (used.has(`n${k}`)) k += 1;
  return `n${k}`;
};

export const makeTrigger = (kind = "MANUAL") => ({ id: "n1", type: "trigger", kind });

/** Starting point of a new workflow: a trigger and a summary step. */
export const defaultNodes = () => [
  makeTrigger("MANUAL"),
  { id: "n2", type: "ai", kind: "SUMMARY", config: { instruction: "" } },
];

/** A new node for a PALETTE item, with an unused id. */
export const makeNode = (paletteId, nodes) => {
  const item = PALETTE.find((p) => p.id === paletteId);
  if (!item) return null;
  const id = nextNodeId(nodes);
  switch (item.kind) {
    case "SAVE_TO_NOTES":
      return { id, type: "action", kind: item.kind, config: { title: "" } };
    case "CREATE_TASKS":
      return { id, type: "action", kind: item.kind };
    case "IF":
      return {
        id,
        type: "control",
        kind: "IF",
        config: { field: "participants_count", op: ">=", value: "" },
      };
    case "STOP":
      return { id, type: "control", kind: "STOP" };
    default:
      return { id, type: "ai", kind: item.kind, config: { instruction: "" } };
  }
};

/**
 * Nodes as the server expects them: empty optional config removed,
 * IF numbers as numbers, text trimmed.
 */
export const cleanNodes = (nodes) =>
  nodes.map((n) => {
    const base = { id: n.id, type: n.type, kind: n.kind };
    const c = n.config || {};
    if (n.type === "ai") {
      const instruction = String(c.instruction ?? "").trim();
      return instruction ? { ...base, config: { instruction } } : base;
    }
    if (n.kind === "SAVE_TO_NOTES") {
      const title = String(c.title ?? "").trim();
      return title ? { ...base, config: { title } } : base;
    }
    if (n.kind === "IF") {
      if (isTextField(c.field)) {
        return {
          ...base,
          config: { field: c.field, op: "contains", value: String(c.value ?? "").trim() },
        };
      }
      const raw = c.value;
      const num = raw === "" || raw === null || raw === undefined ? raw : Number(raw);
      return { ...base, config: { field: c.field, op: c.op, value: num } };
    }
    return base;
  });

// ───────────── labels ─────────────

/** Short title of a node: "Summary", "Save to notes", "When a meeting report is ready" ... */
export const nodeTitle = (node) => {
  if (!node) return "";
  if (node.type === "trigger") return TRIGGER_LABELS[node.kind] || node.kind;
  if (node.type === "ai") return aiLabel(node.kind);
  if (node.kind === "SAVE_TO_NOTES") return "Save to notes";
  if (node.kind === "CREATE_TASKS") return "Create tasks";
  if (node.kind === "IF") return "Condition (IF)";
  if (node.kind === "STOP") return "Stop";
  return String(node.kind || node.type || "Step");
};

/** Label of a node RESULT, which only carries type and kind. */
export const resultTitle = (r) => nodeTitle({ type: r?.type, kind: r?.kind });

/** One readable line per node, with its settings: "If participants ≥ 3". */
export const nodeLine = (node) => {
  if (!node) return "";
  if (node.type === "trigger") return `Trigger: ${nodeTitle(node)}`;
  if (node.type === "ai") return `AI step: ${aiLabel(node.kind)}`;
  if (node.kind === "SAVE_TO_NOTES") {
    const title = String(node.config?.title ?? "").trim();
    return title ? `Save to notes as “${title}”` : "Save to notes";
  }
  if (node.kind === "IF") {
    const c = node.config || {};
    const f = ifField(c.field);
    if (isTextField(c.field)) return `If the transcript contains “${c.value ?? ""}”`;
    const op = IF_OPS.find((o) => o.value === c.op);
    return `If ${(f?.label || c.field || "value").toLowerCase()} ${op ? op.short : c.op ?? ""} ${c.value ?? ""}`.trim();
  }
  return nodeTitle(node);
};

/** ["Trigger: Manual", "AI step: Summary", ...] */
export const summarizeNodes = (nodes) => asArray(nodes).map(nodeLine);

// ───────────── validation ─────────────

/**
 * @returns {{ global: string[], byIndex: Record<number, string[]>, count: number }}
 * count = total number of problems (0 = fine to send)
 */
export const validateNodes = (nodes) => {
  const global = [];
  const byIndex = {};
  const add = (i, msg) => {
    (byIndex[i] = byIndex[i] || []).push(msg);
  };

  if (nodes.length < WF_LIMITS.minNodes) {
    global.push("A workflow needs a trigger and at least one more step.");
  }
  if (nodes.length > WF_LIMITS.maxNodes) {
    global.push(`A workflow can have at most ${WF_LIMITS.maxNodes} steps.`);
  }
  const aiTotal = nodes.filter((n) => n.type === "ai").length;
  if (aiTotal > WF_LIMITS.maxAiNodes) {
    global.push(`A workflow can have at most ${WF_LIMITS.maxAiNodes} AI steps.`);
  }

  const seen = new Set();
  let nearestAi = null; // kind of the nearest AI step above
  let anyAi = false;

  nodes.forEach((n, i) => {
    // id
    if (!ID_RE.test(String(n.id || ""))) {
      add(i, "This step has an invalid id.");
    } else if (seen.has(n.id)) {
      add(i, "This step id is used twice.");
    }
    seen.add(n.id);

    if (i === 0) {
      if (n.type !== "trigger") add(i, "The first step must be the trigger.");
    } else if (n.type === "trigger") {
      add(i, "Only the first step can be a trigger.");
    }

    const c = n.config || {};
    if (n.type === "trigger") {
      if (n.kind !== "MANUAL" && n.kind !== "REPORT_READY") add(i, "Choose a trigger.");
    } else if (n.type === "ai") {
      if (!AI_KINDS.some((k) => k.value === n.kind)) add(i, "Choose what this step should produce.");
      if (String(c.instruction ?? "").length > WF_LIMITS.instruction) {
        add(i, `The instruction can have at most ${WF_LIMITS.instruction} characters.`);
      }
      anyAi = true;
      nearestAi = n.kind;
    } else if (n.kind === "SAVE_TO_NOTES") {
      if (!anyAi) add(i, "Saving to notes needs an AI step before it.");
      const raw = String(c.title ?? "");
      if (raw.length > 0 && raw.trim().length === 0) add(i, "The note title can not be only spaces.");
      if (raw.trim().length > WF_LIMITS.saveTitle) {
        add(i, `The note title can have at most ${WF_LIMITS.saveTitle} characters.`);
      }
    } else if (n.kind === "CREATE_TASKS") {
      if (nearestAi !== "ACTION_ITEMS") {
        add(i, "Creating tasks needs an “Action items” AI step directly before it (the nearest AI step above must be Action items).");
      }
    } else if (n.kind === "IF") {
      const f = ifField(c.field);
      if (!f) {
        add(i, "Choose what to check.");
      } else if (f.numeric) {
        if (!IF_OPS.some((o) => o.value === c.op)) add(i, "Choose a comparison.");
        const v = c.value;
        if (v === "" || v === null || v === undefined || !Number.isFinite(Number(v))) {
          add(i, "Enter a number to compare with.");
        }
      } else {
        const text = String(c.value ?? "").trim();
        if (!text) add(i, "Enter the text to look for.");
        else if (text.length > WF_LIMITS.ifText) {
          add(i, `The text can have at most ${WF_LIMITS.ifText} characters.`);
        }
      }
    } else if (n.kind !== "STOP") {
      add(i, "Unknown step.");
    }
  });

  const count = global.length + Object.values(byIndex).reduce((a, l) => a + l.length, 0);
  return { global, byIndex, count };
};

/** Errors that should replace the whole workflows page. */
export const isWorkflowsFatal = (info) =>
  isFatalError(info) || extendedKind(info) === "workflowsDisabled";
