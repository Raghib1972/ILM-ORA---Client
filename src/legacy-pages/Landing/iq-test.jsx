"use client";
/* eslint-disable */
/* =====================================================================
   ILM ORA – iq-test.jsx   (complete site, same UI as ilm-ora-website.html)
   Sections on the landing page (in order):
     Home · IQ Test · Pedagogy · Storyline · Programs · Courses · Student ·
     Trainer · Manager · Resources · About · FAQ · Contact
   Separate pages: Instructions · Test · Results · Report · Practice · Log in · Dashboard
   Routing is hash based (#/home, #/iq-test, #/test ...), data in sessionStorage/localStorage.
   Props:
     defaultRoute  page opened when the URL has no hash (default "home")
     showShell     show the ILM ORA header + footer (default true)
     stickyTop     px offset of the sticky timer bar when showShell is false
   ===================================================================== */
import React, { useEffect, useRef } from "react";
import PublicLayout from "@/legacy-pages/Landing/components/PublicLayout";
import img_contact_email from "@/assets/IQ -Test/contact/contact-email.jpg";
import img_contact_location from "@/assets/IQ -Test/contact/contact-location.jpg";
import img_contact_support from "@/assets/IQ -Test/contact/contact-support.jpg";
import img_contact_team from "@/assets/IQ -Test/contact/contact-team.jpg";
import img_courses_catalog from "@/assets/IQ -Test/courses/courses-catalog.jpg";
import img_courses_instructor from "@/assets/IQ -Test/courses/courses-instructor.jpg";
import img_courses_online from "@/assets/IQ -Test/courses/courses-online.jpg";
import img_feature_assessment from "@/assets/IQ -Test/features/feature-assessment.jpg";
import img_feature_learning from "@/assets/IQ -Test/features/feature-learning.jpg";
import img_feature_progress from "@/assets/IQ -Test/features/feature-progress.jpg";
import img_feature_report from "@/assets/IQ -Test/features/feature-report.jpg";
import img_home_hero_group from "@/assets/IQ -Test/home/home-hero-group.jpg";
import img_home_hero_learning from "@/assets/IQ -Test/home/home-hero-learning.jpg";
import img_home_hero_students from "@/assets/IQ -Test/home/home-hero-students.jpg";
import img_home_hero_tagline from "@/assets/IQ -Test/home/home-hero-tagline.jpg";
import img_instructions_guide from "@/assets/IQ -Test/instructions/instructions-guide.jpg";
import img_instructions_timer from "@/assets/IQ -Test/instructions/instructions-timer.jpg";
import img_instructions_tips from "@/assets/IQ -Test/instructions/instructions-tips.jpg";
import img_iq_logical from "@/assets/IQ -Test/iq-test/iq-logical.jpg";
import img_iq_numerical from "@/assets/IQ -Test/iq-test/iq-numerical.jpg";
import img_iq_spatial from "@/assets/IQ -Test/iq-test/iq-spatial.jpg";
import img_iq_verbal from "@/assets/IQ -Test/iq-test/iq-verbal.jpg";
import img_pedagogy_classroom from "@/assets/IQ -Test/pedagogy/pedagogy-classroom.jpg";
import img_pedagogy_growth from "@/assets/IQ -Test/pedagogy/pedagogy-growth.jpg";
import img_pedagogy_methods from "@/assets/IQ -Test/pedagogy/pedagogy-methods.jpg";
import img_pedagogy_teaching from "@/assets/IQ -Test/pedagogy/pedagogy-teaching.jpg";
import img_test_mcq from "@/assets/IQ -Test/practice/test-mcq.jpg";
import img_test_practice_student from "@/assets/IQ -Test/practice/test-practice-student.jpg";
import img_test_progress from "@/assets/IQ -Test/practice/test-progress.jpg";
import img_report_analysis from "@/assets/IQ -Test/report/report-analysis.jpg";
import img_report_download from "@/assets/IQ -Test/report/report-download.jpg";
import img_report_sample from "@/assets/IQ -Test/report/report-sample.jpg";
import img_results_category from "@/assets/IQ -Test/results/results-category.jpg";
import img_results_overall from "@/assets/IQ -Test/results/results-overall.jpg";
import img_results_success from "@/assets/IQ -Test/results/results-success.jpg";
import img_results_trophy from "@/assets/IQ -Test/results/results-trophy.jpg";
import img_storyline_journey from "@/assets/IQ -Test/storyline/storyline-journey.jpg";
import img_storyline_levels from "@/assets/IQ -Test/storyline/storyline-levels.jpg";
import img_storyline_path from "@/assets/IQ -Test/storyline/storyline-path.jpg";
import img_storyline_progress from "@/assets/IQ -Test/storyline/storyline-progress.jpg";

const U = (m) => (m && typeof m === "object" ? m.src : m);
const IM = {
  "contact-email": U(img_contact_email),
  "contact-location": U(img_contact_location),
  "contact-support": U(img_contact_support),
  "contact-team": U(img_contact_team),
  "courses-catalog": U(img_courses_catalog),
  "courses-instructor": U(img_courses_instructor),
  "courses-online": U(img_courses_online),
  "feature-assessment": U(img_feature_assessment),
  "feature-learning": U(img_feature_learning),
  "feature-progress": U(img_feature_progress),
  "feature-report": U(img_feature_report),
  "home-hero-group": U(img_home_hero_group),
  "home-hero-learning": U(img_home_hero_learning),
  "home-hero-students": U(img_home_hero_students),
  "home-hero-tagline": U(img_home_hero_tagline),
  "instructions-guide": U(img_instructions_guide),
  "instructions-timer": U(img_instructions_timer),
  "instructions-tips": U(img_instructions_tips),
  "iq-logical": U(img_iq_logical),
  "iq-numerical": U(img_iq_numerical),
  "iq-spatial": U(img_iq_spatial),
  "iq-verbal": U(img_iq_verbal),
  "pedagogy-classroom": U(img_pedagogy_classroom),
  "pedagogy-growth": U(img_pedagogy_growth),
  "pedagogy-methods": U(img_pedagogy_methods),
  "pedagogy-teaching": U(img_pedagogy_teaching),
  "test-mcq": U(img_test_mcq),
  "test-practice-student": U(img_test_practice_student),
  "test-progress": U(img_test_progress),
  "report-analysis": U(img_report_analysis),
  "report-download": U(img_report_download),
  "report-sample": U(img_report_sample),
  "results-category": U(img_results_category),
  "results-overall": U(img_results_overall),
  "results-success": U(img_results_success),
  "results-trophy": U(img_results_trophy),
  "storyline-journey": U(img_storyline_journey),
  "storyline-levels": U(img_storyline_levels),
  "storyline-path": U(img_storyline_path),
  "storyline-progress": U(img_storyline_progress),
};

/* ---------------- ENGINE (original page logic, scoped to this component) ---------------- */
function mountIlmOra(__R, IMX, __OPT) {
  "use strict";
  const __OFF = [],
    __ST = {};
  const __gid = (i) => __R.querySelector("#" + i);
  const __LST = (t, f) => {
    const tg = t === "keydown" ? document : __R;
    tg.addEventListener(t, f);
    __OFF.push(() => tg.removeEventListener(t, f));
  };
  const __WL = (t, f) => {
    window.addEventListener(t, f);
    __OFF.push(() => window.removeEventListener(t, f));
  };

  /* ===== CONFIG (replace with project config; no invented contact data) ===== */
    const CONFIG = { contactEmail: null, contactPhone: null, address: null, contactApi: "/api/contact" };
  const IM = IMX;
  const IMGK = {
    hero: "home-hero-students",
    learn: "feature-learning",
    iq: "iq-logical",
    teach: "pedagogy-classroom",
    blog: "courses-catalog",
    team: "contact-team",
    faq: "contact-support",
    contact: "contact-email",
  };
  const RIMG = {
    instructions: ["instructions-guide", "Illustration of an instructions guide"],
    
    report: ["report-sample", "Illustration of a sample report"],
    practice: ["test-practice-student", "Student practising questions"],
  };
  const img = (k, alt) => ill(k, alt);
  /* ===== DATA / MOCK SERVICE LAYER =====
 Expected API: GET /api/assessments/iq-demo -> {meta,questions[]}; POST /api/attempts {answers} -> {score,sections};
 GET /api/courses ; GET /api/articles ; POST /api/contact ; POST /api/auth/login|signup|reset */
  const CATS = { logical: "Logical", verbal: "Verbal", numerical: "Numerical", spatial: "Spatial" };
  /* Source: ILM_ORA_IQ_Question_Bank_200_Questions.pdf (educational sample bank, not a validated IQ instrument). 200 items; 6 spatial and 1 replaced item added in review. */
  const CL = (s) =>
    String(s)
      .replace(/\s*ILM ORA • Sample Question Bank • Not a validated IQ instrument Page \d+.*$/, "")
      .trim();
  const X = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const BANK = [
    [
      "LOG-001",
      "logical",
      "Easy",
      "What number comes next in the sequence: 2, 4, 6, 8, ___?",
      ["8", "12", "20", "10"],
      3,
      "Add 2 each time.",
    ],
    [
      "LOG-002",
      "logical",
      "Easy",
      "What number comes next in the sequence: 3, 6, 9, 12, ___?",
      ["30", "13", "15", "17"],
      2,
      "Add 3 each time.",
    ],
    [
      "LOG-003",
      "logical",
      "Easy",
      "What number comes next in the sequence: 5, 10, 15, 20, ___?",
      ["27", "50", "23", "25"],
      3,
      "Add 5 each time.",
    ],
    [
      "LOG-004",
      "logical",
      "Easy",
      "What number comes next in the sequence: 1, 4, 9, 16, ___?",
      ["27", "23", "25", "50"],
      2,
      "These are square numbers: 1², 2², 3², 4², so next is 5².",
    ],
    [
      "LOG-005",
      "logical",
      "Easy",
      "What number comes next in the sequence: 2, 6, 12, 20, ___?",
      ["32", "28", "60", "30"],
      3,
      "The differences are +4, +6, +8, so next is +10.",
    ],
    [
      "LOG-006",
      "logical",
      "Easy",
      "What number comes next in the sequence: 1, 1, 2, 3, 5, ___?",
      ["10", "16", "6", "8"],
      3,
      "Each term is the sum of the previous two terms.",
    ],
    [
      "LOG-007",
      "logical",
      "Easy",
      "What number comes next in the sequence: 10, 20, 40, 80, ___?",
      ["158", "162", "160", "320"],
      2,
      "Multiply by 2 each time. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 2",
    ],
    [
      "LOG-008",
      "logical",
      "Easy",
      "What number comes next in the sequence: 81, 27, 9, 3, ___?",
      ["3", "2", "1", "4"],
      2,
      "Divide by 3 each time.",
    ],
    [
      "LOG-009",
      "logical",
      "Medium",
      "What number comes next in the sequence: 7, 14, 28, 56, ___?",
      ["112", "110", "114", "224"],
      0,
      "Multiply by 2 each time.",
    ],
    [
      "LOG-010",
      "logical",
      "Medium",
      "What number comes next in the sequence: 100, 90, 80, 70, ___?",
      ["58", "120", "60", "62"],
      2,
      "Subtract 10 each time.",
    ],
    [
      "LOG-011",
      "logical",
      "Medium",
      "What number comes next in the sequence: 4, 9, 14, 19, ___?",
      ["22", "26", "48", "24"],
      3,
      "Add 5 each time.",
    ],
    [
      "LOG-012",
      "logical",
      "Medium",
      "What number comes next in the sequence: 2, 5, 10, 17, ___?",
      ["52", "24", "28", "26"],
      3,
      "Add consecutive odd numbers: +3, +5, +7, then +9.",
    ],
    [
      "LOG-013",
      "logical",
      "Medium",
      "What number comes next in the sequence: 1, 8, 27, 64, ___?",
      ["250", "127", "125", "123"],
      2,
      "These are cubes: 1³, 2³, 3³, 4³, so next is 5³.",
    ],
    [
      "LOG-014",
      "logical",
      "Medium",
      "What number comes next in the sequence: 13, 11, 9, 7, ___?",
      ["3", "10", "7", "5"],
      3,
      "Subtract 2 each time.",
    ],
    [
      "LOG-015",
      "logical",
      "Medium",
      "What number comes next in the sequence: 3, 8, 15, 24, ___?",
      ["35", "37", "70", "33"],
      0,
      "Terms follow n²−1: 2²−1, 3²−1, 4²−1, 5²−1; next is 6²−1. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 3",
    ],
    [
      "LOG-016",
      "logical",
      "Hard",
      "What number comes next in the sequence: 2, 3, 5, 8, 12, ___?",
      ["34", "17", "15", "19"],
      1,
      "Differences increase by 1: +1, +2, +3, +4, then +5.",
    ],
    [
      "LOG-017",
      "logical",
      "Hard",
      "What number comes next in the sequence: 64, 32, 16, 8, ___?",
      ["6", "8", "2", "4"],
      3,
      "Divide by 2 each time.",
    ],
    [
      "LOG-018",
      "logical",
      "Hard",
      "What number comes next in the sequence: 6, 11, 21, 41, ___?",
      ["83", "162", "81", "79"],
      2,
      "Multiply by 2 and subtract 1: 6→11→21→41→81.",
    ],
    [
      "LOG-019",
      "logical",
      "Hard",
      "What number comes next in the sequence: 1, 3, 6, 10, ___?",
      ["30", "13", "17", "15"],
      3,
      "Triangular numbers add 2, 3, 4, then 5.",
    ],
    [
      "LOG-020",
      "logical",
      "Hard",
      "What number comes next in the sequence: 4, 7, 13, 25, ___?",
      ["49", "51", "47", "98"],
      0,
      "Each term is previous ×2 −1: 4→7→13→25→49.",
    ],
    [
      "LOG-021",
      "logical",
      "Easy",
      "All roses are flowers. Some flowers fade quickly. Which statement must be true?",
      ["All roses fade quickly", "Some roses fade quickly", "All roses are flowers", "No flowers are roses"],
      2,
      "This is stated directly; the information about fading does not establish anything about roses.",
    ],
    [
      "LOG-022",
      "logical",
      "Easy",
      "All laptops are devices. All devices need energy. What follows?",
      ["All laptops need energy", "All energy is used by laptops", "Some devices are not laptops", "No laptops are devices"],
      0,
      "If every laptop is a device and every device needs energy, every laptop needs energy.",
    ],
    [
      "LOG-023",
      "logical",
      "Easy",
      "Some artists are teachers. All teachers are readers. What must be true?",
      ["All artists are readers", "Some artists are readers", "No artists are readers", "All readers are artists"],
      1,
      "The artists who are teachers belong to the group of readers. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 4",
    ],
    [
      "LOG-024",
      "logical",
      "Easy",
      "If today is Wednesday, what day will it be 10 days later?",
      ["Friday", "Saturday", "Sunday", "Monday"],
      1,
      "Seven days later is Wednesday; three more days later is Saturday.",
    ],
    [
      "LOG-025",
      "logical",
      "Easy",
      "Mina is taller than Ravi. Ravi is taller than Noor. Who is shortest?",
      ["Mina", "Ravi", "Noor", "Cannot tell"],
      2,
      "The order is Mina > Ravi > Noor.",
    ],
    [
      "LOG-026",
      "logical",
      "Easy",
      "A is left of B. B is left of C. Which is the correct order from left to right?",
      ["C, B, A", "A, B, C", "B, A, C", "A, C, B"],
      1,
      "A is left of B, and B is left of C.",
    ],
    [
      "LOG-027",
      "logical",
      "Easy",
      "If every Zorp is a Mip and no Mip is a Taz, can a Zorp be a Taz?",
      ["Yes, always", "No", "Only sometimes", "Cannot be determined"],
      1,
      "Zorps are Mips, and Mips are excluded from the Taz group.",
    ],
    [
      "LOG-028",
      "logical",
      "Medium",
      "Find the odd one out.",
      ["Triangle", "Square", "Circle", "Rectangle"],
      2,
      "The others are polygons with straight sides; a circle has no straight sides.",
    ],
    [
      "LOG-029",
      "logical",
      "Medium",
      "Find the odd one out.",
      ["Copper", "Iron", "Silver", "Plastic"],
      3,
      "Copper, iron, and silver are metals; plastic is not a metal.",
    ],
    [
      "LOG-030",
      "logical",
      "Medium",
      "Find the odd one out.",
      ["January", "March", "Monday", "July"],
      2,
      "The others are months; Monday is a day of the week.",
    ],
    [
      "LOG-031",
      "logical",
      "Medium",
      "If BOOK is coded as CPPL (each letter moves forward one), how is LAMP coded?",
      ["MBNQ", "KZLO", "MZNO", "NBNQ"],
      0,
      "Move each letter one step forward: L→M, A→B, M→N, P→Q. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 5",
    ],
    [
      "LOG-032",
      "logical",
      "Medium",
      "A clock shows 3:00. What is the smaller angle between its hands?",
      ["45°", "60°", "90°", "120°"],
      2,
      "At 3:00, the minute hand is at 12 and the hour hand at 3, a right angle.",
    ],
    [
      "LOG-033",
      "logical",
      "Hard",
      "A person faces north, turns right, then right again. Which direction are they facing?",
      ["North", "South", "East", "West"],
      1,
      "Two right turns make a 180-degree turn from north to south.",
    ],
    [
      "LOG-034",
      "logical",
      "Hard",
      "In a race, Sam finishes before Ali, and Ali finishes before Jo. Who finishes first?",
      ["Sam", "Ali", "Jo", "Cannot tell"],
      0,
      "Sam is ahead of Ali, who is ahead of Jo.",
    ],
    [
      "LOG-035",
      "logical",
      "Hard",
      "If 1 January is a Monday, what day is 8 January?",
      ["Sunday", "Monday", "Tuesday", "Wednesday"],
      1,
      "Exactly seven days later falls on the same weekday.",
    ],
    [
      "LOG-036",
      "logical",
      "Medium",
      "Four books P, Q, R, S are arranged in a row. P is before Q; R is after Q; S is before P. Which order fits all rules?",
      ["S, P, Q, R", "P, S, Q, R", "Q, P, S, R", "S, Q, P, R"],
      0,
      "S must be before P, P before Q, and R after Q.",
    ],
    [
      "LOG-037",
      "logical",
      "Medium",
      "If A=1, B=2, C=3, what is the value of BAD?",
      ["7", "8", "9", "6"],
      0,
      "B=2, A=1, D=4; total = 2+1+4 = 7.",
    ],
    [
      "LOG-038",
      "logical",
      "Medium",
      "Choose the pair with the same relationship: Bird : Nest",
      ["Bee : Hive", "Fish : Tree", "Dog : Sky", "Horse : Feather"],
      0,
      "A nest is a bird's home; a hive is a bee's home.",
    ],
    [
      "LOG-039",
      "logical",
      "Medium",
      "If all squares are rectangles, which statement is correct?",
      ["Every rectangle is a square", "Every square is a rectangle", "No square is a rectangle", "Squares have no right angles"],
      1,
      "A square satisfies the definition of a rectangle because it has four right angles. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 6",
    ],
    [
      "LOG-040",
      "logical",
      "Medium",
      "A number is greater than 10 and less than 15, and is even. Which could it be?",
      ["11", "12", "13", "15"],
      1,
      "12 is even and lies between 10 and 15.",
    ],
    [
      "LOG-041",
      "logical",
      "Medium",
      "Complete the pattern: AZ, BY, CX, DW, ___",
      ["EV", "EU", "FV", "EX"],
      0,
      "First letters move forward A, B, C, D, E; second letters move backward Z, Y, X, W, V.",
    ],
    [
      "LOG-042",
      "logical",
      "Medium",
      "If the code reverses a word, how is TRAIN written?",
      ["NIART", "TRIAN", "NIRAT", "TARIN"],
      0,
      "Reversing TRAIN gives NIART.",
    ],
    [
      "LOG-043",
      "logical",
      "Medium",
      "A box contains red, blue, and green balls. There are more red than blue, and more blue than green. Which color has the fewest balls?",
      ["Red", "Blue", "Green", "Cannot tell"],
      2,
      "The order is red > blue > green.",
    ],
    [
      "LOG-044",
      "logical",
      "Hard",
      "Which conclusion follows? No cats are reptiles. All tigers are cats.",
      ["All reptiles are tigers", "No tigers are reptiles", "Some cats are reptiles", "All cats are tigers"],
      1,
      "Tigers belong to cats, and cats are outside the reptile group.",
    ],
    [
      "LOG-045",
      "logical",
      "Hard",
      "If the first day of a month is Thursday, what weekday is the 15th?",
      ["Wednesday", "Thursday", "Friday", "Saturday"],
      1,
      "The 15th is 14 days after the 1st, exactly two weeks later.",
    ],
    [
      "LOG-046",
      "logical",
      "Hard",
      "Find the missing letter: B, E, H, K, ___",
      ["L", "M", "N", "O"],
      2,
      "Letters advance by three positions: B, E, H, K, N.",
    ],
    [
      "LOG-047",
      "logical",
      "Hard",
      "Which number does not belong?",
      ["16", "25", "36", "45"],
      3,
      "16, 25, and 36 are perfect squares; 45 is not. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 7",
    ],
    [
      "LOG-048",
      "logical",
      "Hard",
      "A is older than B. C is younger than B. Who is oldest?",
      ["A", "B", "C", "Cannot tell"],
      0,
      "A is older than B, and C is younger than B.",
    ],
    [
      "LOG-049",
      "logical",
      "Hard",
      "If 5 machines make 5 items in 5 minutes at the same rate, how many minutes do 10 machines take to make 10 items?",
      ["2.5 minutes", "5 minutes", "10 minutes", "20 minutes"],
      1,
      "Each machine makes one item in five minutes, so 10 machines make 10 items in five minutes.",
    ],
    [
      "LOG-050",
      "logical",
      "Hard",
      "A statement is true only when both P and Q are true. P is true and Q is false. What is the result?",
      ["True", "False", "Unknown", "Both"],
      1,
      "A logical AND is true only if both inputs are true. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 8 Verbal Reasoning — 50 Questions",
    ],
    [
      "VER-001",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'abundant'.",
      ["Scarce", "Plentiful", "Tiny", "Empty"],
      1,
      "Abundant means existing in large quantities.",
    ],
    [
      "VER-002",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'brief'.",
      ["Short", "Distant", "Loud", "Complex"],
      0,
      "Brief means short in duration or length.",
    ],
    [
      "VER-003",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'cautious'.",
      ["Careful", "Careless", "Angry", "Quick"],
      0,
      "Cautious means taking care to avoid danger or mistakes.",
    ],
    [
      "VER-004",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'reluctant'.",
      ["Unwilling", "Eager", "Certain", "Proud"],
      0,
      "Reluctant means hesitant or unwilling.",
    ],
    [
      "VER-005",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'ancient'.",
      ["Modern", "Very old", "New", "Temporary"],
      1,
      "Ancient means belonging to the distant past.",
    ],
    [
      "VER-006",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'accurate'.",
      ["Correct", "Vague", "Late", "Rough"],
      0,
      "Accurate means correct or exact.",
    ],
    [
      "VER-007",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'fragile'.",
      ["Delicate", "Strong", "Heavy", "Permanent"],
      0,
      "Fragile means easily broken or damaged. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 9",
    ],
    [
      "VER-008",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'observe'.",
      ["Notice", "Ignore", "Destroy", "Invent"],
      0,
      "To observe is to watch or notice carefully.",
    ],
    [
      "VER-009",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'expand'.",
      ["Enlarge", "Reduce", "Hide", "Divide"],
      0,
      "Expand means to increase in size or extent.",
    ],
    [
      "VER-010",
      "verbal",
      "Easy",
      "Choose the closest meaning of 'essential'.",
      ["Necessary", "Optional", "Rare", "Decorative"],
      0,
      "Essential means absolutely necessary.",
    ],
    [
      "VER-011",
      "verbal",
      "Medium",
      "Choose the opposite of 'generous'.",
      ["Kind", "Selfish", "Helpful", "Giving"],
      1,
      "Selfish is an opposite of generous.",
    ],
    [
      "VER-012",
      "verbal",
      "Medium",
      "Choose the opposite of 'optimistic'.",
      ["Hopeful", "Confident", "Pessimistic", "Cheerful"],
      2,
      "Pessimistic means expecting negative outcomes.",
    ],
    [
      "VER-013",
      "verbal",
      "Medium",
      "Choose the opposite of 'transparent'.",
      ["Clear", "Opaque", "Visible", "Bright"],
      1,
      "Opaque means not allowing light through; it contrasts with transparent.",
    ],
    [
      "VER-014",
      "verbal",
      "Medium",
      "Choose the opposite of 'increase'.",
      ["Grow", "Rise", "Decrease", "Improve"],
      2,
      "Decrease means to become smaller or less.",
    ],
    [
      "VER-015",
      "verbal",
      "Medium",
      "Choose the opposite of 'permanent'.",
      ["Lasting", "Fixed", "Temporary", "Stable"],
      2,
      "Temporary means lasting for a limited time. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 10",
    ],
    [
      "VER-016",
      "verbal",
      "Hard",
      "Choose the opposite of 'victory'.",
      ["Success", "Defeat", "Triumph", "Reward"],
      1,
      "Defeat is the opposite of victory.",
    ],
    [
      "VER-017",
      "verbal",
      "Hard",
      "Choose the opposite of 'frequent'.",
      ["Common", "Regular", "Rare", "Repeated"],
      2,
      "Rare means not occurring often.",
    ],
    [
      "VER-018",
      "verbal",
      "Hard",
      "Choose the opposite of 'complex'.",
      ["Complicated", "Simple", "Difficult", "Detailed"],
      1,
      "Simple contrasts with complex.",
    ],
    [
      "VER-019",
      "verbal",
      "Hard",
      "Choose the opposite of 'accept'.",
      ["Receive", "Admit", "Reject", "Allow"],
      2,
      "Reject means to refuse or not accept.",
    ],
    [
      "VER-020",
      "verbal",
      "Hard",
      "Choose the opposite of 'flexible'.",
      ["Adaptable", "Bendable", "Rigid", "Soft"],
      2,
      "Rigid means stiff and not easily changed.",
    ],
    [
      "VER-021",
      "verbal",
      "Easy",
      "Book is to reading as fork is to ___.",
      ["Writing", "Eating", "Drawing", "Sleeping"],
      1,
      "A book is used for reading; a fork is used for eating.",
    ],
    [
      "VER-022",
      "verbal",
      "Easy",
      "Puppy is to dog as kitten is to ___.",
      ["Cat", "Cow", "Bird", "Horse"],
      0,
      "A puppy is a young dog; a kitten is a young cat.",
    ],
    [
      "VER-023",
      "verbal",
      "Easy",
      "Doctor is to hospital as teacher is to ___.",
      ["School", "Airport", "Farm", "Theatre"],
      0,
      "A hospital is a common workplace for a doctor; a school for a teacher. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 11",
    ],
    [
      "VER-024",
      "verbal",
      "Easy",
      "Bird is to fly as fish is to ___.",
      ["Run", "Swim", "Climb", "Dig"],
      1,
      "Flying is a typical movement of birds; swimming is typical of fish.",
    ],
    [
      "VER-025",
      "verbal",
      "Easy",
      "Seed is to plant as egg is to ___.",
      ["Nest", "Bird", "Feather", "Wing"],
      1,
      "A seed can grow into a plant; an egg can develop into a bird.",
    ],
    [
      "VER-026",
      "verbal",
      "Medium",
      "Author is to book as composer is to ___.",
      ["Song", "Brush", "Building", "Recipe"],
      0,
      "An author creates a book; a composer creates music or a song.",
    ],
    [
      "VER-027",
      "verbal",
      "Medium",
      "Thermometer is to temperature as scale is to ___.",
      ["Height", "Weight", "Speed", "Time"],
      1,
      "A thermometer measures temperature; a scale measures weight.",
    ],
    [
      "VER-028",
      "verbal",
      "Medium",
      "Eye is to seeing as ear is to ___.",
      ["Smelling", "Hearing", "Touching", "Tasting"],
      1,
      "The eye is used for seeing; the ear is used for hearing.",
    ],
    [
      "VER-029",
      "verbal",
      "Medium",
      "Wheel is to car as wing is to ___.",
      ["Boat", "Airplane", "Bicycle", "Train"],
      1,
      "Wheels are key parts of a car; wings are key parts of an airplane.",
    ],
    [
      "VER-030",
      "verbal",
      "Medium",
      "Painter is to canvas as writer is to ___.",
      ["Paper", "Hammer", "Soil", "Needle"],
      0,
      "A painter works on canvas; a writer commonly writes on paper.",
    ],
    [
      "VER-031",
      "verbal",
      "Hard",
      "Hot is to cold as tall is to ___.",
      ["High", "Long", "Short", "Wide"],
      2,
      "Cold is opposite hot; short is opposite tall. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 12",
    ],
    [
      "VER-032",
      "verbal",
      "Hard",
      "Whisper is to speak as stroll is to ___.",
      ["Walk", "Run", "Jump", "Sit"],
      0,
      "Whisper is a quiet form of speaking; stroll is a relaxed form of walking.",
    ],
    [
      "VER-033",
      "verbal",
      "Hard",
      "Chapter is to book as scene is to ___.",
      ["Play", "Shelf", "Pen", "Library"],
      0,
      "A chapter is part of a book; a scene is part of a play.",
    ],
    [
      "VER-034",
      "verbal",
      "Hard",
      "Calf is to cow as foal is to ___.",
      ["Horse", "Sheep", "Goat", "Deer"],
      0,
      "A calf is a young cow; a foal is a young horse.",
    ],
    [
      "VER-035",
      "verbal",
      "Hard",
      "Minute is to hour as month is to ___.",
      ["Day", "Year", "Week", "Century"],
      1,
      "Minutes make up an hour; months make up a year.",
    ],
    [
      "VER-036",
      "verbal",
      "Medium",
      "Choose the best word: Despite the heavy rain, the match continued ___.",
      ["smoothly", "reluctantly", "never", "because"],
      0,
      "The sentence needs an adverb describing how the match continued.",
    ],
    [
      "VER-037",
      "verbal",
      "Medium",
      "Choose the best word: She studied consistently, ___ she improved her score.",
      ["so", "unless", "although", "but"],
      0,
      "'So' expresses the result of studying consistently.",
    ],
    [
      "VER-038",
      "verbal",
      "Medium",
      "Choose the best word: The instructions were so ___ that everyone understood them.",
      ["clear", "confused", "hidden", "doubtful"],
      0,
      "Clear instructions are easy to understand.",
    ],
    [
      "VER-039",
      "verbal",
      "Medium",
      "Which sentence is grammatically correct?",
      ["They was ready.", "They were ready.", "They is ready.", "They be ready."],
      1,
      "The plural subject 'they' takes 'were' in the past tense. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 13",
    ],
    [
      "VER-040",
      "verbal",
      "Medium",
      "Which sentence is grammatically correct?",
      ["He has finished his work.", "He have finished his work.", "He finishing his work.", "He finish his work yesterday."],
      0,
      "'He has finished' is the correct present perfect construction.",
    ],
    [
      "VER-041",
      "verbal",
      "Medium",
      "Choose the correctly spelled word.",
      ["Accomodate", "Acommodate", "Accommodate", "Acomoddate"],
      2,
      "The correct spelling is accommodate, with double c and double m.",
    ],
    [
      "VER-042",
      "verbal",
      "Medium",
      "Choose the correctly spelled word.",
      ["Separate", "Seperate", "Seprate", "Seperete"],
      0,
      "The correct spelling is separate.",
    ],
    [
      "VER-043",
      "verbal",
      "Medium",
      "Choose the word that best completes the sentence: A reliable person can be ___.",
      ["trusted", "forgotten", "avoided", "confused"],
      0,
      "Reliable means dependable, so such a person can be trusted.",
    ],
    [
      "VER-044",
      "verbal",
      "Hard",
      "What is the main idea? 'Regular exercise strengthens the heart, improves mood, and can help people sleep better.'",
      ["Exercise has several health benefits", "Exercise is always difficult", "Sleep is unnecessary", "Only athletes should exercise"],
      0,
      "The sentence lists multiple benefits of regular exercise.",
    ],
    [
      "VER-045",
      "verbal",
      "Hard",
      "What can be inferred? 'Nina took an umbrella after seeing dark clouds.'",
      ["She expected rain might fall", "She wanted sunshine", "It was already snowing", "She forgot the weather"],
      0,
      "Dark clouds and an umbrella suggest she anticipated possible rain.",
    ],
    [
      "VER-046",
      "verbal",
      "Hard",
      "Choose the word closest in meaning to 'meticulous'.",
      ["Careless", "Very careful", "Impatient", "Uncertain"],
      1,
      "Meticulous means showing great attention to detail.",
    ],
    [
      "VER-047",
      "verbal",
      "Hard",
      "Choose the word closest in meaning to 'adapt'.",
      ["Adjust", "Refuse", "Repeat", "Remove"],
      0,
      "To adapt is to adjust to new conditions. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 14",
    ],
    [
      "VER-048",
      "verbal",
      "Hard",
      "Choose the opposite of 'conceal'.",
      ["Hide", "Reveal", "Cover", "Protect"],
      1,
      "Reveal means to make known, the opposite of conceal.",
    ],
    [
      "VER-049",
      "verbal",
      "Hard",
      "Choose the opposite of 'scarce'.",
      ["Limited", "Rare", "Abundant", "Insufficient"],
      2,
      "Abundant means plentiful, opposite to scarce.",
    ],
    [
      "VER-050",
      "verbal",
      "Hard",
      "Which word does not belong?",
      ["Joyful", "Cheerful", "Elated", "Miserable"],
      3,
      "The first three indicate happiness; miserable indicates unhappiness. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 15 Numerical Reasoning — 50 Questions",
    ],
    ["NUM-001", "numerical", "Easy", "What is 18 + 27?", ["45", "46", "55", "44"], 0, "18 + 27 = 45."],
    ["NUM-002", "numerical", "Easy", "What is 96 − 38?", ["58", "68", "62", "48"], 0, "96 − 38 = 58."],
    ["NUM-003", "numerical", "Easy", "What is 14 × 6?", ["74", "94", "80", "84"], 3, "14 × 6 = 84."],
    ["NUM-004", "numerical", "Easy", "What is 144 ÷ 12?", ["14", "16", "12", "10"], 2, "144 ÷ 12 = 12."],
    ["NUM-005", "numerical", "Easy", "What is 15% of 200?", ["25", "30", "20", "35"], 1, "0.15 × 200 = 30."],
    [
      "NUM-006",
      "numerical",
      "Easy",
      "A shirt costs ₹800 and has a 10% discount. What is the sale price?",
      ["700", "780", "720", "740"],
      2,
      "10% of ₹800 is ₹80; ₹800 − ₹80 = ₹720.",
    ],
    [
      "NUM-007",
      "numerical",
      "Easy",
      "What is the average of 6, 8, and 10?",
      ["12", "9", "7", "8"],
      3,
      "Average = (6+8+10) ÷ 3 = 8. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 16",
    ],
    [
      "NUM-008",
      "numerical",
      "Easy",
      "Simplify the ratio 12:18.",
      ["3:2", "6:9", "2:3", "4:5"],
      2,
      "Divide both parts by their greatest common divisor, 6: 12:18 = 2:3.",
    ],
    [
      "NUM-009",
      "numerical",
      "Easy",
      "A car travels 120 km in 2 hours. What is its average speed?",
      ["70", "50", "60", "55"],
      2,
      "Speed = distance ÷ time = 120 ÷ 2 = 60 km/h.",
    ],
    ["NUM-010", "numerical", "Easy", "What is 3/4 of 80?", ["60", "40", "50", "70"], 0, "80 ÷ 4 × 3 = 60."],
    ["NUM-011", "numerical", "Easy", "What is 7²?", ["56", "49", "14", "42"], 1, "7 × 7 = 49."],
    [
      "NUM-012",
      "numerical",
      "Easy",
      "What is the next number: 4, 8, 12, 16, ___?",
      ["20", "24", "22", "18"],
      0,
      "The sequence adds 4 each time.",
    ],
    [
      "NUM-013",
      "numerical",
      "Medium",
      "If 5 pens cost ₹60, what is the cost of one pen?",
      ["12", "10", "15", "20"],
      0,
      "₹60 ÷ 5 = ₹12 per pen.",
    ],
    [
      "NUM-014",
      "numerical",
      "Medium",
      "A class has 30 students; 40% are girls. How many girls are there?",
      ["10", "18", "12", "14"],
      2,
      "40% of 30 = 0.4 × 30 = 12.",
    ],
    [
      "NUM-015",
      "numerical",
      "Medium",
      "What is 2.5 + 3.75?",
      ["5.25", "6.15", "6.25", "6.5"],
      2,
      "2.50 + 3.75 = 6.25. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 17",
    ],
    ["NUM-016", "numerical", "Medium", "What is 9 × 8 − 12?", ["48", "68", "72", "60"], 3, "9 × 8 = 72; 72 − 12 = 60."],
    [
      "NUM-017",
      "numerical",
      "Medium",
      "A number increased by 9 equals 26. What is the number?",
      ["15", "17", "16", "18"],
      1,
      "26 − 9 = 17.",
    ],
    [
      "NUM-018",
      "numerical",
      "Medium",
      "What is the perimeter of a square with side 7 cm?",
      ["28", "21", "14", "49"],
      0,
      "Perimeter = 4 × side = 4 × 7 = 28 cm.",
    ],
    [
      "NUM-019",
      "numerical",
      "Medium",
      "What is the area of a rectangle 8 cm long and 5 cm wide?",
      ["13", "40", "45", "26"],
      1,
      "Area = length × width = 8 × 5 = 40 cm².",
    ],
    ["NUM-020", "numerical", "Hard", "What is 1/5 expressed as a percentage?", ["25", "5", "10", "20"], 3, "1 ÷ 5 = 0.2 = 20%."],
    [
      "NUM-021",
      "numerical",
      "Hard",
      "A ₹500 item increases in price by 20%. What is the new price?",
      ["620", "550", "600", "580"],
      2,
      "20% of ₹500 is ₹100; new price is ₹600.",
    ],
    [
      "NUM-022",
      "numerical",
      "Hard",
      "What is the next number: 2, 6, 18, 54, ___?",
      ["156", "108", "162", "216"],
      2,
      "Multiply by 3 each time.",
    ],
    [
      "NUM-023",
      "numerical",
      "Hard",
      "What is the median of 3, 9, 5, 7, 1?",
      ["9", "3", "7", "5"],
      3,
      "Sort the values: 1, 3, 5, 7, 9. The middle value is 5. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 18",
    ],
    [
      "NUM-026",
      "numerical",
      "Medium",
      "If 4 notebooks cost ₹100, what do 7 notebooks cost at the same rate?",
      ["200", "175", "160", "150"],
      1,
      "One notebook costs ₹100 ÷ 4 = ₹25; 7 cost ₹175.",
    ],
    [
      "NUM-027",
      "numerical",
      "Medium",
      "A tank is 3/5 full. If its capacity is 100 litres, how much water is in it?",
      ["40", "60", "80", "50"],
      1,
      "3/5 × 100 = 60 litres.",
    ],
    [
      "NUM-028",
      "numerical",
      "Medium",
      "A worker earns ₹900 for 6 days. What is the daily earning?",
      ["160", "150", "180", "120"],
      1,
      "₹900 ÷ 6 = ₹150 per day.",
    ],
    [
      "NUM-029",
      "numerical",
      "Medium",
      "What is the simple interest on ₹1,000 at 5% per year for 2 years?",
      ["200", "50", "150", "100"],
      3,
      "Simple interest = principal × rate × time ÷ 100 = 1000×5×2÷100 = ₹100.",
    ],
    [
      "NUM-030",
      "numerical",
      "Medium",
      "A train covers 180 km in 3 hours. How far does it travel in 5 hours at the same speed?",
      ["240", "280", "300", "360"],
      2,
      "Speed is 180 ÷ 3 = 60 km/h; in 5 hours it covers 300 km.",
    ],
    [
      "NUM-031",
      "numerical",
      "Medium",
      "The price of a book falls from ₹250 to ₹200. What is the percentage decrease?",
      ["25", "20", "10", "15"],
      1,
      "Decrease = ₹50; percentage decrease = 50 ÷ 250 × 100 = 20%.",
    ],
    ["NUM-032", "numerical", "Medium", "What is 2/3 + 1/6?", ["1/2", "3/9", "1", "5/6"], 3, "2/3 = 4/6; 4/6 + 1/6 = 5/6."],
    [
      "NUM-033",
      "numerical",
      "Medium",
      "What is 5/8 of 64?",
      ["48", "32", "36", "40"],
      3,
      "64 ÷ 8 × 5 = 40. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 19",
    ],
    [
      "NUM-034",
      "numerical",
      "Medium",
      "If x + 12 = 31, what is x?",
      ["17", "20", "18", "19"],
      3,
      "Subtract 12 from both sides: x = 31 − 12 = 19.",
    ],
    ["NUM-035", "numerical", "Medium", "If 3x = 42, what is x?", ["14", "15", "13", "12"], 0, "Divide both sides by 3: x = 14."],
    [
      "NUM-036",
      "numerical",
      "Hard",
      "What is the next number: 1, 4, 9, 16, 25, ___?",
      ["36", "35", "49", "30"],
      0,
      "These are square numbers; the next is 6² = 36.",
    ],
    [
      "NUM-037",
      "numerical",
      "Hard",
      "A bag contains 4 red and 6 blue balls. What fraction are red?",
      ["4/6", "2/5", "3/5", "1/2"],
      1,
      "4 out of 10 balls are red: 4/10 = 2/5.",
    ],
    [
      "NUM-038",
      "numerical",
      "Hard",
      "A shop sells 3 items for ₹240. What is the cost of 5 items at the same rate?",
      ["400", "450", "360", "420"],
      0,
      "One item costs ₹240 ÷ 3 = ₹80; 5 cost ₹400.",
    ],
    [
      "NUM-039",
      "numerical",
      "Hard",
      "A number is multiplied by 4 and then 6 is added to give 34. What is the number?",
      ["7", "6", "8", "10"],
      0,
      "Subtract 6: 28; then divide by 4: 7.",
    ],
    ["NUM-040", "numerical", "Hard", "What is the mean of 12, 15, 18, and 19?", ["15", "16.5", "17", "16"], 3, "Sum = 64; 64 ÷ 4 = 16."],
    [
      "NUM-041",
      "numerical",
      "Hard",
      "A rectangle has perimeter 30 cm and length 9 cm. What is its width?",
      ["7", "8", "5", "6"],
      3,
      "2(L+W)=30, so L+W=15; W=15−9=6 cm. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 20",
    ],
    [
      "NUM-042",
      "numerical",
      "Hard",
      "A number decreases from 80 to 60. What is the percentage decrease?",
      ["35", "25", "30", "20"],
      1,
      "Decrease is 20; 20 ÷ 80 × 100 = 25%.",
    ],
    [
      "NUM-043",
      "numerical",
      "Hard",
      "If 8 people complete a job in 6 days at equal rates, how many person-days of work is that?",
      ["14", "36", "42", "48"],
      3,
      "Total work = 8 × 6 = 48 person-days.",
    ],
    [
      "NUM-044",
      "numerical",
      "Hard",
      "A cyclist travels 45 km in 1.5 hours. What is the average speed?",
      ["40", "35", "30", "25"],
      2,
      "45 ÷ 1.5 = 30 km/h.",
    ],
    [
      "NUM-045",
      "numerical",
      "Hard",
      "What is 0.6 expressed as a fraction in simplest form?",
      ["6/10", "1/6", "3/5", "2/3"],
      2,
      "0.6 = 6/10 = 3/5 in simplest form.",
    ],
    [
      "NUM-046",
      "numerical",
      "Hard",
      "A product costs ₹1,200 before 18% tax. What is the total including tax?",
      ["1416", "1380", "1440", "1420"],
      0,
      "18% of ₹1,200 is ₹216; total = ₹1,416.",
    ],
    [
      "NUM-047",
      "numerical",
      "Hard",
      "What is the next number: 7, 14, 28, 56, ___?",
      ["120", "112", "104", "98"],
      1,
      "Each term is multiplied by 2.",
    ],
    [
      "NUM-048",
      "numerical",
      "Hard",
      "If 25% of a number is 18, what is the number?",
      ["68", "64", "72", "80"],
      2,
      "If one quarter is 18, the whole is 18 × 4 = 72.",
    ],
    [
      "NUM-049",
      "numerical",
      "Hard",
      "Two numbers are in the ratio 2:5 and their sum is 42. What is the smaller number?",
      ["10", "14", "12", "15"],
      2,
      "Total parts = 7; one part = 42 ÷ 7 = 6; smaller = 2 × 6 = 12. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 21",
    ],
    [
      "NUM-050",
      "numerical",
      "Hard",
      "What is the compound amount on ₹100 at 10% per year for 2 years, compounded annually?",
      ["125", "120", "110", "121"],
      3,
      "Year 1: ₹110; year 2: ₹110 × 1.10 = ₹121.",
    ],
    [
      "NUM-049B",
      "numerical",
      "Hard",
      "A store offers 2 items for ₹150. At the same unit price, what do 6 items cost?",
      ["450", "500", "300", "400"],
      0,
      "Six items are three groups of two, so the cost is 3 × ₹150 = ₹450.",
    ],
    [
      "NUM-050B",
      "numerical",
      "Hard",
      "A value is increased by 10% and then decreased by 10%. Starting from 100, what is the final value?",
      ["90", "99", "100", "101"],
      1,
      "10% increase: 100 becomes 110. A 10% decrease of 110 is 11, so the result is 99. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 22 Spatial Reasoning — 50 Questions",
    ],
    [
      "SPA-046",
      "spatial",
      "Hard",
      "A square is divided into four equal smaller squares. How many small squares are there?",
      ["2", "3", "4", "8"],
      2,
      "A 2-by-2 division creates four equal smaller squares.",
    ],
    [
      "SPA-047",
      "spatial",
      "Hard",
      "A 4×4 grid has only the bottom-right cell shaded. After a 180° rotation, where does the shaded cell move?",
      ["Top-left", "Top-right", "Bottom-left", "Bottom-right"],
      0,
      "A 180° rotation maps the bottom-right corner to the top-left corner.",
    ],
    [
      "SPA-049",
      "spatial",
      "Hard",
      "Which shape can tessellate a flat surface by repeating without gaps or overlaps?",
      ["Regular pentagon", "Square", "Circle", "Oval"],
      1,
      "Squares fit together edge-to-edge without gaps or overlaps.",
    ],
    [
      "SPA-050",
      "spatial",
      "Hard",
      "A cylinder lies on its side and is viewed directly from the front. Which outline is visible?",
      ["Circle", "Rectangle", "Triangle", "Hexagon"],
      1,
      "Seen from the side, the curved surface of a cylinder appears as a rectangle.",
    ],
    [
      "SPA-001",
      "spatial",
      "Easy",
      "An arrow points ↑. It rotates 90° clockwise. Which way does it point?",
      ["←", "→", "↓", "↑"],
      1,
      "A 90° clockwise turn from up points right.",
    ],
    [
      "SPA-002",
      "spatial",
      "Easy",
      "An arrow points →. It rotates 90° clockwise. Which way does it point?",
      ["↑", "↓", "←", "→"],
      1,
      "A 90° clockwise turn from right points down. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 23",
    ],
    [
      "SPA-003",
      "spatial",
      "Easy",
      "An arrow points ↓. It rotates 90° clockwise. Which way does it point?",
      ["←", "→", "↑", "↓"],
      0,
      "A 90° clockwise turn from down points left.",
    ],
    [
      "SPA-004",
      "spatial",
      "Easy",
      "An arrow points ←. It rotates 90° clockwise. Which way does it point?",
      ["↑", "↓", "→", "←"],
      0,
      "A 90° clockwise turn from left points up.",
    ],
    [
      "SPA-005",
      "spatial",
      "Easy",
      "An arrow points ↑. It rotates 180°. Which way does it point?",
      ["↓", "↑", "←", "→"],
      0,
      "A half-turn reverses the direction.",
    ],
    [
      "SPA-008",
      "spatial",
      "Easy",
      "A shape has its top-left corner shaded. After a left-right mirror reflection, where does it move?",
      ["Top-right", "Bottom-left", "Bottom-right", "It stays top-left"],
      0,
      "A left-right mirror swaps the left and right positions.",
    ],
    [
      "SPA-009",
      "spatial",
      "Easy",
      "A shape has its top-left corner shaded. After a top-bottom mirror reflection, where does it move?",
      ["Bottom-left", "Top-right", "Bottom-right", "It stays top-left"],
      0,
      "A top-bottom mirror swaps top and bottom.",
    ],
    [
      "SPA-010",
      "spatial",
      "Easy",
      "A square is rotated 90°. What happens to its outline?",
      ["It remains a square", "It becomes a triangle", "It becomes a circle", "It becomes a non-square rectangle"],
      0,
      "A square retains its outline after a 90-degree rotation. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 24",
    ],
    [
      "SPA-011",
      "spatial",
      "Easy",
      "Which shape has exactly three sides?",
      ["Pentagon", "Triangle", "Hexagon", "Square"],
      1,
      "A triangle has three sides.",
    ],
    [
      "SPA-012",
      "spatial",
      "Easy",
      "Which shape has six sides?",
      ["Pentagon", "Hexagon", "Octagon", "Quadrilateral"],
      1,
      "A hexagon has six sides.",
    ],
    ["SPA-013", "spatial", "Medium", "A cube has how many faces?", ["4", "6", "8", "12"], 1, "A cube has six square faces."],
    ["SPA-014", "spatial", "Medium", "A cube has how many vertices (corners)?", ["6", "8", "10", "12"], 1, "A cube has eight vertices."],
    ["SPA-015", "spatial", "Medium", "A cube has how many edges?", ["6", "8", "10", "12"], 3, "A cube has twelve edges."],
    [
      "SPA-016",
      "spatial",
      "Medium",
      "Which shape has no corners and a continuous curved boundary?",
      ["Square", "Triangle", "Circle", "Pentagon"],
      2,
      "A circle has no corners and one continuous curved boundary.",
    ],
    [
      "SPA-017",
      "spatial",
      "Medium",
      "A paper is folded once in half. How many layers are there?",
      ["1", "2", "3", "4"],
      1,
      "One fold creates two layers.",
    ],
    [
      "SPA-018",
      "spatial",
      "Medium",
      "A paper is folded in half twice, doubling the layers each time. How many layers are there?",
      ["2", "3", "4", "8"],
      2,
      "The first fold makes 2 layers; the second doubles them to 4. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 25",
    ],
    [
      "SPA-019",
      "spatial",
      "Medium",
      "A cube is painted on all outer faces and cut into 8 equal cubes (2×2×2). How many small cubes have paint on three faces?",
      ["0", "4", "6", "8"],
      3,
      "All eight small cubes are corner cubes and each has three painted faces.",
    ],
    [
      "SPA-020",
      "spatial",
      "Medium",
      "A cube is painted on all outer faces and cut into 27 equal cubes (3×3×3). How many small cubes have paint on three faces?",
      ["4", "6", "8", "12"],
      2,
      "The eight corner cubes each have three painted faces.",
    ],
    [
      "SPA-021",
      "spatial",
      "Medium",
      "What comes next: ↑, →, ↓, ←, ↑, ___?",
      ["→", "↓", "←", "↑"],
      0,
      "The arrow rotates 90 degrees clockwise each step.",
    ],
    [
      "SPA-023",
      "spatial",
      "Medium",
      "A triangle points up. After a 180° rotation, which way does it point?",
      ["Up", "Down", "Left", "Right"],
      1,
      "A half-turn reverses the triangle's pointing direction.",
    ],
    [
      "SPA-024",
      "spatial",
      "Medium",
      "A standard block capital H is rotated 180°. What is generally true?",
      ["It looks the same", "It becomes E", "It becomes I", "It becomes L"],
      0,
      "A standard block H has 180-degree rotational symmetry.",
    ],
    [
      "SPA-025",
      "spatial",
      "Medium",
      "Which shape has rotational symmetry at 90 degrees?",
      ["A square", "A scalene triangle", "A generic letter L", "A non-square parallelogram"],
      0,
      "A square matches itself after a 90-degree rotation.",
    ],
    [
      "SPA-026",
      "spatial",
      "Medium",
      "Which shape has exactly one line of symmetry?",
      ["A scalene triangle", "A non-equilateral isosceles triangle", "A circle", "A non-square rectangle"],
      1,
      "An isosceles triangle has one line of symmetry. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 26",
    ],
    [
      "SPA-027",
      "spatial",
      "Medium",
      "A rectangle is 8 cm long and 3 cm wide. After a 90° rotation, what are its width × length dimensions?",
      ["8 × 3", "3 × 8", "8 × 8", "3 × 3"],
      1,
      "Rotation changes orientation, swapping width and length positions.",
    ],
    [
      "SPA-028",
      "spatial",
      "Medium",
      "A map marker moves 2 squares east and 1 square north. Where is it relative to the start?",
      ["North-west", "North-east", "South-east", "South-west"],
      1,
      "Moving east and north places it northeast of the starting point.",
    ],
    [
      "SPA-029",
      "spatial",
      "Hard",
      "You face east and turn left. Which direction are you facing?",
      ["North", "South", "East", "West"],
      0,
      "A left turn from east points north.",
    ],
    [
      "SPA-030",
      "spatial",
      "Hard",
      "You face south and turn right. Which direction are you facing?",
      ["East", "West", "North", "South"],
      1,
      "A right turn from south points west.",
    ],
    [
      "SPA-031",
      "spatial",
      "Hard",
      "Which solid has one curved side surface and two circular flat faces?",
      ["Cone", "Cylinder", "Sphere", "Cube"],
      1,
      "A cylinder has two circular ends and one curved side surface.",
    ],
    [
      "SPA-032",
      "spatial",
      "Hard",
      "Which solid has one circular flat face and one curved surface?",
      ["Cone", "Cylinder", "Sphere", "Cube"],
      0,
      "A cone has one circular base and one curved surface.",
    ],
    [
      "SPA-033",
      "spatial",
      "Hard",
      "Which solid has no flat faces, edges, or vertices?",
      ["Cone", "Cylinder", "Sphere", "Pyramid"],
      2,
      "A sphere has only a curved surface.",
    ],
    [
      "SPA-034",
      "spatial",
      "Hard",
      "On a standard die, opposite faces sum to 7. If 1 is on top, what is on the bottom?",
      ["2", "5", "6", "7"],
      2,
      "The opposite face to 1 is 6 because 1 + 6 = 7. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 27",
    ],
    [
      "SPA-035",
      "spatial",
      "Hard",
      "On a standard die, which number is opposite 2?",
      ["3", "4", "5", "6"],
      2,
      "Opposite faces on a standard die sum to 7; 2 is opposite 5.",
    ],
    [
      "SPA-036",
      "spatial",
      "Hard",
      "A 3×3 grid has its centre cell shaded. After a 90° rotation, where is it?",
      ["Top-left", "Centre", "Bottom-right", "Top-middle"],
      1,
      "The centre cell remains in the centre after rotation.",
    ],
    [
      "SPA-037",
      "spatial",
      "Hard",
      "A 3×3 grid has only the top-middle cell shaded. After a 180° rotation, which cell is shaded?",
      ["Top-middle", "Middle-left", "Bottom-middle", "Centre"],
      2,
      "A half-turn maps top-middle to bottom-middle.",
    ],
    [
      "SPA-038",
      "spatial",
      "Hard",
      "A 3×3 grid has only the top-left cell shaded. After a 90° clockwise rotation, which cell is shaded?",
      ["Top-right", "Bottom-left", "Bottom-right", "Top-left"],
      0,
      "A clockwise quarter-turn maps the top-left corner to the top-right corner.",
    ],
    [
      "SPA-039",
      "spatial",
      "Hard",
      "A cube net has four squares in a row, one above the second, and one below the second. How many squares are in the net?",
      ["4", "5", "6", "7"],
      2,
      "Four in the row plus one above and one below gives six.",
    ],
    [
      "SPA-040",
      "spatial",
      "Hard",
      "A 2D shape has four equal sides and four right angles. What is it?",
      ["Rhombus only", "Square", "Trapezoid", "Circle"],
      1,
      "A square has four equal sides and four right angles.",
    ],
    [
      "SPA-041",
      "spatial",
      "Hard",
      "Which object most likely has a circular cross-section along its length?",
      ["A straight pipe", "A flat ruler", "A square tile", "A book"],
      0,
      "A cylindrical pipe has a circular cross-section.",
    ],
    [
      "SPA-044",
      "spatial",
      "Hard",
      "Which outline is usually seen when looking directly down at a vertical cylinder?",
      ["Circle", "Rectangle", "Triangle", "Hexagon"],
      0,
      "From above, the circular top face is visible.",
    ],
    [
      "SPA-045",
      "spatial",
      "Hard",
      "A cube is viewed directly from above. Which outline is visible?",
      ["Triangle", "Circle", "Square", "Pentagon"],
      2,
      "Each face of a cube is square, so the top view shows a square outline. ILM ORA • Sample Question Bank • Not a validated IQ instrument Page 29",
    ],
    [
      "SPA-006",
      "spatial",
      "Easy",
      "An arrow points ↓. It rotates 180°. Which way does it point?",
      ["←", "→", "↑", "↓"],
      2,
      "A half-turn reverses the direction, so down becomes up.",
    ],
    [
      "SPA-007",
      "spatial",
      "Easy",
      "An arrow points ←. It rotates 180°. Which way does it point?",
      ["↑", "↓", "→", "←"],
      2,
      "A half-turn reverses the direction, so left becomes right.",
    ],
    [
      "SPA-022",
      "spatial",
      "Medium",
      "What comes next: →, ↓, ←, ↑, →, ___?",
      ["↑", "↓", "←", "→"],
      1,
      "The arrow turns 90° clockwise each step: right, down, left, up, right, then down.",
    ],
    [
      "SPA-042",
      "spatial",
      "Medium",
      "A shape has its top-left corner shaded. After a 180° rotation, where does the shaded corner move?",
      ["Bottom-right", "Top-right", "Bottom-left", "Top-left"],
      0,
      "A half-turn swaps opposite corners, so top-left moves to bottom-right.",
    ],
    [
      "SPA-043",
      "spatial",
      "Hard",
      "A 3×3 grid has only the bottom-left cell shaded. After a 90° clockwise rotation, which cell is shaded?",
      ["Top-left", "Top-right", "Bottom-right", "Centre"],
      0,
      "A clockwise quarter-turn carries the bottom-left corner to the top-left corner.",
    ],
    [
      "SPA-048",
      "spatial",
      "Hard",
      "A 3×3 grid has only the bottom-left cell shaded. After a 180° rotation, which cell is shaded?",
      ["Top-right", "Top-left", "Bottom-right", "Centre"],
      0,
      "A half-turn maps the bottom-left corner to the opposite corner, top-right.",
    ],
  ].map((a) => ({ id: a[0], cat: a[1], d: a[2], text: X(a[3]), opts: a[4], ans: a[5], why: X(CL(a[6])) }));
  BANK.forEach((q, i) => {
    if (q.opts.some((o) => /cannot|unknown|both|always|only/i.test(o))) return;
    const t = i % 4,
      c = q.ans;
    if (t !== c) {
      const o = q.opts.slice();
      [o[t], o[c]] = [o[c], o[t]];
      q.opts = o;
      q.ans = t;
    }
  });
  const Q = []; /* Q = questions of the current attempt, filled by applyCfg() */
  let TOTAL_SEC = 15 * 60;
  const COURSES = [
    ["Logic Foundations", "Reasoning", "Beginner", 4],
    ["Pattern Spotting", "Reasoning", "Intermediate", 6],
    ["Vocabulary Builder", "Language", "Beginner", 5],
    ["Reading Comprehension", "Language", "Intermediate", 6],
    ["Critical Writing", "Language", "Advanced", 8],
    ["Number Sense", "Maths", "Beginner", 4],
    ["Algebra Essentials", "Maths", "Intermediate", 8],
    ["Data Interpretation", "Maths", "Advanced", 6],
    ["Spatial Visualisation", "Reasoning", "Beginner", 3],
    ["3D Mental Rotation", "Reasoning", "Advanced", 5],
    ["Study Skills", "Skills", "Beginner", 3],
    ["Exam Strategy", "Skills", "Intermediate", 4],
  ].map((c, i) => ({ id: i, t: c[0], cat: c[1], lvl: c[2], wk: c[3] }));
  const TAGS = ["Guides", "Videos", "Worksheets", "Pedagogy"];
  const ARTS = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    tag: TAGS[i % 4],
    t: [
      "How to prepare for a reasoning test",
      "Formative assessment in 5 steps",
      "Printable pattern worksheet",
      "Differentiated learning explained",
      "Understanding your score report",
      "Active learning activities for class",
      "Video: managing test time",
      "Inclusive teaching checklist",
      "Number sequence practice",
      "Giving feedback that helps",
      "Parents: supporting practice at home",
      "Verbal reasoning tips",
      "Spatial puzzles worksheet",
      "Retakes and growth mindset",
    ][i],
  }));
  const FAQS = [
    [
      "How does the test work?",
      "Choose categories, difficulty, number of questions and a timer, then answer multiple-choice questions drawn from an educational bank. You can navigate, mark questions for review and submit when ready.",
    ],
    [
      "How are scores calculated?",
      "Your assessment score is the number of correct answers out of the questions in your test, with a percentage per reasoning area. It is a practice performance summary, not a validated IQ score.",
    ],
    [
      "Is this a clinical IQ test?",
      "No. It is a practice assessment, not a clinical or professionally validated measure of intelligence, and not a diagnosis.",
    ],
    [
      "What about privacy?",
      "Progress is kept in your browser tab (sessionStorage) and completed attempt summaries in this browser (localStorage); you can clear them on the Results page. Nothing is sent to a server, except your Contact form message, which is emailed to us after you verify your email.",
    ],
    ["Can children take it?", "Younger learners should be supported by a parent or teacher, who should also help interpret results."],
    [
      "Can I retake the test?",
      "Yes. A retake starts fresh with no old answers. Summaries of past attempts stay in this browser until you clear them.",
    ],
    ["Do I get a certificate?", "Certificates are shown as placeholders in the demo; issuing rules depend on your organisation."],
  ];
  const store = {
    get() {
      try {
        return JSON.parse(sessionStorage.getItem("ilm_test"));
      } catch (e) {
        return null;
      }
    },
    set(v) {
      try {
        sessionStorage.setItem("ilm_test", JSON.stringify(v));
      } catch (e) {}
    },
    clear() {
      try {
        sessionStorage.removeItem("ilm_test");
      } catch (e) {}
    },
  };
  let S = store.get() || { ans: {}, flag: {}, i: 0, end: 0, done: false, started: false, user: null };
  if (S.started && !S.done && !S.end) S.end = Date.now() + (S.left || TOTAL_SEC) * 1000;
  const save = () => store.set(S);
  /* ===== UI HELPERS ===== */
    const $ = (s) => (s === "#dlg" && __ST.dlg) || __R.querySelector(s),
    esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);
  const toast = (m) => {
    const t = $("#toast");
    t.textContent = m;
    t.style.display = "block";
    clearTimeout(toast.h);
    toast.h = setTimeout(() => (t.style.display = "none"), 3200);
  };
  const mmss = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const bars = (rows) =>
    `<div class="bars">${rows.map((r) => `<div class="b"><span>${r[0]}</span><div class="prog" role="img" aria-label="${r[0]} ${r[1]}%"><i style="width:${r[1]}%"></i></div><b>${r[1]}%</b></div>`).join("")}</div>`;
  const head = (t, sub, crumb) =>
    `<div class="crumb"><a href="#/home">Home</a> › ${crumb || t}</div><h1>${t}</h1>${sub ? `<p class="mut">${sub}</p>` : ""}`;
  /* ===== VISUAL HELPERS ===== */
  CONFIG.photos = {}; /* e.g. {"Aisha":"https://your-cdn/aisha.jpg"} – paste real, licensed photos here */
  const SK = ["#f1c9a5", "#c68642", "#8d5524", "#e0ac69", "#ffdbb4", "#a1665e"],
    HR = ["#2b1b12", "#0f0f0f", "#6b3f1d", "#b5651d", "#3a2a20", "#1c1c1c"],
    SH = ["#F97316", "#16A34A", "#0f1b33", "#6366f1", "#e11d48", "#0ea5e9"];
  const av = (n, i, s = 56) =>
    CONFIG.photos[n]
      ? `<img class="av" width="${s}" height="${s}" style="object-fit:cover" src="${esc(CONFIG.photos[n])}" alt="${esc(n)}">`
      : `<svg class="av" width="${s}" height="${s}" viewBox="0 0 64 64" role="img" aria-label="Avatar of ${esc(n)}"><rect width="64" height="64" fill="${SH[(i + 2) % 6]}" opacity=".22"/><path d="M8 64c2-16 12-20 24-20s22 4 24 20z" fill="${SH[i % 6]}"/><rect x="28" y="36" width="8" height="10" fill="${SK[i % 6]}"/><circle cx="32" cy="28" r="12" fill="${SK[i % 6]}"/><path d="M20 27c0-12 8-15 13-15 8 0 11 6 11 15-3-6-7-8-12-8s-9 2-12 8z" fill="${HR[i % 6]}"/><circle cx="27.5" cy="29" r="1.3" fill="#222"/><circle cx="36.5" cy="29" r="1.3" fill="#222"/><path d="M28 34q4 3 8 0" stroke="#7a3b2e" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
  const person = (n, r, i, s) => `<div class="ppl">${av(n, i, s || 56)}<div><b>${n}</b><p class="mut">${r}</p></div></div>`;
  const radar = (v, l) => {
    const c = 110,
      R = 80,
      pt = (i, p) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / v.length;
        return [(c + (Math.cos(a) * R * p) / 100).toFixed(1), (c + (Math.sin(a) * R * p) / 100).toFixed(1)];
      },
      poly = (p) => v.map((_, i) => pt(i, p).join(",")).join(" ");
    return `<svg viewBox="0 0 220 220" style="width:100%;max-width:300px" role="img" aria-label="Radar chart of section scores: ${l.map((x, i) => x + " " + v[i] + "%").join(", ")}">${[25, 50, 75, 100].map((p) => `<polygon points="${poly(p)}" fill="none" stroke="currentColor" opacity=".2"/>`).join("")}<polygon points="${poly(0).length ? v.map((x, i) => pt(i, x).join(",")).join(" ") : ""}" fill="rgba(22,163,74,.3)" stroke="#16A34A" stroke-width="2.5"/>${v
      .map((x, i) => {
        const p = pt(i, x);
        return `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#F97316"/>`;
      })
      .join("")}${v
      .map((x, i) => {
        const p = pt(i, 122);
        return `<text x="${p[0]}" y="${p[1]}" font-size="10" font-weight="700" text-anchor="middle" fill="currentColor">${l[i]}</text>`;
      })
      .join("")}</svg>`;
  };
    const donutOld = (p, col) =>
    `<svg viewBox="0 0 100 100" width="130" role="img" aria-label="${p}%"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" opacity=".15" stroke-width="12"/><circle cx="50" cy="50" r="40" fill="none" stroke="${col || "#16A34A"}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(p * 2.513).toFixed(1)} 251.3" transform="rotate(-90 50 50)"/><text x="50" y="57" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor">${p}%</text></svg>`;
  const CATG = {
    Reasoning: ["#F97316", "#fb923c", "🧩"],
    Language: ["#16A34A", "#4ade80", "📚"],
    Maths: ["#6366f1", "#8b5cf6", "➗"],
    Skills: ["#0ea5e9", "#22d3ee", "🎯"],
  };
  const thumb = (c) =>
    `<div class="thumb" style="background:linear-gradient(135deg,${CATG[c][0]},${CATG[c][1]})" aria-hidden="true">${CATG[c][2]}</div>`;
  const RD = {
    home: "Pick an assessment|Choose a skill area|Take the test|Instant results & report|Follow your learning plan|Track progress in your hub",
    "iq-test": "Understand the 4 areas|Try sample questions|Read limits & disclaimer|Start the test",
    instructions: "Read the rules|Choose categories, difficulty and timer|Give consent|Begin (or resume) the test",
    test: "Answer each question|Flag doubtful ones|Review with the navigator|Confirm & submit",
    results: "See your assessment score|Compare 4 sections|Open detailed report|Plan your practice",
    report: "Spot strengths|Find practice areas|Review every answer|Print or save the report",
    pedagogy: "Assess formatively|Differentiate tasks|Learn actively|Give feedback & include everyone",
    programs: "Set a goal|Choose your level|Get matched courses|Enroll and practise weekly",
    courses: "Search the catalogue|Filter by level|Open course details|Enroll and start",
    student: "Take a test|Save resources|Complete courses|Earn certificates",
    trainer: "Review learner progress|Pick teaching guides|Plan assessments|Give feedback",
    manager: "Set team goals|Monitor completion|Read aggregate trends|Support teams (no individual data)",
    blog: "Search a topic|Filter by type|Read or download|Apply in practice",
    about: "Our mission|Our values|Our team|Get in touch",
    faq: "Search your question|Open the answer|Still unsure? Contact us|Start practising",
    contact: "Write your message|We validate it|Submit|Hear back (once connected to a backend)",
    login: "Create an account|Verify your email|Log in|Open your dashboard",
    dashboard: "Check your profile|Open tests & reports|Follow progress|Collect certificates",
  };
  const roadmap = (r) =>
    RD[r]
      ? `<section class="s noprint" aria-label="Roadmap"><h2>🗺️ Your roadmap</h2><div class="road" style="margin-top:22px">${RD[r]
          .split("|")
          .map((x, i) => `<div><h3>${x}</h3><p>Step ${i + 1} of ${RD[r].split("|").length}</p></div>`)
          .join("")}</div></section>`
      : "";
  const DISC = `<p class="note">Illustrative demo only. Results depend on test design and are not a clinical diagnosis or a professionally validated measure of intelligence.</p>`;
  const empty = (m, l, h) =>
    `<div class="card" style="text-align:center;padding:40px"><h2>Nothing here yet</h2><p class="mut">${m}</p><a class="btn" href="${h}">${l}</a></div>`;
     /* ===== NEW USER JOURNEY: what is this → how to use → who are you ===== */
  const JABOUT = [
    ["🧠", "Practice reasoning test", "Logical, verbal, numerical and spatial questions with a timer, score and detailed report."],
    ["📚", "Learning programs & courses", "Choose a goal and level and get a matched study plan."],
    ["🎓", "Teaching guides (Pedagogy)", "5 short modules with quizzes and a lesson-plan builder."],
    ["📖", "Storyline skill", "A 6-level, self-paced course on building clear, memorable stories."],
    ["📊", "Role hubs", "Student, Trainer and Manager pages for progress and resources."],
  ];
  const JSTEPS = [
    ["Choose your path", "Pick the card below that sounds like you."],
    ["Follow the steps", "Each path lists the pages to open, in order."],
    ["Do the activity", "Test, practice, lesson or storyline, all inside this site."],
    ["Check your progress", "Results, reports and saved progress stay in your browser."],
  ];
  /* [icon, title, who, steps, link, button, what you get] */
  const JPATHS = [
    ["🧠", "Check how I think", "Student / new learner",
      ["Read the IQ Test overview", "Try Practice mode (untimed)", "Take the timed test", "See your Results", "Open the detailed Report"],
      "#/iq-test", "Start the IQ test", "A score, 4-area breakdown and answer review."],
    ["📈", "Improve my skills", "Learner with a goal",
      ["Open Learning Programs", "Choose goal + level", "Join matched Courses", "Read Resources weekly", "Retake the test to compare"],
      "#/programs", "Get my plan", "A weekly plan with matched courses."],
    ["📖", "Learn storytelling", "Life-skills learner",
      ["Open Storyline", "Follow the 6 levels", "Build your own story", "Review with the checklist"],
      "#/storyline", "Open Storyline", "One finished, reviewed storyline."],
    ["✍", "I teach or train", "Teacher / Trainer",
      ["Go through 5 Pedagogy modules", "Build a lesson plan", "Open the Trainer hub", "Pick guides in Resources"],
      "#/pedagogy", "Open Pedagogy", "A ready lesson plan you can print or download."],
    ["📊", "I manage a team", "Manager",
      ["Open the Manager hub", "Check completion & progress", "Read team trends (no personal data)", "Share Resources with teams"],
      "#/manager", "Open Manager hub", "A privacy-aware view of team progress."],
    ["❓", "Not sure / need help", "Anyone",
      ["Read the FAQ", "Contact us if stuck", "Check the Student hub for progress"],
      "#/faq", "Read the FAQ", "Quick answers and support."],
  ];
  const JGROUPS = [
    ["🎒 I am a learner / student", [0, 1, 2]],
    ["🍎 I am a teacher or trainer", [3]],
    ["📊 I manage a team", [4]],
    ["❓ I am not sure", [5]],
  ];
  const jCard = (p) =>
    `<div class="card"><div style="font-size:1.6rem" aria-hidden="true">${p[0]}</div><h3>${p[1]}</h3><span class="badge o">${p[2]}</span><p class="mut"><b>You get:</b> ${p[6]}</p><ol style="margin:8px 0;padding-left:18px">${p[3].map((s) => `<li>${s}</li>`).join("")}</ol><a class="btn s" href="${p[4]}">${p[5]}</a></div>`;
  const journeyHtml = () =>
    `<section class="s"><h2>👋 New here? Start with this 1-minute guide</h2>
<div class="card"><h3>What is ILM ORA?</h3><p>ILM ORA is a learning and assessment platform. You can practise reasoning questions, get a score and report, follow a study plan, learn teaching methods and build life skills. Everything runs in your browser; no account is needed. The test is a practice tool, not a clinical IQ test.</p></div></section>
<section class="s"><h2>What can you do here?</h2><div class="cols2" style="margin-top:12px">${JABOUT.map((a) => `<div class="card"><div style="font-size:1.5rem" aria-hidden="true">${a[0]}</div><h3>${a[1]}</h3><p class="mut">${a[2]}</p></div>`).join("")}</div></section>
<section class="s"><h2>How to use this site: 4 simple steps</h2><div class="road" style="margin-top:22px">${JSTEPS.map((s) => `<div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div></section>
<section class="s"><h2>🧭 Choose your journey</h2><p class="mut">Pick the group that matches you. Each card shows what you will do and what you will get.</p>${JGROUPS.map((g) => `<h3 style="margin:18px 0 8px">${g[0]}</h3><div class="cols2">${g[1].map((i) => jCard(JPATHS[i])).join("")}</div>`).join("")}</section>`;
  
  const NAV = [
    ["home", "Home"],
    ["iq-test", "IQ Test"],
    ["pedagogy", "Pedagogy"],
    ["storyline", "Storyline"],
    ["programs", "Programs"],
    ["courses", "Courses"],
    ["student", "Student"],
    ["trainer", "Trainer"],
    ["manager", "Manager"],
    ["blog", "Resources"],
    ["about", "About"],
    ["faq", "FAQ"],
    ["contact", "Contact"],
    
  ];
  $("#mnav").innerHTML = NAV.map((n) => `<a href="#/${n[0]}" data-r="${n[0]}">${n[1]}</a>`).join("");
  $("#foot").innerHTML =
    `<div><b>ILM ORA</b><p class="mut">AI Learning &amp; Assessment Platform</p></div><div><b>Assess</b><a href="#/iq-test">IQ Test overview</a><a href="#/instructions">Instructions</a><a href="#/results">Results</a><a href="#/report">Detailed report</a><a href="#/practice">Practice mode</a></div><div><b>Learn</b><a href="#/pedagogy">Pedagogy</a><a href="#/storyline">Storyline</a><a href="#/programs">Learning programs</a><a href="#/courses">Courses</a><a href="#/blog">Resources</a></div><div><b>Company</b><a href="#/about">About</a><a href="#/faq">FAQ</a><a href="#/contact">Contact</a></div>`;
  $("#burger").onclick = (e) => {
    const n = $("#mnav");
    const o = n.classList.toggle("open");
    e.target.setAttribute("aria-expanded", o);
  };
  /* ===== PAGES ===== */
  const P = {};
  /* ===== STORYLINE PAGE (ported from Storyline.jsx) + PAGE ANIMATIONS ===== */
  const slE = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const slR = (n) => Array.from({ length: n }, (_, i) => i);
  const slShuf = (a) => {
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  const SLCONFIG = { time: "", cost: "" };
  const slShown = (v) => (v && v.trim() ? v : "To be confirmed");
  const FLOW = ["Idea", "Events", "People", "Challenge", "Ending", "Message"];
  const WHY = [
    ["Structure", "Organise information clearly."],
    ["Connection", "Help people relate to goals, feelings and choices."],
    ["Memorability", "Make ideas easier to understand and remember."],
    ["Change", "Show how a person, team or situation moves from problem to result."],
  ];
  const OBS = [
    [
      "Who?",
      "Who is the main person?",
      ["A student", "A teacher", "An examiner"],
      "The student is the main person; the story follows her journey.",
    ],
    [
      "Wants what?",
      "What goal drives them?",
      ["To pass the examination", "To make friends", "To buy a laptop"],
      "The goal drives every event that follows.",
    ],
    [
      "Why now?",
      "What starts the action?",
      ["Repeatedly running out of time", "A holiday", "A new teacher"],
      "The time pressure is the trigger that starts the action.",
    ],
    [
      "What blocks them?",
      "What is the obstacle?",
      ["Poor time management", "A broken pen", "Noisy neighbours"],
      "The obstacle is tied to the goal, which makes it meaningful.",
    ],
    [
      "What changes?",
      "What turning point moves things forward?",
      ["Builds a study plan and asks for feedback", "Stops studying", "Changes subject"],
      "Choosing to plan and ask for help changes the direction.",
    ],
    [
      "What is the result?",
      "How does it end and what is learned?",
      ["Score improves; steady habits help", "Nothing changes", "The exam is cancelled"],
      "The ending supports the message: small, steady habits can change results.",
    ],
  ];
  const LEVELS = [
    ["The basics", "Name your topic, audience and one main message. Put 3–5 events in order.", "#sl-steps", "Go to the 6 steps"],
    [
      "Structure",
      "Write a beginning that sets the scene, a middle that develops it and an ending that resolves it.",
      "#sl-compare",
      "See events vs a real story",
    ],
    ["Characters", "Define your main person: their goal, reason, strengths and obstacles.", "#sl-glossary", "See the key terms"],
    ["Plot", "Add a challenge, stakes, cause and effect, a turning point and a believable ending.", "#sl-case", "Follow the case study"],
    [
      "Advanced techniques",
      "Use hints, flashbacks, parallel stories, branching choices and other perspectives.",
      "#sl-advanced",
      "Explore techniques",
    ],
    [
      "Review",
      "Check clarity, pacing, emotion, consistency and whether the ending supports the message.",
      "#sl-checklist",
      "Open the checklist",
    ],
  ];
  const GLOSSARY = [
    ["Stakes", "What the character could win or lose.", "A scholarship could be lost."],
    ["Conflict", "The obstacle blocking the goal.", "Not enough time to study."],
    ["Turning point", "The moment events change direction.", "The student asks a teacher for help."],
    ["Character arc", "How beliefs, skills or behaviour change.", "From “I can’t manage time” to “I have a system”."],
    ["Foreshadowing", "An early hint of something that happens later.", "A missed practice test at the start."],
    ["Flashback", "An earlier event shown to explain the present.", "Showing last term’s failed exam."],
    ["Parallel storylines", "Two connected journeys told together.", "A student’s story and a teacher’s story."],
    ["Branching story", "Choices lead to different endings.", "“Do you ask for help or study alone?”"],
    ["Symbol / theme", "A repeated object or idea carrying meaning.", "A clock that appears in every scene."],
    ["Unreliable narrator", "A storyteller whose version cannot be fully trusted.", "A character who hides their mistakes."],
  ];
  const STEPS = [
    ["Define the purpose", "Write one sentence: “This story helps [audience] understand [message].”"],
    ["Outline the events", "Write the beginning, 2–4 important middle events and the ending."],
    ["Add motivation", "Say what the main person wants and why."],
    ["Add obstacles", "Make the challenge meaningful and linked to the goal."],
    ["Resolve it", "Show the result, lesson or next action."],
    ["Improve it", "Remove extra events, check the links between events and read it aloud."],
  ];
  const CASE = [
    ["Before", "The student struggles with time management.", "It sets up the goal and the problem.", "It leads to missed practice tests."],
    [
      "Challenge",
      "The student misses practice tests.",
      "It shows the stakes: the struggle has consequences.",
      "It pushes the student to act.",
    ],
    [
      "Turning point",
      "The student creates a weekly study plan and asks for feedback.",
      "The direction changes: from reacting to taking control.",
      "The new habits lead to a better result.",
    ],
    [
      "Outcome",
      "The student’s final score improves.",
      "The ending supports the message.",
      "The story closes: small, steady habits can change results.",
    ],
  ];
  const ADV = [
    ["Foreshadowing", "Early hints make a later outcome feel earned.", "Avoid hints that never pay off."],
    ["Flashback", "Use when the past helps explain the present.", "Avoid too many jumps in time."],
    ["Parallel storylines", "Two journeys explain or enrich each other.", "Avoid confusion about who is who."],
    ["Branching narrative", "The audience practises making choices.", "Keep endings connected to the choices."],
    ["Character arc", "The message is about change.", "Avoid change that happens too suddenly."],
    ["Theme and symbol", "Repeated objects or ideas carry deeper meaning.", "Avoid overusing the symbol."],
  ];
  const BRANCH = {
    a: "You ask a teacher for feedback. You learn which topics eat your time and adjust your weekly plan. Possible limit: it takes effort to ask and to act on advice.",
    b: "You build your own plan and keep going. You may enjoy full control and build discipline. Possible limit: blind spots stay hidden, so you may repeat the same mistakes.",
  };
  const FIELDS = [
    [
      "Purpose and audience",
      [
        ["topic", "Story topic", "t"],
        ["audience", "Intended audience", "t"],
        ["message", "Main message", "t"],
      ],
    ],
    [
      "Character and goal",
      [
        ["character", "Main character", "t"],
        ["goal", "Character’s goal", "t"],
        ["motive", "Motivation (why they want it)", "t"],
      ],
    ],
    [
      "Events and obstacles",
      [
        ["beginning", "Beginning", "a"],
        ["middle", "Middle events (one per line)", "a"],
        ["obstacle", "Main obstacle", "t"],
      ],
    ],
    [
      "Turning point and resolution",
      [
        ["turning", "Turning point", "t"],
        ["action", "Action or decision", "t"],
        ["ending", "Ending", "a"],
        ["lesson", "Lesson or message", "t"],
      ],
    ],
  ];
  const LABELS = {
    topic: "Topic",
    audience: "Audience",
    message: "Main message",
    character: "Character",
    goal: "Goal",
    motive: "Motivation",
    beginning: "Beginning",
    middle: "Middle events",
    obstacle: "Obstacle",
    turning: "Turning point",
    action: "Action or decision",
    ending: "Ending",
    lesson: "Lesson",
  };
  const QUIZ = [
    [
      "“A team builds an app, launches it and gets users.” Is this a strong storyline?",
      [
        "Yes, it has a clear sequence",
        "Not yet — it lists events but has no goal, challenge or reason to care",
        "Yes, because it has an ending",
      ],
      1,
      "It lists events but has no clear goal, challenge or reason to care.",
    ],
    [
      "What does conflict do in a story?",
      ["It decorates the story", "It blocks the goal and creates the need for a choice or change", "It ends the story"],
      1,
      "Conflict blocks the goal and forces a choice or change.",
    ],
    [
      "What is a turning point?",
      ["The first sentence", "The moment events change direction", "The final message"],
      1,
      "It is the moment events change direction.",
    ],
    [
      "You show a character failing a test at the start so the final success feels earned. Which technique is this?",
      ["Flashback", "Foreshadowing", "Branching"],
      1,
      "An early hint that pays off later is foreshadowing.",
    ],
    [
      "Can you explain a storyline in two or three sentences?",
      [
        "Yes, if goal, challenge, key events and result are clear — otherwise it may be too scattered",
        "No, a storyline needs a full page",
        "Only if there are no characters",
      ],
      0,
      "If you can state goal, challenge, key events and result, you have found the core storyline. If not, the story may be too scattered.",
    ],
  ];
  const CHECK = [
    "The audience and main message are clear.",
    "Events follow a logical order, and each one causes the next.",
    "The goal and challenge matter to the character and audience.",
    "The ending answers the central question or points to a meaningful next step.",
    "Pictures and visuals support the story and do not distract from it.",
  ];

  const slHead = (tag, title, sub) =>
    `<header class="sl-head"><h2>${title}</h2>${sub ? `<p class="sl-mu">${sub}</p>` : ""}</header>`;
  const slMq = (inner, tiles) =>
    `<div class="sl-mq ${tiles ? "tiles" : ""}" aria-hidden="true"><div class="sl-mq-track"><div class="sl-mq-half">${inner}</div><div class="sl-mq-half">${inner}</div></div></div>`;
  const slPath = (l) => `<ol class="sl-path">${l.map((t, i) => `<li><i>${i + 1}</i><b>${t}</b></li>`).join("")}</ol>`;
  const slRoad = (a) => {
    const p = [
      [60, 200],
      [170, 140],
      [270, 185],
      [380, 110],
      [480, 150],
      [560, 60],
    ];
    return `<svg viewBox="0 0 620 250" role="img" aria-label="Winding path through six levels" class="sl-svg"><path class="sl-dash" d="M60 200 C100 120 140 190 170 140 S250 200 270 185 S340 100 380 110 S450 160 480 150 S540 90 560 60" fill="none" stroke="#F97316" stroke-width="6" stroke-linecap="round" stroke-dasharray="14 14"/>${p.map((q, i) => `<g><circle cx="${q[0]}" cy="${q[1]}" r="${i === a ? 26 : 20}" fill="${i === a ? "var(--sl-pp)" : "var(--sl-sf)"}" stroke="var(--sl-pp)" stroke-width="4" style="transition:r .3s"/><text x="${q[0]}" y="${q[1] + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="${i === a ? "#fff" : "var(--sl-pp)"}">${i + 1}</text></g>`).join("")}</svg>`;
  };
  const slBranchMap = `<svg viewBox="0 0 620 230" role="img" aria-label="Branching story map" class="sl-svg"><g fill="none" stroke="#F97316" stroke-width="4" stroke-dasharray="10 10" class="sl-dash"><path d="M110 115 C180 115 190 50 270 50 L380 50"/><path d="M110 115 C180 115 190 180 270 180 L380 180"/></g><g font-weight="700" text-anchor="middle" font-size="17"><rect x="20" y="92" width="110" height="46" rx="12" fill="var(--sl-pp)"/><text x="75" y="121" fill="#fff">Choice</text><rect x="380" y="26" width="200" height="48" rx="12" fill="var(--sl-sf)" stroke="#16A34A" stroke-width="3"/><text x="480" y="56" fill="#16A34A">Feedback</text><rect x="380" y="156" width="200" height="48" rx="12" fill="var(--sl-sf)" stroke="#F97316" stroke-width="3"/><text x="480" y="186" fill="#EA580C">Independence</text><text x="250" y="38" fill="var(--sl-mu)" font-size="14">Ask for help</text><text x="250" y="206" fill="var(--sl-mu)" font-size="14">Study alone</text></g></svg>`;

  const SLK = "ilm_storyline_saved";
  const SLS = {},
    SLCC = CHECK.map(() => false);
  try {
    const sv = JSON.parse(localStorage.getItem(SLK) || "null");
    if (sv) {
      Object.assign(SLS, sv.s || {});
      (sv.c || []).forEach((v, i) => {
        if (i < SLCC.length) SLCC[i] = !!v;
      });
    }
  } catch (e) {}
  const slSave = () => {
    try {
      localStorage.setItem(SLK, JSON.stringify({ s: SLS, c: SLCC }));
    } catch (e) {}
  };
  const slSumKeys = () => Object.keys(LABELS).filter((k) => (SLS[k] || "").trim());

  P.storyline = () => {
        const __t = __R.getAttribute("data-theme");
    const dark = __t ? __t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const facts = [
      ["For", "Students, job-seekers, early-career learners"],
      ["Format", "Self-paced"],
      ["Time", slShown(SLCONFIG.time)],
      ["Cost", slShown(SLCONFIG.cost)],
      ["Outcome", "One finished storyline, reviewed with a checklist"],
    ];
    return `<div class="sl" id="sl-top" data-theme="${dark ? "dark" : "light"}">
<section class="sl-sec sl-hero-sec"><div class="sl-wrap sl-hero"><div>
<h1>Turn Your Ideas Into Stories That Matter.</h1>
<p class="sl-mu">Learn how to structure ideas, develop characters, build meaningful challenges and create stories that people understand and remember.</p>
<div class="sl-row"><a class="sl-btn" href="#sl-roadmap">Start Learning</a><a class="sl-btn o" href="#sl-concept">Explore the Journey</a></div>
<div class="sl-pills"><span>6 learning levels</span><span>Self-paced</span><span>Practical storyline project</span></div></div>
<figure class="sl-hv">${illStory()}<figcaption class="sl-flowchips" aria-label="Storyline progression">${FLOW.map((f, i) => `<span style="animation-delay:${i * 0.25}s">${f}</span>`).join("")}</figcaption></figure></div></section>
${slMq(
  slR(4)
    .map(() => `<span class="sl-mq-i">${FLOW.join(" → ")} →</span>`)
    .join(""),
)}
<section class="sl-sec alt compact"><div class="sl-wrap"><div class="sl-grid f5">${facts.map((f) => `<div class="sl-card hov"><span class="sl-mini">${f[0]}</span><p>${f[1]}</p></div>`).join("")}</div><p class="sl-note">Here, <em>storyline</em> means how a story is structured — not the Articulate Storyline software.</p></div></section>
<section class="sl-sec" id="sl-concept"><div class="sl-wrap">${slHead("What is a storyline?", "Every Great Story Has a Journey.", "A storyline is the sequence of connected events in a story. It shows what happens, who it happens to, what goes wrong, how things change and why the story matters.")}${slPath(FLOW)}<p class="sl-quote">“A story is not just a list of events. Each event should lead to the next, and the ending should support the message.”</p></div></section>
<section class="sl-sec alt"><div class="sl-wrap">${slHead("Why learn it", "Turn Disconnected Ideas Into Meaningful Stories.")}<div class="sl-grid g4">${WHY.map((w) => `<div class="sl-card hov"><h3>${w[0]}</h3><p>${w[1]}</p></div>`).join("")}</div></div></section>
<section class="sl-sec" id="sl-observe"><div class="sl-wrap">${slHead("Observe", "Learn to Spot the Story Behind Every Situation.", "Storylines appear in websites, videos, presentations, lessons, adverts and real life. Ask six questions.")}${slPath(["Who?", "Wants what?", "Why now?", "Blocks", "Changes", "Result"])}<div class="sl-card nh scn"><strong>Scenario</strong><p>A student wants to pass an examination but repeatedly runs out of time. The student builds a weekly study plan, asks a teacher for feedback and improves the final score.</p></div><div id="slw-observe"></div></div></section>
<section class="sl-sec alt" id="sl-roadmap"><div class="sl-wrap">${slHead("Your path", "Your Journey From Storytelling Basics to Advanced Techniques.")}<div id="slw-roadmap"></div></div></section>
<section class="sl-sec" id="sl-steps"><div class="sl-wrap">${slHead("Create", "Build Your Own Story, One Step at a Time.")}<div class="sl-grid g3">${STEPS.map((s, i) => `<div class="sl-card hov"><span class="sl-num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div><div class="sl-card hov tpl"><strong>Template</strong><p>[Character] wants [goal], but [obstacle]. They [action or choice], and [result]. The message: [lesson].</p></div><div class="sl-row"><a class="sl-btn" href="#sl-builder">Build My Storyline</a></div></div></section>
<section class="sl-sec alt" id="sl-compare"><div class="sl-wrap">${slHead("Compare", "See the Difference Between Events and a Real Story.")}<div class="sl-grid g2">
<div class="sl-card hov weak"><span class="sl-tag">Weak Storyline</span><h3>“A student studies, takes an exam and passes.”</h3><div class="sl-bd wk"><div>Studies</div><i>·</i><div>Takes exam</div><i>·</i><div>Passes</div></div><p>Lists events, but there is no meaningful goal, challenge or change.</p></div>
<div class="sl-card hov strong"><span class="sl-tag g">Strong Storyline</span><h3>“A student struggles with time management and misses practice tests. She builds a weekly study plan, asks a teacher for feedback and improves her final score.”</h3><div class="sl-bd"><div>Struggle</div><i>→</i><div>Decision</div><i>→</i><div>Outcome</div></div><p><strong>Message:</strong> small, steady habits can change results.</p></div></div></div></section>
<section class="sl-sec" id="sl-glossary"><div class="sl-wrap">${slHead("Terminology", "Understand the Language of Storytelling.")}</div>${slMq(
      slR(2)
        .map(() => GLOSSARY.map((g) => `<a href="#sl-glossary-grid" tabindex="-1"><span>${g[0]}</span><small>Open →</small></a>`).join(""))
        .join(""),
      true,
    )}<div class="sl-wrap" id="sl-glossary-grid"><div class="sl-grid g3">${GLOSSARY.map((g) => `<div class="sl-card hov"><h3>${g[0]}</h3><p>${g[1]}</p><p><em>Example:</em> ${g[2]}</p></div>`).join("")}</div></div></section>
<section class="sl-sec alt" id="sl-case"><div class="sl-wrap">${slHead("Case study", "Follow One Story From Challenge to Outcome.")}${slPath(CASE.map((c) => c[0]))}<div id="slw-case"></div></div></section>
<section class="sl-sec" id="sl-advanced"><div class="sl-wrap">${slHead("Advanced", "Go Beyond the Basics.")}<div class="sl-grid g3">${ADV.map((a) => `<div class="sl-card hov"><h3>${a[0]}</h3><p>${a[1]}</p><p><em>Careful:</em> ${a[2]}</p></div>`).join("")}</div><div class="sl-split top gap"><div id="slw-branch"></div>${slBranchMap}</div></div></section>
<section class="sl-sec alt" id="sl-lab"><div class="sl-wrap">${slHead("Practical lab · 30–45 minutes", "Now Create a Story From Your Own Experience.", "Pick a real challenge — a hard exam, a group project or a first interview — and work through these steps.")}<ol class="sl-lab">${["Write the purpose sentence.", "List the beginning, three middle events and the ending.", "Define the goal and motivation.", "Name the main obstacle.", "Write the result and lesson.", "Read it aloud and cut what does not move the story."].map((t, i) => `<li class="sl-card hov"><span class="sl-num">${i + 1}</span>${t}</li>`).join("")}</ol><div class="sl-row"><a class="sl-btn" href="#sl-builder">Start My Story</a></div></div></section>
<section class="sl-sec" id="sl-builder"><div class="sl-wrap">${slHead("Builder", "Bring Your Story to Life.", "Your builder answers and checklist are saved in this browser (localStorage) so they survive a refresh. Nothing is saved to a server — copy your story before closing.")}<div id="slw-builder"></div></div></section>
<section class="sl-sec alt" id="sl-quiz"><div class="sl-wrap">${slHead("Knowledge check", "Check What You Have Learned.")}<div id="slw-quiz"></div></div></section>
<section class="sl-sec" id="sl-checklist"><div class="sl-wrap">${slHead("Review", "Make Your Story Clear, Connected and Meaningful.")}<div class="sl-ck">${CHECK.map((c, i) => `<label class="sl-chk"><input type="checkbox" data-i="${i}" ${SLCC[i] ? "checked" : ""}><span>${c}</span></label>`).join("")}</div><p><strong id="sl-ccn">Checklist: ${SLCC.filter(Boolean).length} of ${CHECK.length} checked</strong> <span class="sl-note">(self-review only; separate from the Quiz Score)</span></p></div></section>
<section class="sl-cta" id="sl-outcome"><div class="sl-wrap sl-cta-in"><div><h2>Your story is <em>taking shape.</em></h2><p>A storyline is a connected journey in which each event moves the story towards an outcome.</p></div>
<div class="sl-row nm"><a class="sl-btn orange" href="#sl-checklist">Review My Story</a><a class="sl-btn o" href="#sl-builder">Edit My Story</a><button class="sl-btn o" type="button" id="sl-copy">Copy as text</button></div>
<div class="sl-card nh full" id="slw-out"></div><span class="sl-note" id="sl-msg" aria-live="polite"></span>
<div class="sl-next" id="sl-next"><div><h3>Keep building your life skills.</h3><p>Tell your story to a friend or mentor and ask them to name its goal, challenge and result. If they cannot, revise it. Related areas: Communication and Career Readiness.</p></div><a class="sl-btn orange" href="#sl-roadmap">Continue Learning</a></div></div></section></div>`;
  };

  __LST("input", (e) => {
    if (e.target.closest && e.target.closest(".sl")) setTimeout(slSave);
  });
  __LST("change", (e) => {
    if (e.target.closest && e.target.closest(".sl")) setTimeout(slSave);
  });
  __LST("click", (e) => {
    if (e.target.closest && e.target.closest(".sl")) setTimeout(slSave, 50);
  });
  function slInit() {
    const root = $(".sl");
    if (!root) return;
    root.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#sl-"]');
      if (!a) return;
      e.preventDefault();
      const t = __gid(a.getAttribute("href").slice(1));
      t && t.scrollIntoView({ behavior: "smooth" });
    });
    const outcome = () => {
      const k = slSumKeys();
      $("#slw-out").innerHTML = k.length
        ? `<h3>${slE(SLS.topic || "Your storyline")}</h3><dl class="sl-pv wide">${k
            .filter((x) => x !== "topic")
            .map((x) => `<div><dt>${LABELS[x]}</dt><dd>${slE(SLS[x])}</dd></div>`)
            .join("")}<div><dt>Review checklist</dt><dd>${SLCC.filter(Boolean).length} of ${CHECK.length} items checked</dd></div></dl>`
        : `<p class="sl-mu">Your finished storyline will appear here once you use the builder.</p>`;
    };
    outcome();
    $("#sl-copy").onclick = async () => {
      const k = slSumKeys(),
        m = $("#sl-msg");
      if (!k.length) return (m.textContent = "Nothing to copy yet.");
      try {
        await navigator.clipboard.writeText(k.map((x) => `${LABELS[x]}: ${SLS[x]}`).join("\n"));
        m.textContent = "Copied.";
      } catch (e) {
        m.textContent = "Copy is not available in this browser.";
      }
    };
    /* checklist */
    root.querySelectorAll(".sl-chk input").forEach(
      (c) =>
        (c.onchange = () => {
          SLCC[+c.dataset.i] = c.checked;
          $("#sl-ccn").textContent = `Checklist: ${SLCC.filter(Boolean).length} of ${CHECK.length} checked`;
          outcome();
        }),
    );
    /* observe */
    (() => {
      const w = $("#slw-observe"),
        st = { perm: OBS.map((q) => slShuf(slR(q[2].length))), ans: OBS.map(() => -1), done: false, err: "" };
      const r = () => {
        w.innerHTML = `<div class="sl-grid obs" role="group" aria-label="Six questions about the scenario">${OBS.map((q, i) => `<fieldset class="sl-q" ${st.done ? "disabled" : ""}><legend>${i + 1}. ${q[0]} — ${q[1]}</legend>${st.perm[i].map((oi) => `<label class="sl-opt"><input type="radio" name="obs${i}" value="${oi}" ${st.ans[i] === oi ? "checked" : ""}><span>${q[2][oi]}</span></label>`).join("")}${st.done ? `<p class="sl-ex ${st.ans[i] === 0 ? "ok" : "no"}"><strong>${st.ans[i] === 0 ? "✔ Matches the scenario. " : "✘ Not quite. "}</strong>${q[3]}</p>` : ""}</fieldset>`).join("")}</div><div class="sl-row">${!st.done ? `<button class="sl-btn" type="button" data-a="c">Check my answers</button>` : `<button class="sl-btn o" type="button" data-a="t">Try again</button>`}</div>${st.err ? `<p class="sl-er" role="alert">${st.err}</p>` : ""}${st.done ? `<div class="sl-card nh"><strong>Your summary (${st.ans.filter((a) => a === 0).length}/6 match the scenario)</strong><ul class="sl-l">${OBS.map((q, i) => `<li>${q[0]} ${q[2][st.ans[i]]}</li>`).join("")}</ul></div>` : ""}`;
      };
      w.onchange = (e) => {
        if (e.target.name && e.target.name.startsWith("obs")) st.ans[+e.target.name.slice(3)] = +e.target.value;
      };
      w.onclick = (e) => {
        const b = e.target.closest("[data-a]");
        if (!b) return;
        if (b.dataset.a === "c") {
          if (st.ans.includes(-1)) st.err = "Please answer all six questions.";
          else {
            st.err = "";
            st.done = true;
          }
        } else {
          st.ans = OBS.map(() => -1);
          st.done = false;
          st.err = "";
          st.perm = OBS.map((q) => slShuf(slR(q[2].length)));
        }
        r();
      };
      r();
    })();
    /* roadmap */
    (() => {
      const w = $("#slw-roadmap");
      let i = 0;
      const r = (f) => {
        const l = LEVELS[i];
        w.innerHTML = `<div class="sl-rm" role="tablist" aria-label="Six levels">${LEVELS.map((lv, k) => `<button role="tab" data-k="${k}" aria-selected="${i === k}" tabindex="${i === k ? 0 : -1}"><i>${k + 1}</i><span>${lv[0]}</span></button>`).join("")}</div><div class="sl-card nh sl-split" role="tabpanel" aria-live="polite"><div><span class="sl-mini">Level ${i + 1}</span><h3>${l[0]}</h3><p>${l[1]}</p><a class="sl-btn" href="${l[2]}">${l[3]}</a></div>${slRoad(i)}</div><p class="sl-note">Levels are guides only. Your builder and checklist progress is saved on this device; syncing needs a backend.</p>`;
        if (f) w.querySelector('[aria-selected="true"]').focus();
      };
      w.onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          i = +b.dataset.k;
          r(1);
        }
      };
      w.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          i = (i + 1) % 6;
          r(1);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          i = (i + 5) % 6;
          r(1);
        }
      };
      r();
    })();
    /* case */
    (() => {
      const w = $("#slw-case");
      let i = 0;
      const r = () => {
        w.innerHTML = `<div class="sl-tabs" role="tablist" aria-label="Case study scenes">${CASE.map((c, k) => `<button role="tab" data-k="${k}" aria-selected="${i === k}">${k + 1}. ${c[0]}</button>`).join("")}<button role="tab" data-k="4" aria-selected="${i === 4}">Full summary</button></div><div class="sl-card nh" aria-live="polite">${i === 4 ? `<p><strong>Summary:</strong> A student struggles with time management and misses practice tests. She builds a weekly study plan, asks a teacher for feedback and improves her final score. <em>Message: small, steady habits can change results.</em></p>` : `<h3>${CASE[i][0]}</h3><p>${CASE[i][1]}</p><p><strong>Why it matters:</strong> ${CASE[i][2]}</p><p><strong>What it leads to:</strong> ${CASE[i][3]}</p>`}</div>`;
      };
      w.onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          i = +b.dataset.k;
          r();
        }
      };
      r();
    })();
    /* branch */
    (() => {
      const w = $("#slw-branch");
      let b = null;
      const r = () => {
        w.innerHTML = `<h3>Try a branching story: do you ask for help or study alone?</h3><div class="sl-tabs"><button data-b="a" aria-pressed="${b === "a"}">Ask for help</button><button data-b="b" aria-pressed="${b === "b"}">Study alone</button></div><div class="sl-card nh" aria-live="polite">${b ? BRANCH[b] : "Choose an option to see what might happen."}</div><p class="sl-note">Illustrative learning scenarios, not guaranteed real-life outcomes.</p>`;
      };
      w.onclick = (e) => {
        const x = e.target.closest("[data-b]");
        if (x) {
          b = x.dataset.b;
          r();
        }
      };
      r();
    })();
    /* builder */
    (() => {
      const w = $("#slw-builder");
      let step = 0,
        errs = {};
      const pv = () => {
        const k = slSumKeys();
        return k.length
          ? `<dl class="sl-pv">${k.map((x) => `<div><dt>${LABELS[x]}</dt><dd>${slE(SLS[x])}</dd></div>`).join("")}</dl>`
          : `<p class="sl-mu">Your answers will appear here as you type.</p>`;
      };
      const r = () => {
        w.innerHTML = `<div class="sl-split top"><form class="sl-card nh" novalidate><div class="sl-bar" aria-hidden="true">${slR(5)
          .map((k) => `<span class="${k <= step ? "on" : ""}"></span>`)
          .join(
            "",
          )}</div>${step < 4 ? `<h3>Step ${step + 1} of 5: ${FIELDS[step][0]}</h3>${FIELDS[step][1].map(([k, l, t]) => `<div><label class="sl-f" for="sl_${k}">${l} *</label>${t === "a" ? `<textarea id="sl_${k}" data-k="${k}" rows="3">${slE(SLS[k] || "")}</textarea>` : `<input id="sl_${k}" data-k="${k}" type="text" value="${slE(SLS[k] || "")}">`}<div class="sl-er" role="alert">${errs[k] || ""}</div></div>`).join("")}` : `<h3>Step 5 of 5: Preview and review</h3><p>Check your story in the preview. Use Back to edit anything, then continue to the checklist.</p><p class="sl-mu"><strong>${slE(SLS.character || "[Character]")}</strong> wants <strong>${slE(SLS.goal || "[goal]")}</strong>, but <strong>${slE(SLS.obstacle || "[obstacle]")}</strong>. They <strong>${slE(SLS.action || "[action]")}</strong>, and <strong>${slE(SLS.ending || "[result]")}</strong>. The message: <strong>${slE(SLS.lesson || "[lesson]")}</strong>.</p>`}<div class="sl-row">${step > 0 ? `<button class="sl-btn o" type="button" data-a="b">Back</button>` : ""}<button class="sl-btn" type="button" data-a="n">${step === 4 ? "Go to checklist" : "Next"}</button><button class="sl-btn o" type="button" data-a="r">Reset</button></div></form><div class="sl-card nh"><strong>Live preview</strong><div id="sl-pvb">${pv()}</div></div></div>`;
      };
      w.oninput = (e) => {
        const k = e.target.dataset.k;
        if (!k) return;
        SLS[k] = e.target.value;
        $("#sl-pvb").innerHTML = pv();
        outcome();
      };
      w.onclick = (e) => {
        const b = e.target.closest("[data-a]");
        if (!b) return;
        const a = b.dataset.a;
        if (a === "b") {
          step--;
          errs = {};
          r();
        }
        if (a === "r") {
          if (confirm("Clear everything you entered?")) {
            Object.keys(SLS).forEach((k) => delete SLS[k]);
            step = 0;
            errs = {};
            outcome();
            r();
          }
        }
        if (a === "n") {
          if (step === 4) {
            $("#sl-checklist").scrollIntoView({ behavior: "smooth" });
            return;
          }
          errs = {};
          FIELDS[step][1].forEach(([k]) => {
            if (!(SLS[k] || "").trim()) errs[k] = "This field is required.";
          });
          if (!Object.keys(errs).length) step++;
          r();
        }
      };
      r();
    })();
    /* quiz */
    (() => {
      const w = $("#slw-quiz");
      let perm = QUIZ.map((q) => slShuf(slR(q[1].length))),
        qi = 0,
        picked = -1,
        sent = false,
        ans = [],
        err = "";
      const r = () => {
        if (qi >= QUIZ.length) {
          const n = ans.filter((a, i) => a === QUIZ[i][2]).length;
          w.innerHTML = `<div class="sl-card nh" aria-live="polite"><h3>Quiz Score: ${n} / ${QUIZ.length}</h3><ul class="sl-l">${QUIZ.map((x, i) => `<li>${ans[i] === x[2] ? "✔" : "✘"} ${x[0]}<br><span class="sl-note">${x[3]}</span></li>`).join("")}</ul><button class="sl-btn" type="button" data-a="t">Retry</button></div>`;
          return;
        }
        const q = QUIZ[qi];
        w.innerHTML = `<div class="sl-card nh" aria-live="polite"><fieldset class="sl-q plain" ${sent ? "disabled" : ""}><legend>Question ${qi + 1} of ${QUIZ.length}: ${q[0]}</legend>${perm[qi].map((oi) => `<label class="sl-opt"><input type="radio" name="slquiz" value="${oi}" ${picked === oi ? "checked" : ""}><span>${q[1][oi]}</span></label>`).join("")}</fieldset>${err ? `<p class="sl-er" role="alert">${err}</p>` : ""}${sent ? `<p class="sl-ex ${picked === q[2] ? "ok" : "no"}"><strong>${picked === q[2] ? "✔ Correct. " : "✘ Not quite. "}</strong>${q[3]}</p>` : ""}<div class="sl-row">${!sent ? `<button class="sl-btn" type="button" data-a="s">Submit answer</button>` : `<button class="sl-btn" type="button" data-a="n">${qi === QUIZ.length - 1 ? "See Quiz Score" : "Next question"}</button>`}</div></div>`;
      };
      w.onchange = (e) => {
        if (e.target.name === "slquiz") picked = +e.target.value;
      };
      w.onclick = (e) => {
        const b = e.target.closest("[data-a]");
        if (!b) return;
        const a = b.dataset.a;
        if (a === "s") {
          if (picked < 0) err = "Please choose an answer.";
          else {
            err = "";
            sent = true;
            ans[qi] = picked;
          }
        }
        if (a === "n") {
          qi++;
          picked = -1;
          sent = false;
        }
        if (a === "t") {
          qi = 0;
          picked = -1;
          sent = false;
          ans = [];
          perm = QUIZ.map((q) => slShuf(slR(q[1].length)));
        }
        r();
      };
      r();
    })();
  }

  /* ===== ANIMATED FEATURED VISUAL FOR EVERY PAGE ===== */
  const PBN = {
    "iq-test": [
      "🧠",
      "Four reasoning areas, one clear picture",
      "Logical · Verbal · Numerical · Spatial",
      ["🧩", "🔢", "📐", "💡"],
      "#F97316,#6366f1",
    ],
    instructions: ["📝", "Know the rules before you begin", "Timer · navigation · flagging", ["⏱️", "✅", "🚩", "📋"], "#16A34A,#0ea5e9"],
    results: ["📊", "Your results, at a glance", "Scores · strengths · next steps", ["🏆", "📈", "⭐", "🎯"], "#F97316,#16A34A"],
    report: ["📑", "A detailed report you can keep", "Radar · breakdown · guidance", ["🔍", "📈", "🧭", "🗂️"], "#6366f1,#F97316"],
    pedagogy: [
      "🎓",
      "Learning that is built on how people learn",
      "Clarity · practice · feedback",
      ["📚", "🧑‍🏫", "💬", "🌱"],
      "#16A34A,#F97316",
    ],
    programs: ["🗺️", "Personalised learning programs", "Pick a goal and follow the plan", ["🎯", "🧗", "📅", "🚀"], "#F97316,#8b5cf6"],
    courses: ["📚", "Courses to build real skills", "Filter by area and level", ["🧩", "➗", "🗣️", "💻"], "#6366f1,#16A34A"],
    student: ["🧑‍🎓", "Student hub", "Practice, track and grow", ["✏️", "📖", "⭐", "🎒"], "#F97316,#0ea5e9"],
    trainer: ["🧑‍🏫", "Trainer hub", "Guide learners with clear insight", ["📋", "💬", "📈", "🍎"], "#16A34A,#6366f1"],
    manager: ["📈", "Manager hub", "See team progress, simply", ["👥", "📊", "🎯", "🧭"], "#6366f1,#F97316"],
    blog: ["📰", "Guides, videos & worksheets", "Fresh resources for learners and trainers", ["🎬", "📄", "💡", "🔖"], "#F97316,#16A34A"],
    about: ["🌍", "About ILM ORA", "Learning and assessment, made human", ["🤝", "💚", "🧡", "✨"], "#16A34A,#F97316"],
    faq: ["❓", "Questions? We have answers", "Quick help on tests and reports", ["💬", "🔎", "✔️", "📎"], "#0ea5e9,#16A34A"],
    contact: ["✉️", "Get in touch", "We would love to hear from you", ["📞", "📍", "💬", "🕊️"], "#F97316,#0ea5e9"],
    login: ["🔐", "Welcome back", "Log in or create your account", ["🔑", "👋", "🛡️", "✨"], "#6366f1,#16A34A"],
    dashboard: ["🧭", "Your dashboard", "Progress, plans and activity in one place", ["📈", "🏅", "📅", "🔥"], "#16A34A,#6366f1"],
  };
  /* ===== CRISP VECTOR ILLUSTRATIONS (replace blurry 187x75 JPEGs) ===== */
  let ILN = 0;
  const _pr = (x, y, c, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 24 Q-22 -12 0 -12 Q22 -12 22 24Z" fill="${c}"/><circle cx="0" cy="-30" r="14" fill="#f1c9a5"/><path d="M-14 -32 A14 14 0 0 1 14 -32 Q0 -40 -14 -32Z" fill="#2b1b12"/></g>`;
  const _lap = (x, y, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-70" width="120" height="76" rx="7" fill="#1E2433"/><rect x="-53" y="-63" width="106" height="62" rx="3" fill="#EEF0F7"/><rect x="-44" y="-54" width="50" height="6" rx="3" fill="#F97316"/><rect x="-44" y="-42" width="86" height="5" rx="2.5" fill="#B8C0D4"/><rect x="-44" y="-32" width="70" height="5" rx="2.5" fill="#B8C0D4"/><rect x="-44" y="-20" width="30" height="12" rx="3" fill="#16A34A"/><rect x="-72" y="6" width="144" height="8" rx="4" fill="#5B6475"/></g>`;
  const _bub = (x, y, w, h, c, t) =>
    `<g class="svf"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2.4}" fill="${c}"/>${t ? `<text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-size="${h * 0.5}" font-weight="800" fill="#fff">${t}</text>` : ""}</g>`;
  function ill(k, alt) {
    if (IM[IMGK[k]]) return `<img class="pic pimg" src="${IM[IMGK[k]]}" alt="${esc(alt || "")}" width="240" height="140">`;
    const n = ++ILN,
      C = {
        hero: ["#F97316", "#16A34A"],
        learn: ["#6366f1", "#16A34A"],
        iq: ["#F97316", "#6366f1"],
        teach: ["#16A34A", "#6366f1"],
        blog: ["#F97316", "#16A34A"],
        team: ["#16A34A", "#F97316"],
        faq: ["#0ea5e9", "#16A34A"],
        contact: ["#F97316", "#0ea5e9"],
      }[k] || ["#F97316", "#16A34A"];
    let b = "";
    if (k === "hero")
      b =
        _lap(250, 120, 1.1) +
        _pr(130, 160, "#F97316", 1.3) +
        `<g class="svf"><circle cx="390" cy="60" r="22" fill="#FDE68A"/><path d="M380 84h20v8h-20z" fill="#B8C0D4"/><path d="M390 20v-10M420 32l8-6M360 32l-8-6" stroke="#F97316" stroke-width="4" stroke-linecap="round"/></g><g transform="translate(380 150)"><rect width="70" height="14" rx="3" fill="#6366f1"/><rect x="6" y="-14" width="62" height="14" rx="3" fill="#16A34A"/><rect x="2" y="-28" width="58" height="14" rx="3" fill="#F97316"/></g>` +
        _bub(60, 28, 60, 28, "#16A34A", "✓");
    if (k === "learn")
      b =
        `<rect x="170" y="30" width="160" height="90" rx="10" fill="#1E2433"/><rect x="178" y="38" width="144" height="74" rx="5" fill="#EEF0F7"/>${_pr(215, 95, "#6366f1", 0.7)}${_pr(250, 95, "#F97316", 0.7)}${_pr(285, 95, "#16A34A", 0.7)}` +
        _pr(105, 165, "#6366f1", 1.2) +
        _pr(395, 165, "#16A34A", 1.2) +
        _bub(70, 40, 56, 26, "#F97316", "Hi!") +
        _bub(375, 70, 56, 26, "#6366f1", "Yes");
    if (k === "iq")
      b = `<g class="svf"><circle cx="228" cy="100" r="44" fill="#F97316"/><circle cx="278" cy="100" r="44" fill="#6366f1" fill-opacity=".9"/><path d="M253 62v76M232 85q10 8 0 16M274 85q-10 8 0 16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g><g class="svf" style="animation-delay:-1.4s"><rect x="360" y="86" width="44" height="44" rx="6" fill="#16A34A"/><circle cx="382" cy="86" r="9" fill="#16A34A"/><circle cx="404" cy="108" r="9" fill="#16A34A"/></g><g class="svf" style="animation-delay:-2.4s"><rect x="96" y="96" width="40" height="40" rx="6" fill="#0ea5e9"/><circle cx="116" cy="96" r="8" fill="#0ea5e9"/></g><text x="253" y="46" text-anchor="middle" font-size="34" font-weight="800" fill="#F97316">?</text>`;
    if (k === "teach")
      b =
        `<rect x="150" y="26" width="210" height="110" rx="8" fill="#14532d"/><rect x="150" y="26" width="210" height="110" rx="8" fill="none" stroke="#B8895A" stroke-width="6"/><path d="M172 56h120M172 78h160M172 100h90" stroke="#fff" stroke-opacity=".85" stroke-width="5" stroke-linecap="round"/><circle cx="330" cy="104" r="10" fill="#FDE68A"/>` +
        _pr(108, 160, "#6366f1", 1.3) +
        _pr(410, 166, "#F97316", 1.1);
    if (k === "blog")
      b =
        `<g transform="rotate(-8 170 100)"><rect x="120" y="40" width="100" height="120" rx="8" fill="#fff" stroke="#E0E4EE" stroke-width="2"/><path d="M134 62h60M134 80h72M134 98h50" stroke="#B8C0D4" stroke-width="5" stroke-linecap="round"/></g><g transform="rotate(6 270 100)"><rect x="230" y="36" width="110" height="124" rx="8" fill="#fff" stroke="#E0E4EE" stroke-width="2"/><rect x="242" y="50" width="86" height="50" rx="5" fill="#F97316"/><path d="M270 62v26l24-13z" fill="#fff"/><path d="M242 118h80M242 134h56" stroke="#B8C0D4" stroke-width="5" stroke-linecap="round"/></g>` +
        _bub(370, 50, 64, 28, "#16A34A", "New");
    if (k === "team")
      b =
        _pr(130, 150, "#F97316", 1.3) +
        _pr(210, 150, "#16A34A", 1.3) +
        _pr(290, 150, "#6366f1", 1.3) +
        _pr(370, 150, "#0ea5e9", 1.3) +
        `<path class="svf" d="M250 40c-14-18-40 4-20 22l20 18 20-18c20-18-6-40-20-22z" fill="#F97316" transform="translate(0 -6)"/>`;
    if (k === "faq")
      b =
        `<g class="svf"><rect x="150" y="26" width="200" height="110" rx="26" fill="#0ea5e9"/><path d="M200 136l-16 36 46-30z" fill="#0ea5e9"/><text x="250" y="112" text-anchor="middle" font-size="84" font-weight="800" fill="#fff">?</text></g>` +
        _bub(70, 60, 56, 30, "#16A34A", "") +
        _bub(390, 90, 52, 28, "#F97316", "");
    if (k === "contact")
      b =
        `<g class="svf"><rect x="150" y="50" width="170" height="108" rx="12" fill="#fff" stroke="#E0E4EE" stroke-width="3"/><path d="M154 56l81 58 81-58" fill="none" stroke="#F97316" stroke-width="6" stroke-linejoin="round"/></g>` +
        _bub(330, 36, 96, 40, "#0ea5e9", "Hello") +
        _pr(90, 165, "#16A34A", 1.2);
    return `<svg class="pic" viewBox="0 0 500 200" role="img" aria-label="${alt || ""}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="il${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C[0]}" stop-opacity=".2"/><stop offset="1" stop-color="${C[1]}" stop-opacity=".24"/></linearGradient></defs><rect width="500" height="200" rx="16" fill="url(#il${n})"/><circle class="svf" cx="450" cy="40" r="26" fill="${C[0]}" fill-opacity=".18"/><circle class="svf" cx="40" cy="165" r="34" fill="${C[1]}" fill-opacity=".16" style="animation-delay:-2s"/>${b}</svg>`;
  }
  function illStory() {
    return `<svg class="sl-float" viewBox="0 0 380 240" role="img" aria-label="A storyline path from idea to ending" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="376" height="236" rx="14" fill="var(--sl-sf)" stroke="var(--sl-bd)" stroke-width="2"/><path class="sl-dash" d="M44 180 C100 90 150 200 200 130 S300 110 336 56" fill="none" stroke="#F97316" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 12"/>${[
      [44, 180, "Idea"],
      [122, 146, "Events"],
      [200, 130, "Challenge"],
      [276, 108, "Turn"],
      [336, 56, "End"],
    ]
      .map(
        (p, i) =>
          `<g><circle cx="${p[0]}" cy="${p[1]}" r="17" fill="${i === 4 ? "var(--sl-pp)" : "var(--sl-sf)"}" stroke="var(--sl-pp)" stroke-width="3.5"/><text x="${p[0]}" y="${p[1] + 6}" text-anchor="middle" font-size="17" font-weight="700" fill="${i === 4 ? "#fff" : "var(--sl-pp)"}">${i + 1}</text><text x="${p[0]}" y="${p[1] + 36}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--sl-mu)">${p[2]}</text></g>`,
      )
      .join(
        "",
      )}<g transform="translate(70 70) scale(.9)">${_pr(0, 0, "#5B3FD9", 1)}</g><path d="M336 18v26" stroke="#16A34A" stroke-width="3"/><path d="M336 18l22 8-22 8z" fill="#16A34A"/></svg>`;
  }

  /* ===== ONE-PAGE LANDING ===== */
  const LAND = [
    "home",
    "iq-test",
    "pedagogy",
    "storyline",
    "programs",
    "courses",
    "student",
    "trainer",
    "manager",
    "blog",
    "about",
    "faq",
    "contact",
  ];
  let landed = false;
  function renderLanding() {
    const app = $("#app");
    app.classList.add("full");
    app.innerHTML = LAND.map((k) => {
      let h = P[k]();
      if (k === "storyline") return `<div class="lsec sl-wrapper" id="sec-storyline">${h}</div>`;
      if (k !== "home") h = h.replace(/<h1>/g, '<h2 class="lh">').replace(/<\/h1>/g, "</h2>");
      return `<div class="lsec" id="sec-${k}"><div class="wrap lin">${h}</div></div>`;
    }).join("");
    plan();
    courseList();
    blogList();
    faqList("");
    slInit();
    app.querySelectorAll(".lsec").forEach((sec) => enh(sec, sec.id.slice(4)));
    if (!__ST._spy && "IntersectionObserver" in window) {
      __ST._spy = new IntersectionObserver(
        (es) =>
          es.forEach((x) => {
            if (x.isIntersecting) {
              const k = x.target.id.slice(4);
              __R.querySelectorAll("#mnav a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.r == k));
            }
          }),
        { rootMargin: "-45% 0px -50% 0px" },
      );
    }
    if (__ST._spy) {
      __ST._spy.disconnect();
      app.querySelectorAll(".lsec").forEach((s) => __ST._spy.observe(s));
    }
  }
  function route() {
    clearInterval(tick);
    let r = (location.hash.replace(/^#\/?/, "") || __OPT.defaultRoute || "home").split("?")[0];
    if (!P[r]) r = "home";
    const app = $("#app");
    document.title = (TITLES[r] || r[0].toUpperCase() + r.slice(1)) + " – ILM ORA";
    __R.querySelectorAll("#mnav a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.r == r));
    $("#mnav").classList.remove("open");
    if (LAND.includes(r)) {
      if (!landed || !app.querySelector(".lsec")) {
        renderLanding();
        landed = true;
      }
      const t = __gid("sec-" + r);
      if (r === "home" || !t) window.scrollTo(0, 0);
      else t.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    landed = false;
    app.classList.remove("full");
    app.innerHTML = P[r]();
    app.insertAdjacentHTML("beforeend", roadmap(r));
    enhance(r);
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  /* ===== ANIMATED FEATURED VISUAL + REVEAL ===== */
  function enhance(r) {
    enh($("#app"), r);
  }
  function enh(root, r) {
       if (false && PBN[r] && r !== "test") {
      const b = PBN[r],
        [c1, c2] = b[4].split(",");
      const tgt = root.classList.contains("lsec") ? root.querySelector(".lin") : root;
      tgt.insertAdjacentHTML(
        "afterbegin",
        `<div class="pbn" style="--c1:${c1};--c2:${c2}" role="img" aria-label="${b[1]}"><svg class="pbn-svg" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true"><path class="sl-dash" d="M0 90 C80 20 140 110 220 60 S360 10 420 70 S540 100 600 30" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4" stroke-dasharray="12 12" stroke-linecap="round"/></svg><span class="pbn-ic" aria-hidden="true">${b[0]}</span><div class="pbn-t"><b>${b[1]}</b><small>${b[2]}</small></div>${b[3].map((e, i) => `<i class="pbn-o" aria-hidden="true" style="left:${52 + i * 12}%;animation-delay:${i * 0.9}s">${e}</i>`).join("")}</div>`,
      );
    }
    if (r === "home") {
      const h = root.querySelector(".hero");
      if (h)
        h.insertAdjacentHTML(
          "afterend",
          `<a class="tease" href="#/storyline"><span class="tease-ic">📖</span><span><b>Storyline — turn ideas into stories that matter</b><small>6 levels · self-paced · build your own storyline</small></span><i>Jump to it →</i></a>`,
        );
    }
    {
      const rk = RIMG[r];
      if (rk && IM[rk[0]] && !root.querySelector(".rimg")) {
        const h = root.querySelector("h1,h2");
        h && h.insertAdjacentHTML("afterend", `<img class="pimg rimg" src="${IM[rk[0]]}" alt="${rk[1]}" width="200" height="120">`);
      }
    }
    if (r === "test") return;
    const sel =
      r === "storyline"
        ? ".sl-head,.sl-card,.sl-q,.sl-path li,.sl-ck"
        : "section.s,.card,.road>div,details,.hero,.bars .b,.thumb,.ppl,.grid>a,.pbn,.lh,.tease";
    const els = [...root.querySelectorAll(sel)];
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (es) =>
              es.forEach((x) => {
                if (x.isIntersecting) {
                  x.target.classList.add("in");
                  io.unobserve(x.target);
                }
              }),
            { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
          )
        : null;
    els.forEach((el, i) => {
      el.classList.add("rv");
      el.style.setProperty("--d", (i % 4) * 0.08 + "s");
      io ? io.observe(el) : el.classList.add("in");
    });
    root.querySelectorAll(".stat b,.big").forEach((el) => {
      const m = el.textContent.match(/^(\d+)(.*)$/);
      if (!m) return;
      const n = +m[1],
        suf = m[2];
      let t0 = null;
      const f = (t) => {
        t0 = t0 || t;
        const p = Math.min((t - t0) / 1100, 1);
        el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(f);
      };
      if (!matchMedia("(prefers-reduced-motion:reduce)").matches) requestAnimationFrame(f);
    });
  }

  P.home =
    () => `<section class="hero g2"><div><span class="badge o">Demo platform</span><h1>Understand how you think. Learn how to grow.</h1><p>ILM ORA combines practice reasoning assessments with personalised learning plans, resources and role-based hubs for students, trainers and managers.</p><div class="row"><a class="btn" href="#/iq-test">Start the IQ practice test</a><a class="btn o" href="#/pedagogy">Explore pedagogy</a></div></div>${img("hero", "Student studying with a laptop")}</section>${journeyHtml()}
<section class="s"><div class="grid">${[
      [BANK.length, "practice questions"],
      ["4", "reasoning areas"],
      ["5–90 min", "custom timer"],
      ["3", "role hubs"],
    ]
      .map((x) => `<div class="card stat"><b>${x[0]}</b><span class="mut">${x[1]}</span></div>`)
      .join(
        "",
      )}</div></section><section class="s"><h2>Learners &amp; trainers <small class="mut" style="font-size:.8rem">(sample personas, illustrative)</small></h2><div class="grid">${[
      ["Aisha", "Student – “The report showed me exactly what to practise.”"],
      ["Rahul", "Trainer – “Pedagogy guides saved me hours.”"],
      ["Maria", "Manager – “Clear team trends, no personal data.”"],
    ]
      .map((p, i) => `<div class="card">${person(p[0], p[1].split(" – ")[0], i * 2, 64)}<p>${p[1].split(" – ")[1]}</p></div>`)
      .join("")}</div></section><section class="s"><h2>Choose an assessment</h2><div class="grid">${Object.values(CATS)
      .map(
        (c, i) =>
          `<a class="card" style="text-decoration:none;color:inherit" href="#/iq-test"><img class="pimg" style="max-width:100%;height:90px;margin:0 0 8px" src="${IM["iq-" + Object.keys(CATS)[i]]}" alt=""><span class="badge">${BANK.filter((q) => q.cat == Object.keys(CATS)[i]).length} in bank</span><h3>${c} reasoning</h3><p class="mut">Choose it in the test setup or practise it on its own.</p></a>`,
      )
      .join("")}</div></section>
<section class="s"><h2>How it works</h2><div class="grid">${["Take the test", "Review results", "Get your report", "Follow a learning plan"].map((t, i) => `<div class="card"><span class="big" style="font-size:2rem">${i + 1}</span><h3>${t}</h3></div>`).join("")}</div></section>
<section class="s g2"><div><h2>Why ILM ORA</h2><ul><li>Clear, accessible, mobile-friendly assessments</li><li>Feedback tied to teaching methods, not just a number</li><li>Privacy-aware analytics for managers</li></ul></div>${img("learn", "Learners collaborating online")}</section>
<section class="s"><h2>Questions? Start here</h2>${FAQS.slice(0, 3)
      .map((f) => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`)
      .join("")}<a href="#/faq">See all FAQs →</a></section>`;
  /* ===== IQ ASSESSMENT MODULE: overview > instructions > test > results > report > practice ===== */

  /* ===== EXTRAS: category objectives, IQ dashboard, spatial figures, practice summary ===== */
  const OBJ = {
    logical: "Objective: spot patterns, follow rules and draw valid conclusions.",
    verbal: "Objective: understand word meaning, relationships and short passages.",
    numerical: "Objective: work with numbers, percentages, ratios and sequences.",
    spatial: "Objective: picture rotation, reflection and 3D shapes in your head.",
  };
  const dcount = (k) => ["Easy", "Medium", "Hard"].map((d) => d + " " + BANK.filter((q) => q.cat == k && q.d == d).length).join(" · ");
  function dash() {
    const h = HIST.get(),
      l = h[h.length - 1];
    if (!l)
      return `<div class="card" style="margin-top:16px"><h3>📊 Your IQ practice dashboard</h3><p class="mut">No attempts yet. Try Practice mode first (untimed, with explanations), then take a timed test. Results appear here and are stored in this browser only.</p><p class="row"><a class="btn s" href="#/practice">Start practice</a><a class="btn s o" href="#/instructions">Set up a timed test</a></p></div>`;
    const ks = Object.keys(CATS).filter((k) => l.sec && l.sec[k] != null),
      w = [...ks].sort((a, b) => l.sec[a] - l.sec[b]),
      weak = w[0],
      str = w[w.length - 1];
    return `<div class="card" style="margin-top:16px"><h3>📊 Your IQ practice dashboard <span class="badge o">This browser only</span></h3><p>Last timed attempt (${fdt(l.at)}): <b>${l.c}/${l.n}</b> correct · ${h.length} saved attempt${h.length > 1 ? "s" : ""}.</p>${ks.length ? bars(ks.map((k) => [CATS[k], l.sec[k]])) : ""}${ks.length ? `<p><b>Stronger:</b> ${CATS[str]} (${l.sec[str]}%) · <b>Improve:</b> ${CATS[weak]} (${l.sec[weak]}%)</p><p class="row"><a class="btn s" href="#/practice?cat=${weak}">Practise ${CATS[weak].toLowerCase()} next</a><a class="btn s o" href="#/results">Open results</a></p>` : ""}<p class="mut">Percentages come from few questions per area, so treat them as rough indicators.</p></div>`;
  }
  function qFig(q) {
    const t = q.text,
      sv = (w, b, l) =>
        `<svg viewBox="0 0 ${w} ${w}" width="${w > 100 ? 130 : 110}" role="img" aria-label="${l}" style="display:block;margin:8px 0;max-width:100%;height:auto">${b}</svg>`;
    let m;
    if ((m = t.match(/(\d)×\1 grid.*?(top-left|top-middle|centre|bottom-right|bottom-left) cell/))) {
      const n = +m[1],
        c = 100 / n,
        mid = Math.floor(n / 2),
        p = { "top-left": [0, 0], "top-middle": [0, mid], centre: [mid, mid], "bottom-right": [n - 1, n - 1], "bottom-left": [n - 1, 0] }[
          m[2]
        ];
      let b = "";
      for (let r = 0; r < n; r++)
        for (let k = 0; k < n; k++)
          b += `<rect x="${k * c + 2}" y="${r * c + 2}" width="${c}" height="${c}" fill="${r == p[0] && k == p[1] ? "#F97316" : "#fff"}" stroke="#334155" stroke-width="1.5"/>`;
      return sv(104, b, `${n} by ${n} grid with the ${m[2]} cell shaded`);
    }
    if ((m = t.match(/arrow points (↑|→|↓|←)/))) {
      const a = { "↑": 0, "→": 90, "↓": 180, "←": 270 }[m[1]];
      return sv(
        100,
        `<g transform="rotate(${a} 50 50)"><path d="M50 12 L72 40 H58 V88 H42 V40 H28Z" fill="#6366f1"/></g>`,
        "Arrow pointing " + { "↑": "up", "→": "right", "↓": "down", "←": "left" }[m[1]],
      );
    }
    if (/top-left corner shaded/.test(t))
      return sv(
        104,
        `<rect x="2" y="2" width="100" height="100" fill="#fff" stroke="#334155" stroke-width="2"/><rect x="2" y="2" width="50" height="50" fill="#F97316"/>`,
        "Square with its top-left corner shaded",
      );
    if (/\bcube\b/.test(t) && !/net/.test(t))
      return sv(
        100,
        `<path d="M50 10 90 30 50 50 10 30Z" fill="#a5b4fc" stroke="#334155" stroke-width="2"/><path d="M10 30 50 50 V92 L10 72Z" fill="#6366f1" stroke="#334155" stroke-width="2"/><path d="M90 30 50 50 V92 L90 72Z" fill="#818cf8" stroke="#334155" stroke-width="2"/>`,
        "Diagram of a cube",
      );
    if (/divided into four equal/.test(t))
      return sv(
        104,
        `<rect x="2" y="2" width="100" height="100" fill="#fff" stroke="#334155" stroke-width="2"/><path d="M52 2V102M2 52H102" stroke="#334155" stroke-width="2"/>`,
        "Square divided into four equal squares",
      );
    return "";
  }
  const pSum = () => {
    const L = pList(),
      at = L.filter((x) => PR.ans[x.id] != null),
      ok = L.filter((x) => PR.ans[x.id] === x.ans).length,
      by = {};
    L.forEach((x) => {
      const b = (by[x.cat] = by[x.cat] || { n: 0, c: 0, a: 0 });
      b.n++;
      if (PR.ans[x.id] != null) b.a++;
      if (PR.ans[x.id] === x.ans) b.c++;
    });
    const ks = Object.keys(by).filter((k) => by[k].a),
      wk = ks.sort((a, b) => by[a].c / by[a].a - by[b].c / by[b].a)[0];
    return `<div class="card"><h2>Practice summary</h2><p class="note">Practice only: not scored as an assessment and not saved.</p><p><b>${ok}</b> correct · <b>${at.length - ok}</b> incorrect · <b>${L.length - at.length}</b> not attempted · ${L.length} questions in this set</p>${ks.length ? `<div style="overflow-x:auto"><table class="cmp"><tr><th>Area</th><th>Attempted</th><th>Correct</th></tr>${ks.map((k) => `<tr><td>${CATS[k]}</td><td>${by[k].a}/${by[k].n}</td><td>${by[k].c}</td></tr>`).join("")}</table></div>` : ""}<p class="row"><button class="btn" data-psum="again">Practice again</button>${wk && by[wk].c < by[wk].a ? `<button class="btn o" data-psum="weak:${wk}">Practise weakest: ${CATS[wk]}</button>` : ""}<button class="btn o" data-psum="back">Back to questions</button></p></div>`;
  };
  __LST("click", (e) => {
    const b = e.target.closest("[data-psum]");
    if (!b) return;
    const v = b.dataset.psum;
    if (v == "1") PR.sum = true;
    else if (v == "back") PR.sum = false;
    else {
      PR.ans = {};
      PR.i = 0;
      PR.sum = false;
      PR.shuf = null;
      if (v.startsWith("weak:")) {
        PR.cat = v.slice(5);
        const s = $("#pcat");
        if (s) s.value = PR.cat;
      }
    }
    pRe();
  });
  const HK = "ilm_iq_history";
  const HIST = {
    get() {
      try {
        return JSON.parse(localStorage.getItem(HK)) || [];
      } catch (e) {
        return [];
      }
    },
    add(r) {
      try {
        localStorage.setItem(HK, JSON.stringify(this.get().concat([r]).slice(-10)));
      } catch (e) {}
    },
    clear() {
      try {
        localStorage.removeItem(HK);
      } catch (e) {}
    },
  };
  const tleft = () => (S.end ? Math.max(0, Math.ceil((S.end - Date.now()) / 1000)) : TOTAL_SEC);
  const fresh = () => ({ ans: {}, flag: {}, i: 0, done: false, started: false, user: S.user, end: 0 });
  const pcOf = (r, k) => (r.sec[k].n ? Math.round((r.sec[k].c / r.sec[k].n) * 100) : 0);
  const aks = (r) => Object.keys(CATS).filter((k) => r.sec[k].n);
  const fdt = (t) => (t ? new Date(t).toLocaleString() : "—");
  function score() {
    const sec = {};
    Object.keys(CATS).forEach((k) => (sec[k] = { c: 0, w: 0, u: 0, n: 0 }));
    Q.forEach((q) => {
      const s = sec[q.cat],
        a = S.ans[q.id];
      s.n++;
      if (a == null) s.u++;
      else if (a === q.ans) s.c++;
      else s.w++;
    });
    let c = 0,
      w = 0,
      u = 0;
    Object.values(sec).forEach((s) => {
      c += s.c;
      w += s.w;
      u += s.u;
    });
    if (c + w + u !== Q.length) console.warn("Score integrity check failed");
    return { c, w, u, n: Q.length, pct: c / Q.length, sec };
  }
  /* journey */
  const JS_ = [
    ["iq-test", "Overview"],
    ["instructions", "Instructions"],
    ["test", "Test"],
    ["results", "Results"],
    ["report", "Report"],
    ["practice", "Practice"],
  ];
  const JI = {
    "iq-test": [
      "Starting point: explains what this reasoning assessment is, what it covers and what the result means.",
      "Read the overview, check the sample question, then start the timed test or try Practice first.",
    ],
    instructions: [
      "The rules page: how answering, the timer, review marks and submitting work, before the clock starts.",
      "Read the rules, tick the consent box and confirm. The timer starts only after you confirm.",
    ],
    test: [
      "The live timed test: one question at a time with a timer, progress bar and question navigator.",
      "Choose answers, move freely between questions, mark doubtful ones, then submit.",
    ],
    results: [
      "Your performance summary for the attempt you submitted: score, time and the four reasoning areas.",
      "Check strengths and areas to improve, then open the detailed report or practise.",
    ],
    report: [
      "The full record of this attempt: every question, your answer, the correct answer and the reason.",
      "Review mistakes, print or save as PDF, then follow the practice suggestions.",
    ],
    practice: [
      "Practice mode: untimed, explanation after each answer, unlimited retries. Not scored and not saved.",
      "Pick an area or difficulty, answer, read the explanation and retry.",
    ],
  };
  const jr = (k, min) => {
    const i = JS_.findIndex((x) => x[0] == k);
    return `<nav class="jr noprint" aria-label="IQ assessment journey"><ol>${JS_.map((s, n) => `<li class="${n < i ? "dn" : n == i ? "cu" : ""}"><a href="#/${s[0]}" ${n == i ? 'aria-current="step"' : ""}><b>${n + 1}</b><span>${s[1]}</span></a></li>`).join("")}</ol>${min ? "" : `<div class="jb"><b>📍 You are here – Step ${i + 1} of ${JS_.length}: ${JS_[i][1]}</b><p>${JI[k][0]}</p><p class="mut"><b>What to do:</b> ${JI[k][1]}</p></div>`}</nav>`;
  };
  ["instructions", "test", "results", "report"].forEach((k) => delete RD[k]);
  /* ===== IQ TEST PAGE: moving live preview + marquee + flow ===== */
  const IQM = [
    ["Logical", "2, 4, 8, 16, ___ ?", ["24", "32", "30", "28"], 1],
    ["Verbal", "Closest meaning of 'brief'?", ["Short", "Distant", "Loud", "Complex"], 0],
    ["Numerical", "What is 15% of 200?", ["25", "30", "20", "35"], 1],
    ["Spatial", "An arrow points ↑ and turns 90° clockwise. Where now?", ["←", "→", "↓", "↑"], 1],
  ];
  function iqLive() {
    const tiles = [
      ["🧩", "Logical", "Sequences and deduction"],
      ["📚", "Verbal", "Meaning and analogies"],
      ["🔢", "Numerical", "Percentages and ratios"],
      ["📐", "Spatial", "Rotation and shapes"],
    ]
      .map((t) => `<div class="iqm-t"><span aria-hidden="true">${t[0]}</span><b>${t[1]}</b><small class="mut">${t[2]}</small></div>`)
      .join("");
    const half = tiles + tiles;
    const flow = [
      ["Pick areas and timer", "Choose categories, difficulty and how many questions."],
      ["Answer one by one", "Move freely, mark doubtful questions for review."],
      ["Get your score", "See your result and the four areas at a glance."],
      ["Review and practise", "Read every explanation, then practise weak areas."],
    ]
      .map((s, i) => `<li><span class="iqm-n">${i + 1}</span><h3>${s[0]}</h3><p class="mut">${s[1]}</p></li>`)
      .join("");
    return `<section class="iqm" aria-label="Live test preview"><div class="iqm-bg" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="iqm-in"><div><span class="badge o">Live preview</span><h2 style="margin-top:8px">See how the test feels</h2><p class="mut">Watch a sample run: one question at a time, a running timer and live progress. This preview plays by itself and is not scored.</p><div class="iqm-dots" aria-hidden="true"><b></b><b></b><b></b><b></b></div><div class="row"><a class="btn" href="#/instructions">Start timed test</a><a class="btn o" href="#/practice">Try practice mode</a></div></div><div class="iqm-demo" role="img" aria-label="Animated preview of a sample test question"><div class="iqm-top"><span class="iqm-chip">Logical</span><span class="iqm-time">12:00</span></div><div class="iqm-prog"><i></i></div><p class="iqm-q"></p><div class="iqm-opts"></div></div></div></section>
<div class="iqm-mq" aria-hidden="true"><div class="iqm-track">${half}${half}</div></div>
<section class="iqm-flow" aria-label="How a test run works"><h2>How a run works</h2><div class="iqm-line"><i></i></div><ol>${flow}</ol></section>`;
  }
  function iqLiveInit(root) {
    if (!root) return;
    const fl = root.querySelector(".iqm-flow");
    if (fl && !fl.dataset.on) {
      fl.dataset.on = "1";
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (es) =>
            es.forEach((x) => {
              if (x.isIntersecting) {
                fl.classList.add("on");
                io.disconnect();
              }
            }),
          { threshold: 0.25 },
        );
        io.observe(fl);
      } else fl.classList.add("on");
    }
    const el = root.querySelector(".iqm-demo");
    if (!el || el.dataset.on) return;
    el.dataset.on = "1";
    const chip = el.querySelector(".iqm-chip"),
      time = el.querySelector(".iqm-time"),
      bar = el.querySelector(".iqm-prog i"),
      qq = el.querySelector(".iqm-q"),
      op = el.querySelector(".iqm-opts"),
      dots = root.querySelectorAll(".iqm-dots b");
    const alive = () => el.isConnected;
    const draw = (d) => {
      chip.textContent = d[0];
      qq.textContent = d[1];
      op.innerHTML = d[2].map((o) => `<div class="iqm-o">${o}</div>`).join("");
    };
    const mark = (d, c) => {
      const n = op.children[d[3]];
      n && n.classList.add(c);
    };
    const fill = (n) => dots.forEach((b, k) => b.classList.toggle("on", k < n));
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      draw(IQM[0]);
      mark(IQM[0], "ok");
      bar.style.width = "25%";
      fill(1);
      return;
    }
    let i = 0,
      secs = 720;
    const run = () => {
      if (!alive()) return;
      const d = IQM[i % 4];
      draw(d);
      bar.style.width = ((i % 4) + 1) * 25 + "%";
      if (i % 4 === 0) fill(0);
      setTimeout(() => alive() && mark(d, "sel"), 1500);
      setTimeout(() => {
        if (alive()) {
          mark(d, "ok");
          fill((i % 4) + 1);
        }
      }, 2500);
      setTimeout(() => {
        i++;
        run();
      }, 4300);
    };
    run();
    const h = setInterval(() => {
      if (!alive()) return clearInterval(h);
      secs = secs > 0 ? secs - 1 : 720;
      time.firstChild.nodeValue = mmss(secs);
    }, 1000);
    __OFF.push(() => clearInterval(h));
  }
 
  /* overview */
  P["iq-test"] = () => {
    const h = HIST.get(),
      l = h[h.length - 1],
      cn = (k) => BANK.filter((q) => q.cat == k).length,
      ic = { logical: "🧩", verbal: "📚", numerical: "🔢", spatial: "📐" },
      ex = {
        logical: "Deduction, ordering, day logic",
        verbal: "Word meaning, analogies, odd one out",
        numerical: "Sequences, percentages, speed and distance",
        spatial: "Rotation, mirror images, 3D shapes",
      },
      s = BANK.find((x) => x.id == "LOG-044");
    return `${head("IQ Test Overview", "A short timed reasoning assessment, plus an untimed practice mode.", "IQ Test")}${jr("iq-test")}
<section class="hero g2"><div><span class="badge o">Practice assessment · not a clinical IQ test</span><h2>See how you reason and what to practise next</h2><p>Choose your categories, difficulty, number of questions (5–50) and timer, then answer multiple-choice questions drawn at random from a bank of ${BANK.length}. You get a score summary, a breakdown per area and a question-by-question report.</p><div class="row"><a class="btn" href="#/instructions">Start timed test</a><a class="btn o" href="#/practice">Try practice mode</a></div></div>${img("iq", "Illustration of a brain and puzzle pieces")}</section>
${iqLive()}
<div class="grid">${[
      [BANK.length, "questions in bank"],
      ["5–90 min", "custom timer"],
      ["4", "reasoning areas"],
      ["No", "penalty for wrong answers"],
    ]
      .map((x) => `<div class="card stat"><b>${x[0]}</b><span class="mut">${x[1]}</span></div>`)
      .join("")}</div>
${dash()}<h2 style="margin-top:24px">Four reasoning areas</h2><div class="grid">${Object.keys(CATS)
      .map(
        (k) =>
          `<div class="card"><img class="pimg" style="max-width:100%;height:100px;margin:0 0 8px" src="${IM["iq-" + k]}" alt="${CATS[k]} reasoning illustration"><span aria-hidden="true" style="font-size:1.4rem">${ic[k]}</span><h3>${CATS[k]} reasoning</h3><p class="mut">${ex[k]}</p><p class="mut">${OBJ[k]}</p><span class="badge">${cn(k)} questions</span> <small class="mut">${dcount(k)}</small></div>`,
      )
      .join("")}</div>
<h2 style="margin-top:24px">Sample question <small class="mut" style="font-size:.8rem">(not scored)</small></h2><div class="card"><span class="badge">${CATS[s.cat]}</span> <span class="badge o">${s.d}</span><p><b>${s.text}</b></p><ul>${s.opts.map((o) => `<li>${esc(o)}</li>`).join("")}</ul><details><summary>Show answer and reason</summary><p>Answer: <b>${esc(s.opts[s.ans])}</b>. ${s.why}</p></details><p class="mut">In the real test you pick one option per question, then move on, mark it for review or come back later.</p></div>
<div class="cols2" style="margin-top:20px"><div class="card"><h3>✅ What the result can tell you</h3><ul><li>How many questions you got right, overall and per area</li><li>Which of the four areas to practise first</li><li>How your time was used</li><li>Progress between your own attempts on this device</li></ul></div><div class="card"><h3>⚠️ What it cannot tell you</h3><ul><li>It is not an official or validated IQ score</li><li>It is not a diagnosis or a measure of potential</li><li>Educational sample bank, not standardised or normed</li><li>Difficulty labels are author-assigned, not calibrated</li></ul></div></div>
<h2 style="margin-top:24px">Timed test or practice?</h2><div class="card" style="overflow-x:auto"><table class="cmp"><tr><th></th><th>Timed test</th><th>Practice mode</th></tr><tr><td>Timer</td><td>You choose (suggested ≈75 sec per question)</td><td>None</td></tr><tr><td>Explanations</td><td>After you submit (report)</td><td>After each answer</td></tr><tr><td>Retry</td><td>New attempt only</td><td>Unlimited, per question</td></tr><tr><td>Scored and saved</td><td>Yes, summary saved in this browser</td><td>No</td></tr></table></div>
${l ? `<p class="note" style="margin-top:16px">Last saved attempt on this device: <b>${l.c}/${l.n}</b> on ${fdt(l.at)}. <a href="#/results">Open results</a></p>` : ""}<br>${DISC}`;
  };
  /* instructions */
  P.instructions = () => {
    const run = S.started && !S.done;
    return `${head("Test Instructions", "Please read before you begin.", "Instructions")}${jr("instructions")}
<div class="grid"><div class="card"><h3>📝 How to answer</h3><ul><li>Multiple-choice questions, one correct option each</li><li>Click an option or press 1–4</li><li>Your answer is saved instantly; <b>Clear answer</b> removes it</li></ul></div>
<div class="card"><h3>⏱ Timer and navigation</h3><ul><li>One shared timer for the whole test; you choose its length in setup</li><li>Move with Previous/Next, the navigator or Alt+←/→</li><li>The timer never resets when you change question, and keeps running if you refresh</li><li>A warning appears under 2 minutes; at zero the test submits automatically</li></ul></div>
<div class="card"><h3>❓ Unanswered questions</h3><ul><li>You may submit with blanks; they count as unanswered, not wrong</li><li>No negative marking</li></ul></div>
<div class="card"><h3>⚑ Mark for Review</h3><p>A personal bookmark for doubtful questions. It shows in the navigator and does not affect scoring.</p></div>
<div class="card"><h3>📤 Submitting</h3><p>You confirm first, answers are then locked, and you go to Results. A summary (score, time, area percentages) is saved in this browser only.</p></div>
<div class="card"><h3>♿ Accessibility and privacy</h3><p>Fully keyboard operable with visible focus. Progress is kept in this tab (sessionStorage); summaries in this browser (localStorage). Nothing is sent to a server or synced across devices.</p></div></div>
${
  run
    ? `<div class="card" style="margin-top:16px"><p class="note">You have an unfinished attempt (question ${S.i + 1}, ${mmss(tleft())} left).</p><div class="row"><a class="btn" href="#/test">Resume test</a><button class="btn o" data-act="restart">Start over</button></div></div>`
    : `<form class="card" id="consent" style="margin-top:16px"><h2>Set up your test</h2><div class="cols2"><fieldset style="border:0;padding:0"><legend><b>Categories</b></legend>${Object.keys(
        CATS,
      )
        .map(
          (k) =>
            `<label class="opt"><input type="checkbox" name="sc" value="${k}" ${CFG.cats.includes(k) ? "checked" : ""}> ${CATS[k]} <span class="mut">(${BANK.filter((q) => q.cat == k).length} in bank)</span></label>`,
        )
        .join("")}</fieldset><div><label for="sd">Difficulty</label><select id="sd">${[
        ["all", "Mixed (all levels)"],
        ["Easy", "Easy"],
        ["Medium", "Medium"],
        ["Hard", "Hard"],
      ]
        .map((x) => `<option value="${x[0]}" ${CFG.d == x[0] ? "selected" : ""}>${x[1]}</option>`)
        .join(
          "",
        )}</select><label for="sn">Number of questions</label><select id="sn">${nOpts()}</select><label for="st">Timer</label><select id="st"><option value="auto" ${CFG.t == "auto" ? "selected" : ""}>Suggested (about 75 seconds per question)</option>${[5, 10, 15, 20, 30, 45, 60, 90].map((x) => `<option value="${x}" ${CFG.t == x ? "selected" : ""}>${x} minutes</option>`).join("")}</select></div></div><p class="note" id="ss" aria-live="polite">${cfgSum()}</p><label style="display:flex;gap:10px;font-weight:500"><input type="checkbox" id="ck" style="width:auto"> I understand this is an educational practice assessment, not a clinical or validated IQ test, and I agree to local saving of progress in this browser.</label><p class="err" id="ce" role="alert"></p><div class="row"><button class="btn" type="submit">Continue to start</button><a class="btn o" href="#/practice">Practice first</a></div></form>`
}`;
  };
  /* test */
  const twMsg = (l) => (l <= 60 ? "⏰ Under 1 minute left. The test will submit automatically at 00:00." : "⚠️ Less than 2 minutes left.");
  let LASTQ = -1;
  let LOCK = false,
    DIR = 1;
  /* Animated question change. to = target index, dir = 1 forward / -1 back, optEl = clicked option label */
  function qGo(to, dir, optEl) {
    if (LOCK || S.done || tleft() <= 0) return;
    const same = to === S.i;
    if (!same && (to < 0 || to >= Q.length)) return;
    if (same && !optEl) return;
    const card = __R.querySelector(".qcard");
    if (!card || !card.animate || matchMedia("(prefers-reduced-motion:reduce)").matches) {
      S.i = to;
      DIR = dir;
      save();
      redraw();
      return;
    }
    LOCK = true; /* blocks duplicate answers / clicks until the entrance finishes */
    card.classList.add("qlock");
    const pop = optEl ? 160 : 0;
    /* 1. selected option: highlight + scale */
    if (optEl)
      optEl.animate(
        [
          { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(22,163,74,0)" },
          { transform: "scale(1.04)", boxShadow: "0 0 0 6px rgba(22,163,74,.22)", offset: 0.45 },
          { transform: "scale(1.02)", boxShadow: "0 0 0 0 rgba(22,163,74,0)" },
        ],
        { duration: 260, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "forwards" },
      );
    /* 2. progress bar animates to the new answered count */
    const bar = __R.querySelector('[role="progressbar"] i'),
      pb = __R.querySelector('[role="progressbar"]');
    if (bar && pb) {
      const n = Object.keys(S.ans).length;
      bar.style.transition = "width .3s ease";
      bar.style.width = (n / Q.length) * 100 + "%";
      pb.setAttribute("aria-valuenow", n);
    }
    let wait = pop + 120;
    if (!same) {
      /* 3. counter fades out, whole question card (text, figure, options) slides out */
      const cn = __R.querySelector(".qcn");
      if (cn)
        cn.animate(
          [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateY(8px)" },
          ],
          { duration: 260, delay: pop, easing: "ease-in", fill: "both" },
        );
      card.animate(
        [
          { transform: "translateX(0) scale(1)", opacity: 1 },
          { transform: `translateX(${-dir * 56}px) scale(.97)`, opacity: 0 },
        ],
        { duration: 340, delay: pop, easing: "cubic-bezier(.55,0,.55,.2)", fill: "both" },
      );
      wait = pop + 340;
    }
    setTimeout(() => {
      if (!$("#tm") || S.done) {
        LOCK = false;
        return;
      }
      S.i = to;
      DIR = dir;
      save();
      redraw(); /* new card slides in via .qanim, counter via .qcnt */
      const c = __R.querySelector(".qcard");
      c && c.focus({ preventScroll: true });
      setTimeout(() => (LOCK = false), same ? 0 : 450);
    }, wait);
  }
  function qView() {
    const anim = LASTQ !== S.i;
    LASTQ = S.i;
    const q = Q[S.i],
      a = S.ans[q.id],
      n = Object.keys(S.ans).length,
      l = tleft(),
      fl = Q.filter((x) => S.flag[x.id]).length;
    return `<div class="crumb"><a href="#/home">Home</a> › <a href="#/iq-test">IQ Test</a> › Take test</div>${jr("test", 1)}
<div class="tbar row sp"><div><b class="qcn${anim ? " qcnt" : ""}">Question ${S.i + 1} of ${Q.length}</b> <span class="mut">· ${n} answered · ${Q.length - n} left${fl ? ` · ${fl} marked` : ""}</span></div><div class="qring${l <= 120 ? " warn" : ""}"><svg viewBox="0 0 60 60" aria-hidden="true"><defs><linearGradient id="qrg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#16A34A"/></linearGradient></defs><circle class="bg" cx="30" cy="30" r="24"/><circle id="tring" cx="30" cy="30" r="24" stroke="url(#qrg)" stroke-dasharray="150.8" style="stroke-dashoffset:${(150.8 * (1 - l / TOTAL_SEC)).toFixed(1)}"/></svg><span class="timer${l <= 120 ? " warn" : ""}" id="tm" role="timer" aria-label="Time left">${mmss(l)}</span></div></div>
<div id="tw" class="note" role="alert" ${l > 120 ? "hidden" : ""}>${twMsg(l)}</div>
<div class="prog" style="margin:10px 0" role="progressbar" aria-valuemin="0" aria-valuemax="${Q.length}" aria-valuenow="${n}" aria-label="Questions answered"><i style="width:${(n / Q.length) * 100}%"></i></div>
<div class="qdots" aria-hidden="true">${Q.map((x, i) => `<i class="${S.ans[x.id] != null ? "a" : ""} ${S.flag[x.id] ? "f" : ""} ${i == S.i ? "c" : ""}"></i>`).join("")}</div>
<div class="g2" style="align-items:start"><div class="card qcard c-${q.cat}${anim ? " qanim" : ""}" tabindex="-1" style="--qx:${DIR * 56}px"><div class="qbg" aria-hidden="true"><i></i><i></i><i></i></div><div class="qhd"><span class="qic" aria-hidden="true">${{ logical: "🧩", verbal: "📚", numerical: "🔢", spatial: "📐" }[q.cat]}</span><span class="badge">${CATS[q.cat]}</span><span class="badge o">${q.d}</span><span class="qno" aria-hidden="true">${S.i + 1}</span></div><fieldset style="border:0;padding:0;margin:8px 0"><legend><h2 class="qtx">${q.text}</h2></legend>${qFig(q)}${q.opts.map((o, i) => `<label class="opt"><input type="radio" name="q" value="${i}" ${a === i ? "checked" : ""}><span class="ol">${"ABCD"[i]}</span><span class="ot">${esc(o)}</span><span class="ock">✔</span></label>`).join("")}</fieldset>
<div class="row sp"><button class="btn o" data-act="prev" ${S.i == 0 ? "disabled" : ""}>← Previous</button><button class="btn o" data-act="flag" aria-pressed="${!!S.flag[q.id]}">${S.flag[q.id] ? "⚑ Marked for review" : "⚐ Mark for review"}</button><button class="btn o" data-act="clear" ${a == null ? "disabled" : ""}>Clear answer</button>${S.i < Q.length - 1 ? `<button class="btn" data-act="next">Next →</button>` : `<button class="btn g" data-act="submit">Submit</button>`}</div>
<p class="mut" style="font-size:.85rem">Answers save automatically. Keys: 1–4 choose · Alt+← / Alt+→ move.</p></div>
<div class="card"><h3>Question navigator</h3><div class="nav">${Q.map((x, i) => `<button data-go="${i}" class="${S.ans[x.id] != null ? "a" : ""} ${S.flag[x.id] ? "f" : ""} ${i == S.i ? "c" : ""}" ${i == S.i ? 'aria-current="step"' : ""} aria-label="Question ${i + 1}, ${S.ans[x.id] != null ? "answered" : "unanswered"}${S.flag[x.id] ? ", marked for review" : ""}">${i + 1}</button>`).join("")}</div><div class="lg"><span><i class="a"></i>Answered</span><span><i></i>Unanswered</span><span><i class="f"></i>⚑ Marked</span></div><button class="btn g" style="margin-top:4px" data-act="submit">Submit test</button></div></div>`;
  }
  let tick;
  function startTick() {
    clearInterval(tick);
    tick = setInterval(() => {
      const l = tleft(),
        t = $("#tm"),
        w = $("#tw");
           if (t) {
        t.textContent = mmss(l);
        t.classList.toggle("warn", l <= 120);
        const rg = $("#tring");
        if (rg) rg.style.strokeDashoffset = (150.8 * (1 - l / TOTAL_SEC)).toFixed(1);
        const rw = t.closest(".qring");
        if (rw) rw.classList.toggle("warn", l <= 120);
      }
      if (w) {
        w.hidden = l > 120;
        if (l <= 120 && w.dataset.m != String(l <= 60)) {
          w.dataset.m = String(l <= 60);
          w.textContent = twMsg(l);
        }
      }
      if (l <= 0) finish(true);
    }, 1000);
  }
  P.test = () => {
    if (S.done)
      return `${head("Take Test", null, "Take test")}${jr("test")}<div class="note">You have already submitted this attempt. Answers are locked.</div><p class="row"><a class="btn" href="#/results">View results</a><button class="btn o" data-act="restart">Retake</button></p>`;
    if (!S.started)
      return `${head("Take Test", null, "Take test")}${jr("test")}${empty("Please read the instructions and confirm before starting.", "Go to instructions", "#/instructions")}`;
    if (tleft() <= 0) {
      setTimeout(() => finish(true));
      return `${head("Time is up", null, "Take test")}<p>Submitting your answers…</p>`;
    }
        startTick();
       LASTQ = -1;
    LOCK = false;
    DIR = 1;
    return qView();
  };
  function finish(auto) {
    clearInterval(tick);
    if (S.done) return;
    S.done = true;
    S.at = Date.now();
    S.used = auto ? TOTAL_SEC : Math.min(TOTAL_SEC, TOTAL_SEC - tleft());
    save();
    const r = score(),
      sec = {};
    Object.keys(CATS).forEach((k) => (sec[k] = pcOf(r, k)));
    HIST.add({ at: S.at, c: r.c, w: r.w, u: r.u, n: r.n, used: S.used, sec });
    const d = $("#dlg");
    if (d && d.open) d.close();
    toast(auto ? "Time is up – test submitted automatically." : "Test submitted.");
    location.hash = "#/results";
  }
  /* results */
  P.results = () => {
    if (!S.done)
      return `${head("Results", null, "Results")}${jr("results")}${empty("Complete the timed test to see your results.", "Go to instructions", "#/instructions")}`;
    const r = score(),
      ks = aks(r),
      pct = Math.round(r.pct * 100),
      acc = r.c + r.w ? Math.round((r.c / (r.c + r.w)) * 100) : 0,
      h = HIST.get(),
      last = h[h.length - 1],
      pv = last && last.at === S.at && h.length > 1 ? h[h.length - 2] : null,
      str = ks.filter((k) => pcOf(r, k) >= 67),
      imp = ks.filter((k) => pcOf(r, k) < 67),
      weak = [...ks].sort((a, b) => pcOf(r, a) - pcOf(r, b))[0],
      cl = (k) => `${CATS[k]}: ${r.sec[k].c}/${r.sec[k].n} correct`;
              return `${head("Your Results", "Performance summary for the attempt submitted on " + fdt(S.at) + ".", "Results")}${jr("results", 1)}
${rzHero(r, ks)}
<div class="grid"><div class="card kp"><p class="mut">Assessment score</p><b>${r.c} / ${r.n}</b>${donut(pct)}<span class="badge o">Not an official IQ score</span></div>
<div class="card kp"><p class="mut">Answer breakdown</p><div class="grid" style="grid-template-columns:repeat(3,1fr);gap:8px"><div><b style="color:var(--g)">${r.c}</b>Correct</div><div><b style="color:#d92d20">${r.w}</b>Incorrect</div><div><b style="color:var(--mut)">${r.u}</b>Unanswered</div></div><p class="mut">${r.c} + ${r.w} + ${r.u} = ${r.n} questions</p></div>
<div class="card kp"><p class="mut">Time used</p><b>${mmss(S.used || 0)}</b><p class="mut">of ${mmss(TOTAL_SEC)}</p><p>Accuracy on answered questions: <b>${acc}%</b><br><span class="mut">Score ${pct}% counts unanswered as not correct.</span></p></div></div>
${rzTable(r, ks)}
<div class="cols2"><div class="card"><h3>💪 Strengths</h3>${str.length ? `<ul>${str.map((k) => `<li>${cl(k)}</li>`).join("")}</ul>` : `<p class="mut">No area reached 67% yet. Start with practice below.</p>`}</div><div class="card"><h3>🎯 Areas to improve</h3>${imp.length ? `<ul>${imp.map((k) => `<li>${cl(k)}${r.sec[k].u ? ` (${r.sec[k].u} unanswered)` : ""}</li>`).join("")}</ul>` : `<p class="mut">No weak area on this set. Try the harder practice questions.</p>`}</div></div>
<p class="mut">${cfgLine()} Small numbers of questions per area give only rough indicators, not a measure of ability.</p>
${pv ? `<div class="card" style="margin:16px 0"><h3>📈 Compared with your previous attempt</h3><p>${pv.c}/${pv.n} → <b>${r.c}/${r.n}</b> (${r.c - pv.c >= 0 ? "+" : ""}${r.c - pv.c}). ${ks.map((k) => `${CATS[k]} ${pv.sec[k]}% → ${pcOf(r, k)}%`).join(" · ")}</p></div>` : ""}
<div class="card" style="margin:16px 0"><h3>🗂 Saved attempts <span class="badge o">This browser only</span></h3>${
      h.length
        ? `<div style="overflow-x:auto"><table><tr><th>Date</th><th>Score</th><th>Time</th></tr>${h
            .slice(-5)
            .reverse()
            .map((x) => `<tr><td>${fdt(x.at)}</td><td>${x.c}/${x.n}</td><td>${mmss(x.used || 0)}</td></tr>`)
            .join("")}</table></div>`
        : `<p class="mut">No saved summaries (cleared).</p>`
    }<p class="mut">Stored in localStorage on this device only. Not synced to any account. <button class="btn s o" data-act="clearhist">Clear saved attempts</button></p></div>
${DISC}<p class="row noprint"><a class="btn" href="#/report">View detailed report</a><button class="btn o" data-act="rev">Review answers</button><button class="btn o" data-act="restart">Retake test</button><a class="btn g" href="#/practice?cat=${weak}">Practice again</a></p>`;
  };
   /* ===== RESULTS: IQ-style orbit graphic + realistic report parts ===== */
  const rzEst = (r) => Math.round(70 + r.pct * 60);
  const rzBand = (e) => (e < 85 ? "Developing" : e < 100 ? "Average" : e < 115 ? "Above average" : e < 130 ? "High" : "Very high");
  const rzLvl = (p) => (p >= 75 ? ["Strong", ""] : p >= 50 ? ["Developing", "o"] : ["Needs practice", "o"]);
  function rzViz(r, ks, est) {
    const cx = 260,
      cy = 210,
      R = 110,
      n = Math.max(ks.length, 1);
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, d) => [cx + Math.cos(ang(i)) * d, cy + Math.sin(ang(i)) * d];
    const f = (a) => a.map((v) => v.toFixed(1)).join(",");
    const val = ks.map((k) => pcOf(r, k));
    const rr = (p) => 46 + ((R - 46) * p) / 100;
    const col = ["#F97316", "#16A34A", "#6366f1", "#0ea5e9"];
    const poly = val.map((p, i) => f(pt(i, rr(p)))).join(" ");
    const rings = [R, R * 0.72, R * 0.44]
      .map(
        (d, i) =>
          `<circle cx="${cx}" cy="${cy}" r="${d}" fill="none" stroke="currentColor" stroke-opacity="${i ? 0.14 : 0.25}" ${i == 1 ? 'stroke-dasharray="3 6"' : ""}/>`,
      )
      .join("");
    const spokes = ks
      .map((k, i) => {
        const p = pt(i, R);
        return `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="currentColor" stroke-opacity=".15"/>`;
      })
      .join("");
    const nodes = ks
      .map((k, i) => {
        const o = pt(i, R),
          v = pt(i, rr(val[i]));
        return `<circle cx="${o[0].toFixed(1)}" cy="${o[1].toFixed(1)}" r="6" fill="var(--card)" stroke="${col[i % 4]}" stroke-width="3"/><circle cx="${v[0].toFixed(1)}" cy="${v[1].toFixed(1)}" r="5" fill="${col[i % 4]}"/>`;
      })
      .join("");
    const labels = ks
      .map((k, i) => {
        const c = Math.cos(ang(i)),
          s = Math.sin(ang(i)),
          l = pt(i, R + 34);
        const a = Math.abs(c) < 0.3 ? "middle" : c > 0 ? "start" : "end";
        const y0 = s < -0.5 ? l[1] - 50 : s > 0.5 ? l[1] - 6 : l[1] - 26;
        const x = l[0].toFixed(1);
        return `<g text-anchor="${a}"><text x="${x}" y="${(y0 + 10).toFixed(1)}" font-size="12" font-weight="800" letter-spacing="1.2" fill="${col[i % 4]}">${CATS[k].toUpperCase()}</text><text x="${x}" y="${(y0 + 32).toFixed(1)}" font-size="24" font-weight="800" fill="currentColor">${val[i]}%</text><text x="${x}" y="${(y0 + 48).toFixed(1)}" font-size="11" fill="currentColor" fill-opacity=".65">${r.sec[k].c} of ${r.sec[k].n} correct</text></g>`;
      })
      .join("");
    return `<svg class="rz-viz" viewBox="0 0 520 420" role="img" aria-label="Estimated practice index ${est}. ${ks.map((k, i) => CATS[k] + " " + val[i] + "%").join(", ")}"><defs><linearGradient id="rzg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="520" y2="420"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#16A34A"/></linearGradient></defs><circle class="sl-dash" cx="${cx}" cy="${cy}" r="${R + 14}" fill="none" stroke="#F97316" stroke-opacity=".5" stroke-width="2" stroke-dasharray="4 10"/>${rings}${spokes}<polygon points="${poly}" fill="url(#rzg)" fill-opacity=".28" stroke="url(#rzg)" stroke-width="3" stroke-linejoin="round"/>${nodes}<circle cx="${cx}" cy="${cy}" r="40" fill="var(--card)" stroke="url(#rzg)" stroke-width="5"/><text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="30" font-weight="800" fill="currentColor">${est}</text><text x="${cx}" y="${cy + 24}" text-anchor="middle" font-size="9" letter-spacing="2" fill="currentColor" fill-opacity=".65">IQ EST.</text>${labels}</svg>`;
  }
   function rzViz2(r, ks, est) {
    const cx = 300,
      cy = 230,
      R = 120,
      n = Math.max(ks.length, 1);
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, d) => [cx + Math.cos(ang(i)) * d, cy + Math.sin(ang(i)) * d];
    const f = (a) => a.map((v) => v.toFixed(1)).join(",");
    const val = ks.map((k) => pcOf(r, k));
    const rr = (p) => 48 + ((R - 48) * p) / 100;
    const col = ["#F97316", "#16A34A", "#6366f1", "#0ea5e9"];
    const poly = val.map((p, i) => f(pt(i, rr(p)))).join(" ");
    const ticks = Array.from({ length: 72 }, (_, i) => {
      const a = (i * 2 * Math.PI) / 72,
        l = i % 6 === 0 ? 9 : 4,
        c = Math.cos(a),
        s = Math.sin(a);
      return `<line x1="${(cx + c * (R + 24)).toFixed(1)}" y1="${(cy + s * (R + 24)).toFixed(1)}" x2="${(cx + c * (R + 24 + l)).toFixed(1)}" y2="${(cy + s * (R + 24 + l)).toFixed(1)}" stroke="currentColor" stroke-opacity="${i % 6 === 0 ? 0.35 : 0.18}" stroke-width="1.5"/>`;
    }).join("");
    const rings = [R, R * 0.75, R * 0.5]
      .map(
        (d, i) =>
          `<circle cx="${cx}" cy="${cy}" r="${d.toFixed(1)}" fill="none" stroke="currentColor" stroke-opacity="${i ? 0.13 : 0.24}" ${i === 1 ? 'stroke-dasharray="3 6"' : ""}/>`,
      )
      .join("");
    const spokes = ks
      .map((k, i) => {
        const p = pt(i, R);
        return `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="currentColor" stroke-opacity=".14"/>`;
      })
      .join("");
    const orbit = (rad, dur, c, rev) =>
      `<g><animateTransform attributeName="transform" type="rotate" from="${rev ? 360 : 0} ${cx} ${cy}" to="${rev ? 0 : 360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/><circle cx="${cx}" cy="${cy - rad}" r="4" fill="${c}"/></g>`;
    const nodes = ks
      .map((k, i) => {
        const o = pt(i, R),
          v = pt(i, rr(val[i]));
        return `<circle cx="${o[0].toFixed(1)}" cy="${o[1].toFixed(1)}" r="7" fill="var(--card)" stroke="${col[i % 4]}" stroke-width="3"/><circle cx="${v[0].toFixed(1)}" cy="${v[1].toFixed(1)}" r="5.5" fill="${col[i % 4]}"><animate attributeName="r" values="5.5;8;5.5" dur="2.6s" repeatCount="indefinite"/></circle>`;
      })
      .join("");
    const labels = ks
      .map((k, i) => {
        const c = Math.cos(ang(i)),
          s = Math.sin(ang(i)),
          l = pt(i, R + 44);
        const a = Math.abs(c) < 0.3 ? "middle" : c > 0 ? "start" : "end";
        const y0 = s < -0.5 ? l[1] - 50 : s > 0.5 ? l[1] - 4 : l[1] - 26;
        const x = l[0].toFixed(1);
        return `<g text-anchor="${a}"><text x="${x}" y="${(y0 + 10).toFixed(1)}" font-size="12" font-weight="800" letter-spacing="1.6" fill="${col[i % 4]}">${CATS[k].toUpperCase()}</text><text x="${x}" y="${(y0 + 34).toFixed(1)}" font-size="26" font-weight="800" fill="currentColor">${val[i]}%</text><text x="${x}" y="${(y0 + 50).toFixed(1)}" font-size="11" fill="currentColor" fill-opacity=".62">${r.sec[k].c} of ${r.sec[k].n} correct</text></g>`;
      })
      .join("");
    return `<svg class="rz-viz" viewBox="0 0 600 460" role="img" aria-label="Estimated practice index ${est}. ${ks.map((k, i) => CATS[k] + " " + val[i] + "%").join(", ")}"><defs><linearGradient id="rzg2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="460"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#16A34A"/></linearGradient><filter id="rzgl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter></defs>${ticks}<circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="none" stroke="#F97316" stroke-opacity=".45" stroke-width="2" stroke-dasharray="4 10"><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="60s" repeatCount="indefinite"/></circle>${rings}${spokes}<g class="rz-poly"><polygon points="${poly}" fill="url(#rzg2)" fill-opacity=".5" filter="url(#rzgl)"/><polygon points="${poly}" fill="url(#rzg2)" fill-opacity=".3" stroke="url(#rzg2)" stroke-width="3" stroke-linejoin="round"/></g>${orbit(R + 14, 14, "#F97316", 0)}${orbit(R * 0.75, 22, "#16A34A", 1)}${orbit(R * 0.5, 32, "#6366f1", 0)}${nodes}<circle cx="${cx}" cy="${cy}" r="50" fill="url(#rzg2)" fill-opacity=".35" filter="url(#rzgl)"/><circle cx="${cx}" cy="${cy}" r="44" fill="var(--card)" stroke="url(#rzg2)" stroke-width="5"/><text x="${cx}" y="${cy + 9}" text-anchor="middle" font-size="34" font-weight="800" fill="currentColor">${est}</text><text x="${cx}" y="${cy + 26}" text-anchor="middle" font-size="9" letter-spacing="2.4" fill="currentColor" fill-opacity=".62">IQ EST.</text>${labels}</svg>`;
  }
  function rzHero(r, ks) {
    const est = rzEst(r),
      pos = Math.min(100, Math.max(0, ((est - 70) / 60) * 100)),
      rid = "ILM-" + (S.at || Date.now()).toString(36).toUpperCase().slice(-8);
    return `<section class="card rz" style="margin:16px 0"><div>${rzViz2(r, ks, est)}</div><div><span class="badge o">Practice estimate · not an official IQ score</span><h2 style="margin-top:8px">Estimated practice index: ${est}</h2><p class="mut">Band: <b>${rzBand(est)}</b>. Scaled from your ${Math.round(r.pct * 100)}% score on this ${r.n}-question set (70 = 0%, 130 = 100%).</p><div class="rz-scale" role="img" aria-label="Position ${est} on a 70 to 130 scale"><i style="left:${pos}%"></i></div><div class="rz-ticks"><span>70</span><span>85</span><span>100</span><span>115</span><span>130</span></div><div class="rz-meta"><div><small>Report ID</small><b>${rid}</b></div><div><small>Candidate</small><b>${esc(S.user || "Guest learner")}</b></div><div><small>Date</small><b>${fdt(S.at)}</b></div><div><small>Time used</small><b>${mmss(S.used || 0)}</b></div><div><small>Questions</small><b>${r.n}</b></div></div></div></section>`;
  }
  function rzTable(r, ks) {
    return `<div class="card" style="margin:16px 0"><h2>Section-wise report</h2><div style="overflow-x:auto"><table class="cmp"><tr><th>Area</th><th>Correct</th><th>Incorrect</th><th>Skipped</th><th>Score</th><th>Level</th></tr>${ks
      .map((k) => {
        const s = r.sec[k],
          p = pcOf(r, k),
          l = rzLvl(p);
        return `<tr><td>${CATS[k]}</td><td>${s.c}/${s.n}</td><td>${s.w}</td><td>${s.u}</td><td style="min-width:130px"><div class="rz-bar"><div class="prog"><i style="width:${p}%"></i></div><b>${p}%</b></div></td><td><span class="badge ${l[1]}">${l[0]}</span></td></tr>`;
      })
      .join(
        "",
      )}</table></div><p class="mut">Levels: Strong 75%+ · Developing 50–74% · Needs practice below 50%. Each area has only a few questions, so treat these as rough indicators.</p></div>`;
  }
  /* report */
  const RC = {
    logical: [
      ["Logic Foundations", "#/courses"],
      ["Pattern Spotting", "#/courses"],
    ],
    verbal: [
      ["Vocabulary Builder", "#/courses"],
      ["Reading Comprehension", "#/courses"],
    ],
    numerical: [
      ["Number Sense", "#/courses"],
      ["Algebra Essentials", "#/courses"],
    ],
    spatial: [["Spatial Visualisation", "#/courses"]],
  };
  const rvItem = (q, i) => {
    const a = S.ans[q.id],
      s = a == null ? "un" : a === q.ans ? "ok" : "wrong";
    return `<div class="qi" data-s="${s}" data-fl="${S.flag[q.id] ? 1 : 0}"><div class="row"><b>Q${i + 1}</b><span class="badge">${CATS[q.cat]}</span><span class="badge o">${q.d}</span><span class="badge ${s == "ok" ? "" : "o"}">${{ ok: "✓ Correct", wrong: "✗ Incorrect", un: "– Unanswered" }[s]}</span>${S.flag[q.id] ? '<span class="badge o">⚑ Marked</span>' : ""}</div><p><b>${q.text}</b></p>${qFig(q)}<p>Your answer: ${a == null ? "<i>not answered</i>" : esc(q.opts[a])}<br>Correct answer: <b>${esc(q.opts[q.ans])}</b></p><p class="mut">Why: ${q.why}</p></div>`;
  };
  P.report = () => {
    if (!S.done)
      return `${head("Detailed Report", null, "Report")}${jr("report")}${empty("Your report is generated after you submit the timed test.", "Take the test", "#/instructions")}`;
    const r = score(),
      ks = aks(r),
      pct = Math.round(r.pct * 100);
    return `${head("Detailed Report", "Attempt submitted " + fdt(S.at) + " · " + r.c + "/" + r.n + " correct (" + pct + "%) · time " + mmss(S.used || 0), "Report")}${jr("report")}
<div class="row noprint"><button class="btn" data-act="print">Print / save as PDF</button><a class="btn o" href="#/results">← Back to results</a><a class="btn o" href="#/iq-test">IQ Test main page</a></div>
${rzHero(r, ks)}
<div class="card" style="margin:16px 0"><h2>Mistakes and practice by area</h2><div style="overflow-x:auto"><table class="cmp"><tr><th>Area</th><th>Correct</th><th>Incorrect</th><th>Unanswered</th><th>Suggested practice</th></tr>${ks
      .map((k) => {
        const s = r.sec[k];
        return `<tr><td>${CATS[k]}</td><td>${s.c}</td><td>${s.w}</td><td>${s.u}</td><td>${s.c == s.n ? "Keep it up – try harder practice questions" : `<a href="#/practice?cat=${k}">Practise ${CATS[k].toLowerCase()} questions</a>`}</td></tr>`;
      })
      .join("")}</table></div></div>
<div class="card" id="rv"><h2>Answer review</h2><div class="tabs noprint" role="group" aria-label="Filter questions">${[
      ["all", "All"],
      ["wrong", "Incorrect"],
      ["un", "Unanswered"],
      ["fl", "Marked"],
    ]
      .map((f) => `<button data-rf="${f[0]}" aria-pressed="${f[0] == "all"}">${f[1]}</button>`)
      .join(
        "",
      )}</div><div id="rvl" data-f="all">${Q.map(rvItem).join("")}</div><p class="mut">Difficulty labels are author-assigned, not calibrated.</p></div>
<div class="card" style="margin:16px 0"><h2>Learning recommendations</h2><ul>${
      ks
        .filter((k) => r.sec[k].c < r.sec[k].n)
        .map(
          (k) =>
            `<li><b>${CATS[k]}</b>: <a href="#/practice?cat=${k}">practice mode</a> · sample catalogue: ${RC[k].map((c) => `<a href="${c[1]}">${c[0]}</a>`).join(", ")}</li>`,
        )
        .join("") || "<li>All areas answered correctly. Try practice mode on harder items.</li>"
    }<li>Teaching and study methods: <a href="#/pedagogy">Pedagogy</a> · <a href="#/blog">Resources</a> · <a href="#/programs">Learning programs</a></li></ul><p class="mut">Courses are a sample catalogue in this demo; enrollment needs a backend.</p></div>${DISC}`;
  };
  /* practice */
  const PR = { cat: "all", d: "all", i: 0, ans: {} };
  const pList = () => {
    let L = BANK.filter((q) => (PR.cat == "all" || q.cat == PR.cat) && (PR.d == "all" || q.d == PR.d));
    if (PR.shuf) L = PR.shuf.map((id) => L.find((x) => x.id == id)).filter(Boolean);
    return L;
  };
  function pView() {
    if (PR.sum) return pSum();
    const L = pList();
    if (!L.length) return `<div class="card">No questions match this filter. Try another difficulty.</div>`;
    PR.i = Math.min(PR.i, L.length - 1);
    const q = L[PR.i],
      a = PR.ans[q.id],
      sh = a != null,
      ok = L.filter((x) => PR.ans[x.id] === x.ans).length;
    return `<p class="mut" aria-live="polite">Question ${PR.i + 1} of ${L.length} · ${ok} answered correctly in this set · no timer · not saved</p><div class="card qcard c-${q.cat}"><div class="qbg" aria-hidden="true"><i></i><i></i><i></i></div><span class="badge">${CATS[q.cat]}</span> <span class="badge o">${q.d}</span><h2 style="font-size:1.25rem;margin-top:8px">${q.text}</h2>${qFig(q)}${q.opts.map((o, i) => `<button class="opt po ${sh ? (i == q.ans ? "ok" : i == a ? "no" : "") : ""}" data-pa="${i}" ${sh ? 'aria-disabled="true"' : ""}>${esc(o)}${sh && i == q.ans ? " ✓ Correct answer" : sh && i == a ? " ✗ Your choice" : ""}</button>`).join("")}${sh ? `<div class="note" role="status"><b>${a == q.ans ? "✓ Correct." : "✗ Not quite."}</b> ${q.why}</div>` : ""}<div class="row sp" style="margin-top:12px"><button class="btn o" data-pn="-1" ${PR.i == 0 ? "disabled" : ""}>← Previous</button>${sh && a != q.ans ? `<button class="btn g" data-pr="1">Try again</button>` : ""}<button class="btn o" data-pshuf="1">🔀 Shuffle</button>${PR.i >= L.length - 1 ? `<button class="btn g" data-psum="1">Finish → summary</button>` : `<button class="btn" data-pn="1">Next →</button>`}</div></div>`;
  }
  P.practice = () => {
    const m = location.hash.match(/cat=(\w+)/);
    if (m && CATS[m[1]]) {
      PR.cat = m[1];
      PR.i = 0;
    }
    return `${head("Practice Mode", "Untimed practice with explanations. Separate from the timed assessment.", "Practice")}${jr("practice")}<p class="note"><b>Practice mode:</b> no timer, nothing is scored or saved. It draws on the full bank of ${BANK.length} educational sample questions. Difficulty labels come from the source bank and are not calibrated.</p>
<div class="card row" style="margin:12px 0"><div style="flex:1;min-width:160px"><label for="pcat">Area</label><select id="pcat">${[["all", "All areas"], ...Object.entries(CATS)].map((x) => `<option value="${x[0]}" ${PR.cat == x[0] ? "selected" : ""}>${x[1]}</option>`).join("")}</select></div><div style="flex:1;min-width:160px"><label for="pdiff">Difficulty</label><select id="pdiff">${["all", "Easy", "Medium", "Hard"].map((x) => `<option value="${x}" ${PR.d == x ? "selected" : ""}>${x == "all" ? "All levels" : x}</option>`).join("")}</select></div></div><div id="pv">${pView()}</div>
<p class="row noprint" style="margin-top:16px"><a class="btn" href="#/instructions">Take the timed test</a><a class="btn o" href="#/iq-test">Back to IQ Test overview</a></p>`;
  };
  const pRe = () => {
    const v = $("#pv");
    if (v) {
      const f = document.activeElement,
        k = f && f.dataset.pn ? `[data-pn="${f.dataset.pn}"]` : null;
      v.innerHTML = pView();
      if (k) {
        const n = v.querySelector(k);
        if (n && !n.disabled) n.focus();
      }
    }
  };
  __LST("change", (e) => {
    if (e.target.id == "pcat") {
      PR.cat = e.target.value;
      PR.i = 0;
      PR.sum = false;
      PR.shuf = null;
      pRe();
    }
    if (e.target.id == "pdiff") {
      PR.d = e.target.value;
      PR.i = 0;
      PR.sum = false;
      PR.shuf = null;
      pRe();
    }
    if (e.target.id == "sd" || e.target.id == "sn" || e.target.id == "st" || e.target.name == "sc") cfgSync();
  });
  __LST("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.pa != null) {
      const q = pList()[PR.i];
      if (q && PR.ans[q.id] == null) {
        PR.ans[q.id] = +b.dataset.pa;
        pRe();
      }
    }
    if (b.dataset.pshuf) {
      PR.shuf = rshuf(pList().map((x) => x.id));
      PR.i = 0;
      pRe();
    }
    if (b.dataset.pn) {
      PR.i += +b.dataset.pn;
      pRe();
    }
    if (b.dataset.pr) {
      const q = pList()[PR.i];
      delete PR.ans[q.id];
      pRe();
    }
    if (b.dataset.rf) {
      const l = $("#rvl");
      l.dataset.f = b.dataset.rf;
      b.parentNode.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x == b));
    }
  });
  __LST("keydown", (e) => {
    if (!$("#tm") || S.done || !e.altKey) return;
        if (e.key == "ArrowRight" && S.i < Q.length - 1) qGo(S.i + 1, 1);
    if (e.key == "ArrowLeft" && S.i > 0) qGo(S.i - 1, -1);
  });

  /* ===== TEST SETUP: category, difficulty, count, timer ===== */
  const CFG = { cats: Object.keys(CATS), d: "all", n: 12, t: "auto" };
  const rshuf = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pool = (c) => BANK.filter((q) => c.cats.includes(q.cat) && (c.d == "all" || q.d == c.d));
  const sugg = (n) => Math.max(5, Math.ceil((n * 1.25) / 5) * 5);
  const cfgMins = (c) => (c.t == "auto" ? sugg(c.n) : +c.t);
  function nList() {
    const av = pool(CFG).length,
      o = [5, 10, 12, 20, 30, 40, 50].filter((x) => x <= av);
    if (av && !o.includes(av) && av <= 50) o.push(av);
    if (av > 50 && !o.includes(50)) o.push(50);
    o.sort((a, b) => a - b);
    if (o.length && !o.includes(CFG.n)) CFG.n = o.filter((x) => x <= CFG.n).pop() || o[0];
    return o;
  }
  const nOpts = () =>
    nList()
      .map((x) => `<option value="${x}" ${CFG.n == x ? "selected" : ""}>${x} questions</option>`)
      .join("");
  const cfgSum = () => {
    const av = pool(CFG).length;
    if (!CFG.cats.length) return "⚠ Select at least one category.";
    if (!av) return "⚠ No questions match this combination.";
    const n = Math.min(CFG.n, av);
    return `Your test: <b>${n} questions</b> · ${CFG.cats.map((k) => CATS[k]).join(", ")} · ${CFG.d == "all" ? "mixed difficulty" : CFG.d} · <b>${cfgMins({ ...CFG, n })} min</b> (${CFG.t == "auto" ? "suggested" : "custom"}). ${av} matching questions available; they are picked at random.`;
  };
  function cfgSync() {
    CFG.cats = [...__R.querySelectorAll("input[name=sc]:checked")].map((x) => x.value);
    CFG.d = $("#sd").value;
    CFG.n = +$("#sn").value || CFG.n;
    CFG.t = $("#st").value;
    const sn = $("#sn");
    sn.innerHTML = nOpts();
    $("#ss").innerHTML = cfgSum();
  }
  const cfgLine = () =>
    S.cfg
      ? `Test: ${S.cfg.n} questions · ${S.cfg.cats.map((k) => CATS[k]).join(", ")} · ${S.cfg.d == "all" ? "mixed difficulty" : S.cfg.d} · ${S.cfg.mins} min.`
      : "";
  function sample(c) {
    const by = {};
    c.cats.forEach((k) => (by[k] = rshuf(pool(c).filter((q) => q.cat == k))));
    const out = [];
    let left = Math.min(c.n, pool(c).length);
    while (left > 0) {
      let m = false;
      for (const k of c.cats) {
        if (by[k].length && left > 0) {
          out.push(by[k].pop());
          left--;
          m = true;
        }
      }
      if (!m) break;
    }
    return rshuf(out);
  }
  function applyCfg() {
    Q.length = 0;
    if (S.cfg) {
      S.cfg.ids.forEach((id) => {
        const q = BANK.find((x) => x.id == id);
        q && Q.push(q);
      });
      TOTAL_SEC = S.cfg.mins * 60;
    } else TOTAL_SEC = 900;
  }
  function startAttempt() {
    cfgSync();
    const q = sample(CFG);
    if (!q.length) {
      toast("No questions match your setup.");
      return;
    }
    S.cfg = { cats: [...CFG.cats], d: CFG.d, n: q.length, mins: cfgMins({ ...CFG, n: q.length }), ids: q.map((x) => x.id) };
    applyCfg();
    S.end = Date.now() + TOTAL_SEC * 1000;
    save();
    go("#/test");
  }
  applyCfg();

  /* ===== PEDAGOGY: 5 learning modules, quizzes, progress, lesson-plan builder (all client-side, localStorage) ===== */
  const PED = [
    {
      n: "Formative Assessment",
      ic: "📋",
      img: "pedagogy-methods",
      def: "Quick, low-stakes checks made while learning is still happening, so the teacher (and learner) can decide what to do next.",
      obj: [
        "Tell formative checks apart from final exams",
        "Choose a quick check (exit ticket, mini-whiteboard, thumbs signal)",
        "Use the evidence to change the next lesson",
      ],
      why: "Misunderstandings found today can be fixed tomorrow. Found only at the final exam, they cost marks and confidence.",
      ex: [
        "Exit ticket: each learner writes one thing they understood and one question before leaving.",
        "Mini-whiteboards: everyone shows the answer at the same time, so the teacher sees the whole room at once.",
      ],
      sc: "Use it when: you finish explaining fractions and 6 of 30 learners show 1/2 + 1/3 = 2/5 on whiteboards. Re-teach with a diagram tomorrow instead of moving on.",
      act: "Think of a topic you teach. Write one 2-minute check you could run mid-lesson, and what you would do if one third of the class got it wrong.",
      quiz: [
        [
          "A teacher reads exit tickets and changes tomorrow’s starter activity. What is this?",
          [
            ["Formative assessment", "Correct. The evidence is gathered during learning and used immediately to shape teaching."],
            [
              "Summative assessment",
              "Summative assessment judges learning at the end (final exam, report) and is not used to adjust teaching in progress.",
            ],
            [
              "Standardised testing",
              "Standardised tests compare large groups under fixed conditions; an exit ticket is informal and classroom-specific.",
            ],
          ],
          0,
        ],
        [
          "Which use of a class quiz is most formative?",
          [
            ["Recording marks only for the report card", "Marks for a report card are a summative use; nothing changes in the teaching."],
            [
              "Grouping learners by the mistakes they made and re-teaching each group",
              "Correct. The result directly drives the next teaching step.",
            ],
            ["Ranking learners publicly", "Public ranking adds pressure and tells nobody what to do next."],
          ],
          1,
        ],
      ],
      next: "Run one exit ticket in your next class, then continue to Differentiated Learning.",
    },
    {
      n: "Differentiated Learning",
      ic: "🎚️",
      img: "pedagogy-classroom",
      def: "Adjusting content, support, pace or product so learners with different needs can all reach the same learning goal.",
      obj: [
        "Explain what can be differentiated: content, process, product, support",
        "Design a task with 2–3 entry levels",
        "Keep the goal the same for everyone",
      ],
      why: "A mixed-level class taught at one speed leaves some bored and others lost. Small adjustments keep everyone working at the edge of what they can do.",
      ex: [
        "Same reading passage, but three question sets: recall, explain, evaluate.",
        "Learners choose to show understanding as a poster, a short talk or a written paragraph.",
      ],
      sc: "Use it when: in a maths lesson some learners need number-line support while others are ready for word problems. Give a shared goal (add fractions) with tiered tasks.",
      act: "Take one task you use. Describe a ‘support’ version and a ‘stretch’ version while keeping the same learning goal.",
      quiz: [
        [
          "What stays the SAME in differentiated learning?",
          [
            ["The learning goal", "Correct. The route and support change; the goal remains the shared target."],
            ["The task for every learner", "Identical tasks are the opposite of differentiation."],
            ["The time every learner spends", "Time can vary; it is one of the things that may be adjusted."],
          ],
          0,
        ],
        [
          "A teacher gives easy worksheets to ‘weak’ learners all term and never changes them. What is the risk?",
          [
            ["None; it is fully differentiated", "Fixed, low-ceiling tasks can lock learners into low expectations."],
            [
              "Learners may never get access to challenging work",
              "Correct. Groups should be flexible and based on current evidence, not fixed labels.",
            ],
            ["The class becomes too active", "This is not a real risk of fixed grouping."],
          ],
          1,
        ],
      ],
      next: "Plan a task with two levels, then continue to Active Learning.",
    },
    {
      n: "Active Learning",
      ic: "🙋",
      img: "pedagogy-teaching",
      def: "Learners do something with the idea — discuss, solve, explain, build — instead of only listening or copying.",
      obj: ["Recognise passive and active tasks", "Use think-pair-share and problem-solving in pairs", "Plan a 10-minute active segment"],
      why: "Explaining and applying ideas builds understanding that lasts longer than copying notes.",
      ex: [
        "Think-pair-share: think alone for 1 minute, discuss with a partner, share with the class.",
        "Pairs solve a problem, then swap and check each other’s steps.",
      ],
      sc: "Use it when: after 10 minutes of explanation attention drops. Stop and ask pairs to solve one problem and explain their method.",
      act: "Convert one lecture segment you know into a 10-minute pair activity. Write the instruction you would give.",
      quiz: [
        [
          "Which is the most active task?",
          [
            ["Listening silently to a long lecture", "Passive: learners receive but do not use the idea."],
            ["Copying the board word for word", "Copying is passive; it needs little thinking about meaning."],
            ["Solving a problem in pairs and explaining the steps", "Correct. Applying and explaining requires thinking about the idea."],
          ],
          2,
        ],
        [
          "Active learning means the teacher never explains. True?",
          [
            ["True", "Not true. Short explanations are still useful, followed by learner activity."],
            ["False", "Correct. Active learning mixes clear explanation with tasks where learners think and respond."],
          ],
          1,
        ],
      ],
      next: "Try one think-pair-share, then continue to Feedback.",
    },
    {
      n: "Feedback",
      ic: "💬",
      img: "pedagogy-growth",
      def: "Specific, timely information that tells a learner where they are, where they need to be and what to do next.",
      obj: ["Distinguish praise from useful feedback", "Write feedback with a next step", "Give learners time to act on it"],
      why: "Feedback only helps if the learner knows what to change. Vague comments cost teacher time and change nothing.",
      ex: ["“Your steps are clear; check the units in step 3.”", "Two stars and a wish: two things done well and one improvement."],
      sc: "Use it when: returning a draft essay. Mark one or two priorities and set 10 minutes in class to redraft.",
      act: "Rewrite the comment “Try harder” as specific feedback for a task you know.",
      quiz: [
        [
          "Which feedback is most useful?",
          [
            ["“Good job.”", "Kind but gives no information on what to repeat or improve."],
            ["“Your steps are clear; check the units in step 3.”", "Correct. It names a strength and a specific next step."],
            ["“Try harder.”", "Not specific; the learner does not know what to change."],
          ],
          1,
        ],
        [
          "When does feedback help most?",
          [
            ["Weeks after the work is finished", "Late feedback is often ignored because the work is forgotten."],
            ["While the learner can still act on it", "Correct. Timely feedback can be used to improve the work."],
          ],
          1,
        ],
      ],
      next: "Write three specific comments for real work, then continue to Inclusive Teaching.",
    },
    {
      n: "Inclusive Teaching",
      ic: "🤝",
      img: "pedagogy-classroom",
      def: "Planning lessons so learners with different abilities, languages, backgrounds and needs can take part and succeed.",
      obj: ["Offer multiple ways to engage, understand and respond", "Remove avoidable barriers", "Check access before the lesson"],
      why: "Barriers such as small print, fast speech or one response format exclude learners who could otherwise succeed.",
      ex: ["Provide text, audio and a visual for the same instructions.", "Let learners answer by writing, speaking or drawing."],
      sc: "Use it when: a learner with dyslexia struggles with dense slides. Use larger type, short chunks and offer a spoken answer option for everyone.",
      act: "List two barriers in one of your lessons and one change to remove each.",
      quiz: [
        [
          "Which supports inclusion?",
          [
            ["One format for every learner", "A single format excludes learners who cannot use it."],
            ["Text, audio and visual options", "Correct. Multiple means of engagement and expression open the lesson to more learners."],
            ["Skipping accessibility checks", "Unchecked materials create avoidable barriers."],
          ],
          1,
        ],
        [
          "Inclusive adjustments should be only for learners who ask.",
          [
            ["True", "Many learners will not ask; planning for access up front helps everyone."],
            ["False", "Correct. Plan in advance; options often help the whole class."],
          ],
          1,
        ],
      ],
      next: "Now build a lesson plan that applies what you have learned.",
    },
  ];
  const PK = "ilm_ped_v2",
    PLAN0 = { subject: "", topic: "", grade: "", obj: "", method: "", activity: "", materials: "", assess: "", feedback: "", mins: "" };
  const pedGet = () => {
    try {
      const v = JSON.parse(localStorage.getItem(PK));
      if (v && typeof v == "object")
        return {
          ans: v.ans || {},
          act: v.act || {},
          done: v.done || {},
          opened: v.opened || {},
          plan: { ...PLAN0, ...(v.plan || {}) },
          planStep: +v.planStep || 0,
        };
    } catch (e) {}
    return { ans: {}, act: {}, done: {}, opened: {}, plan: { ...PLAN0 }, planStep: 0 };
  };
  let PD = pedGet(),
    PV = { v: "overview", m: 0, err: {} };
  const pedSave = () => {
    try {
      localStorage.setItem(PK, JSON.stringify(PD));
    } catch (e) {
      toast("Could not save in this browser (storage blocked).");
    }
  };
  const pedStat = (i) =>
    PD.done[i]
      ? "Completed"
      : PD.opened[i] || PD.act[i] || PED[i].quiz.some((_, j) => PD.ans[i + ":" + j] != null)
        ? "In progress"
        : "Not started";
  const pedQ = (i) => {
    const t = PED[i].quiz.length,
      a = PED[i].quiz.filter((q, j) => PD.ans[i + ":" + j] != null).length,
      r = PED[i].quiz.filter((q, j) => PD.ans[i + ":" + j] === q[2]).length;
    return { t, a, r };
  };
  const pedBadge = (s) => `<span class="badge ${s == "Completed" ? "" : "o"}">${s == "Completed" ? "✓ " : ""}${s}</span>`;
  const pedPlanDone = () => {
    const p = PD.plan;
    return p.subject && p.topic && p.grade && p.obj && p.method && p.activity && p.assess && p.mins && p.feedback;
  };
  const pedPlanStat = () => (Object.values(PD.plan).some(Boolean) ? (pedPlanDone() ? "Completed" : "In progress") : "Not started");
  const pedTop = () => {
    const d = PED.filter((x, i) => PD.done[i]).length,
      Q = PED.map((x, i) => pedQ(i)),
      r = Q.reduce((s, x) => s + x.r, 0),
      t = Q.reduce((s, x) => s + x.t, 0);
    return `<div class="card" style="margin-bottom:12px"><div class="row sp"><h3 style="margin:0">📈 Your learning progress</h3><span class="badge o">Saved in this browser only</span></div>${bars(
      [
        ["Modules completed", Math.round((d / PED.length) * 100)],
        ["Quiz answers correct", Math.round((r / t) * 100)],
      ],
    )}<p class="mut">${d} of ${PED.length} modules completed · ${PED.length - d} remaining · quiz ${r}/${t} correct · lesson plan: ${pedPlanStat()}. Stored in localStorage on this device; it does not sync across devices or accounts. Pedagogy scores are never mixed into IQ test scores.</p></div>`;
  };
  const pedNav = () =>
    `<nav class="row noprint" aria-label="Pedagogy sections" style="margin-bottom:12px"><button class="btn s ${PV.v == "overview" ? "" : "o"}" data-pd="view:overview">Overview</button><button class="btn s ${PV.v == "plan" ? "" : "o"}" data-pd="view:plan">Lesson plan builder</button><button class="btn s ${PV.v == "summary" ? "" : "o"}" data-pd="view:summary">Final summary</button></nav>`;
  function pedOverview() {
    const nx = PED.findIndex((x, i) => !PD.done[i]),
      started = PED.some((x, i) => pedStat(i) != "Not started");
    return `${pedTop()}${!started ? `<p class="note">New here? Start with module 1. Each module has a lesson, a short activity and a quiz, then you mark it complete.</p>` : ""}<div class="grid">${PED.map((x, i) => `<div class="card"><img class="pic" style="aspect-ratio:auto;height:110px;object-fit:contain;background:#fff" alt="" src="${IM[x.img] || ""}"><h3>${i + 1}. ${x.ic} ${x.n}</h3><p class="mut">${x.def}</p><p>${pedBadge(pedStat(i))}</p><button class="btn s" data-pd="open:${i}">${pedStat(i) == "Not started" ? "Start module" : pedStat(i) == "Completed" ? "Review module" : "Continue"}</button></div>`).join("")}</div><div class="row pedrow">${nx >= 0 ? `<button class="btn s" data-pd="open:${nx}">Continue: ${PED[nx].n}</button>` : `<button class="btn s" data-pd="view:plan">All done → build a lesson plan</button>`}<button class="btn o s" data-pd="view:plan">Lesson plan builder (${pedPlanStat()})</button><button class="btn o s" data-pd="reset">Reset progress</button></div>`;
  }
  function pedModule(i) {
    const m = PED[i],
      q = pedQ(i),
      all = q.a == q.t;
    PD.opened[i] = true;
    pedSave();
    return `<p class="noprint" style="margin:14px 0 6px"><button class="btn s o" data-pd="view:overview">← All modules</button></p><div class="row sp"><h2 style="margin:0">${i + 1}. ${m.ic} ${m.n}</h2>${pedBadge(pedStat(i))}</div>
<div class="card" style="margin:12px 0"><h3>What it means</h3><p>${m.def}</p><h3>Learning objectives</h3><ul>${m.obj.map((o) => `<li>${o}</li>`).join("")}</ul><h3>Why it matters</h3><p>${m.why}</p></div>
<div class="cols2"><div class="card"><h3>Classroom examples</h3><ul>${m.ex.map((o) => `<li>${o}</li>`).join("")}</ul></div><div class="card"><h3>Teaching scenario</h3><p>${m.sc}</p></div></div>
<div class="card" style="margin:12px 0"><h3>✍️ Activity: reflect and plan</h3><label for="pact">${m.act}</label><textarea id="pact" rows="3" maxlength="800" data-i="${i}">${esc(PD.act[i] || "")}</textarea><p class="mut" id="pactm">${PD.act[i] ? "Saved on this device." : "Auto-saves as you type."}</p></div>
<div class="card"><h3>🧠 Quiz (${q.r}/${q.t} correct)</h3>${m.quiz
      .map((x, j) => {
        const a = PD.ans[i + ":" + j];
        return `<fieldset style="border:0;padding:0;margin:0 0 14px"><legend><b>${j + 1}. ${x[0]}</b></legend>${x[1].map((o, k) => `<button class="opt po ${a != null ? (k == x[2] ? "ok" : k == a ? "no" : "") : ""}" data-pd="ans:${i}:${j}:${k}" ${a != null ? 'aria-disabled="true"' : ""}>${o[0]}${a != null && k == x[2] ? " ✓" : a == k ? " ✗" : ""}</button>`).join("")}${a != null ? `<div class="note" role="status"><b>${a == x[2] ? "✓ Correct." : "✗ Not quite."}</b> ${x[1][a][1]}${a != x[2] ? ` <b>Right answer:</b> ${x[1][x[2]][0]} — ${x[1][x[2]][1]}` : ""} <button class="btn s o" data-pd="retry:${i}:${j}">Try again</button></div>` : ""}</fieldset>`;
      })
      .join("")}</div>
<div class="card" style="margin:12px 0"><h3>Complete this module</h3><p class="mut">${all ? "You answered every quiz question. Mark the module complete when you feel you understand it." : "Answer all quiz questions to enable completion."}</p><div class="row"><button class="btn g" data-pd="done:${i}" ${all || PD.done[i] ? "" : "disabled"}>${PD.done[i] ? "✓ Completed (click to undo)" : "Mark as completed"}</button></div><p><b>Suggested next step:</b> ${m.next}</p></div>
<div class="row sp noprint"><button class="btn o" data-pd="view:overview">← All modules</button>${i < PED.length - 1 ? `<button class="btn" data-pd="open:${i + 1}">Next module: ${PED[i + 1].n} →</button>` : `<button class="btn" data-pd="view:plan">Create a lesson plan →</button>`}</div>`;
  }
  const PSTEPS = [
    [
      "Subject, grade and time",
      [
        ["subject", "Subject", "input", "e.g. Mathematics", 1],
        ["topic", "Topic", "input", "e.g. Adding fractions", 1],
        ["grade", "Class / grade level", "input", "e.g. Grade 6", 1],
        ["mins", "Lesson duration (minutes)", "number", "e.g. 40", 1],
      ],
    ],
    [
      "Objectives and method",
      [
        ["obj", "Learning objectives", "textarea", "What will learners be able to do by the end?", 1],
        ["method", "Teaching method", "select", "", 1],
      ],
    ],
    [
      "Activity and resources",
      [
        ["activity", "Classroom activity", "textarea", "What will learners do, step by step?", 1],
        ["materials", "Learning materials / resources", "textarea", "Optional: worksheets, whiteboards, slides…", 0],
      ],
    ],
    [
      "Assessment and feedback",
      [
        ["assess", "Assessment method", "textarea", "How will you check learning?", 1],
        ["feedback", "Feedback and improvement strategy", "textarea", "How will learners get feedback and act on it?", 1],
      ],
    ],
  ];
  const pedField = (f) => {
    const [k, l, t, ph, req] = f,
      v = PD.plan[k] || "",
      er = PV.err[k];
    const c =
      t == "textarea"
        ? `<textarea id="pl-${k}" data-pl="${k}" rows="3" maxlength="900" placeholder="${esc(ph)}" ${req ? 'aria-required="true"' : ""} ${er ? 'aria-invalid="true"' : ""}>${esc(v)}</textarea>`
        : t == "select"
          ? `<select id="pl-${k}" data-pl="${k}" aria-required="true"><option value="">Choose…</option>${PED.map((x) => x.n)
              .concat(["Direct instruction", "Group project", "Other"])
              .map((o) => `<option ${v == o ? "selected" : ""}>${esc(o)}</option>`)
              .join("")}</select>`
          : `<input id="pl-${k}" data-pl="${k}" type="${t == "number" ? "number" : "text"}" ${t == "number" ? 'min="5" max="240"' : 'maxlength="120"'} placeholder="${esc(ph)}" value="${esc(v)}" ${req ? 'aria-required="true"' : ""} ${er ? 'aria-invalid="true"' : ""}>`;
    return `<div style="margin-bottom:10px"><label for="pl-${k}">${l}${req ? " *" : ""}</label>${c}${er ? `<p style="color:#b42318;margin:2px 0" role="alert">${er}</p>` : ""}</div>`;
  };
  const planText = () => {
    const p = PD.plan;
    return `LESSON PLAN\nSubject: ${p.subject}\nTopic: ${p.topic}\nClass / grade: ${p.grade}\nDuration: ${p.mins} minutes\n\nLearning objectives:\n${p.obj}\n\nTeaching method: ${p.method}\n\nClassroom activity:\n${p.activity}\n\nMaterials / resources:\n${p.materials || "Not specified"}\n\nAssessment:\n${p.assess}\n\nFeedback and improvement:\n${p.feedback}\n\nCreated with ILM ORA lesson plan builder (template-based, no AI generation).`;
  };
  function pedPlan() {
    const s = PD.planStep;
    const prev = s == 4;
    if (prev) {
      const p = PD.plan,
        rows = [
          ["Subject", p.subject],
          ["Topic", p.topic],
          ["Class / grade", p.grade],
          ["Duration", p.mins + " minutes"],
          ["Learning objectives", p.obj],
          ["Teaching method", p.method],
          ["Classroom activity", p.activity],
          ["Materials", p.materials || "Not specified"],
          ["Assessment", p.assess],
          ["Feedback and improvement", p.feedback],
        ];
      return `<div class="card" id="planprev"><h2>Lesson plan preview</h2><table class="cmp">${rows.map((r) => `<tr><th scope="row" style="width:32%">${r[0]}</th><td style="white-space:pre-wrap">${esc(r[1])}</td></tr>`).join("")}</table><p class="mut">Built from your inputs with a fixed template. No AI is used. Saved as a draft in this browser.</p></div><div class="row noprint" style="margin-top:12px"><button class="btn o" data-pd="pstep:0">✎ Edit plan</button><button class="btn" data-pd="copy">Copy</button><button class="btn" data-pd="print">Print / save as PDF</button><button class="btn" data-pd="dl">Download .txt</button><button class="btn g" data-pd="view:summary">Finish → summary</button></div>`;
    }
    const st = PSTEPS[s];
    return `<div class="card"><p class="mut">Step ${s + 1} of 5 · draft is saved automatically in this browser</p><div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${s + 1}" style="margin:6px 0 12px"><i style="width:${((s + 1) / 5) * 100}%"></i></div><h2>${st[0]}</h2>${st[1].map(pedField).join("")}<div class="row sp"><button class="btn o" data-pd="pstep:${s - 1}" ${s == 0 ? "disabled" : ""}>← Back</button><button class="btn" data-pd="pnext">${s == 3 ? "Preview plan →" : "Next →"}</button></div></div>`;
  }
  function pedSummary() {
    const d = PED.filter((x, i) => PD.done[i]).length;
    return `${pedTop()}<div class="card"><h3>Final learning summary</h3><table class="cmp"><tr><th>Module</th><th>Status</th><th>Quiz</th></tr>${PED.map(
      (x, i) => {
        const q = pedQ(i);
        return `<tr><td>${x.n}</td><td>${pedStat(i)}</td><td>${q.r}/${q.t}</td></tr>`;
      },
    ).join(
      "",
    )}<tr><td>Lesson plan</td><td>${pedPlanStat()}</td><td>—</td></tr></table><p>${d == PED.length && pedPlanDone() ? "🎉 You have completed every module and a lesson plan." : "Next: " + (d < PED.length ? "finish the remaining modules." : "complete the lesson plan.")}</p><p class="row"><button class="btn" data-pd="view:overview">Back to modules</button><button class="btn o" data-pd="view:plan">Lesson plan</button><a class="btn o" href="#/iq-test">Go to IQ Test (separate module)</a></p></div>`;
  }
  function pedRender() {
    const v = $("#pedv");
    if (!v) return;
    const h =
      PV.v == "module"
        ? pedModule(PV.m)
        : PV.v == "plan"
          ? `${pedTop()}${pedNav()}${pedPlan()}`
          : PV.v == "summary"
            ? pedNav() + pedSummary()
            : pedNav() + pedOverview();
    v.innerHTML = h;
    const a = v.querySelector("[autofocus]");
  }
  P.pedagogy = () =>
    `${head("Pedagogy", "Five teaching and learning methods with lessons, activities, quizzes and a lesson-plan builder — separate from IQ test scoring.", "Pedagogy")}<div id="pedv" aria-live="polite">${PV.v == "module" ? pedModule(PV.m) : PV.v == "plan" ? pedTop() + pedNav() + pedPlan() : PV.v == "summary" ? pedNav() + pedSummary() : pedNav() + pedOverview()}</div>`;
  function pedPrintDone() {
    document.body.classList.remove("pp");
    const r = $("#printroot");
    if (r) r.innerHTML = "";
  }
  function pedPrint(go) {
    const e = $("#planprev");
    if (!e) return;
    $("#printroot").innerHTML = `<h1>Lesson plan</h1>` + e.innerHTML.replace(/<h2>Lesson plan preview<\/h2>/, "");
    document.body.classList.add("pp");
    if (go) window.print();
  }
  __WL("afterprint", pedPrintDone);
  ["pointerdown", "keydown", "hashchange"].forEach((t) =>
    __WL(t, () => {
      if (document.body.classList.contains("pp") && !matchMedia("print").matches) setTimeout(pedPrintDone, 300);
    }),
  );
  function pedAct(s) {
    const [a, x, y, z] = s.split(":");
    const f = () => {
      pedSave();
      pedRender();
      $("#app").scrollIntoView({ block: "start" });
    };
    if (a == "view") {
      PV.v = x;
      PV.err = {};
      f();
    } else if (a == "open") {
      PV.v = "module";
      PV.m = +x;
      f();
    } else if (a == "ans") {
      const k = x + ":" + y;
      if (PD.ans[k] == null) {
        PD.ans[k] = +z;
        pedSave();
        pedRender();
      }
    } else if (a == "retry") {
      delete PD.ans[x + ":" + y];
      pedSave();
      pedRender();
    } else if (a == "done") {
      PD.done[x] = !PD.done[x];
      toast(PD.done[x] ? "Module marked as completed." : "Completion removed.");
      pedSave();
      pedRender();
    } else if (a == "pstep") {
      PD.planStep = Math.max(0, +x);
      PV.err = {};
      f();
    } else if (a == "pnext") {
      const st = PSTEPS[PD.planStep],
        er = {};
      st[1].forEach((fl) => {
        const v = String(PD.plan[fl[0]] || "").trim();
        if (fl[4] && !v) er[fl[0]] = "This field is required.";
        else if (fl[0] == "mins" && v && (+v < 5 || +v > 240)) er.mins = "Enter 5–240 minutes.";
      });
      PV.err = er;
      if (Object.keys(er).length) {
        pedSave();
        pedRender();
        const e = __R.querySelector("[aria-invalid=true]");
        e && e.focus();
        toast("Please fix the highlighted fields.");
        return;
      }
      PD.planStep++;
      f();
    } else if (a == "copy") {
      const t = planText();
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
        () => toast("Lesson plan copied."),
        () => {
          const ta = document.createElement("textarea");
          ta.value = t;
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            toast("Lesson plan copied.");
          } catch (e) {
            toast("Copy failed — select the text manually.");
          }
          ta.remove();
        },
      );
    } else if (a == "print") {
      pedPrint(true);
    } else if (a == "dl") {
      const u = URL.createObjectURL(new Blob([planText()], { type: "text/plain" })),
        l = document.createElement("a");
      l.href = u;
      l.download = "lesson-plan.txt";
      document.body.appendChild(l);
      l.click();
      l.remove();
      setTimeout(() => URL.revokeObjectURL(u), 500);
    } else if (a == "reset") {
      if (confirm("Reset all pedagogy progress, notes and the lesson-plan draft on this device? This cannot be undone.")) {
        PD = { ans: {}, act: {}, done: {}, opened: {}, plan: { ...PLAN0 }, planStep: 0 };
        PV = { v: "overview", m: 0, err: {} };
        pedSave();
        pedRender();
        toast("Pedagogy progress reset.");
      }
    }
  }
  __LST("click", (e) => {
    const b = e.target.closest("[data-pd]");
    if (!b || !$("#pedv") || b.disabled || b.getAttribute("aria-disabled") == "true") return;
    if (b.tagName == "A") e.preventDefault();
    pedAct(b.dataset.pd);
  });
  __LST("input", (e) => {
    const t = e.target;
    if (!$("#pedv")) return;
    if (t.id == "pact") {
      PD.act[t.dataset.i] = t.value;
      pedSave();
      $("#pactm").textContent = "Saved on this device.";
    } else if (t.dataset && t.dataset.pl) {
      PD.plan[t.dataset.pl] = t.value;
      pedSave();
    }
  });
  __LST("change", (e) => {
    if ($("#pedv") && e.target.dataset && e.target.dataset.pl) {
      PD.plan[e.target.dataset.pl] = e.target.value;
      pedSave();
    }
  });
  P.programs = () => {
    const r = S.done ? score() : null;
    const low = r ? Object.keys(CATS).sort((a, b) => r.sec[a].c / r.sec[a].n - r.sec[b].c / r.sec[b].n)[0] : null;
    return `${head("Learning Programs", "Personalised suggestions from your goal, level" + (r ? " and assessment results." : ". Take the test for result-based tips."), "Programs")}<form class="card row" id="pf"><div style="flex:1;min-width:180px"><label for="pg">Goal</label><select id="pg"><option>Improve reasoning</option><option>Prepare for exams</option><option>Build study skills</option></select></div><div style="flex:1;min-width:180px"><label for="pl">Level</label><select id="pl"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><button class="btn g" style="align-self:end">Update plan</button></form>${r ? `<p class="note" style="margin-top:12px">Focus area from your results: <b>${CATS[low]}</b></p>` : ""}<div id="plan" class="grid" style="margin-top:16px"></div>`;
  };
  function plan() {
    const g = $("#pg").value,
      l = $("#pl").value;
    const m = { "Improve reasoning": "Reasoning", "Prepare for exams": "Skills", "Build study skills": "Skills" }[g];
    let cs = COURSES.filter((c) => c.lvl == l && (c.cat == m || c.cat == "Language" || c.cat == "Maths")).slice(0, 4);
    if (!cs.length) cs = COURSES.filter((c) => c.lvl == l).slice(0, 3);
    $("#plan").innerHTML = cs
      .map(
        (c) =>
          `<div class="card"><span class="badge">${c.cat}</span><h3>${c.t}</h3><p class="mut">${c.wk} weeks · ${c.lvl}</p><a class="btn s" href="#/courses">View course</a></div>`,
      )
      .join("");
  }
  const CF = { q: "", cat: "All", lvl: "All" };
  P.courses = () =>
    `${head("Courses", "Search and filter the catalogue.", "Courses")}<div class="card row"><div style="flex:2;min-width:200px"><label for="cq">Search</label><input id="cq" type="search" value="${esc(CF.q)}"></div><div style="flex:1"><label for="cc">Category</label><select id="cc">${["All", "Reasoning", "Language", "Maths", "Skills"].map((x) => `<option ${CF.cat == x ? "selected" : ""}>${x}</option>`).join("")}</select></div><div style="flex:1"><label for="cl">Level</label><select id="cl">${["All", "Beginner", "Intermediate", "Advanced"].map((x) => `<option ${CF.lvl == x ? "selected" : ""}>${x}</option>`).join("")}</select></div></div><p class="mut" id="cn" aria-live="polite"></p><div class="grid" id="cl2"></div>`;
  function courseList() {
    const f = COURSES.filter(
      (c) => (CF.cat == "All" || c.cat == CF.cat) && (CF.lvl == "All" || c.lvl == CF.lvl) && c.t.toLowerCase().includes(CF.q.toLowerCase()),
    );
    $("#cn").textContent = f.length + " course(s)";
    $("#cl2").innerHTML = f.length
      ? f
          .map(
            (c) =>
              `<div class="card">${thumb(c.cat)}<span class="badge">${c.cat}</span> <span class="badge o">${c.lvl}</span><h3 style="margin-top:8px">${c.t}</h3><p class="mut">${c.wk} weeks · self-paced</p><button class="btn s" data-course="${c.id}">Details</button></div>`,
          )
          .join("")
      : `<div class="card">No courses match. Try clearing filters.</div>`;
  }
  P.student = () =>
    `${head("Student Hub", "Your history, progress and saved items (demo data).", "Student")}<div class="card" style="margin-bottom:16px">${person(S.user || "Aisha", "Student · demo profile", 0, 72)}</div><div class="grid"><div class="card"><h3>Assessment history</h3>${S.done ? `<p>IQ practice test – ${score().c}/${Q.length} correct <a href="#/report">report</a></p>` : `<p class="mut">No completed tests yet.</p><a class="btn s" href="#/instructions">Take a test</a>`}</div><div class="card"><h3>Progress</h3>${bars(
      [
        ["Logic Foundations", 70],
        ["Number Sense", 40],
        ["Study Skills", 90],
      ],
    )}</div><div class="card"><h3>Recommended</h3><ul><li><a href="#/courses">Pattern Spotting</a></li><li><a href="#/blog">Verbal reasoning tips</a></li></ul></div><div class="card"><h3>Saved resources</h3><ul><li>Number sequence practice</li><li>Spatial puzzles worksheet</li></ul></div><div class="card"><h3>Certificates</h3><p class="mut">Sample placeholder – none issued.</p></div></div>`;
  P.trainer = () =>
    `${head("Trainer Hub", "Resources and learner overview (sample data).", "Trainer")}<div class="grid"><div class="card"><h3>Learner progress</h3><table><tr><th>Learner</th><th>Progress</th></tr>${[
      ["Aisha", 82],
      ["Rahul", 64],
      ["Maria", 47],
    ]
      .map(
        (x, i) =>
          `<tr><td>${person(x[0], "Learner", i * 2 + 1, 36)}</td><td style="min-width:90px">${bars([["", x[1]]]).replace("110px", "0")}</td></tr>`,
      )
      .join(
        "",
      )}</table></div><div class="card"><h3>Teaching resources</h3><ul><li><a href="#/pedagogy">Pedagogy guides</a></li><li><a href="#/blog">Worksheets</a></li></ul></div><div class="card"><h3>Create assessment</h3><p class="mut">Placeholder – authoring needs a backend.</p><button class="btn s" data-act="soon">New assessment <span class="badge o">Needs backend</span></button></div></div>`;
   P.managerOld = () =>
    `${head("Manager Hub", "Aggregate, privacy-aware analytics (sample data). Groups under 5 people are hidden.", "Manager")}<div class="grid"><div class="card"><h3>Completion rate</h3>${donut(78)}</div><div class="card"><h3>Avg. progress</h3>${donut(61, "#F97316")}</div><div class="card"><h3>Active teams</h3><div class="big">4</div></div></div><div class="card" style="margin-top:16px"><h2>Team summaries</h2>${bars(
      [
        ["Team North", 84],
        ["Team South", 71],
        ["Team East", 58],
        ["Team West", 66],
      ],
    )}</div><div class="card" style="margin-top:16px"><h2>Monthly completion trend</h2><svg viewBox="0 0 300 100" style="width:100%" role="img" aria-label="Completion trend rising from 52 to 78 percent"><polyline fill="none" stroke="#16A34A" stroke-width="3" points="10,70 70,60 130,52 190,40 250,28 290,22"/><g fill="#F97316">${[
      [10, 70],
      [70, 60],
      [130, 52],
      [190, 40],
      [250, 28],
      [290, 22],
    ]
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4"/>`)
      .join("")}</g></svg></div>`;
    /* ===== MODERN CHARTS: animated donut, sparkline, trend, team bars ===== */
  let DN = 0;
  const donut = (p, col) => {
    const id = "dg" + ++DN,
      c1 = col || "#16A34A",
      c2 = col ? "#fdba74" : "#86efac";
    return `<svg class="dn" viewBox="0 0 100 100" width="130" role="img" aria-label="${p}%"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" opacity=".12" stroke-width="10"/><circle class="dn-arc" cx="50" cy="50" r="40" fill="none" stroke="url(#${id})" stroke-width="10" stroke-linecap="round" style="--v:${(p * 2.513).toFixed(1)}" transform="rotate(-90 50 50)"/><text x="50" y="57" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor">${p}%</text></svg>`;
  };
  const spark = (v, c) => {
    const w = 120,
      h = 44,
      mx = Math.max(...v),
      mn = Math.min(...v);
    const pts = v.map((x, i) => [(i * (w - 8)) / (v.length - 1) + 4, h - 6 - ((x - mn) / (mx - mn || 1)) * (h - 14)]);
    const d = pts.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" ");
    return `<svg class="spk" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path class="tl-area" d="${d} L${w - 4} ${h} L4 ${h}Z" fill="${c}" opacity=".16"/><path class="tl-line" pathLength="1" d="${d}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };
  const trendChart = () => {
    const m = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      v = [52, 58, 63, 70, 74, 78];
    const W = 640,
      H = 250,
      L = 46,
      R = 22,
      T = 22,
      B = 38;
    const x = (i) => L + (i * (W - L - R)) / (v.length - 1),
      y = (n) => T + (1 - (n - 40) / 50) * (H - T - B);
    const P2 = v.map((n, i) => [x(i), y(n)]);
    let d = "M" + P2[0][0] + " " + P2[0][1];
    for (let i = 1; i < P2.length; i++) {
      const a = P2[i - 1],
        b = P2[i],
        cx = (a[0] + b[0]) / 2;
      d += ` C${cx} ${a[1]} ${cx} ${b[1]} ${b[0]} ${b[1]}`;
    }
    const area = d + ` L${P2[P2.length - 1][0]} ${H - B} L${P2[0][0]} ${H - B}Z`;
    const grid = [40, 55, 70, 85]
      .map(
        (n) =>
          `<line x1="${L}" x2="${W - R}" y1="${y(n)}" y2="${y(n)}" stroke="currentColor" opacity=".12" stroke-dasharray="4 6"/><text x="${L - 8}" y="${y(n) + 4}" text-anchor="end" font-size="11" fill="currentColor" opacity=".55">${n}%</text>`,
      )
      .join("");
    const labels = m.map((s, i) => `<text x="${x(i)}" y="${H - 12}" text-anchor="middle" font-size="12" fill="currentColor" opacity=".6">${s}</text>`).join("");
    const dots = P2.map(
      (q, i) =>
        `<g class="tp" style="--d:${(0.9 + i * 0.12).toFixed(2)}s"><circle class="tp-p" cx="${q[0]}" cy="${q[1]}" r="9" fill="#F97316" opacity=".25"/><circle cx="${q[0]}" cy="${q[1]}" r="5" fill="var(--card)" stroke="#F97316" stroke-width="3"/><circle cx="${q[0]}" cy="${q[1]}" r="18" fill="transparent"/><g class="tt"><rect x="${q[0] - 28}" y="${q[1] - 42}" width="56" height="26" rx="8" fill="var(--ink)"/><text x="${q[0]}" y="${q[1] - 24}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--bg)">${v[i]}%</text></g></g>`,
    ).join("");
    return `<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly completion trend rising from 52 to 78 percent"><defs><linearGradient id="tgl" gradientUnits="userSpaceOnUse" x1="${L}" y1="0" x2="${W - R}" y2="0"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#16A34A"/></linearGradient><linearGradient id="tga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16A34A" stop-opacity=".28"/><stop offset="1" stop-color="#16A34A" stop-opacity="0"/></linearGradient></defs>${grid}<path class="tl-area" d="${area}" fill="url(#tga)"/><path class="tl-line" pathLength="1" d="${d}" fill="none" stroke="url(#tgl)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${labels}${dots}</svg>`;
  };
  P.manager = () => {
    const kpi = (ic, t, dl, viz, c) =>
      `<div class="card kpi" style="--kc:${c}"><div class="kpi-l"><span class="kpi-i">${ic}</span><small>${t}</small>${dl}</div>${viz}</div>`;
    const teams = [
      ["Team North", 84, "#F97316"],
      ["Team South", 71, "#16A34A"],
      ["Team East", 58, "#6366f1"],
      ["Team West", 66, "#0ea5e9"],
    ];
    const rows = teams
      .map(
        (t, i) =>
          `<div class="tm"><div class="tm-h"><span class="tm-n"><i style="background:${t[2]}"></i>${t[0]}</span><b>${t[1]}%</b></div><div class="tm-b"><span class="tm-f" style="--w:${t[1]}%;--c:${t[2]};--d:${(i * 0.12).toFixed(2)}s"></span></div></div>`,
      )
      .join("");
    return `${head("Manager Hub", "Aggregate, privacy-aware analytics (sample data). Groups under 5 people are hidden.", "Manager")}
<div class="mgk">${kpi("🎯", "Completion rate", `<span class="dlt">▲ 6% vs last month</span>`, donut(78), "#16A34A")}${kpi("📈", "Avg. progress", `<span class="dlt">▲ 4% vs last month</span>`, donut(61, "#F97316"), "#F97316")}${kpi("👥", "Active teams", `<b class="big">4</b><span class="dlt">All teams active</span>`, spark([2, 3, 3, 4, 4, 4], "#6366f1"), "#6366f1")}</div>
<div class="mgr"><div class="card"><div class="row sp"><h2>Team summaries</h2><span class="badge">Sample data</span></div>${rows}</div><div class="card"><div class="row sp"><h2>Monthly completion trend</h2><span class="badge o">▲ +26 pts in 6 months</span></div>${trendChart()}</div></div>`;
  };
  const BP = { n: 1, q: "", tag: "All" };
  P.blog = () =>
    `${head("Resources", "Articles, guides, videos and worksheets.", "Resources")}<div class="blog-pic">${img("blog", "Learning resources")}</div><div class="card row rescmp" style="margin-top:8px"><div style="flex:2;min-width:200px"><label for="bq">Search</label><input id="bq" type="search" value="${esc(BP.q)}"></div><div style="flex:1"><label for="bt">Type</label><select id="bt">${["All", ...TAGS].map((x) => `<option ${BP.tag == x ? "selected" : ""}>${x}</option>`).join("")}</select></div></div><div class="grid" id="bl" style="margin-top:14px"></div><div class="row" id="bp" style="margin:16px 0;justify-content:center"></div>`;
  function blogList() {
    const f = ARTS.filter((a) => (BP.tag == "All" || a.tag == BP.tag) && a.t.toLowerCase().includes(BP.q.toLowerCase()));
    const pages = Math.max(1, Math.ceil(f.length / 6));
    BP.n = Math.min(BP.n, pages);
    $("#bl").innerHTML = f.length
      ? f
          .slice((BP.n - 1) * 6, BP.n * 6)
          .map(
            (a) =>
              `<article class="card"><span class="badge">${a.tag}</span><h3 style="margin-top:8px">${a.t}</h3><button class="btn s o" data-act="soon">Read <span class="badge o">Needs backend</span></button></article>`,
          )
          .join("")
      : `<div class="card">No results.</div>`;
    $("#bp").innerHTML = Array.from(
      { length: pages },
      (_, i) => `<button class="btn s ${i + 1 == BP.n ? "" : "o"}" data-pg="${i + 1}" aria-label="Page ${i + 1}">${i + 1}</button>`,
    ).join("");
  }
  P.about = () =>
    `${head("About Us", "Mission, vision and values.", "About")}<div class="g2"><div class="card"><h3>Mission</h3><p>Make learning and assessment clearer, fairer and more useful.</p><h3>Vision</h3><p>Every learner sees a next step they can act on.</p></div>${img("team", "The ILM ORA team")}</div><div class="grid" style="margin-top:16px">${["Integrity", "Inclusion", "Curiosity", "Impact"].map((v) => `<div class="card"><h3>${v}</h3></div>`).join("")}</div><h2 style="margin-top:24px">Team</h2><div class="grid">${[
      ["Founder & CEO", "Sample"],
      ["Head of Learning Science", "Sample"],
      ["Lead Engineer", "Sample"],
      ["Community Lead", "Sample"],
    ]
      .map(
        (n, i) =>
          `<div class="card" style="text-align:center"><div style="display:flex;justify-content:center">${av("Team " + (i + 1), i + 1, 96)}</div><b>Team member ${i + 1}</b><p class="mut">${n[0]} (placeholder – replace)</p></div>`,
      )
      .join("")}</div>`;
  P.faq = () =>
    `${head("FAQ", "Search common questions.", "FAQ")}<div class="g2" style="align-items:start"><div><label for="fq">Search FAQs</label><input id="fq" type="search"><div id="fl" aria-live="polite" style="margin-top:12px"></div></div>${img("faq", "FAQ illustration")}</div>`;
  function faqList(q) {
    const f = FAQS.filter((x) => (x[0] + x[1]).toLowerCase().includes(q.toLowerCase()));
    $("#fl").innerHTML = f.length
      ? f.map((x) => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join("")
      : "<p>No matching questions.</p>";
  }
    P.contact = () =>
    `${head("Contact Us", "Send us a message.", "Contact")}<div class="g2 cgrid"><form class="card" id="cf" novalidate><label for="cn1">Name</label><input id="cn1" autocomplete="name"><div class="err"></div><label for="ce1">Email</label><input id="ce1" type="email" autocomplete="email"><div class="err"></div><label for="cm">Message</label><textarea id="cm" rows="4"></textarea><div class="err"></div><button class="btn" style="margin-top:10px">Send message</button><p class="mut" style="font-size:.82rem">We will email you a verification link. Your message reaches us after you click it.</p></form><div class="card cdet"><h3>Contact details</h3><p class="mut">${["contactEmail", "contactPhone", "address"].map((k) => (CONFIG[k] ? esc(CONFIG[k]) : "")).join("<br>") || "Not configured. Set values in CONFIG (project settings)."}</p><div id="cs" role="status"></div></div></div>`;
 
  
  let DT = "Profile";
  /* ===== ROUTER ===== */
  const TITLES = {
    home: "Home",
    "iq-test": "IQ Test Overview",
    instructions: "Test Instructions",
    test: "Take Test",
    results: "Results",
    report: "Detailed Report",
    practice: "Practice Mode",
  };
  /*route moved below*/
  __WL("hashchange", route);
  __WL("beforeunload", (e) => {
    if (S.started && !S.done) save();
  });
  /* ===== EVENTS ===== */
  const go = (h) => (location.hash = h);
  function redraw() {
    const y = scrollY,
      f = document.activeElement,
      k = f && (f.dataset.act ? `[data-act="${f.dataset.act}"]` : f.dataset.go != null ? `[data-go="${f.dataset.go}"]` : null);
    $("#app").innerHTML = qView();
    scrollTo(0, y);
    if (k) {
      const n = $("#app").querySelector(k);
      if (n && !n.disabled) n.focus();
    }
  }
  __LST("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const a = b.dataset.act;
        if (b.dataset.go != null) {
      const t = +b.dataset.go;
      qGo(t, t >= S.i ? 1 : -1);
    }
    if (b.dataset.pg) {
      BP.n = +b.dataset.pg;
      blogList();
    }
        if (a == "eye") {
      const p = $("#ap");
      p.type = p.type == "password" ? "text" : "password";
    }
    if (a == "logout") {
      S.user = null;
      save();
      route();
      toast("Logged out.");
    }
    if (b.dataset.course != null) {
      const c = COURSES[b.dataset.course];
      const d = $("#dlg");
      d.innerHTML = `<h2>${c.t}</h2><p><span class="badge">${c.cat}</span> <span class="badge o">${c.lvl}</span></p><p>${c.wk} weeks, self-paced. Sample course description (replace with real content).</p><div class="row"><button class="btn g" data-act="enroll">Enroll <span class="badge o">Needs backend</span></button><button class="btn o" data-act="close">Close</button></div>`;
      d.showModal();
    }
    if (!a) return;
        if (a == "prev" && S.i > 0 && !S.done) qGo(S.i - 1, -1);
    if (a == "next" && S.i < Q.length - 1 && !S.done) qGo(S.i + 1, 1);
    if (a == "flag" && !S.done && !LOCK) {
      const id = Q[S.i].id;
      S.flag[id] = !S.flag[id];
      save();
      redraw();
    }
        if (a == "clear" && !S.done && !LOCK) {
      delete S.ans[Q[S.i].id];
      save();
      redraw();
    }
    if (a == "submit" && !S.done) {
      const un = Q.length - Object.keys(S.ans).length,
        fl = Object.values(S.flag).filter(Boolean).length;
      const d = $("#dlg");
      d.innerHTML = `<h2>Submit test?</h2><p>${un ? `<b>${un}</b> unanswered (counted as not correct). ` : "All questions answered. "}${fl ? `<b>${fl}</b> marked for review. ` : ""}You cannot change answers after submitting.</p><div class="row"><button class="btn g" data-act="confirm">Submit now</button><button class="btn o" data-act="close">Keep working</button></div>`;
      d.showModal();
    }
    if (a == "confirm") {
      $("#dlg").close();
      finish(false);
    }
    if (a == "begin") {
      $("#dlg").close();
      S = { ...fresh(), started: true };
      startAttempt();
    }
    if (a == "close") $("#dlg").close();
    if (a == "enroll") {
      $("#dlg").close();
      toast("Enrollment needs a backend. Nothing was enrolled or saved.");
    }
    if (a == "restart") {
      if (confirm("Start a fresh attempt? Current answers will be cleared. Saved attempt summaries are not affected.")) {
        clearInterval(tick);
        S = fresh();
        applyCfg();
        save();
        go("#/instructions");
        route();
      }
    }
    if (a == "clearhist") {
      HIST.clear();
      toast("Saved attempt summaries cleared from this browser.");
      route();
    }
    if (a == "rev") {
      go("#/report");
      setTimeout(() => {
        const x = $("#rv");
        x && x.scrollIntoView();
      }, 80);
    }
    if (a == "print") print();
    if (a == "soon") toast("This needs a backend or content source and is not available in this frontend-only build.");
    if (a == "eye") {
      const p = $("#ap");
      p.type = p.type == "password" ? "text" : "password";
    }
    if (a == "logout") {
      S.user = null;
      save();
      route();
      toast("Logged out.");
    }
  });
  __LST("change", (e) => {
        if (e.target.name == "q" && !S.done && tleft() > 0) {
      const cq = Q[S.i];
      if (LOCK) {
        /* mid-transition: ignore, restore the saved choice */
        __R.querySelectorAll("input[name=q]").forEach((r, i) => (r.checked = S.ans[cq.id] === i));
        return;
      }
      S.ans[cq.id] = +e.target.value;
      save();
      qGo(S.i < Q.length - 1 ? S.i + 1 : S.i, 1, e.target.closest("label"));
    }
    if (e.target.id == "cc") {
      CF.cat = e.target.value;
      courseList();
    }
    if (e.target.id == "cl") {
      CF.lvl = e.target.value;
      courseList();
    }
    if (e.target.id == "bt") {
      BP.tag = e.target.value;
      BP.n = 1;
      blogList();
    }
  });
  __LST("input", (e) => {
    if (e.target.id == "cq") {
      CF.q = e.target.value;
      courseList();
    }
    if (e.target.id == "bq") {
      BP.q = e.target.value;
      BP.n = 1;
      blogList();
    }
    if (e.target.id == "fq") faqList(e.target.value);
  });
    function contactDemo(f, name, email, message, out) {
    try {
      const k = "ilm_contact_outbox";
      const box = JSON.parse(localStorage.getItem(k) || "[]");
      box.push({ name, email, message, at: Date.now() });
      localStorage.setItem(k, JSON.stringify(box.slice(-20)));
    } catch (e) {}
    f.reset();
    out.innerHTML = `<div class="cok" role="status"><b>✅ Message submitted successfully!</b><p style="margin:.3em 0 0">Thank you, ${esc(name)}. We will reply to <b>${esc(email)}</b>.</p><p class="mut" style="margin:.3em 0 0;font-size:.8rem">Demo mode: saved on this device until the email service is connected.</p></div>`;
    out.scrollIntoView({ block: "nearest", behavior: "smooth" });
    toast("Message submitted.");
  }
  async function sendContact(f, name, email, message) {
    const out = $("#cs"),
      btn = f.querySelector("button");
    btn.disabled = true;
    out.innerHTML = `<p class="note">Sending…</p>`;
    try {
           const res = await fetch(CONFIG.contactApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 404) return contactDemo(f, name, email, message, out);
      if (!res.ok) throw new Error(data.error || "Could not send. Please try again.");
      f.reset();
    out.innerHTML = `<div class="cok" role="status"><b>✅ Message submitted successfully!</b><p style="margin:.3em 0 0">Check your email (${esc(email)}) and click the verification link. Your message reaches us after you verify.</p></div>`;
    } catch (err) {
      out.innerHTML = `<p class="err">${esc(err.message || "Could not send. Please try again.")}</p>`;
    } finally {
      btn.disabled = false;
    }
  }
  const fail = (el, m) => {
    el.nextElementSibling.textContent = m;
    el.setAttribute("aria-invalid", "true");
    return 1;
  };
  const clr = (f) =>
    f.querySelectorAll("input,textarea").forEach((i) => {
      i.removeAttribute("aria-invalid");
      if (i.nextElementSibling && i.nextElementSibling.className == "err") i.nextElementSibling.textContent = "";
    });
  __LST("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.id == "consent") {
      cfgSync();
      if (!CFG.cats.length || !pool(CFG).length) {
        $("#ce").textContent = "Choose at least one category with matching questions.";
        return;
      }
      if (!$("#ck").checked) {
        $("#ce").textContent = "Please tick the box to continue.";
        return;
      }
      const d = $("#dlg");
      d.innerHTML = `<h2>Start the timed test?</h2><p>${Math.min(CFG.n, pool(CFG).length)} questions. The <b>${cfgMins({ ...CFG, n: Math.min(CFG.n, pool(CFG).length) })}-minute</b> timer starts as soon as you confirm and keeps running if you refresh or leave the page. Make sure you have uninterrupted time.</p><div class="row"><button class="btn g" data-act="begin">Yes, start now</button><button class="btn o" data-act="close">Not yet</button></div>`;
      d.showModal();
    }
    if (f.id == "pf") plan();
    if (f.id == "cf") {
      clr(f);
      let n = 0;
      const a = $("#cn1"),
        m = $("#ce1"),
        t = $("#cm");
      if (!a.value.trim()) n += fail(a, "Please enter your name.");
      if (!/^\S+@\S+\.\S+$/.test(m.value)) n += fail(m, "Enter a valid email.");
      if (t.value.trim().length < 10) n += fail(t, "Message must be at least 10 characters.");
           if (n) {
      $("#cs").innerHTML = `<p class="err">Please fix the errors in the form.</p>`;
        return;
      }
      sendContact(f, a.value.trim(), m.value.trim(), t.value.trim());
    }
    
  });
  __LST("keydown", (e) => {
    const live = $("#tm") && !S.done && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.altKey && !e.ctrlKey && !e.metaKey;
    if ((e.target.name == "q" || live) && /^[1-4]$/.test(e.key)) {
      const r = __R.querySelectorAll("input[name=q]")[+e.key - 1];
      if (r) {
        r.checked = true;
        r.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  });
     /* ===== REAL SVG ICONS (replace emoji everywhere) ===== */
  const IC = {
    brain: ["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z", "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z", "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", "M17.599 6.5a3 3 0 0 0 .399-1.375", "M6.003 5.125A3 3 0 0 0 6.401 6.5", "M19.938 10.5a4 4 0 0 1 .585.396", "M3.477 10.896a4 4 0 0 1 .585-.396"],
    puzzle: ["M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"],
    hash: ["M4 9h16", "M4 15h16", "M10 3 8 21", "M16 3l-2 18"],
    box: ["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z", "m3.3 7 8.7 5 8.7-5", "M12 22V12"],
    book: ["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"],
    bulb: ["M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", "M9 18h6", "M10 22h4"],
    chart: ["M3 3v18h18", "M18 17V9", "M13 17V5", "M8 17v-3"],
    check: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "m9 11 3 3L22 4"],
    tick: ["M20 6 9 17l-5-5"],
    alert: ["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"],
    pin: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", '<circle cx="12" cy="10" r="3"/>'],
    timer: ["M10 2h4", "M12 14l3-3", '<circle cx="12" cy="14" r="8"/>'],
    file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
    flag: ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"],
    trophy: ["M6 9H4.5a2.5 2.5 0 0 1 0-5H6", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", "M4 22h16", "M10 14.66V17c0 .55-.47.98-1.97 1.21C7.85 18.75 7 20.24 7 22", "M14 14.66V17c0 .55.47.98 1.97 1.21C16.15 18.75 17 20.24 17 22", "M18 2H6v7a6 6 0 0 0 12 0V2Z"],
    trend: ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
    target: ['<circle cx="12" cy="12" r="10"/>', '<circle cx="12" cy="12" r="6"/>', '<circle cx="12" cy="12" r="2"/>'],
    star: ["m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
    search: ["M21 21l-4.3-4.3", '<circle cx="11" cy="11" r="8"/>'],
    calc: ['<circle cx="12" cy="6" r="1"/>', '<line x1="5" y1="12" x2="19" y2="12"/>', '<circle cx="12" cy="18" r="1"/>'],
    cap: ["M22 10 12 5 2 10l10 5 10-5z", "M6 12v5c3 3 9 3 12 0v-5"],
    teacher: ["M2 3h20", "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", "m7 21 5-5 5 5"],
    user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", '<circle cx="12" cy="7" r="4"/>'],
    users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", '<circle cx="9" cy="7" r="4"/>', "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
    chat: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
    sprout: ["M7 20h10", "M10 20c5.5-2.5.8-6.4 3-10", "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z", "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"],
    map: ["M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z", "M15 5.764v15", "M9 3.236v15"],
    compass: ['<circle cx="12" cy="12" r="10"/>', "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"],
    rocket: ["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"],
    mountain: ["m8 3 4 8 5-5 5 15H2L8 3z"],
    calendar: ['<rect x="3" y="4" width="18" height="18" rx="2"/>', "M16 2v4", "M8 2v4", "M3 10h18"],
    mic: ["M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v3"],
    laptop: ['<rect x="3" y="4" width="18" height="12" rx="2"/>', "M2 20h20"],
    pencil: ["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"],
    backpack: ["M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", "M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5", "M8 10h8"],
    apple: ["M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z", "M10 2c1 .5 2 2 2 5"],
    news: ["M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2", "M18 14h-8", "M15 18h-5", "M10 6h8v4h-8V6Z"],
    video: ["m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5", '<rect x="2" y="6" width="14" height="12" rx="2"/>'],
    bookmark: ["m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"],
    globe: ['<circle cx="12" cy="12" r="10"/>', "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", "M2 12h20"],
    heart: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"],
    sparkles: ["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"],
    help: ['<circle cx="12" cy="12" r="10"/>', "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"],
    clip: ["m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"],
    mail: ['<rect x="2" y="4" width="20" height="16" rx="2"/>', "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"],
    phone: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"],
    send: ["m22 2-7 20-4-9-9-4Z", "M22 2 11 13"],
    lock: ['<rect x="3" y="11" width="18" height="11" rx="2"/>', "M7 11V7a5 5 0 0 1 10 0v4"],
    key: ["m21 2-9.6 9.6", '<circle cx="7.5" cy="15.5" r="5.5"/>', "m15.5 7.5 3 3L22 7l-3-3"],
    smile: ['<circle cx="12" cy="12" r="10"/>', "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
    shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
    medal: ["M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15", '<circle cx="12" cy="17" r="5"/>'],
    flame: ["M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"],
    folder: ["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],
    sliders: ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"],
    pen: ["M12 20h9", "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"],
    upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m17 8-5-5-5 5", "M12 3v12"],
    access: ['<circle cx="16" cy="4" r="1"/>', "m18 19 1-7-6 1", "m5 8 3-3 5.5 3-2.36 3.5", "M4.24 14.5a5 5 0 0 0 6.88 6", "M13.76 17.5a5 5 0 0 0-6.88-6"],
    shuffle: ["m18 14 4 4-4 4", "m18 2 4 4-4 4", "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", "M2 6h1.972a4 4 0 0 1 3.6 2.2", "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"],
    eye: ["M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", '<circle cx="12" cy="12" r="3"/>'],
    zap: ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],
  };
  const EM = {
    "🧠": "brain", "🧩": "puzzle", "🔢": "hash", "📐": "box", "📚": "book", "📖": "book", "💡": "bulb",
    "📊": "chart", "✅": "check", "✔": "tick", "⚠": "alert", "📍": "pin", "⏱": "timer", "📝": "file",
    "📋": "file", "📑": "file", "📄": "file", "🚩": "flag", "🏆": "trophy", "📈": "trend", "🎯": "target",
    "⭐": "star", "🔍": "search", "🔎": "search", "➗": "calc", "🎓": "cap", "🧑\u200D🏫": "teacher",
    "🧑\u200D🎓": "user", "🙋": "user", "💬": "chat", "🌱": "sprout", "🗺": "map", "🧭": "compass",
    "🚀": "rocket", "🧗": "mountain", "📅": "calendar", "🗣": "mic", "💻": "laptop", "✏": "pencil",
    "🎒": "backpack", "🍎": "apple", "👥": "users", "🤝": "users", "📰": "news", "🎬": "video",
    "🔖": "bookmark", "🌍": "globe", "💚": "heart", "🧡": "heart", "✨": "sparkles", "🎉": "sparkles",
    "❓": "help", "📎": "clip", "✉": "mail", "📞": "phone", "🕊": "send", "🔐": "lock", "🔑": "key",
    "👋": "smile", "🛡": "shield", "🏅": "medal", "🔥": "flame", "🗂": "folder", "🎚": "sliders",
    "✍": "pen", "📤": "upload", "♿": "access", "🔀": "shuffle", "👁": "eye", "💪": "zap",
  };
  const ico = (n) =>
    `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n].map((d) => (d[0] === "<" ? d : `<path d="${d}"/>`)).join("")}</svg>`;
  const EMRE = new RegExp("(" + Object.keys(EM).sort((a, b) => b.length - a.length).join("|") + ")\\uFE0F?", "g");
  function iconize(root) {
    if (!root) return;
    const hit = [];
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode;
      if (/^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE)$/i.test(n.parentNode.nodeName)) continue;
      EMRE.lastIndex = 0;
      if (EMRE.test(n.nodeValue)) hit.push(n);
    }
    hit.forEach((n) => {
      const s = document.createElement("span");
      s.style.display = "contents";
      s.innerHTML = esc(n.nodeValue).replace(EMRE, (m, e) => ico(EM[e]));
      n.replaceWith(s);
    });
  }
 
    /* ===== COMPACT CARDS → AUTO MARQUEE (pauses on hover / focus / touch / manual scroll) ===== */
  const MQ_SEL = ".lsec .grid,.lsec .sl-grid,.lsec .sl-lab";
  const MQ_OK = ".card,.sl-card,.sl-q,li,article";
  const MQS = new WeakMap();
  function mqify(root) {
    (root || __R).querySelectorAll(MQ_SEL).forEach((g) => {
      if (g.dataset.mq) return;
      const k = [...g.children];
            if (k.length < 5 || g.querySelector(".stat,.kp")) return;
      if (!k.every((c) => c.matches(MQ_OK))) return;
      g.dataset.mq = "1";
      g.classList.add("mqx");
      k.forEach((c) => {
        c.classList.remove("rv");
        c.classList.add("in");
      });
      const pause = () => MQS.set(g, { p: Date.now() + 5000, d: (MQS.get(g) || {}).d || 1 });
      ["pointerdown", "wheel", "touchstart"].forEach((t) => g.addEventListener(t, pause, { passive: true }));
    });
  }
  let mqRaf = 0;
  const mqLoop = () => {
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
      __R.querySelectorAll(".mqx").forEach((g) => {
        const r = g.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const s = MQS.get(g) || { p: 0, d: 1 };
        MQS.set(g, s);
        if (s.p > Date.now() || g.matches(":hover,:focus-within")) return;
        const max = g.scrollWidth - g.clientWidth;
        if (max <= 2) return;
        g.scrollLeft += s.d;
        if (g.scrollLeft >= max - 1) s.d = -1;
        else if (g.scrollLeft <= 0) s.d = 1;
      });
    }
    mqRaf = requestAnimationFrame(mqLoop);
  };
  mqRaf = requestAnimationFrame(mqLoop);
    const mqMO = new MutationObserver(() => {
    clearTimeout(mqMO.t);
    mqMO.t = setTimeout(() => {
      mqify($("#app"));
            iconize($("#app"));
      iqLiveInit($("#app"));
    }, 30);
  });
  mqMO.observe($("#app"), { childList: true, subtree: true });
  setTimeout(() => {
    mqify($("#app"));
    iconize($("#app"));
  }, 0);

    {
    const cq = new URLSearchParams(location.search).get("contact");
    if (cq) {
      toast(
        cq === "verified"
          ? "Email verified. Your message was sent. Thank you!"
          : "This verification link is invalid or expired. Please send your message again.",
      );
      history.replaceState(null, "", location.pathname + location.hash);
      if (!location.hash) location.hash = "#/contact";
    }
  }
  route();

  return () => {
    try {
      clearInterval(tick);
      cancelAnimationFrame(mqRaf);
      mqMO.disconnect();
    } catch (e) {}
    __OFF.forEach((f) => f());
    __ST._spy && __ST._spy.disconnect();
    document.body.classList.remove("pp");
  };
}

const SHELL =
  '<style>.iqt{--o:#F97316;--od:#c2570c;--g:#16A34A;--gd:#117a38;--ink:#1E2433;--mut:#5B6475;--bg:#F8F9FC;--card:#fff;--line:#E0E4EE;--r:16px;color-scheme:light}\n@media(prefers-color-scheme:dark){.iqt{--ink:#EEF0F7;--mut:#A9B0C2;--bg:#12141C;--card:#1B1E29;--line:#2D3243;--od:#fb923c;--gd:#4ade80}}\n.iqt *{box-sizing:border-box}\n.iqt{scroll-behavior:smooth}\n.iqt{margin:0;font:16px/1.6 "Plus Jakarta Sans",Poppins,system-ui,sans-serif;background:var(--bg);color:var(--ink)}\n.iqt a{color:var(--od)}\n.iqt h1,.iqt h2,.iqt h3{line-height:1.2;margin:0 0 .5em}\n.iqt h1{font-size:clamp(1.8rem,4vw,2.8rem)}\n.iqt h2{font-size:1.5rem}\n.iqt h3{font-size:1.1rem}\n.iqt :focus-visible{outline:3px solid var(--g);outline-offset:2px}\n.iqt .skip{position:absolute;left:-999px}\n.iqt .skip:focus{left:8px;top:8px;background:#fff;color:#000;padding:8px;z-index:99}\n.iqt header.top{position:sticky;top:0;z-index:20;background:var(--card);border-bottom:1px solid var(--line)}\n.iqt .wrap{max-width:1140px;margin:auto;padding:0 18px}\n.iqt .bar{display:flex;align-items:center;gap:14px;min-height:64px}\n.iqt .logo{font-weight:800;font-size:1.25rem;text-decoration:none;color:var(--ink)}\n.iqt .logo b{color:var(--o)}\n.iqt .logo small{display:block;font-size:.62rem;font-weight:600;color:var(--mut);letter-spacing:.04em}\n.iqt nav.m{display:flex;gap:2px;margin-left:auto;flex-wrap:wrap}\n.iqt nav.m a{padding:8px 10px;border-radius:10px;text-decoration:none;color:var(--ink);font-size:.9rem;font-weight:600}\n.iqt nav.m a:hover,.iqt nav.m a[aria-current]{background:rgba(249,115,22,.12);color:var(--od)}\n.iqt #burger{display:none;margin-left:auto}\n@media(max-width:900px){.iqt #burger{display:block}\n.iqt nav.m{display:none;position:absolute;top:var(--iqt-top,64px);left:0;right:0;background:var(--card);padding:10px;border-bottom:1px solid var(--line);flex-direction:column}\n.iqt nav.m.open{display:flex}}\n.iqt .btn{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:12px;padding:11px 18px;font:inherit;font-weight:700;cursor:pointer;background:var(--o);color:#fff;text-decoration:none}\n.iqt .btn:hover{background:#ea6a0a}\n.iqt .btn.g{background:var(--g)}\n.iqt .btn.g:hover{background:#12873c}\n.iqt .btn.o{background:transparent;color:var(--ink);border:2px solid var(--line)}\n.iqt .btn.o:hover{border-color:var(--o)}\n.iqt .btn.s{padding:6px 12px;font-size:.85rem}\n.iqt .btn[disabled]{opacity:.5;cursor:not-allowed}\n.iqt .card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:20px}\n.iqt .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}\n.iqt .g2{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:center}\n.iqt .hero{background:linear-gradient(135deg,rgba(249,115,22,.14),rgba(22,163,74,.12));border-radius:24px;padding:36px;margin:20px 0}\n.iqt .hero img,.iqt .pic{width:100%;border-radius:var(--r);image-rendering:auto;object-fit:cover;aspect-ratio:5/2;background:var(--line)}\n.iqt .crumb{font-size:.85rem;color:var(--mut);margin:18px 0 6px}\n.iqt .crumb a{color:var(--mut)}\n.iqt .badge{display:inline-block;padding:2px 10px;border-radius:99px;font-size:.75rem;font-weight:700;background:rgba(22,163,74,.15);color:var(--gd)}\n.iqt .badge.o{background:rgba(249,115,22,.16);color:var(--od)}\n.iqt .mut{color:var(--mut)}\n.iqt section.s{margin:34px 0}\n.iqt .note{border-left:4px solid var(--o);background:rgba(249,115,22,.09);padding:12px 16px;border-radius:8px;font-size:.92rem}\n.iqt label{font-weight:600;font-size:.9rem;display:block;margin:12px 0 4px}\n.iqt input,.iqt select,.iqt textarea{width:100%;padding:11px 12px;border:1.5px solid var(--line);border-radius:10px;font:inherit;background:var(--card);color:var(--ink)}\n.iqt .err{color:#d92d20;font-size:.82rem;min-height:1em}\n.iqt .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:14px 0}\n.iqt .tabs button{border:1.5px solid var(--line);background:var(--card);color:var(--ink);border-radius:99px;padding:7px 14px;font:inherit;font-weight:600;cursor:pointer}\n.iqt .tabs button[aria-selected=true]{background:var(--g);border-color:var(--g);color:#fff}\n.iqt .opt{display:flex;gap:10px;align-items:center;padding:12px 14px;border:2px solid var(--line);border-radius:12px;margin:8px 0;cursor:pointer}\n.iqt .opt:has(input:checked){border-color:var(--g);background:rgba(22,163,74,.1)}\n.iqt .opt input{width:auto}\n.iqt .nav{display:flex;flex-wrap:wrap;gap:6px}\n.iqt .nav button{width:38px;height:38px;border-radius:10px;border:2px solid var(--line);background:var(--card);color:var(--ink);font-weight:700;cursor:pointer}\n.iqt .nav .a{background:rgba(22,163,74,.2);border-color:var(--g)}\n.iqt .nav .f{border-color:var(--o);background:rgba(249,115,22,.2)}\n.iqt .nav .c{outline:3px solid var(--ink)}\n.iqt .prog{height:10px;background:var(--line);border-radius:9px;overflow:hidden}\n.iqt .prog i{display:block;height:100%;background:linear-gradient(90deg,var(--o),var(--g))}\n.iqt .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}\n.iqt .sp{justify-content:space-between}\n.iqt .bars .b{display:grid;grid-template-columns:110px 1fr 46px;gap:10px;align-items:center;margin:9px 0;font-size:.9rem}\n.iqt .big{font-size:3.2rem;font-weight:800;color:var(--o);line-height:1}\n.iqt details{border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:8px 0;background:var(--card)}\n.iqt summary{cursor:pointer;font-weight:700}\n.iqt table{width:100%;border-collapse:collapse}\n.iqt td,.iqt th{padding:9px;border-bottom:1px solid var(--line);text-align:left;font-size:.92rem}\n.iqt footer{margin-top:50px;background:var(--card);border-top:1px solid var(--line);padding:30px 0;font-size:.9rem}\n.iqt footer .grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}\n.iqt footer a{display:block;color:var(--mut);text-decoration:none;padding:2px 0}\n.iqt #toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:12px 20px;border-radius:12px;z-index:50;display:none;max-width:90vw}\n.iqt dialog{border:0;border-radius:var(--r);max-width:480px;width:92%;background:var(--card);color:var(--ink)}\n.iqt dialog::backdrop{background:rgba(0,0,0,.5)}\n.iqt .timer{font-variant-numeric:tabular-nums;font-weight:800;background:var(--ink);color:var(--bg);padding:6px 12px;border-radius:10px}\n.iqt .road{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));counter-reset:s}\n.iqt .road>div{position:relative;background:var(--card);border:1px solid var(--line);border-top:5px solid var(--o);border-radius:var(--r);padding:18px 16px 16px}\n.iqt .road>div:nth-child(even){border-top-color:var(--g)}\n.iqt .road>div:before{counter-increment:s;content:counter(s);position:absolute;top:-17px;left:14px;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--o),var(--g));color:#fff;font-weight:800;display:grid;place-items:center}\n.iqt .road h3{margin-top:6px}\n.iqt .road p{margin:0;color:var(--mut);font-size:.9rem}\n.iqt .stat{display:flex;gap:12px;align-items:center}\n.iqt .stat b{font-size:1.8rem;color:var(--o)}\n.iqt .av{border-radius:50%;flex:none;display:block}\n.iqt .thumb{height:84px;border-radius:12px;display:grid;place-items:center;font-size:2.4rem;margin-bottom:10px;color:#fff}\n.iqt .ppl{display:flex;gap:12px;align-items:center}\n.iqt .ppl p{margin:0}\n@media(prefers-reduced-motion:reduce){.iqt *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}\n@media print{.iqt header.top,.iqt footer,.iqt .noprint,.iqt .crumb{display:none!important}\n.iqt{background:#fff;color:#000}\n.iqt .card{break-inside:avoid}}\n.iqt .sl{--sl-pp:#5B3FD9;--sl-or:#F97316;--sl-gr:#16A34A;--sl-bg:#F8F9FC;--sl-sf:#fff;--sl-tx:#1E2433;--sl-mu:#5B6475;--sl-bd:#E0E4EE;--sl-gl:#E9ECF4;--sl-tint:rgba(238,240,250,.75);--sl-ord:#C2410C;--sl-teal:#0E7C7C;\n --sl-pad:max(clamp(16px,3.2vw,48px),env(safe-area-inset-left));--sl-padr:max(clamp(16px,3.2vw,48px),env(safe-area-inset-right));\n font-family:inherit;color:var(--sl-tx);line-height:1.6;background-color:var(--sl-bg);background-image:linear-gradient(var(--sl-gl) 1px,transparent 1px),linear-gradient(90deg,var(--sl-gl) 1px,transparent 1px);background-size:28px 28px;overflow-x:clip;-webkit-text-size-adjust:100%;scroll-behavior:smooth}\n.iqt .sl[data-theme="dark"]{--sl-bg:#12141C;--sl-gl:#1B1F2B;--sl-pp:#A594FF;--sl-sf:#1B1E29;--sl-tx:#EEF0F7;--sl-mu:#A9B0C2;--sl-bd:#2D3243;--sl-tint:rgba(30,34,48,.75);--sl-ord:#FDBA74;--sl-teal:#5EEAD4}\n.iqt .sl *,.iqt .sl *::before,.iqt .sl *::after{box-sizing:border-box}\n.iqt .sl [id]{scroll-margin-top:110px}\n.iqt .sl h1,.iqt .sl h2,.iqt .sl h3{line-height:1.15;margin:0 0 .5em;font-family:var(--font-heading,inherit);font-weight:700;overflow-wrap:anywhere}\n.iqt .sl h1{font-size:clamp(1.9rem,5.2vw,3.3rem);color:var(--sl-pp)}\n.iqt .sl h2{font-size:clamp(1.45rem,3.4vw,2.2rem);color:var(--sl-pp)}\n.iqt .sl h3{font-size:clamp(1rem,1.6vw,1.15rem)}\n.iqt .sl p{margin:.3em 0 0}\n.iqt .sl a{color:inherit}\n.iqt .sl-wrap{width:100%;margin:0;padding-left:var(--sl-pad);padding-right:var(--sl-padr)}\n.iqt .sl-sec{padding:clamp(40px,6vw,72px) 0}\n.iqt .sl-sec.alt{background:var(--sl-tint)}\n.iqt .sl-sec.compact{padding:clamp(24px,3vw,36px) 0}\n.iqt .sl-head{margin-bottom:clamp(18px,3vw,28px);max-width:900px}\n.iqt .sl-eb{display:inline-block;font-size:.72rem;letter-spacing:.08em;font-weight:700;color:var(--sl-teal);border:1.5px solid var(--sl-teal);border-radius:999px;padding:3px 12px;text-transform:uppercase;margin-bottom:14px}\n.iqt .sl-mu{color:var(--sl-mu)}\n.iqt .sl-note{font-size:.85rem;color:var(--sl-mu)}\n.iqt .sl-mini{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--sl-ord)}\n.iqt .sl-quote{font-weight:600;margin-top:20px;max-width:900px}\n.iqt .sl-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 20px;border-radius:10px;border:1.5px solid var(--sl-pp);background:var(--sl-pp);color:#fff!important;font:600 .95rem/1.2 inherit;font-family:inherit;cursor:pointer;text-decoration:none;text-align:center;transition:filter .2s,background .2s;-webkit-tap-highlight-color:transparent}\n.iqt .sl-btn:hover{filter:brightness(.93)}\n.iqt .sl-btn.o{background:transparent;color:var(--sl-pp)!important}\n.iqt .sl-btn.o:hover{background:var(--sl-tint);filter:none}\n.iqt .sl-btn.orange{background:var(--sl-or);border-color:var(--sl-or)}\n.iqt .sl :focus-visible{outline:3px solid var(--sl-gr);outline-offset:2px}\n.iqt .sl-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}\n.iqt .sl-row.nm{margin:0}\n.iqt .sl-hero{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(24px,4vw,56px);align-items:center}\n.iqt .sl-hv{margin:0;background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:16px;padding:16px;text-align:center}\n.iqt .sl-hv img{width:min(100%,380px);height:auto;margin:0 auto;border-radius:10px;display:block}\n.iqt .sl-pills,.iqt .sl-flowchips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}\n.iqt .sl-flowchips{justify-content:center;margin-top:14px}\n.iqt .sl-pills span,.iqt .sl-flowchips span{background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:999px;padding:4px 14px;font-size:.85rem;font-weight:500}\n.iqt .sl-flowchips span{border-radius:8px;padding:4px 10px;font-size:.8rem}\n.iqt .sl-grid{display:grid;gap:16px}\n.iqt .sl-grid.g2{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))}\n.iqt .sl-grid.g3{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}\n.iqt .sl-grid.g4{grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))}\n.iqt .sl-grid.f5{grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}\n.iqt .sl-grid.obs{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));margin-top:18px}\n.iqt .sl-card{background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:12px;padding:clamp(14px,2vw,20px);min-width:0}\n.iqt .sl-card p{color:var(--sl-mu);font-size:.95rem}\n.iqt .sl-card.nh,.iqt .sl-card.scn{margin-top:16px}\n.iqt .sl-card.tpl{margin-top:16px}\n.iqt .sl-num{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--sl-pp);color:#fff;font-weight:700;margin-bottom:8px;flex:none}\n.iqt .sl-card,.iqt .sl-pills span,.iqt .sl-flowchips span,.iqt .sl-chk,.iqt .sl-bd div{transition:background .25s,color .25s,transform .25s,box-shadow .25s,border-color .25s}\n@media (hover:hover){.iqt .sl-card.hov:hover,.iqt .sl-chk:hover,.iqt .sl-pills span:hover{background:linear-gradient(135deg,#C2410C,#F97316);color:#fff;border-color:#F97316;transform:translateY(-4px);box-shadow:0 14px 28px rgba(194,65,12,.28)}\n.iqt .sl-card.hov:hover *{color:#fff!important}\n.iqt .sl-card.hov:hover .sl-tag{color:#111!important}\n.iqt .sl-card.hov:hover .sl-tag.g{color:#fff!important}\n.iqt .sl-card.hov:hover .sl-bd div{background:var(--sl-sf);color:var(--sl-tx)!important}\n.iqt .sl-card.hov:hover .sl-num{background:#fff}\n.iqt .sl-card.hov:hover .sl-num{color:#C2410C!important}}\n.iqt .sl-tag{display:inline-block;font-size:.75rem;font-weight:700;padding:2px 10px;border-radius:999px;background:#B8B0A4;color:#111;margin-bottom:10px}\n.iqt .sl-tag.g{background:var(--sl-gr);color:#fff}\n.iqt .sl-card.weak{border:2px dashed #B8B0A4}\n.iqt .sl-card.strong{border:2px solid var(--sl-gr)}\n.iqt .sl-bd{display:flex;gap:8px;align-items:stretch;margin:12px 0}\n.iqt .sl-bd div{flex:1;border:1.5px solid var(--sl-bd);border-radius:10px;padding:10px 6px;text-align:center;font-weight:600;font-size:.88rem;background:var(--sl-sf);color:var(--sl-tx);display:flex;align-items:center;justify-content:center}\n.iqt .sl-bd i{align-self:center;color:var(--sl-gr);font-weight:700;font-style:normal}\n.iqt .sl-bd.wk div{opacity:.75;border-style:dashed}\n.iqt .sl-bd.wk i{color:#999}\n.iqt .sl-path{display:flex;list-style:none;margin:8px 0 0;padding:0}\n.iqt .sl-path li{flex:1;text-align:center;position:relative;padding:0 6px;min-width:0}\n.iqt .sl-path i{display:grid;place-items:center;width:clamp(44px,5vw,56px);height:clamp(44px,5vw,56px);margin:0 auto 8px;border-radius:50%;background:var(--sl-sf);border:3px solid var(--sl-pp);font:700 1.1rem inherit;font-style:normal;color:var(--sl-pp);position:relative;z-index:1}\n.iqt .sl-path li:not(:last-child)::after{content:"";position:absolute;top:calc(clamp(44px,5vw,56px)/2 - 2px);left:50%;width:100%;height:4px;background:repeating-linear-gradient(90deg,var(--sl-or) 0 12px,transparent 12px 24px);background-size:24px 4px;animation:sl-dash 1s linear infinite}\n.iqt .sl-path b{display:block;font-size:.88rem;overflow-wrap:anywhere}\n@media(max-width:640px){.iqt .sl-path{flex-direction:column;gap:14px}\n.iqt .sl-path li{display:flex;gap:14px;align-items:center;text-align:left;padding:0}\n.iqt .sl-path i{margin:0;flex:none}\n.iqt .sl-path li:not(:last-child)::after{top:calc(clamp(44px,5vw,56px) + 2px);left:calc(clamp(44px,5vw,56px)/2 - 2px);width:4px;height:14px;background:repeating-linear-gradient(180deg,var(--sl-or) 0 8px,transparent 8px 14px);animation:none}}\n.iqt .sl-rm{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;position:relative;margin:8px 0 20px}\n.iqt .sl-rm::before{content:"";position:absolute;top:23px;left:4%;right:4%;height:4px;background:repeating-linear-gradient(90deg,var(--sl-or) 0 10px,transparent 10px 18px);animation:sl-dash 1s linear infinite}\n.iqt .sl-rm button{position:relative;background:none;border:0;cursor:pointer;color:var(--sl-tx);font:500 .85rem inherit;font-family:inherit;text-align:center;padding:0 2px;min-height:44px}\n.iqt .sl-rm i{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--sl-sf);border:3px solid var(--sl-or);margin:0 auto 6px;font-style:normal;font-weight:700}\n.iqt .sl-rm button[aria-selected=true] i{background:var(--sl-pp);border-color:var(--sl-pp);color:#fff}\n.iqt .sl-rm button[aria-selected=true] span{font-weight:700}\n@media(max-width:700px){.iqt .sl-rm{grid-template-columns:1fr;gap:6px}\n.iqt .sl-rm::before{top:0;bottom:0;left:22px;right:auto;width:4px;height:auto;background:repeating-linear-gradient(180deg,var(--sl-or) 0 10px,transparent 10px 18px);animation:none}\n.iqt .sl-rm button{display:flex;align-items:center;gap:12px;text-align:left}\n.iqt .sl-rm i{margin:0;flex:none}}\n.iqt .sl-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,32px);align-items:center}\n.iqt .sl-split.top{align-items:start}\n.iqt .sl-split.gap{margin-top:28px}\n.iqt .sl-split>*{min-width:0}\n.iqt .sl-svg{width:100%;height:auto;display:block}\n.iqt .sl-dash{animation:sl-dd 1.2s linear infinite}\n.iqt .sl-q{border:1px solid var(--sl-bd);background:var(--sl-sf);border-radius:12px;padding:18px;margin:0;min-width:0}\n.iqt .sl-q.plain{border:0;padding:0;background:transparent}\n.iqt .sl-q legend{float:left;width:100%;padding:0;margin:0 0 10px;font-weight:600;line-height:1.35}\n.iqt .sl-q legend+*{clear:both}\n.iqt .sl-opt{display:flex;gap:10px;align-items:flex-start;padding:8px 6px;border-radius:8px;cursor:pointer;min-height:44px}\n.iqt .sl-opt input{margin-top:4px;accent-color:var(--sl-pp);width:20px;height:20px;flex:none}\n.iqt .sl-ex{font-size:.9rem;margin-top:8px;padding:8px 12px;border-radius:8px;background:var(--sl-tint);color:var(--sl-tx)!important;border-left:4px solid var(--sl-or)}\n.iqt .sl-ex.ok{border-left-color:var(--sl-gr)}\n.iqt .sl-er{color:#B91C1C;font-size:.85rem;min-height:1.2em;margin:.3em 0 0}\n.iqt .sl[data-theme="dark"] .sl-er{color:#FCA5A5}\n.iqt .sl-l{margin:.5em 0;padding-left:1.2em}\n.iqt .sl-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}\n.iqt .sl-tabs button{border:1px solid var(--sl-bd);background:var(--sl-sf);color:var(--sl-tx);border-radius:10px;padding:10px 14px;font:500 .9rem inherit;font-family:inherit;cursor:pointer;min-height:44px}\n.iqt .sl-tabs button[aria-selected=true],.iqt .sl-tabs button[aria-pressed=true]{background:var(--sl-pp);color:#fff;border-color:var(--sl-pp)}\n.iqt .sl-f{display:block;font-weight:600;margin:12px 0 4px;font-size:.92rem}\n.iqt .sl input[type=text],.iqt .sl textarea{width:100%;font:inherit;font-size:16px;padding:10px 12px;border:1px solid var(--sl-bd);border-radius:10px;background:var(--sl-bg);color:var(--sl-tx)}\n.iqt .sl-bar{display:flex;gap:6px;margin-bottom:14px}\n.iqt .sl-bar span{flex:1;height:6px;border-radius:3px;background:var(--sl-bd)}\n.iqt .sl-bar span.on{background:var(--sl-or)}\n.iqt .sl-pv{margin:8px 0 0}\n.iqt .sl-pv dt{font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;color:var(--sl-ord);margin-top:10px;font-weight:700}\n.iqt .sl-pv dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}\n.iqt .sl-pv.wide{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:2px 24px}\n.iqt .sl-lab{list-style:none;margin:0;padding:0;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}\n.iqt .sl-lab li{display:flex;gap:12px;align-items:center;font-weight:500}\n.iqt .sl-lab .sl-num{margin:0}\n.iqt .sl-ck{display:grid;gap:8px;margin-bottom:14px;max-width:900px}\n.iqt .sl-chk{display:flex;gap:12px;padding:12px;border:1px solid var(--sl-bd);border-radius:12px;background:var(--sl-sf);cursor:pointer;min-height:44px;align-items:flex-start}\n.iqt .sl-chk input{width:22px;height:22px;accent-color:var(--sl-gr);margin-top:2px;flex:none}\n.iqt .sl-cta{background:var(--sl-sf);border-block:1px solid var(--sl-bd);padding:clamp(22px,3vw,32px) 0}\n.iqt .sl-cta-in{display:flex;flex-wrap:wrap;gap:20px 32px;align-items:center;justify-content:space-between}\n.iqt .sl-cta h2{margin:0 0 6px}\n.iqt .sl-cta h2 em{color:var(--sl-or);font-style:normal}\n.iqt .sl-cta p{color:var(--sl-mu);margin:0;max-width:760px}\n.iqt .sl-card.full{flex:1 1 100%;background:var(--sl-bg);margin-top:0}\n.iqt .sl-next{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:space-between;border-top:1px solid var(--sl-bd);padding-top:20px}\n.iqt .sl-next h3{margin:0 0 4px;color:var(--sl-pp)}\n.iqt .sl-mq{overflow:hidden;background:var(--sl-pp);color:#fff;padding:12px 0;font-weight:600;white-space:nowrap;display:flex}\n.iqt .sl-mq-track{display:flex;width:max-content;animation:sl-mq 40s linear infinite}\n.iqt .sl-mq-half{display:flex;flex:none}\n.iqt .sl-mq-i{margin:0 22px}\n.iqt .sl-mq:hover .sl-mq-track{animation-play-state:paused}\n.iqt .sl-mq.tiles{background:transparent;padding:6px 0;margin-bottom:20px}\n.iqt .sl-mq.tiles .sl-mq-track{animation-duration:50s}\n.iqt .sl-mq.tiles a{display:block;margin:0 8px;padding:14px 26px;min-width:150px;background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:12px;text-decoration:none;color:#EA580C;font-weight:700;transition:all .25s}\n.iqt .sl-mq.tiles small{display:none;font-weight:500;font-size:.8rem}\n@media (hover:hover){.iqt .sl-mq.tiles a:hover{background:linear-gradient(135deg,#C2410C,#F97316);color:#fff;transform:translateY(-4px);box-shadow:0 14px 28px rgba(194,65,12,.28);border-color:#F97316}\n.iqt .sl-mq.tiles a:hover small{display:block}}\n@keyframes sl-mq{to{transform:translateX(-50%)}}\n@keyframes sl-dash{to{background-position:24px 0}}\n@keyframes sl-dd{to{stroke-dashoffset:-40}}\n@media(max-width:900px){.iqt .sl-hero,.iqt .sl-split{grid-template-columns:1fr}\n.iqt .sl-hv{max-width:520px;width:100%;margin:0 auto}}\n@media(max-width:430px){.iqt .sl-row .sl-btn{flex:1 1 100%}\n.iqt .sl-bd{flex-direction:column}\n.iqt .sl-bd i{transform:rotate(90deg)}}\n@media(min-width:1700px){.iqt .sl{font-size:18px}}\n@media(prefers-reduced-motion:reduce){.iqt .sl{scroll-behavior:auto}\n.iqt .sl *{animation:none!important;transition:none!important}}\n.iqt #app.full{max-width:none;padding:0}\n.iqt #app.full+footer{margin-top:0}\n.iqt .sl{min-height:60vh}\n.iqt .sl-float{animation:fl 4s ease-in-out infinite}\n.iqt .sl-flowchips span{animation:chip 2.4s ease-in-out infinite}\n@keyframes fl{50%{transform:translateY(-10px)}}\n@keyframes chip{50%{transform:translateY(-4px);border-color:var(--sl-or)}}\n.iqt .rv{opacity:0;transform:translateY(24px);transition:opacity .65s ease var(--d,0s),transform .65s cubic-bezier(.2,.7,.2,1) var(--d,0s)}\n.iqt .rv.in{opacity:1;transform:none}\n@media(hover:hover){.iqt #app .grid>.card.in:hover,.iqt #app .road>div.in:hover{transform:translateY(-5px);box-shadow:0 14px 28px rgba(249,115,22,.18);border-color:var(--o)}}\n.iqt #app .card,.iqt #app .road>div{transition:opacity .65s ease var(--d,0s),transform .3s ease,box-shadow .3s ease,border-color .3s ease}\n.iqt .prog i{animation:grow 1.1s cubic-bezier(.2,.7,.2,1) both;transform-origin:left}\n@keyframes grow{from{transform:scaleX(0)}}\n.iqt .btn{transition:transform .2s ease,background .2s ease,box-shadow .2s ease}\n.iqt .btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(249,115,22,.28)}\n.iqt .hero{position:relative;overflow:hidden;background-size:200% 200%;animation:hg 12s ease-in-out infinite}\n.iqt .hero::before,.iqt .hero::after{content:"";position:absolute;border-radius:50%;filter:blur(40px);opacity:.5;pointer-events:none;animation:bl 9s ease-in-out infinite}\n.iqt .hero::before{width:220px;height:220px;background:rgba(249,115,22,.35);top:-60px;right:-40px}\n.iqt .hero::after{width:200px;height:200px;background:rgba(22,163,74,.3);bottom:-70px;left:30%;animation-delay:-4s}\n.iqt .hero>*{position:relative;z-index:1}\n.iqt .hero img{animation:fl 5s ease-in-out infinite}\n@keyframes hg{50%{background-position:100% 50%}}\n@keyframes bl{50%{transform:translate(30px,20px) scale(1.15)}}\n.iqt .thumb{animation:fl 4s ease-in-out infinite}\n.iqt .road>div:before{animation:pop 2.6s ease-in-out infinite}\n@keyframes pop{50%{transform:scale(1.12)}}\n.iqt .av{transition:transform .3s}\n.iqt .ppl:hover .av{transform:scale(1.1) rotate(-4deg)}\n.iqt .pbn{position:relative;overflow:hidden;display:flex;align-items:center;gap:18px;min-height:130px;margin:16px 0 4px;padding:18px 26px;border-radius:24px;color:#fff;background:linear-gradient(120deg,var(--c1),var(--c2),var(--c1));background-size:250% 250%;animation:hg 10s ease-in-out infinite;box-shadow:0 12px 30px rgba(0,0,0,.12)}\n.iqt .pbn-svg{position:absolute;inset:0;width:100%;height:100%;opacity:.8}\n.iqt .pbn-ic{position:relative;font-size:3.4rem;line-height:1;width:84px;height:84px;display:grid;place-items:center;border-radius:24px;background:rgba(255,255,255,.2);backdrop-filter:blur(4px);animation:fl 3.2s ease-in-out infinite;flex:none}\n.iqt .pbn-t{position:relative;display:flex;flex-direction:column;gap:2px;min-width:0}\n.iqt .pbn-t b{font-size:clamp(1.05rem,2.4vw,1.5rem);line-height:1.2}\n.iqt .pbn-t small{opacity:.9;font-size:.9rem}\n.iqt .pbn-o{position:absolute;bottom:-30px;font-style:normal;font-size:1.6rem;opacity:0;animation:rise 6s ease-in infinite}\n@keyframes rise{10%{opacity:.9}100%{transform:translateY(-190px) rotate(25deg);opacity:0}}\n@media(max-width:600px){.iqt .pbn{padding:14px;gap:12px}\n.iqt .pbn-ic{width:60px;height:60px;font-size:2.3rem;border-radius:18px}}\n.iqt .tease{display:flex;align-items:center;gap:14px;margin:20px 0;padding:16px 20px;border-radius:16px;border:1.5px dashed var(--o);background:rgba(249,115,22,.08);text-decoration:none;color:var(--ink);transition:transform .25s,box-shadow .25s}\n.iqt .tease:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(249,115,22,.2)}\n.iqt .tease-ic{font-size:2rem;animation:fl 3s ease-in-out infinite}\n.iqt .tease small{display:block;color:var(--mut)}\n.iqt .tease i{margin-left:auto;font-style:normal;font-weight:700;color:var(--od)}\n@media(prefers-reduced-motion:reduce){.iqt .rv{opacity:1;transform:none}}\n.iqt{--pp:#5B3FD9;--gl:#E9ECF4;--tint:rgba(238,240,250,.75)}\n@media(prefers-color-scheme:dark){.iqt{--pp:#A594FF;--gl:#1B1F2B;--tint:rgba(30,34,48,.75)}}\n.iqt{background-color:var(--bg);background-image:linear-gradient(var(--gl) 1px,transparent 1px),linear-gradient(90deg,var(--gl) 1px,transparent 1px);background-size:28px 28px}\n.iqt header.top,.iqt footer{background:var(--card)}\n.iqt .lsec{scroll-margin-top:var(--iqt-top,64px);padding:clamp(8px,2vw,24px) 0}\n.iqt .lsec:nth-child(even):not(.sl-wrapper){background:var(--tint)}\n.iqt .lsec.sl-wrapper{padding:0}\n.iqt .lsec .crumb{display:none}\n.iqt .lsec h2.lh,.iqt .lsec section.s>h2,.iqt .lsec .lin>h2{color:var(--pp);font-size:clamp(1.45rem,3.4vw,2.2rem);line-height:1.15}\n.iqt .lsec .lin>section.s:first-of-type{margin-top:18px}\n.iqt svg.pic{aspect-ratio:auto;height:auto;background:none;display:block;border-radius:var(--r)}\n.iqt .svf{animation:fl 4.5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}\n.iqt .sl-hv svg{width:min(100%,380px);height:auto;margin:0 auto;display:block}\n.iqt .sl-wrapper .sl{min-height:0}\n.iqt .jr ol{list-style:none;display:flex;gap:6px;padding:0;margin:12px 0 0;flex-wrap:wrap}\n.iqt .jr li{flex:1;min-width:104px}\n.iqt .jr a{display:flex;align-items:center;gap:7px;padding:8px 10px;border:1.5px solid var(--line);border-radius:12px;text-decoration:none;color:var(--ink);font-size:.82rem;font-weight:700;background:var(--card)}\n.iqt .jr li b{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--line);color:var(--ink);font-size:.75rem;flex:none}\n.iqt .jr .dn b{background:var(--g);color:#fff}\n.iqt .jr .cu a{border-color:var(--o);background:rgba(249,115,22,.12)}\n.iqt .jr .cu b{background:var(--o);color:#fff}\n.iqt .jb{margin:12px 0;padding:12px 16px;border-radius:12px;background:rgba(22,163,74,.09);border-left:4px solid var(--g)}\n.iqt .jb p{margin:.25em 0}\n.iqt .tbar{position:sticky;top:var(--iqt-top,64px);z-index:6;background:var(--bg);padding:8px 0}\n.iqt .timer.warn{background:#d92d20;color:#fff}\n.iqt .nav button{position:relative}\n.iqt .nav .f::after{content:"⚑";position:absolute;top:-7px;right:-4px;font-size:.72rem;color:var(--od)}\n.iqt .lg{display:flex;gap:12px;flex-wrap:wrap;font-size:.8rem;margin:10px 0}\n.iqt .lg i{display:inline-block;width:12px;height:12px;border-radius:3px;border:2px solid var(--line);vertical-align:-1px;margin-right:4px}\n.iqt .lg .a{background:rgba(22,163,74,.3);border-color:var(--g)}\n.iqt .lg .f{background:rgba(249,115,22,.3);border-color:var(--o)}\n.iqt .kp{text-align:center}\n.iqt .kp b{display:block;font-size:2rem;line-height:1.1;color:var(--o)}\n.iqt .qi{border:1px solid var(--line);border-radius:12px;padding:14px;margin:10px 0;background:var(--card)}\n.iqt .qi p{margin:.4em 0}\n.iqt #rvl[data-f=wrong] .qi:not([data-s=wrong]),.iqt #rvl[data-f=un] .qi:not([data-s=un]),.iqt #rvl[data-f=fl] .qi:not([data-fl="1"]){display:none}\n.iqt .po{width:100%;text-align:left;font:inherit;color:var(--ink);background:var(--card)}\n.iqt .po.ok{border-color:var(--g);background:rgba(22,163,74,.15)}\n.iqt .po.no{border-color:#d92d20;background:rgba(217,45,32,.1)}\n.iqt .cmp td:first-child,.iqt .cmp th:first-child{font-weight:700}\n.iqt .cols2{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}\n@media(max-width:560px){.iqt .jr li{min-width:46%}\n.iqt .tbar{top:var(--iqt-top,64px)}\n.iqt .hero{padding:22px}}\n@media print{.iqt .rv{opacity:1!important;transform:none!important}\n.iqt .pbn,.iqt .jr,.iqt .tease{display:none!important}\n.iqt .qi{break-inside:avoid}}\n.iqt .tabs button[aria-pressed=true]{background:var(--g);border-color:var(--g);color:#fff}\n.iqt{overflow-x:clip}\n.iqt img,.iqt svg{max-width:100%}\n.iqt table{display:block;overflow-x:auto}\n@media(max-width:640px){.iqt .wrap{padding:0 12px}\n.iqt .hero{padding:18px}\n.iqt .grid,.iqt .g2,.iqt .cols2{grid-template-columns:1fr}\n.iqt .row>.btn{flex:1 1 auto;justify-content:center}\n.iqt .bars .b{grid-template-columns:84px 1fr 42px}\n.iqt .nav button{width:42px;height:42px}\n.iqt .big{font-size:2.4rem}\n.iqt .btn{min-height:44px}\n.iqt .timer{font-size:.95rem}}\n.iqt .hero img.pimg,.iqt img.pimg{aspect-ratio:auto;width:auto;height:auto;max-width:300px;max-height:200px;object-fit:contain;display:block;margin:8px auto;background:#fff;padding:6px;border:1px solid var(--line);border-radius:var(--r)}\n.iqt .opt.po{display:block;width:100%;text-align:left}\n@media print{.iqt #planprev{border:0}}\n.iqt #printroot{display:none}\n.iqt h1,.iqt h2,.iqt h3,.iqt h4{font-weight:700}\n.iqt p,.iqt ul,.iqt ol,.iqt dl,.iqt dd,.iqt figure,.iqt blockquote{margin:revert}\n.iqt ul,.iqt ol{list-style:revert;padding:revert}\n.iqt img,.iqt svg{display:revert;vertical-align:revert}\n.iqt summary{display:list-item}\n.iqt.iqt-noshell header.top,.iqt.iqt-noshell footer{display:none}\n.iqt{min-height:60vh}\n</style><style>#printroot{display:none}@media print{body.pp *{visibility:hidden}body.pp #printroot,body.pp #printroot *{visibility:visible}body.pp #printroot{display:block!important;position:absolute;left:0;top:0;width:100%;color:#000;background:#fff}body.pp #printroot table{width:100%;border-collapse:collapse}body.pp #printroot th,body.pp #printroot td{border:1px solid #999;padding:6px;text-align:left;vertical-align:top}}</style><a class="skip" href="#app">Skip to content</a>\n<header class="top"><div class="wrap bar">\n<a class="logo" href="#/home">ILM <b>ORA</b><small>AI Learning &amp; Assessment Platform</small></a>\n<button id="burger" class="btn o s" aria-expanded="false" aria-controls="mnav">Menu</button>\n<nav class="m" id="mnav" aria-label="Main"></nav></div></header>\n<main id="app" class="wrap" tabindex="-1"></main>\n<footer><div class="wrap"><div class="grid" id="foot"></div>\n<p class="mut" style="margin-top:20px">© ILM ORA. Demo build: all data is sample data from a local mock layer, not a live backend. Assessment scores are illustrative and are not a clinical or professionally validated measure of intelligence.</p></div></footer>\n<div id="toast" role="status" aria-live="polite"></div>\n<dialog id="dlg"></dialog><div id="printroot" aria-hidden="true"></div>';

/* PublicLayout ke andar chalne ke liye extra CSS.
   Navbar+Banner = 84px (fixed). Sub-nav bar = 48px  →  timer/scroll offset = 132px */
const PL_CSS = `
.iqt.iqt-pl[data-theme="dark"]{--ink:#EEF0F7;--mut:#A9B0C2;--bg:#12141C;--card:#1B1E29;--line:#2D3243;--od:#fb923c;--gd:#4ade80;--pp:#A594FF;--gl:#1B1F2B;--tint:rgba(30,34,48,.75);color-scheme:dark}
.iqt.iqt-pl[data-theme="light"]{--ink:#1E2433;--mut:#5B6475;--bg:#F8F9FC;--card:#fff;--line:#E0E4EE;--od:#c2570c;--gd:#117a38;--pp:#5B3FD9;--gl:#E9ECF4;--tint:rgba(238,240,250,.75);color-scheme:light}
.iqt.iqt-pl footer{display:none}
.iqt.iqt-pl header.top{top:84px;z-index:30}
.iqt.iqt-pl .bar{min-height:48px}
.iqt.iqt-pl .logo{display:none}
.iqt.iqt-pl nav.m{margin-left:0}
.iqt.iqt-pl #mnav a[data-r="login"]{display:none}
.iqt.iqt-pl .sl [id]{scroll-margin-top:150px}

/* ===== COMPACT: banner, headings, resources search row ===== */
.iqt.iqt-pl .pbn{min-height:70px;padding:10px 18px;margin:8px 0 0;border-radius:16px;gap:12px}
.iqt.iqt-pl .pbn-ic{width:46px;height:46px;font-size:1.6rem;border-radius:14px}
.iqt.iqt-pl .pbn-t b{font-size:1.05rem}
.iqt.iqt-pl .pbn-t small{font-size:.8rem}
.iqt.iqt-pl .pbn-o{font-size:1.1rem}
.iqt.iqt-pl .lsec{padding:6px 0}
.iqt.iqt-pl .lsec h2.lh{font-size:1.35rem;margin:.35em 0 .15em}
.iqt.iqt-pl .lsec .lin>p.mut{margin:.1em 0 .4em}
.iqt.iqt-pl .rescmp{padding:10px 14px;gap:12px;flex-wrap:nowrap;align-items:flex-end}
.iqt.iqt-pl .rescmp-i{flex:none}
.iqt .hero{background:var(--card)!important;animation:none!important}
.iqt .hero::before,.iqt .hero::after{display:none!important}
.iqt.iqt-pl .rescmp-i img,.iqt.iqt-pl .rescmp-i svg{width:64px;height:48px;max-width:64px;max-height:48px;margin:0;padding:2px;object-fit:cover;display:block}
.iqt.iqt-pl .rescmp label{margin:0 0 2px}
.iqt.iqt-pl .rescmp input,.iqt.iqt-pl .rescmp select{padding:7px 10px}
@media(max-width:640px){.iqt.iqt-pl .rescmp{flex-wrap:wrap}}

/* real SVG icons */
.iqt .ic{width:1.1em;height:1.1em;vertical-align:-.17em;flex:none}
.iqt .pbn-ic .ic,.iqt .thumb .ic{width:1em;height:1em;vertical-align:middle}

/* ===== FULL WIDTH (sub-nav + all sections) ===== */
.iqt.iqt-pl .wrap{max-width:none;width:100%;padding-left:clamp(16px,3.2vw,48px);padding-right:clamp(16px,3.2vw,48px)}

/* ===== REMOVE "LIFE SKILLS / STORYLINE"-type pills from all sections ===== */
.iqt .sl-eb{display:none!important}

/* ===== COMPACT CARDS + AUTO MARQUEE ===== */
.iqt .mqx{display:flex!important;flex-wrap:nowrap;gap:12px;overflow-x:auto;overflow-y:hidden;grid-template-columns:none!important;padding:4px 2px 12px;scrollbar-width:thin;scroll-behavior:auto;margin-top:10px}
.iqt .mqx>*{flex:0 0 clamp(210px,22vw,265px);max-width:265px;min-width:0;padding:12px!important;font-size:.88rem;margin:0!important}
.iqt .mqx h3{font-size:.95rem;margin-bottom:.3em}
.iqt .mqx p,.iqt .mqx li{font-size:.82rem;margin:.2em 0}
.iqt .mqx img,.iqt .mqx img.pic,.iqt .mqx img.pimg{height:70px!important;max-height:70px!important;width:auto;max-width:100%;margin:0 auto 6px!important}
.iqt .mqx .thumb{height:52px;font-size:1.6rem;margin-bottom:6px}
.iqt .mqx .sl-q{padding:12px!important}
.iqt .mqx .sl-q legend{font-size:.88rem;margin-bottom:6px}
.iqt .mqx .sl-opt{min-height:34px;padding:3px 4px;font-size:.85rem}
.iqt .mqx .btn{padding:6px 12px;font-size:.8rem;min-height:36px}
.iqt .mqx::-webkit-scrollbar{height:6px}
.iqt .mqx::-webkit-scrollbar-thumb{background:var(--line);border-radius:6px}

/* ===== FINAL COMPACT PASS ===== */
.iqt .mqx>*{flex:1 0 clamp(210px,22vw,265px);max-width:none}

.iqt.iqt-pl .lsec .grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.iqt.iqt-pl .lsec .card{padding:14px}
.iqt.iqt-pl .lsec .card h3{font-size:.98rem;margin-bottom:.25em}
.iqt.iqt-pl .lsec .card p{margin:.25em 0}

.iqt.iqt-pl #sec-manager .grid>.card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px}
.iqt.iqt-pl #sec-manager .grid>.card h3{margin:0;font-size:1rem}
.iqt.iqt-pl #sec-manager .grid>.card svg{width:84px!important;height:84px;flex:none}
.iqt.iqt-pl #sec-manager .grid>.card .big{font-size:2.4rem}
.iqt.iqt-pl #sec-manager .card[style*="margin-top"]{margin-top:12px!important}
.iqt.iqt-pl #sec-manager .bars .b{margin:5px 0}
.iqt.iqt-pl #sec-manager svg[aria-label^="Completion trend"]{max-height:120px}

.iqt .pedrow{flex-wrap:nowrap;gap:8px;margin-top:10px;overflow-x:auto}
.iqt .pedrow .btn{padding:6px 12px;font-size:.82rem;min-height:34px;white-space:nowrap;flex:0 0 auto}

.iqt .thumb .ic{width:1.1em;height:1.1em}
.iqt .pbn-o .ic{width:1em;height:1em}
@media(max-width:900px){
  .iqt.iqt-pl #burger{margin-left:0}
  .iqt.iqt-pl nav.m{top:48px}
}

/* ===== ULTRA COMPACT: banner + heading + filter bars ===== */
/* banner: thin strip, subtitle hidden, floating emoji hidden */
.iqt.iqt-pl .pbn{min-height:44px;padding:6px 14px;margin:4px 0 0;border-radius:12px;gap:10px;box-shadow:none}
.iqt.iqt-pl .pbn-ic{width:32px;height:32px;font-size:1.1rem;border-radius:10px}
.iqt.iqt-pl .pbn-t{flex-direction:row;align-items:baseline;gap:10px;flex-wrap:wrap}
.iqt.iqt-pl .pbn-t b{font-size:.95rem}
.iqt.iqt-pl .pbn-t small{font-size:.75rem}
.iqt.iqt-pl .pbn-o{display:none}

/* section heading + intro line on ONE line */
.iqt.iqt-pl .lsec h2.lh{display:inline-block;font-size:1.2rem;margin:.25em .6em .1em 0}
.iqt.iqt-pl .lsec .lin>p.mut{display:inline;margin:0;font-size:.85rem}
.iqt.iqt-pl .lsec{padding:2px 0}

/* filter bars (Courses, Resources, Programs): single compact row */
.iqt.iqt-pl .lsec .card.row{padding:6px 10px;gap:8px;flex-wrap:nowrap;align-items:flex-end;margin:6px 0 0}
.iqt.iqt-pl .lsec .card.row>div{min-width:0!important}
.iqt.iqt-pl .lsec .card.row label{margin:0 0 1px;font-size:.72rem}
.iqt.iqt-pl .lsec .card.row input,
.iqt.iqt-pl .lsec .card.row select{padding:5px 8px;font-size:.85rem;border-radius:8px;min-height:32px}
.iqt.iqt-pl .lsec .card.row .btn{padding:6px 12px;min-height:32px}
.iqt.iqt-pl .rescmp-i img,.iqt.iqt-pl .rescmp-i svg{width:40px;height:32px;max-width:40px;max-height:32px;padding:1px}
.iqt.iqt-pl #cn{margin:2px 0;font-size:.8rem}
.iqt.iqt-pl #bl,.iqt.iqt-pl #cl2{margin-top:6px!important}
.iqt.iqt-pl #bp{margin:6px 0!important}

/* cards inside marquee: tighter */
.iqt.iqt-pl .mqx{padding:2px 2px 8px;margin-top:6px;gap:10px}
.iqt.iqt-pl .mqx>*{padding:10px!important}
.iqt.iqt-pl .mqx .badge{font-size:.68rem;padding:1px 8px}
.iqt.iqt-pl .mqx h3{font-size:.9rem;margin:.3em 0 .2em}
.iqt.iqt-pl .mqx .thumb{height:40px;font-size:1.3rem;margin-bottom:4px}

@media(max-width:640px){
  .iqt.iqt-pl .lsec .card.row{flex-wrap:wrap}
}

/* ===== FIX: popup (dialog) centered + proper padding ===== */
.iqt dialog#dlg{position:fixed;inset:0;margin:auto;padding:22px 24px;width:min(92vw,480px);max-width:480px;height:fit-content;max-height:88vh;overflow:auto;border:1px solid var(--line);border-radius:var(--r);background:var(--card);color:var(--ink);box-shadow:0 24px 60px rgba(0,0,0,.35);z-index:100}
.iqt dialog#dlg:not([open]){display:none}
.iqt dialog#dlg::backdrop{background:rgba(0,0,0,.55)}
.iqt dialog#dlg h2{margin:0 0 .5em;font-size:1.3rem}
.iqt dialog#dlg p{margin:0 0 .8em}
.iqt dialog#dlg .row{margin-top:14px;gap:10px}
.iqt dialog#dlg .btn{flex:1 1 auto;justify-content:center}

/* ===== RESULTS: IQ-style orbit graphic (page theme colors) ===== */
.iqt .rz{display:grid;gap:18px;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:center}
@media(max-width:860px){.iqt .rz{grid-template-columns:1fr}}
.iqt .rz-viz{display:block;width:100%;max-width:560px;height:auto;margin:0 auto;color:var(--ink)}
.iqt .rz-scale{position:relative;height:12px;border-radius:9px;background:linear-gradient(90deg,#ef4444,#f59e0b,#16A34A);margin:28px 0 6px}
.iqt .rz-scale i{position:absolute;top:-7px;width:4px;height:26px;border-radius:3px;background:var(--ink);transform:translateX(-50%)}
.iqt .rz-ticks{display:flex;justify-content:space-between;font-size:.75rem;color:var(--mut)}
.iqt .rz-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:14px}
.iqt .rz-meta div{border:1px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--bg)}
.iqt .rz-meta small{display:block;color:var(--mut);font-size:.7rem;text-transform:uppercase;letter-spacing:.05em}
.iqt .rz-meta b{font-size:.95rem;overflow-wrap:anywhere}
.iqt .rz-bar{display:flex;align-items:center;gap:8px}
.iqt .rz-bar .prog{flex:1}
.iqt .rz{position:relative;overflow:hidden;padding:24px;background:radial-gradient(circle at 20% 35%,rgba(249,115,22,.12),transparent 55%),radial-gradient(circle at 85% 75%,rgba(22,163,74,.12),transparent 55%),var(--card)}
.iqt .rz-viz{max-width:620px}
.iqt .rz-poly{transform-box:view-box;transform-origin:300px 230px;animation:rzpop 1.1s cubic-bezier(.2,.7,.2,1) both}
@keyframes rzpop{from{transform:scale(.15);opacity:0}}
.iqt .rz h2{font-size:1.6rem}
@media(prefers-reduced-motion:reduce){.iqt .rz-poly{animation:none}}
/* ===== CONTACT: success box ===== */
.iqt .cok{margin-top:12px;padding:14px 16px;border-radius:12px;border:1.5px solid var(--g);background:rgba(22,163,74,.12);animation:iqmin .5s ease both}

/* ===== IQ TEST: moving live preview, marquee, flow ===== */
.iqt .iqm{position:relative;overflow:hidden;margin:20px 0;padding:clamp(18px,3vw,34px);border-radius:24px;border:1px solid var(--line);background:radial-gradient(circle at 15% 20%,rgba(249,115,22,.14),transparent 55%),radial-gradient(circle at 90% 85%,rgba(99,102,241,.14),transparent 55%),var(--card)}
.iqt .iqm-bg i{position:absolute;border-radius:50%;pointer-events:none;animation:iqmf 9s ease-in-out infinite}
.iqt .iqm-bg i:nth-child(1){width:70px;height:70px;left:4%;top:10%;background:rgba(249,115,22,.22)}
.iqt .iqm-bg i:nth-child(2){width:44px;height:44px;left:46%;top:6%;background:rgba(22,163,74,.22);animation-delay:-2s}
.iqt .iqm-bg i:nth-child(3){width:90px;height:90px;right:3%;bottom:8%;background:rgba(99,102,241,.2);animation-delay:-4s}
.iqt .iqm-bg i:nth-child(4){width:30px;height:30px;left:40%;bottom:10%;border-radius:8px;background:rgba(14,165,233,.28);animation-delay:-1s}
.iqt .iqm-bg i:nth-child(5){width:36px;height:36px;right:30%;top:14%;border-radius:8px;background:rgba(249,115,22,.25);animation-delay:-5s}
@keyframes iqmf{50%{transform:translate(18px,-26px) rotate(25deg)}}
.iqt .iqm-in{position:relative;display:grid;gap:28px;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);align-items:center}
@media(max-width:820px){.iqt .iqm-in{grid-template-columns:1fr}}
.iqt .iqm-demo{background:var(--bg);border:1px solid var(--line);border-radius:20px;padding:18px;min-height:300px;box-shadow:0 18px 40px rgba(0,0,0,.14);animation:iqmf2 6s ease-in-out infinite}
@keyframes iqmf2{50%{transform:translateY(-8px)}}
.iqt .iqm-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.iqt .iqm-chip{padding:3px 12px;border-radius:99px;font-size:.75rem;font-weight:800;background:rgba(249,115,22,.16);color:var(--od)}
.iqt .iqm-time{font-variant-numeric:tabular-nums;font-weight:800;background:var(--ink);color:var(--bg);padding:4px 10px;border-radius:9px}
.iqt .iqm-prog{height:8px;border-radius:8px;background:var(--line);overflow:hidden}
.iqt .iqm-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--o),var(--g));transition:width .8s cubic-bezier(.2,.7,.2,1)}
.iqt .iqm-q{font-weight:800;font-size:1.15rem;margin:16px 0 10px;min-height:2.6em;animation:iqmin .5s ease both}
.iqt .iqm-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.iqt .iqm-o{border:2px solid var(--line);border-radius:12px;padding:10px 12px;font-weight:600;background:var(--card);transition:all .3s;animation:iqmin .5s ease both}
.iqt .iqm-o:nth-child(2){animation-delay:.08s}
.iqt .iqm-o:nth-child(3){animation-delay:.16s}
.iqt .iqm-o:nth-child(4){animation-delay:.24s}
.iqt .iqm-o.sel{border-color:var(--o);background:rgba(249,115,22,.12);transform:scale(1.03)}
.iqt .iqm-o.ok{border-color:var(--g);background:rgba(22,163,74,.16)}
@keyframes iqmin{from{opacity:0;transform:translateY(12px)}}
.iqt .iqm-dots{display:flex;gap:8px;margin:14px 0}
.iqt .iqm-dots b{width:34px;height:8px;border-radius:6px;background:var(--line);transition:background .4s}
.iqt .iqm-dots b.on{background:var(--g)}
.iqt .iqm-mq{overflow:hidden;margin:6px 0 18px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.iqt .iqm-track{display:flex;width:max-content;animation:iqmq 32s linear infinite}
.iqt .iqm-mq:hover .iqm-track{animation-play-state:paused}
.iqt .iqm-t{display:flex;flex-direction:column;gap:2px;min-width:210px;margin:0 8px;padding:14px 20px;border:1px solid var(--line);border-radius:14px;background:var(--card);transition:transform .25s,border-color .25s}
.iqt .iqm-t:hover{transform:translateY(-4px);border-color:var(--o)}
.iqt .iqm-t span{font-size:1.4rem;color:var(--o)}
@keyframes iqmq{to{transform:translateX(-50%)}}
.iqt .iqm-flow{margin:10px 0 24px}
.iqt .iqm-line{height:4px;border-radius:4px;background:var(--line);margin:12px 0 18px;overflow:hidden}
.iqt .iqm-line i{display:block;height:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,var(--o),var(--g));transition:transform 1.6s ease .2s}
.iqt .iqm-flow.on .iqm-line i{transform:scaleX(1)}
.iqt .iqm-flow ol{list-style:none;padding:0;margin:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.iqt .iqm-flow li{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1)}
.iqt .iqm-flow.on li{opacity:1;transform:none}
.iqt .iqm-flow.on li:nth-child(2){transition-delay:.25s}
.iqt .iqm-flow.on li:nth-child(3){transition-delay:.5s}
.iqt .iqm-flow.on li:nth-child(4){transition-delay:.75s}
.iqt .iqm-n{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--o),var(--g));color:#fff;font-weight:800;margin-bottom:8px}
.iqt .iqm-flow li p{margin:0}
@media(prefers-reduced-motion:reduce){.iqt .iqm-track,.iqt .iqm-demo,.iqt .iqm-bg i{animation:none}.iqt .iqm-flow li{opacity:1;transform:none}.iqt .iqm-line i{transform:none}}
/* ===== TEST PAGE: moving question card, timer ring, dots ===== */
.iqt .qring{position:relative;width:60px;height:60px;flex:none}
.iqt .qring svg{width:60px;height:60px;transform:rotate(-90deg);display:block}
.iqt .qring circle{fill:none;stroke-width:5}
.iqt .qring .bg{stroke:var(--line)}
.iqt .qring #tring{stroke-linecap:round;transition:stroke-dashoffset 1s linear}
.iqt .qring.warn #tring{stroke:#d92d20}
.iqt .qring span.timer{position:absolute;inset:0;display:grid;place-items:center;background:none;color:var(--ink);padding:0;border-radius:0;font-size:.8rem}
.iqt .qring span.timer.warn{background:none;color:#d92d20}
.iqt .qring.warn{animation:qpulse 1.2s infinite;border-radius:50%}
.iqt .tbar ~ .prog i{animation:none;transition:width .6s}
.iqt .qdots{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px}
.iqt .qdots i{width:14px;height:14px;border-radius:50%;background:var(--line);transition:all .3s}
.iqt .qdots i.a{background:var(--g)}
.iqt .qdots i.f{box-shadow:0 0 0 2px var(--o)}
.iqt .qdots i.c{background:var(--o);transform:scale(1.35);animation:qpulse 1.6s infinite}
@keyframes qpulse{50%{box-shadow:0 0 0 6px rgba(249,115,22,.22)}}
.iqt .qcard{position:relative;overflow:hidden;border-top:5px solid var(--cc,#F97316)}
.iqt .c-logical{--cc:#F97316}
.iqt .c-verbal{--cc:#16A34A}
.iqt .c-numerical{--cc:#6366f1}
.iqt .c-spatial{--cc:#0ea5e9}
.iqt .qcard>*{position:relative;z-index:1}
.iqt .qcard>.qbg{position:absolute;inset:0;z-index:0;pointer-events:none}
.iqt .qbg i{position:absolute;border-radius:50%;background:var(--cc);opacity:.1;animation:iqmf 9s ease-in-out infinite}
.iqt .qbg i:nth-child(1){width:110px;height:110px;left:-30px;top:-30px}
.iqt .qbg i:nth-child(2){width:70px;height:70px;right:10%;bottom:8%;animation-delay:-3s}
.iqt .qbg i:nth-child(3){width:44px;height:44px;right:32%;top:18%;border-radius:10px;animation-delay:-5s}
.iqt .qhd{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.iqt .qic{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:var(--cc);color:#fff;font-size:1.4rem;animation:iqmf2 4s ease-in-out infinite}
.iqt .qno{margin-left:auto;font-size:2.6rem;font-weight:800;line-height:1;color:var(--cc);opacity:.28}
.iqt .qtx{font-size:1.3rem}
.iqt .qanim{animation:qslide .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes qslide{from{opacity:0;transform:translateX(var(--qx,56px)) scale(.97)}}
.iqt .qcard:focus{outline:none}
.iqt .qlock{pointer-events:none}
.iqt .qcn{display:inline-block}
.iqt .qcnt{animation:qcnt .5s cubic-bezier(.2,.8,.2,1) both}
@keyframes qcnt{from{opacity:0;transform:translateY(-10px)}}
@media(max-width:640px){.iqt .qanim{animation-duration:.5s}}
.iqt .qanim .opt{animation:iqmin .5s ease backwards}
.iqt .qanim .opt:nth-of-type(2){animation-delay:.08s}
.iqt .qanim .opt:nth-of-type(3){animation-delay:.16s}
.iqt .qanim .opt:nth-of-type(4){animation-delay:.24s}
.iqt .qcard .opt{position:relative;gap:12px;transition:transform .2s,border-color .2s,background .2s,box-shadow .2s}
.iqt .qcard .opt:hover{transform:translateX(6px);border-color:var(--cc);box-shadow:0 8px 20px rgba(0,0,0,.08)}
.iqt .qcard .opt input{position:absolute;opacity:0;pointer-events:none}
.iqt .qcard .opt:has(input:focus-visible){outline:3px solid var(--g);outline-offset:2px}
.iqt .ol{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;border:2px solid var(--line);font-weight:800;flex:none;transition:all .2s}
.iqt .qcard .opt:has(input:checked) .ol{background:var(--g);border-color:var(--g);color:#fff;animation:qpop .4s}
@keyframes qpop{40%{transform:scale(1.3) rotate(-8deg)}}
.iqt .ot{flex:1}
.iqt .ock{opacity:0;color:var(--g);transform:scale(.4);transition:all .3s}
.iqt .qcard .opt:has(input:checked) .ock{opacity:1;transform:none}
.iqt .nav button{transition:transform .2s,border-color .2s}
.iqt .nav button:hover{transform:translateY(-3px);border-color:var(--o)}
.iqt .nav .c{animation:qpulse 1.6s infinite}
.iqt .po{transition:transform .2s,border-color .2s}
.iqt .po:hover{transform:translateX(6px);border-color:var(--o)}
@media(prefers-reduced-motion:reduce){.iqt .qbg i,.iqt .qic,.iqt .qanim,.iqt .qanim .opt,.iqt .qdots i.c,.iqt .nav .c,.iqt .qring.warn{animation:none}.iqt .qring #tring{transition:none}}

/* ===== CLEAN WHITE LOOK: remove all pink/peach/gradient tints ===== */
.iqt .hero{background:var(--card)!important;animation:none!important;border:1px solid var(--line)}
.iqt .hero::before,.iqt .hero::after{display:none!important}
.iqt .iqm{background:var(--card)!important}
.iqt .iqm-bg{display:none!important}
.iqt .rz{background:var(--card)!important}
.iqt .qbg{display:none!important}
.iqt .tease,.iqt .jb,.iqt .note{background:var(--card)!important}
.iqt .tease{border:1px solid var(--line)}
.iqt .lsec:nth-child(even):not(.sl-wrapper){background:transparent!important}
.iqt .sl-sec.alt{background:transparent!important}
.iqt .sl-card.hov:hover{background:var(--sl-sf);color:inherit;box-shadow:0 10px 22px rgba(0,0,0,.08);border-color:var(--line);transform:none}
.iqt .sl-card.hov:hover *{color:inherit!important}
.iqt .iqm-demo{animation:none!important;box-shadow:0 8px 24px rgba(0,0,0,.08)}

/* ===== CONTACT: compact form so Send button is visible ===== */
.iqt #cf{padding:14px 18px}
.iqt #cf label{margin:6px 0 2px;font-size:.85rem}
.iqt #cf input{padding:7px 10px;min-height:36px}
.iqt #cf textarea{padding:7px 10px;min-height:0;height:84px;resize:vertical}
.iqt #cf .err{min-height:0;margin:0;line-height:1.1}
.iqt #cf .btn{margin-top:8px!important;padding:8px 16px}
.iqt #cf p.mut{margin:6px 0 0}
.iqt #cs{margin-top:6px}
.iqt #sec-contact .cgrid{display:grid!important;grid-template-columns:1fr 1fr;gap:16px;align-items:start}
.iqt #sec-contact .cdet{min-height:0}
.iqt #sec-contact .cdet h3{margin-bottom:.3em}
.iqt #sec-contact .cdet .cok{margin-top:8px;padding:10px 14px}
@media(max-width:760px){.iqt #sec-contact .cgrid{grid-template-columns:1fr!important}}

/* ===== CLEAN SPACING: undo cramped layout in every section ===== */
.iqt.iqt-pl .lsec{padding:32px 0;border-top:1px solid var(--line)}
.iqt.iqt-pl .lsec:first-child{border-top:0}
.iqt.iqt-pl .lsec h2.lh{display:block;font-size:1.7rem;margin:0 0 6px}
.iqt.iqt-pl .lsec .lin>p.mut{display:block;margin:0 0 20px;font-size:.95rem}
.iqt.iqt-pl .lsec section.s{margin:28px 0}
.iqt.iqt-pl .lsec .grid{gap:16px}
.iqt.iqt-pl .lsec .card{padding:18px}
.iqt.iqt-pl .lsec .card h3{margin-bottom:.4em}
.iqt.iqt-pl .lsec .card.row{padding:14px 16px;gap:14px;flex-wrap:wrap;margin:14px 0 0}
.iqt.iqt-pl .lsec .card.row label{font-size:.85rem;margin:0 0 4px}
.iqt.iqt-pl .lsec .card.row input,
.iqt.iqt-pl .lsec .card.row select{padding:9px 12px;min-height:40px;font-size:.95rem}
.iqt.iqt-pl #cn{margin:10px 0 0;font-size:.9rem}
.iqt.iqt-pl #bl,.iqt.iqt-pl #cl2,.iqt.iqt-pl #plan{margin-top:18px!important}
.iqt.iqt-pl #bp{margin:18px 0!important}
.iqt.iqt-pl .mqx{gap:16px;padding:6px 2px 14px;margin-top:16px}
.iqt.iqt-pl .mqx>*{padding:14px!important}

/* contact */
.iqt #sec-contact .cgrid{gap:24px;margin-top:8px}
.iqt #cf{padding:22px}
.iqt #cf label{margin:12px 0 4px;font-size:.9rem}
.iqt #cf label:first-child{margin-top:0}
.iqt #cf input{padding:10px 12px;min-height:42px}
.iqt #cf textarea{padding:10px 12px;height:110px}
.iqt #cf .err{min-height:1em;margin:2px 0 0}
.iqt #cf .btn{margin-top:14px!important;padding:10px 22px}
.iqt #cf p.mut{margin:12px 0 0}
.iqt #sec-contact .cdet{padding:22px}
.iqt #sec-contact .cdet h3{margin-bottom:.6em}
.iqt #sec-contact .cdet .cok{margin-top:14px;padding:14px 16px}

/* ===== COMPACT BUTTONS + FILTER ROWS (all sections) ===== */
.iqt.iqt-pl .btn{padding:8px 16px;min-height:0;font-size:.9rem;border-radius:10px;gap:6px;line-height:1.2}
.iqt.iqt-pl .btn.s{padding:5px 12px;font-size:.8rem;border-radius:8px}
.iqt.iqt-pl .btn.o{border-width:1.5px}
.iqt.iqt-pl .btn:hover{transform:none;box-shadow:none}
.iqt.iqt-pl .row{gap:8px}
.iqt.iqt-pl .row>.btn{flex:0 0 auto}
.iqt.iqt-pl .sl-btn{min-height:0;padding:8px 16px;font-size:.88rem;border-radius:8px}
.iqt.iqt-pl .sl-row{gap:8px;margin-top:12px}
.iqt.iqt-pl .sl-tabs button,.iqt.iqt-pl .tabs button{min-height:0;padding:6px 12px;font-size:.85rem}
.iqt.iqt-pl .nav button{width:34px;height:34px;font-size:.85rem}
.iqt.iqt-pl .pedrow .btn{padding:5px 12px;font-size:.8rem}
.iqt.iqt-pl dialog#dlg .btn{padding:8px 16px}

/* filter rows: Search / Type / Level all same height and aligned */
.iqt.iqt-pl .lsec .card.row{display:flex;align-items:flex-end;gap:12px;padding:12px 14px;flex-wrap:wrap}
.iqt.iqt-pl .lsec .card.row>div{display:flex;flex-direction:column;justify-content:flex-end}
.iqt.iqt-pl .lsec .card.row label{margin:0 0 4px;font-size:.78rem;line-height:1.2}
.iqt.iqt-pl .lsec .card.row input,
.iqt.iqt-pl .lsec .card.row select{height:38px;min-height:0;padding:0 12px;font-size:.9rem;border-radius:8px}
.iqt.iqt-pl .lsec .card.row .btn{height:38px;padding:0 16px}
.iqt.iqt-pl .rescmp-i{align-self:flex-end}
.iqt.iqt-pl .rescmp-i img,.iqt.iqt-pl .rescmp-i svg{width:38px;height:38px;max-width:38px;max-height:38px;padding:0;margin:0;border-radius:8px;object-fit:cover}

/* tighter vertical rhythm */
.iqt.iqt-pl .lsec{padding:24px 0}
.iqt.iqt-pl .lsec .card{padding:16px}
.iqt.iqt-pl .lsec h2.lh{margin:0 0 4px}
.iqt.iqt-pl .lsec .lin>p.mut{margin:0 0 14px}
.iqt.iqt-pl .lsec .card.row{margin:10px 0 0}
.iqt.iqt-pl #bl,.iqt.iqt-pl #cl2,.iqt.iqt-pl #plan{margin-top:14px!important}
.iqt #cf .btn{margin-top:12px!important;padding:8px 18px}
`;

const PL_CSS2 = `
/* ===== MODERN CHARTS + MOTION ===== */
.iqt .dn-arc{stroke-dasharray:var(--v) 251.3;transition:stroke-dasharray 1.5s cubic-bezier(.2,.7,.2,1) .2s;filter:drop-shadow(0 0 4px rgba(22,163,74,.3))}
.iqt .rv:not(.in) .dn-arc{stroke-dasharray:0 251.3}
.iqt .tl-line{stroke-dasharray:1;stroke-dashoffset:0;transition:stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1) .2s}
.iqt .rv:not(.in) .tl-line{stroke-dashoffset:1}
.iqt .tl-area{transition:opacity 1s ease .7s}
.iqt .rv:not(.in) .tl-area{opacity:0}
.iqt .tp{transition:opacity .5s ease var(--d,0s)}
.iqt .rv:not(.in) .tp{opacity:0}
.iqt .tp-p{transform-box:fill-box;transform-origin:center;animation:tpp 2.4s ease-in-out infinite}
@keyframes tpp{50%{transform:scale(1.7);opacity:0}}
.iqt .tt{opacity:0;transition:opacity .2s;pointer-events:none}
.iqt .tp:hover .tt{opacity:1}
.iqt .trend{display:block;width:100%;height:auto;color:var(--ink)}

/* shimmer on every progress bar */
.iqt .prog i{position:relative;overflow:hidden;border-radius:9px}
.iqt .prog i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-100%);animation:shm 2.4s ease-in-out infinite 1.2s}
@keyframes shm{to{transform:translateX(100%)}}

/* manager dashboard */
.iqt .mgk{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:6px}
.iqt .kpi{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px!important;position:relative;overflow:hidden}
.iqt .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--kc,var(--o))}
.iqt .kpi:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.1)}
.iqt .kpi-l{display:flex;flex-direction:column;gap:4px;min-width:0}
.iqt .kpi-l small{color:var(--mut);font-weight:600;font-size:.85rem}
.iqt .kpi-i{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:color-mix(in srgb,var(--kc,var(--o)) 14%,transparent);color:var(--kc,var(--o));font-size:1.2rem;margin-bottom:4px}
.iqt .dlt{font-size:.78rem;font-weight:700;color:var(--gd)}
.iqt .kpi .dn{width:96px;height:96px;flex:none}
.iqt .kpi .big{font-size:2.6rem}
.iqt .kpi .spk{width:120px;height:44px;flex:none}
.iqt .mgr{display:grid;gap:16px;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);margin-top:16px;align-items:stretch}
@media(max-width:900px){.iqt .mgr{grid-template-columns:1fr}}
.iqt .mgr h2{font-size:1.1rem;margin:0}
.iqt .mgr .row{margin-bottom:12px}
.iqt .tm{margin:16px 0}
.iqt .tm-h{display:flex;justify-content:space-between;font-size:.9rem;font-weight:600;margin-bottom:6px}
.iqt .tm-n{display:flex;align-items:center;gap:8px}
.iqt .tm-n i{width:10px;height:10px;border-radius:50%}
.iqt .tm-b{height:12px;border-radius:99px;background:var(--line);overflow:hidden}
.iqt .tm-f{display:block;position:relative;overflow:hidden;height:100%;width:var(--w);border-radius:99px;background:var(--c);transform-origin:left;transition:transform 1.2s cubic-bezier(.2,.7,.2,1) var(--d,0s);box-shadow:0 0 12px color-mix(in srgb,var(--c) 45%,transparent)}
.iqt .tm-f::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);transform:translateX(-100%);animation:shm 2.6s ease-in-out infinite 1.4s}
.iqt .rv:not(.in) .tm-f{transform:scaleX(0)}

/* Resources: picture at top-right of the section */
.iqt #sec-blog .lin{position:relative}
.iqt .blog-pic{position:absolute;top:0;right:0;z-index:1}
.iqt .blog-pic img{width:84px!important;height:84px!important;max-width:84px;max-height:84px;aspect-ratio:1;object-fit:cover;margin:0;padding:4px}
@media(max-width:640px){.iqt .blog-pic img{width:56px!important;height:56px!important;max-width:56px;max-height:56px}}
`;

export default function IQTest({
  defaultRoute = "home",
  showShell = true,
  stickyTop,
  withPublicLayout = true,
  theme,
  toggleTheme,
  scrollToSection,
}) {
  /* callback-ref: div dobara bane to bhi engine dobara mount hoga */
  const [host, setHost] = React.useState(null);

  /* ── Theme ── */
  const controlled = theme === "dark" || theme === "light";
  const [localTheme, setLocalTheme] = React.useState("light");
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    let t = null;
    try {
      t = localStorage.getItem("iqtest_theme") || localStorage.getItem("theme");
    } catch (e) {}
    if (t !== "dark" && t !== "light") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setLocalTheme(t);
    setReady(true);
  }, []);

    const activeTheme = controlled ? theme : ready ? localTheme : "light";

  const handleToggleTheme = () => {
    if (typeof toggleTheme === "function") toggleTheme();
    if (!controlled) setLocalTheme((p) => (p === "dark" ? "light" : "dark"));
  };

  /* <html> class + apni alag key me save (site ki "theme" key ko touch nahi) */
  useEffect(() => {
    if (controlled || !ready) return;
    const de = document.documentElement;
    de.classList.toggle("dark", activeTheme === "dark");
    de.setAttribute("data-theme", activeTheme);
    try {
      localStorage.setItem("iqtest_theme", activeTheme);
    } catch (e) {}
  }, [activeTheme, controlled, ready]);

  /* Engine mount: SHELL yahin inject hota hai (React children nahi) */
  useEffect(() => {
    if (!host) return;
    host.innerHTML = SHELL;
    const off = mountIlmOra(host, IM, { defaultRoute });
    return () => {
      if (typeof off === "function") off();
      host.innerHTML = "";
    };
    // eslint-disable-next-line
  }, [host]);

  /* theme badalte hi render ho chuka Storyline (.sl) bhi update */
  useEffect(() => {
    if (!host || !withPublicLayout) return;
    host.setAttribute("data-theme", activeTheme);
    host
      .querySelectorAll(".sl")
      .forEach((s) => s.setAttribute("data-theme", activeTheme));
  }, [host, activeTheme, withPublicLayout]);

  const body = (
    <div
      ref={setHost}
      className={
        "iqt" + (withPublicLayout ? " iqt-pl" : showShell ? "" : " iqt-noshell")
      }
      data-theme={withPublicLayout ? activeTheme : undefined}
      style={
        withPublicLayout
          ? { "--iqt-top": "132px" }
          : stickyTop != null
            ? { "--iqt-top": stickyTop + "px" }
            : undefined
      }
    />
  );

  if (!withPublicLayout) return body;

  return (
    <PublicLayout
      theme={activeTheme}
      toggleTheme={handleToggleTheme}
      scrollToSection={scrollToSection}
    >
            <style>{PL_CSS + PL_CSS2}</style>
      {body}
    </PublicLayout>
  );
}