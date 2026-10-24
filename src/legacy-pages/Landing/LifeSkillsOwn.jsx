"use client";
import { LsShell, Mode, JoinForm, QuickFacts, StorySection, AssessSection, ProgressSection, PlanSection, HorizonSection, SkillsSection, CHAPTERS, CHAPTER_OWN, OWN_NAME, ROUTES, WorksheetSvg, PeerPracticeSvg } from "./LifeSkillsShared";

/* LifeSkillsOwn: sirf is option ka content. Dusre option ka kuch bhi yahan nahi hai. */
const m = {
    c: "#0F8F8F",
    ico: "📘",
    hero: ["093", "A learner writing in a journal in front of a self-reflection board"],
    title: "Learn at your own pace with lessons, worksheets and self-reflection. No AI needed.",
    sub: "Clear lessons, practical activities and simple checks that help you build real skills. Same skills, same plan, different practice style.",
    steps: [
      ["Choose your skill", "Use the checklist and reflection questions to find your focus skill and set a goal."],
      ["Follow your path", "Numbered modules in a fixed order, with worksheets and a progress checklist."],
      ["Practise real situations", "Use worksheets, a journal, and role-play with a friend, classmate or mentor. Add small daily challenges."],
      ["Check your learning", "Take a quiz with answer explanations. Do a practical task and score yourself with the checklist."],
      ["Get your plan", "Review your progress, note what to revise and create a one-week action plan."],
    ],
    lv: [
      {
        tag: "Beginner",
        skills: "Communication · Self-awareness · Digital Literacy",
        items: [
          ["Choose:", "a checklist and reflection questions to find your focus skill."],
          ["Learn:", "numbered modules in a fixed order."],
          ["Practise:", "worksheets, a daily journal and tiny daily challenges."],
          ["Check:", "quiz with answer explanations, then score yourself."],
        ],
        finish: "A focus skill, a started journal and a first one-week plan.",
        img: "086",
        alt: "A learner thinking about a goal next to a checklist and journal",
      },
      {
        tag: "Intermediate",
        skills: "Critical Thinking · Teamwork · Ethics & Personal Finance",
        items: [
          ["Choose:", "revisit your reflection and pick the next skill."],
          ["Learn:", "examples and notes on decisions, teamwork and money."],
          ["Practise:", "role-play with a friend or classmate, or the solo version: write it out or record yourself."],
          ["Check:", "answer key and checklist for the practical task."],
        ],
        finish: "Practice with real people and a record of what to revise.",
        img: "087",
        alt: "Four classmates practising teamwork around a table",
      },
      {
        tag: "Advanced",
        skills: "Career Readiness · Entrepreneurial Thinking · Leadership",
        items: [
          ["Choose:", "set a goal for a job, study or project."],
          ["Learn:", "interview, workplace and idea-testing modules."],
          ["Practise:", "mock interview with a mentor or on video, then reflect in your journal."],
          ["Check:", "practical task scored with the checklist. Share it with a mentor if you have one."],
        ],
        finish: "A reviewed progress record and your own action plan.",
        img: "084",
        alt: "A learner stepping up a growing chart drawn in a notebook",
      },
    ],
    gal: [
      ["085", "A learner watching a lesson and writing notes", "Step 2 · Follow your path: short lessons and worksheets"],
      ["090", "A learner studying with books and a notebook at a desk", "Step 3 · Practise: worksheets and journal"],
      ["083", "A study checklist, calendar and practice quiz on a desk", "Step 4 · Check: checklist and quiz with answer key"],
      ["089", "A learner with a study plan and weekly progress tracking", "Step 5 · Get your plan: one-week action plan. Illustration."],
    ],
    notes: [
      ["What is included", "Short lessons, real-life examples, worksheets, quizzes with answer keys, self-scoring checklists and a progress tracker."],
      ["Do I need someone to practise with?", "It helps, but it is optional. Every activity has a solo version: write it out, record yourself, or use the journal prompts."],
      ["Optional mentor feedback", "If you have a teacher or mentor, share your worksheet and checklist with them."],
    ],
    faq: [
      ["Is this a lesser version?", "No. Same skills, same plan, different practice style."],
      ["How long does it take?", "[X]"],
      ["Can I try the AI Coach later?", "Yes."],
    ],
    cta: "Start Learning",
    journey: [
      ["Welcome and introduction", "How structured lessons and practice build life skills without AI."],
      ["Self-identify your skills", "A checklist, reflection prompts and a personal learning goal."],
      ["Structured roadmap", "Numbered modules in a fixed order, with worksheets, effort estimates and a progress checklist."],
      ["Learn through content", "Short lessons, definitions, examples, diagrams and notes."],
      ["Practice in real life", "Worksheets, journaling, peer role-play, teamwork tasks and daily challenges."],
      ["Assessment", "Fixed quizzes with explanations, a self-rating, a practical rubric and optional mentor feedback."],
      ["Progress tracking", "Completed lessons, worksheets, quiz scores, milestones and reflection notes."],
      ["Improvement plan", "Revision tasks, a weekly plan and your next skill."],
    ],
  eyebrow: "Option 2 · Lessons, worksheets and real people",
  other: { label: "Prefer Learn with an AI Coach?", href: ROUTES.ai },
};

const NAV = [["own", "Overview"], ["story", "Story"], ["assess", "Assessment"], ["progress", "Progress"], ["plan", "Plan"], ["skills", "Skills"], ["join", "Join"]];

const story = CHAPTERS.map((c, i) => (i === 2 ? CHAPTER_OWN : c));

export default function LifeSkillsOwn(props) {
  return (
    <LsShell props={props} nav={NAV} banner={<><b>Preview.</b> Sign-up and progress tracking are not connected yet.</>}>
      <Mode
        id="own"
        m={m}
        afterHero={
          <>
            <QuickFacts />
            <StorySection chapters={story} note="Riya practises without AI. The real proof is the interview itself." />
          </>
        }
        extra={<><WorksheetSvg /><PeerPracticeSvg /></>}
      />
      <AssessSection ai={false} />
      <ProgressSection />
      <PlanSection />
      <HorizonSection />
      <SkillsSection title="The 8 skills you will learn" />
      <JoinForm option={OWN_NAME} />
    </LsShell>
  );
}
