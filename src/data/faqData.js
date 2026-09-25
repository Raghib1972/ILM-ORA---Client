import { Award, BookOpen, CreditCard, Settings, Users } from "lucide-react";

// Real FAQ content, extracted verbatim from FAQ.jsx (Company/FAQ.jsx).
// Lives in its own plain (non-"use client") module so it can be
// imported both by the client-rendered FAQ page AND by the server
// component that generates FAQPage structured data (app/(public)/faq/page.jsx)
// — importing data from a "use client" module into a Server Component
// isn't reliably supported by React Server Components.

export const FAQ_DATA = [
  {
    category: "Courses & Programs",
    icon: BookOpen,
    color: "#F97316",
    faqs: [
      {
        q: "What types of courses does ILM ORA offer?",
        a: "ILM ORA offers industry-focused programs in Product Management, UI/UX Design, Growth Marketing, and Technology. All courses are designed by experts from top companies like Google, Amazon, and Meta.",
      },
      {
        q: "Are the courses self-paced or live?",
        a: "We offer both formats. Most courses are self-paced so you can learn on your own schedule. We also offer live cohort-based programs with mentor sessions for deeper engagement.",
      },
      {
        q: "How long does it take to complete a course?",
        a: "Course duration varies by program. Short skill-building courses can be completed in 2–4 weeks, while comprehensive bootcamp-style programs may take 8–12 weeks.",
      },
      {
        q: "Do I get a certificate after completing a course?",
        a: "Yes! Upon successful completion of all modules and assessments, you receive a verified digital certificate that you can share on LinkedIn or add to your resume.",
      },
      {
        q: "Can I access course content after completion?",
        a: "Absolutely. Once enrolled, you get lifetime access to all course materials, including future updates to the curriculum.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    icon: CreditCard,
    color: "#16a34a",
    faqs: [
      {
        q: "Are the free services really free?",
        a: "Yes! Our Free Services section offers select courses and resources at no cost. You can explore them without entering any payment details.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets. International payments via Stripe are also supported.",
      },
      {
        q: "Is there a refund policy?",
        a: "We offer a full refund within 7 days of purchase if you are not satisfied — no questions asked. After 7 days, refunds are evaluated on a case-by-case basis.",
      },
      {
        q: "Do you offer EMI or installment options?",
        a: "Yes, select programs support no-cost EMI options through partner banks and payment providers. You'll see the EMI option at checkout if it's available for your chosen program.",
      },
    ],
  },
  {
    category: "Account & Access",
    icon: Settings,
    color: "#0d9488",
    faqs: [
      {
        q: "How do I create an account?",
        a: "Click 'Get Started' on the homepage and sign up with your email or Google account. Account creation is free and takes less than a minute.",
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click 'Forgot Password' on the login page, enter your registered email, and we'll send you a secure reset link immediately.",
      },
      {
        q: "Can I access ILM ORA on mobile?",
        a: "Yes! ILM ORA is fully responsive and works seamlessly on all devices — mobile, tablet, and desktop. A dedicated mobile app is coming soon.",
      },
      {
        q: "Can I change my registered email address?",
        a: "Yes, you can update your email from your Profile Settings. A verification link will be sent to the new email before the change takes effect.",
      },
    ],
  },
  {
    category: "Mentors & Community",
    icon: Users,
    color: "#7c3aed",
    faqs: [
      {
        q: "Who are the mentors at ILM ORA?",
        a: "Our mentors are senior professionals and leaders from top companies like Google, Amazon, Flipkart, and leading startups. Each mentor is vetted for both expertise and teaching ability.",
      },
      {
        q: "Can I get 1-on-1 mentorship sessions?",
        a: "Yes, select programs include dedicated 1-on-1 mentor sessions. You can also book additional mentorship sessions separately from your dashboard.",
      },
      {
        q: "Is there a student community I can join?",
        a: "Absolutely! All enrolled students get access to our private community on WhatsApp and Discord where you can network, share projects, and collaborate with peers.",
      },
    ],
  },
  {
    category: "Certificates & Careers",
    icon: Award,
    color: "#db2777",
    faqs: [
      {
        q: "Are ILM ORA certificates recognized by employers?",
        a: "Our certificates are recognized by a growing network of hiring partners. We also partner with companies to source top learners for open roles.",
      },
      {
        q: "Does ILM ORA help with job placement?",
        a: "Yes! Our Career Support team helps with resume reviews, mock interviews, and connecting you to our hiring partner network. Placement support is available in select premium programs.",
      },
      {
        q: "Can I add my certificate to LinkedIn?",
        a: "Yes. Every certificate comes with a unique verification link that you can directly add to your LinkedIn profile under 'Licenses & Certifications'.",
      },
    ],
  },
];
