"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getNoteTrackerRun,
  noteTrackerGenericErrorInfo,
} from "../../../../../../services/noteTrackerService";
import { isRunFinal } from "./ntUtils";

export const POLL_INTERVAL_MS = 2500;
export const POLL_MAX_MS = 5 * 60 * 1000;
const MAX_TRANSIENT_FAILURES = 3;

/**
 * Loads GET /runs/{runId} and, while the run is PENDING or RUNNING, polls it
 * again every 2.5 s (the server saves the result after each node, so partial
 * results show up as they arrive).
 *
 * Polling stops when:
 *  - the status is COMPLETED, FAILED or CANCELLED,
 *  - 5 minutes have passed (timedOut = true; refresh() starts another 5 minutes),
 *  - a request fails with a non-transient error (4xx), or 3 transient ones
 *    (network / 5xx) in a row,
 *  - the component using it unmounts or runId changes.
 * Requests never overlap (the next poll is scheduled after the previous finished).
 *
 * @returns {{ run, loading, error, timedOut, polling, refresh }}
 */
export default function useNtRunPolling(
  runId,
  { intervalMs = POLL_INTERVAL_MS, maxMs = POLL_MAX_MS } = {},
) {
  const [state, setState] = useState({
    run: null,
    loading: !!runId,
    error: null,
    timedOut: false,
  });
  const [restart, setRestart] = useState(0);

  useEffect(() => {
    if (!runId) return undefined;
    let off = false;
    let timer = null;
    let failures = 0;
    const deadline = Date.now() + maxMs;

    setState((s) => ({
      run: s.run && s.run.id === runId ? s.run : null,
      loading: true,
      error: null,
      timedOut: false,
    }));

    const tick = async () => {
      try {
        const res = await getNoteTrackerRun(runId);
        if (off) return;
        failures = 0;
        const run = res.data || null;
        setState({ run, loading: false, error: null, timedOut: false });
        if (!run || isRunFinal(run.status)) return;
      } catch (e) {
        if (off) return;
        const info = noteTrackerGenericErrorInfo(e);
        const transient = info.status === 0 || info.status >= 500;
        failures += 1;
        if (!transient || failures >= MAX_TRANSIENT_FAILURES) {
          setState((s) => ({ ...s, loading: false, error: info }));
          return;
        }
      }
      if (Date.now() + intervalMs > deadline) {
        setState((s) => ({ ...s, loading: false, timedOut: true }));
        return;
      }
      timer = setTimeout(tick, intervalMs);
    };

    tick();
    return () => {
      off = true;
      if (timer) clearTimeout(timer);
    };
  }, [runId, restart, intervalMs, maxMs]);

  const refresh = useCallback(() => setRestart((n) => n + 1), []);

  const polling =
    !!state.run &&
    !isRunFinal(state.run.status) &&
    !state.error &&
    !state.timedOut;

  return { ...state, polling, refresh };
}
