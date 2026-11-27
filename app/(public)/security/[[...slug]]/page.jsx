// app/(public)/security/[[...slug]]/page.jsx
import IlmOraSecurity from "../../../../src/legacy-pages/Landing/ilmorasecurity";

export const metadata = {
  title: "Cyber Security | ILM ORA",
  description:
    "Cyber security services, solutions, assessments, consulting, training, quizzes and resources for individuals and businesses.",
};

export default function Page() {
  return <IlmOraSecurity />;
}
