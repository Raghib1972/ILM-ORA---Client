"use client";
import { LsShell, Mode, JoinForm, QuickFacts, StorySection, AssessSection, ProgressSection, PlanSection, HorizonSection, SkillsSection, CHAPTERS, CHAPTER_AI, COACH_NAME, ROUTES, DialogueSvg, BeforeAfterSvg } from "./LifeSkillsShared";

/* LifeSkillsAI: sirf is option ka content. Dusre option ka kuch bhi yahan nahi hai. */
const m = {
    name: COACH_NAME,
    c: "#5B3FD6",
    ico: "💬",
    hero: ["094", "A learner smiling at a laptop showing communication training with coaching feedback", "Illustration. Percentages shown are samples, not real results."],
    title: "Practise real-life situations with an AI coach, then improve step by step.",
    sub: "Learn the skill, rehearse it in realistic conversations and get suggestions you can act on. You stay in charge of your own learning.",
    steps: [
      ["Choose your skill", "Answer a few questions about where you are today, pick one skill and set a goal."],
      ["Follow your path", "Get a simple step-by-step plan: what to learn first, what to practise next and how long each step takes."],
      ["Practise real situations", "Rehearse a mock interview, a difficult conversation or a decision with your AI coach, then try again."],
      ["Check your learning", "Take a short quiz and complete a practical task. You are scored against a clear checklist."],
      ["Get your plan", "See what you completed, your strengths, what to improve and a one-week action plan."],
    ],
    lv: [
      {
        tag: "Beginner",
        skills: "Communication · Self-awareness · Digital Literacy",
        items: [
          ["Choose:", "a few questions on where you are today, then set one goal."],
          ["Learn:", "short lessons with real-life examples."],
          ["Practise:", "simple chats with the coach, such as introducing yourself or asking for help."],
          ["Check:", "short quiz plus a checklist-scored task."],
        ],
        finish: "A clear starting point and a first one-week plan.",
        img: "081",
        alt: "A learner practising a first conversation with an AI coach",
      },
      {
        tag: "Intermediate",
        skills: "Critical Thinking · Teamwork · Ethics & Personal Finance",
        items: [
          ["Choose:", "pick the skill you want to strengthen."],
          ["Learn:", "comparing options, handling disagreements, money basics."],
          ["Practise:", "role-play a teammate conflict or a decision, then retry after suggestions."],
          ["Check:", "quiz scores and attempts shown separately from the practical task."],
        ],
        finish: "Skills you can use in real situations, with notes on what to improve.",
        img: "091",
        alt: "A learner in a video-style practice conversation with suggestion bubbles",
      },
      {
        tag: "Advanced",
        skills: "Career Readiness · Entrepreneurial Thinking · Leadership",
        items: [
          ["Choose:", "set a goal tied to a job, study or project."],
          ["Learn:", "interviews, workplace behaviour, testing ideas."],
          ["Practise:", "full mock interview or short presentation with coach suggestions."],
          ["Check:", "practical task, then use the skill in a real situation as your proof."],
        ],
        finish: "A final summary: strengths, areas to improve and your next skill or course.",
        img: "082",
        alt: "A mock interview with an AI coach",
      },
    ],
    gal: [["088", "An online quiz with results", "Step 4 · Check your learning: quiz plus checklist-scored task. Illustration, sample numbers."]],
    notes: [
      ["What is an AI coach?", "A practice partner. It plays the other person and suggests how you could improve. It does not replace your own thinking, and its suggestions can be wrong, so always compare them with the checklist."],
      ["What makes it work", "Practise in the coach, then use the skill in a real situation. The real situation is the proof that you have learned it."],
      ["Use AI responsibly", "Do not share passwords, ID numbers or private details in practice chats. Treat feedback as a suggestion, not a verdict."],
      ["Your data and privacy", "[Fill in from the privacy policy: what we store, what we do not, and how you delete your practice records.]"],
    ],
    faq: [
      ["Do I need to know AI?", "No."],
      ["Is the coach always right?", "No. Check it against the checklist."],
      ["Can I learn without it?", "Yes. See Learn on Your Own."],
      ["Is my data private?", "[Link to privacy policy]"],
    ],
    cta: "Start My Journey",
    status: "AI Practice Studio: preview, not live yet",
    journey: [
      ["Welcome and introduction", "What life skills are, and how an AI coach supports your thinking without replacing it."],
      ["Identify your skills", "Reflection questions, a priority skill and a practical goal."],
      ["Personalised roadmap", "Milestones and effort estimates. It adapts only where real logic exists."],
      ["Learn the concept", "A short lesson, an example, common mistakes and a quick check."],
      ["AI Practice Studio (preview)", "Mock interview, role-play and decision scenarios, with rubric-based feedback and a retry."],
      ["Assessment", "A fixed quiz, scenario questions and a practical rubric."],
      ["Progress", "Lessons, attempts, quiz results, practice records and your own confidence, shown separately."],
      ["Improvement plan", "Strengths, areas to improve, a one-week plan and your next skill."],
    ],
  eyebrow: "Option 1 · With an AI practice partner",
  other: { label: "Prefer Learn on Your Own?", href: ROUTES.own },
};

const NAV = [["coach", "Overview"], ["story", "Story"], ["assess", "Assessment"], ["progress", "Progress"], ["plan", "Plan"], ["skills", "Skills"], ["join", "Join"]];

const story = CHAPTERS.map((c, i) => (i === 2 ? CHAPTER_AI : c));

export default function LifeSkillsAI(props) {
  return (
    <LsShell props={props} nav={NAV} banner={<><b>Preview.</b> The AI Practice Studio and sign-up are not connected yet.</>}>
      <Mode
        id="coach"
        m={m}
        afterHero={
          <>
            <QuickFacts />
            <StorySection chapters={story} note="Riya’s coach is a practice partner. The real proof is the interview itself." />
          </>
        }
        extra={<><DialogueSvg /><BeforeAfterSvg /></>}
      />
      <AssessSection ai={true} />
      <ProgressSection />
      <PlanSection />
      <HorizonSection />
      <SkillsSection title="The 8 skills you will learn" />
      <JoinForm option={COACH_NAME} />
    </LsShell>
  );
}
