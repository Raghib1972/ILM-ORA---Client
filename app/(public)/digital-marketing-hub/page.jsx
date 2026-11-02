import DigitalMarketingHub from "@/legacy-pages/Landing/DigitalMarketingHub";

export const metadata = {
  title: "Digital Marketing Hub | ILM ORA",
  description:
    "ILM ORA Digital Marketing Professional Learning Hub: 21 modules, practical labs, quizzes, tools and the INNOVORA real-world project.",
};

/* Navbar + Footer + login popups come from PublicLayout, which
   DigitalMarketingHub already wraps itself in. */
export default function Page() {
  return <DigitalMarketingHub />;
}
