"use client";
/**
 * ILM ORA LAW: poori public website, ek file (15 pages + 10 articles).
 * Place: src/legacy-pages/Landing/ilmoralaw.jsx
 * Navbar + Footer sirf PublicLayout se aate hain.
 * ROUTES (clean paths): /ilmoralaw/home, /ilmoralaw/training, /ilmoralaw/legal-drafting-masterclass ...
 * Page file: app/(public)/ilmoralaw/[[...slug]]/page.jsx (catch-all, purana ilmoralaw/page.jsx hata dein)
 * SAMPLE: courses, fees, dates, jobs, lawyers hain. Stats/testimonials/legal text launch se pehle verify karein.
 */
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PublicLayout from './components/PublicLayout';
import a1 from '../../assets/ilmoralaw/advocate-woman.webp';
import a2 from '../../assets/ilmoralaw/business-handshake.webp';
import a3 from '../../assets/ilmoralaw/cafe-laptop.webp';
import a4 from '../../assets/ilmoralaw/classroom-hall.webp';
import a5 from '../../assets/ilmoralaw/client-handshake.webp';
import a6 from '../../assets/ilmoralaw/corridor.webp';
import a7 from '../../assets/ilmoralaw/court-hearing.webp';
import a8 from '../../assets/ilmoralaw/desk-evening.webp';
import a9 from '../../assets/ilmoralaw/exam-omr.webp';
import b1 from '../../assets/ilmoralaw/gavel-book.webp';
import b2 from '../../assets/ilmoralaw/gavel-dark.webp';
import b3 from '../../assets/ilmoralaw/glass-building.webp';
import b4 from '../../assets/ilmoralaw/hands-family.webp';
import b5 from '../../assets/ilmoralaw/handshake-contract.webp';
import b6 from '../../assets/ilmoralaw/house-keys.webp';
import b7 from '../../assets/ilmoralaw/india-govt.webp';
import b8 from '../../assets/ilmoralaw/justice-gavel.webp';
import b9 from '../../assets/ilmoralaw/lady-justice.webp';
import c1 from '../../assets/ilmoralaw/laptop-student.webp';
import c2 from '../../assets/ilmoralaw/library-busts.webp';
import c3 from '../../assets/ilmoralaw/library-curve.webp';
import c4 from '../../assets/ilmoralaw/meeting-three.webp';
import c5 from '../../assets/ilmoralaw/notebook-desk.webp';
import c6 from '../../assets/ilmoralaw/notebook-pen.webp';
import c7 from '../../assets/ilmoralaw/papers-stack.webp';
import c8 from '../../assets/ilmoralaw/passports.webp';
import c9 from '../../assets/ilmoralaw/pen-writing.webp';
import d1 from '../../assets/ilmoralaw/portrait-man1.webp';
import d2 from '../../assets/ilmoralaw/portrait-man2.webp';
import d3 from '../../assets/ilmoralaw/portrait-woman1.webp';
import d4 from '../../assets/ilmoralaw/portrait-woman2.webp';
import d5 from '../../assets/ilmoralaw/seminar-man.webp';
import d6 from '../../assets/ilmoralaw/signing-docs.webp';
import d7 from '../../assets/ilmoralaw/supreme-court.webp';
import d8 from '../../assets/ilmoralaw/team-table.webp';
import d9 from '../../assets/ilmoralaw/writing-hand.webp';
import vidCourt from '../../assets/ilmoralaw/6699964-hd_1920_1080_24fps.mp4';
import vidTeam from '../../assets/ilmoralaw/7643614-uhd_2160_4096_25fps.mp4';
import vidLaptop from '../../assets/ilmoralaw/7683478-hd_1920_1080_30fps.mp4';
import vidHero from '../../assets/ilmoralaw/8061570-uhd_3840_2160_25fps.mp4';
import vidMeet from '../../assets/ilmoralaw/8135851-uhd_4096_2160_25fps.mp4';

const IMG = { 'advocate-woman': a1, 'business-handshake': a2, 'cafe-laptop': a3, 'classroom-hall': a4, 'client-handshake': a5, corridor: a6, 'court-hearing': a7, 'desk-evening': a8, 'exam-omr': a9, 'gavel-book': b1, 'gavel-dark': b2, 'glass-building': b3, 'hands-family': b4, 'handshake-contract': b5, 'house-keys': b6, 'india-govt': b7, 'justice-gavel': b8, 'lady-justice': b9, 'laptop-student': c1, 'library-busts': c2, 'library-curve': c3, 'meeting-three': c4, 'notebook-desk': c5, 'notebook-pen': c6, 'papers-stack': c7, passports: c8, 'pen-writing': c9, 'portrait-man1': d1, 'portrait-man2': d2, 'portrait-woman1': d3, 'portrait-woman2': d4, 'seminar-man': d5, 'signing-docs': d6, 'supreme-court': d7, 'team-table': d8, 'writing-hand': d9 };
const S = (m) => (m && m.src) || m || '';
const I = (n) => S(IMG[n]);
const V = { court: S(vidCourt), team: S(vidTeam), laptop: S(vidLaptop), hero: S(vidHero), meet: S(vidMeet) };

const NAV = [['training', 'Training'], ['consulting', 'Consulting'], ['recovery', 'Recovery'], ['quiz', 'Quiz'], ['assessment', 'Assessment'], ['papers', 'Papers'], ['drafts', 'Drafts'], ['resources', 'Resources'], ['about', 'About']];
const PAGES = ['home', 'training', 'consulting', 'recovery', 'book', 'quiz', 'assessment', 'papers', 'drafts', 'resources', 'courts', 'about', 'contact', 'legal'];

/* ---------------- DATA ---------------- */
const COURSES = [
  ['Legal Drafting Masterclass', 'Practical Skills', 'Adv. Bilal Raza', 'Sun, 29 Nov, 6:30 pm', '6 weeks', 'Beginner', 80, 15000, 'signing-docs'],
  ['Corporate Compliance Basics', 'Corporate', 'Adv. Hira Qureshi', 'Tue, 1 Dec, 7:00 pm', '4 weeks', 'Intermediate', 60, 18000, 'glass-building'],
  ['Judiciary Exam Prep', 'Exams', 'Panel of mentors', 'Mon, 7 Dec, 8:00 pm', '16 weeks', 'Intermediate', 120, 25000, 'classroom-hall'],
  ['Litigation and Court Procedure', 'Practical Skills', 'Adv. Sana Malik', 'Sat, 12 Dec, 5:00 pm', '8 weeks', 'Intermediate', 45, 20000, 'court-hearing'],
  ['Legal Research Certification', 'Research', 'Dr. Vishnu Rao', 'Sun, 13 Dec, 6:00 pm', '3 weeks', 'Beginner', 200, 0, 'library-busts'],
  ['Bar Exam Crash Course', 'Exams', 'Adv. Imran Siddiqui', 'Fri, 18 Dec, 7:30 pm', '2 weeks', 'Advanced', 90, 12000, 'exam-omr'],
];
const SYLLABUS = {
  'Legal Drafting Masterclass': ['Week 1: Legal language, structure and common drafting mistakes', 'Week 2: Agreements: sale, rent, service and partnership', 'Week 3: Legal notices and replies', 'Week 4: Pleadings: plaint, written statement and applications', 'Week 5: Affidavits, deeds and power of attorney', 'Week 6: Review clinic and final drafting assignment'],
  'Corporate Compliance Basics': ['Week 1: Company structure, directors and key duties', 'Week 2: Registrar filings, registers and board records', 'Week 3: Labour, tax and licence compliance basics', 'Week 4: Compliance calendar, audit readiness and record keeping'],
  'Judiciary Exam Prep': ['Weeks 1-4: Constitution, civil and criminal procedure', 'Weeks 5-10: Substantive laws, evidence and local laws', 'Weeks 11-14: Answer writing, judgment writing and current legal affairs', 'Weeks 15-16: Full mock tests, interview preparation and feedback'],
  'Litigation and Court Procedure': ['Weeks 1-2: Court structure, jurisdiction, filing and court fees', 'Weeks 3-4: Pleadings, interim relief and notices', 'Weeks 5-6: Evidence, witnesses and cross-examination', 'Weeks 7-8: Arguments, orders, execution and appeals'],
  'Legal Research Certification': ['Week 1: Primary and secondary sources, statutes and case law', 'Week 2: Online databases, search methods and citation', 'Week 3: Writing a research memo and final assessment'],
  'Bar Exam Crash Course': ['Days 1-4: Core subjects with high-yield topics', 'Days 5-8: Professional ethics, procedure and evidence', 'Days 9-12: Timed mock tests with review', 'Days 13-14: Final revision and exam strategy'],
};
const AREAS = [
  ['Family and Matrimonial', 'Divorce, maintenance, custody, adoption.', 'hands-family'],
  ['Property and NRI', 'Title checks, inheritance, power of attorney.', 'house-keys'],
  ['Criminal and Bail', 'FIR, bail, trial procedure.', 'gavel-dark'],
  ['Corporate and Recovery', 'Contracts, compliance, dues recovery.', 'handshake-contract'],
  ['Immigration and Visa', 'OCI, visa refusal, citizenship.', 'passports'],
  ['Civil Litigation', 'Injunctions, recovery suits, appeals.', 'lady-justice'],
];
const AREA_DETAIL = [
  ['Family and Matrimonial', 'Mutual consent and contested divorce, maintenance, child custody and visitation, domestic violence protection, adoption and guardianship.'],
  ['Property and NRI', 'Title and encumbrance checks, sale and gift deeds, succession and wills, partition, tenant disputes, power of attorney for property abroad.'],
  ['Criminal and Bail', 'Registering or defending against an FIR, regular and anticipatory bail, quashing petitions, cheque bounce complaints, trial stage advice.'],
  ['Corporate and Recovery', 'Contract drafting and review, shareholder and partnership disputes, regulatory compliance, legal notices and recovery of dues.'],
  ['Immigration and Visa', 'OCI and PIO questions, visa refusal review, citizenship queries, documentation for study, work and family visas.'],
  ['Civil Litigation', 'Injunctions, money recovery suits, specific performance, written statements, evidence, appeals and execution.'],
];
const LAWYERS = [['Adv. Sana Malik', 'Criminal and Family', '12 yrs', 'portrait-woman1'], ['Adv. Bilal Raza', 'Corporate and Recovery', '15 yrs', 'portrait-man1'], ['Adv. Hira Qureshi', 'Property and NRI', '9 yrs', 'portrait-woman2'], ['Adv. Imran Siddiqui', 'Civil Litigation', '11 yrs', 'portrait-man2']];
const COURSE_INFO = {
  'Legal Drafting Masterclass': { about: 'Learn to write clear, usable legal documents. Every week you draft a real document, get feedback from a working advocate and keep a template for your own use.', out: ['Draft agreements, notices and replies in plain, precise language', 'Structure pleadings, applications and affidavits correctly', 'Spot and fix the most common drafting mistakes', 'Finish with a portfolio of documents you wrote yourself'], who: ['Law students and fresh graduates', 'Junior advocates', 'Business owners and managers who sign contracts'] },
  'Corporate Compliance Basics': { about: 'A practical introduction to the recurring legal tasks every company must handle, explained without jargon and organised into a simple compliance calendar.', out: ['Understand the duties of directors and the company', 'Know which filings, registers and records are needed', 'Cover labour, tax and licence basics', 'Build a compliance calendar for a small business'], who: ['Compliance and HR executives', 'Company secretaries in training', 'Founders and finance teams'] },
  'Judiciary Exam Prep': { about: 'A structured 16-week programme that moves from foundations to answer writing and full mock tests, with feedback from a panel of mentors.', out: ['Cover the core subjects in a clear order', 'Practise answer writing and judgment writing', 'Attempt full-length timed mock tests', 'Prepare for the interview stage'], who: ['Law graduates preparing for judicial services', 'Students who want a fixed study routine', 'Candidates who need regular feedback'] },
  'Litigation and Court Procedure': { about: 'Follow a case from filing to execution. This course covers how courts are organised, how pleadings are prepared and what really happens on hearing days.', out: ['Understand jurisdiction, filing and court fees', 'Prepare pleadings and interim applications', 'Handle evidence and cross-examination basics', 'Know how orders, execution and appeals work'], who: ['Junior advocates and interns', 'Law students who want court exposure', 'Paralegals and clerks'] },
  'Legal Research Certification': { about: 'A short free course on finding the right law quickly: statutes, case law, databases and how to write a clear research memo.', out: ['Tell primary sources from secondary sources', 'Search databases efficiently', 'Cite cases and statutes correctly', 'Write a short research memo'], who: ['First- and second-year law students', 'Anyone starting legal research', 'Writers and journalists covering law'] },
  'Bar Exam Crash Course': { about: 'A fast, focused two-week course for the bar exam: high-yield topics, professional ethics, timed mocks and a final revision plan.', out: ['Revise the most tested topics quickly', 'Cover professional ethics and procedure', 'Practise under exam conditions', 'Walk into the exam with a clear strategy'], who: ['Final-year students and graduates', 'Candidates short on preparation time', 'Anyone retaking the exam'] },
};
const INCLUDES = ['Live classes with Q&A', 'Recording of every session', 'Templates and study material', 'Weekly practice tasks', 'Final assessment and certificate'];
const AREA_FULL = {
  'Family and Matrimonial': { about: 'Family disputes are personal and urgent. We explain your options and the procedure in plain language, and we work to keep the process as calm and short as the facts allow.', matters: ['Mutual consent divorce', 'Contested divorce', 'Maintenance for spouse and children', 'Child custody and visitation', 'Protection from domestic violence', 'Adoption and guardianship'], docs: ['Marriage certificate or proof of marriage', 'ID and address proof of both sides', 'Details of income and assets', 'Messages, photographs and records related to the dispute', 'Earlier notices or court orders'], adv: ['Adv. Sana Malik'], faq: [['How long does a mutual consent divorce take?', 'The law generally requires a period of separation and a waiting period between the two motions, which a court can sometimes shorten. Timelines differ by court, so ask for the current position for your case.'], ['Does custody always go to the mother?', 'No. Courts decide on the welfare of the child, looking at the child\'s age, needs and the circumstances of each parent.'], ['Can maintenance be claimed without a divorce?', 'In many situations yes. Eligibility depends on the law that applies to you, so share your facts in a consultation.']] },
  'Property and NRI': { about: 'Property is often a family\'s biggest asset. We help you check documents before you buy, set out rights clearly in deeds and resolve disputes about ownership and possession, including for owners living abroad.', matters: ['Title and encumbrance checks', 'Sale, gift and lease deeds', 'Inheritance and succession', 'Partition of family property', 'Tenant and possession disputes', 'Power of attorney for NRIs'], docs: ['Title deeds and the chain of earlier documents', 'Property tax receipts and utility bills', 'Encumbrance certificate', 'Will or succession papers', 'ID and address proof', 'Existing agreements or notices'], adv: ['Adv. Hira Qureshi'], faq: [['What is a title check?', 'A review of the documents that show who owns a property and whether there are loans, disputes or other claims on it. It is best done before you pay a token amount.'], ['Can an NRI buy property in India?', 'Generally yes for residential and commercial property, but some categories, such as agricultural land, are restricted and rules change. Check the current foreign exchange rules before you act.'], ['Can I handle a property matter from abroad?', 'Often yes, through online consultation and a carefully limited power of attorney. Read our guide on power of attorney for NRIs.']] },
  'Criminal and Bail': { about: 'A criminal case moves quickly and mistakes early on are hard to undo. We explain the stage you are at, the choices you have and what to do next, whether you are a complainant or an accused.', matters: ['Registering or defending an FIR', 'Regular and anticipatory bail', 'Quashing of proceedings', 'Cheque bounce complaints', 'Trial stage advice', 'Appeals and revisions'], docs: ['Copy of the FIR or complaint', 'Charge sheet, remand or notice papers', 'Arrest memo, if any', 'ID and address proof', 'Earlier bail or court orders', 'Medical or other supporting records'], adv: ['Adv. Sana Malik'], faq: [['What should I do if the police call me for questioning?', 'Stay calm, ask for the notice in writing, note the date, time and officer, and speak to an advocate before you go.'], ['Can you promise bail?', 'No. Bail is decided by the court on the facts, the seriousness of the offence and other factors. We prepare the strongest honest case.'], ['Which law applies after the new criminal codes?', 'Offences committed after the new codes came into force are governed by them, and older matters may continue under the earlier laws. We tell you which applies to your case.']] },
  'Corporate and Recovery': { about: 'Good contracts prevent disputes and good records win them. We help businesses draft and review agreements, stay compliant and recover money that is due, choosing negotiation first and court only when needed.', matters: ['Contract drafting and review', 'Shareholder and partnership disputes', 'Company compliance', 'Legal notices and replies', 'Recovery of dues', 'Arbitration'], docs: ['Contracts and purchase orders', 'Invoices and ledger statements', 'Emails and messages with the other side', 'Company registration and director details', 'Earlier notices or replies'], adv: ['Adv. Bilal Raza'], faq: [['Do I need a written contract?', 'Oral agreements can be valid but are hard to prove. A short written contract with clear scope, payment and termination terms avoids most disputes.'], ['Arbitration or court?', 'It depends on your contract. If it has an arbitration clause, that route usually applies. We read the clause and explain the cost, speed and trade-offs.'], ['Can you help recover unpaid invoices?', 'Yes. See our Debt Recovery page for the process and the routes we may use.']] },
  'Immigration and Visa': { about: 'Immigration questions are document-heavy and time-sensitive. We help with India-side matters such as OCI and citizenship, and with understanding a refusal, so that your next application is stronger.', matters: ['OCI card and related queries', 'Visa refusal review', 'Citizenship questions', 'Document support for study, work and family visas', 'Surrender of Indian citizenship papers', 'Attestation of documents'], docs: ['Passport copies', 'Earlier visa and refusal letters', 'Proof of relationship, employment or education', 'Police clearance certificates', 'Travel history'], adv: [], faq: [['Can you guarantee a visa or an OCI card?', 'No. These decisions are made by the authorities. We help you prepare accurate, complete applications.'], ['Do you advise on foreign immigration law?', 'We advise on India-side matters. Foreign immigration rules may need a locally qualified lawyer, and we can tell you when that is the case.'], ['How early should I contact you?', 'As soon as you receive a refusal or start planning, because many steps have deadlines.']] },
  'Civil Litigation': { about: 'Civil disputes about money, property and contracts can run for years if they are handled carelessly. We plan each stage, keep you informed and look for sensible settlement options along the way.', matters: ['Money recovery suits', 'Injunctions', 'Specific performance of contracts', 'Written statements and evidence', 'Execution of decrees', 'Appeals'], docs: ['Agreements, receipts and invoices', 'Notices and replies', 'Court papers you have received', 'Property documents, if relevant', 'A written timeline of events', 'ID and address proof'], adv: ['Adv. Imran Siddiqui'], faq: [['How long does a civil suit take?', 'It depends on the court, the complexity and how the parties behave. Civil cases can take a long time, so we explain realistic stages and look at settlement early.'], ['What is limitation?', 'The time limit for filing a claim. For many money claims it is generally three years, but it varies with the claim, so check early.'], ['Can a case be settled after it is filed?', 'Yes, at any stage. Courts also encourage mediation and settlement in suitable matters.']] },
};
const QS = [
  ['Which document starts a civil suit?', ['Plaint', 'Written statement', 'Affidavit', 'Decree'], 0],
  ['Writ meaning "produce the body"?', ['Mandamus', 'Habeas corpus', 'Certiorari', 'Quo warranto'], 1],
  ['Consideration is a rule of which law?', ['Criminal', 'Family', 'Contract', 'Tax'], 2],
  ['Limitation law sets...', ['Court fees', 'Time limits to sue', 'Jurisdiction', 'Bail terms'], 1],
  ['Cheque bounce notice must be sent within...', ['7 days', '30 days', '60 days', '90 days'], 1],
  ['Article 21 of the Constitution protects...', ['Freedom of speech', 'Right to property', 'Life and personal liberty', 'Right to vote'], 2],
  ['Which writ quashes an order of a lower court or tribunal?', ['Certiorari', 'Habeas corpus', 'Quo warranto', 'Prohibition'], 0],
  ['The Indian Contract Act was enacted in...', ['1860', '1872', '1908', '1950'], 1],
  ['Cheque dishonour is punishable under which Act?', ['Indian Contract Act', 'Negotiable Instruments Act', 'Consumer Protection Act', 'Companies Act'], 1],
  ['A right to approach the Supreme Court for enforcing fundamental rights comes from...', ['Article 14', 'Article 19', 'Article 32', 'Article 226'], 2],
];
const FAQ = [['Do I need a law degree to join?', 'No. Many courses suit students and professionals. Each course page lists who it is for.'], ['Are live classes recorded?', 'Yes. You get recordings of your batch for revision.'], ['How do I get my certificate?', 'Pass the final assessment with 60% or more and download it.'], ['Is my consultation confidential?', 'Yes. What you share stays between you and your advocate. An enquiry does not create representation.'], ['Can NRIs consult from abroad?', 'Yes, for India-related matters by online consultation. Foreign-law advice may need locally qualified counsel.'], ['Can unpaid business dues be recovered without court?', 'Often the first step is documented negotiation and a legal notice. Court or statutory routes are used only when needed.'], ['What if I cannot attend a live session?', 'Watch the recording and send questions in the next session.'], ['How do I pay for a course?', 'Payment details are shared after you register. In this preview, payment is simulated.'], ['Do you guarantee a job or a result?', 'No. We help with training, resume and interview preparation. Outcomes in any legal matter or job search can never be guaranteed.']];
const PAPERS = [['Sample Practice Paper: Legal Basics (10 questions)', 'Sample'], ['Judicial Services Prelims', 2018], ['Judicial Services Prelims', 2017], ['AIBE Sample Paper', 2023], ['CLAT PG', 2022], ['Judicial Services Prelims', 2016], ['AIBE Sample Paper', 2022], ['CLAT PG', 2021], ['Judicial Services Mains (sample)', 2019], ['Law Entrance Practice Set', 2023]];
const PAPERTIPS = [['Start untimed', 'Solve the first paper without a timer to learn the pattern, then move to full timed attempts.'], ['Mark and review', 'Mark every guess. Review wrong answers and guesses together and note the rule behind each.'], ['Track topics', 'Keep a simple sheet of topics that cost you marks and revisit them every week.'], ['Check the source', 'Always compare with the official paper and the latest syllabus before relying on any practice file.']];
const DRAFTS = [
  ['Legal notice for cheque bounce', 'Notice', 'Demand notice after a dishonoured cheque, with time to pay.'],
  ['Sale agreement (property)', 'Agreement', 'Agreement to sell with price, payment schedule and possession terms.'],
  ['Rent agreement (11 months)', 'Agreement', 'Residential rent terms, deposit, notice and lock-in clauses.'],
  ['Bail application format', 'Court', 'Standard layout with facts, grounds and prayer.'],
  ['Power of attorney', 'Deed', 'General or special authority given to another person.'],
  ['Reply to legal notice', 'Notice', 'Structured reply with paragraph-wise response and reservation of rights.'],
  ['Affidavit (general)', 'Deed', 'Sworn statement format for court and office use.'],
  ['Service agreement', 'Agreement', 'Scope, fees, term, confidentiality and termination.'],
  ['Non-disclosure agreement', 'Agreement', 'Mutual confidentiality terms between two parties.'],
  ['Will (simple)', 'Deed', 'Basic will layout with witnesses and executor.'],
  ['Demand notice for unpaid invoice', 'Notice', 'Formal notice for unpaid trade dues with payment deadline.'],
  ['Consumer complaint format', 'Court', 'Layout for a complaint with facts, deficiency and relief sought.'],
];
const ARTICLES = [
  ['Guide', 'How to read a court order', 'notebook-desk', 6],
  ['Guide', 'FIR vs complaint: what changes', 'gavel-book', 6],
  ['Exam', '30-day judiciary study plan', 'desk-evening', 7],
  ['Practice', '5 clauses every contract needs', 'writing-hand', 6],
  ['Exam', 'AIBE: topics that repeat', 'notebook-pen', 5],
  ['Practice', 'Bail basics for new advocates', 'justice-gavel', 6],
  ['Guide', 'How to send a legal notice', 'pen-writing', 6],
  ['Practice', 'Cheque bounce: the steps in order', 'papers-stack', 7],
  ['Guide', 'Rent agreement basics for tenants and landlords', 'house-keys', 6],
  ['Guide', 'Power of attorney for NRIs: what to check', 'passports', 6],
];
/* ARTBODY[i] = [intro, [[heading, text], ...], [takeaways]] */
const ARTBODY = [
  ['A court order looks long and dense, but it follows a predictable pattern. Once you know where to look, you can find what the court decided and what you must do within a few minutes.',
    [['Start with the caption', 'The top of the order names the court, the case number, the parties and the bench. Check the date and whether the order is interim or final, because that decides how much weight it carries and whether it can be appealed.'], ['Find the facts and the issues', 'Courts usually summarise the dispute first and then list the questions they must decide. Reading these two parts first tells you what the case is really about, before the arguments make it complicated.'], ['Read the arguments in short', 'Each side\'s main points are recorded in a few paragraphs. Note which arguments the court accepts and which it rejects, and look for the words "we are of the view" or "in our opinion", which usually mark the court\'s own conclusion.'], ['Separate reasoning from the operative part', 'The reasoning explains why the court decided as it did. The operative part, usually near the end, is what you must actually do or what has been granted. Note any deadlines, costs and the next date of hearing.'], ['Know the difference between ratio and obiter', 'The ratio is the legal principle needed to reach the decision and can bind lower courts. Remarks made in passing (obiter) are persuasive only. Always ask a lawyer before relying on an order in your own matter.']],
    ['Check whether the order is interim or final.', 'Read the facts, issues and operative part first.', 'Note deadlines and the next hearing date immediately.']],
  ['People often use "FIR" and "complaint" as if they mean the same thing. They start different routes, and knowing the difference helps you choose the right first step.',
    [['What an FIR is', 'An FIR records information about a cognizable offence given to the police. It starts the investigation, and the police can act without waiting for a court order in such cases.'], ['What a complaint is', 'A complaint is made directly to a Magistrate, who examines it and decides whether to take cognizance. It is common where the police do not register an FIR or the offence is non-cognizable.'], ['What changes for you', 'With an FIR the police investigate and file a report. With a complaint the Magistrate controls the early steps and may record statements first. Procedure and section numbers changed with the new criminal procedure code (Bharatiya Nagarik Suraksha Sanhita), so check the current provisions or consult an advocate.'], ['If the police refuse to register an FIR', 'You can send the information in writing to a senior police officer. If that does not work, the law allows you to approach the Magistrate. Keep copies of everything you send and note the date and time.'], ['Documents to keep ready', 'Identity proof, a clear written account of events in date order, copies of messages, photographs or medical papers, and names and contact details of witnesses.']],
    ['An FIR starts a police investigation; a complaint goes to a Magistrate.', 'Written, dated records protect you at every stage.', 'Procedure has changed recently, so verify the current provisions.']],
  ['The judiciary exams reward steady, structured preparation. This plan fits a month for someone who already knows the basics and needs a clear order of work. Adjust the pace to your own schedule.',
    [['Week 1: foundations', 'Read the syllabus and past papers first. Cover the Constitution and basic concepts of civil and criminal procedure. Make one-page notes per topic so that revision later takes minutes, not hours.'], ['Week 2: core subjects', 'Move to evidence, contract, property and family law. Solve at least 20 questions a day and mark weak areas. Read the bare act for each topic once, slowly.'], ['Week 3: practice', 'Take full-length mock tests under time limits. Review every wrong answer and write a short correction note. Start writing one short answer a day if your exam has a mains stage.'], ['Week 4: revision', 'Revise notes, bare acts and key judgments. Keep the last two days for light revision and rest.'], ['Daily routine that works', 'Two focused study blocks, one practice block and a short review before sleep. Keep one half day a week free so that you do not burn out.']],
    ['Past papers come before notes.', 'Review mistakes more than you read new material in the last two weeks.', 'Rest is part of the plan.']],
  ['A contract does not need to be long to be useful, but it must cover a few basics. If any of these are missing, small disagreements turn into expensive disputes.',
    [['Parties and scope', 'Name every party correctly and describe exactly what each side will do. Vague scope is the most common source of disputes.'], ['Payment and consideration', 'State the amount, due dates, taxes and the consequence of late payment. Link payment to clear deliverables.'], ['Term and termination', 'Say how long the contract runs, how either side can end it and what notice is needed.'], ['Confidentiality and liability', 'Protect sensitive information and set sensible limits on liability and indemnity.'], ['Governing law and disputes', 'Choose the governing law, the place of dispute resolution and whether arbitration applies before going to court.'], ['A final check before signing', 'Read the document once from the other side\'s point of view. Check names, dates, amounts and annexures, and make sure every page is initialled.']],
    ['Be specific about who does what and by when.', 'Write down how the contract ends.', 'Decide how disputes will be handled before they happen.']],
  ['The AIBE tests whether you can apply basic law quickly. Some areas appear in most years, though you should never rely on guesses about exact questions.',
    [['Plan by subject weight', 'Look at the published syllabus and spread your time across all subjects. Do not skip professional ethics, which is short and scoring.'], ['Practise with real papers', 'Solve sample and past papers to learn the pattern. Notice which topics appear in several years, but do not rely on guesses about what will repeat.'], ['Revise bare acts', 'Many questions test exact wording. Read key provisions repeatedly and keep short notes for quick revision.'], ['On exam day', 'Attempt sure answers first, avoid long time on one question and keep a few minutes at the end for review.']],
    ['Professional ethics is short and scoring.', 'Bare act wording matters.', 'Check the latest official syllabus and rules.']],
  ['Bail is one of the first matters a new advocate handles. A few clear ideas make the work much easier.',
    [['Bailable and non-bailable offences', 'In a bailable offence bail is a matter of right. In a non-bailable offence the court uses discretion after looking at the seriousness, evidence and risk of flight or interference.'], ['What a bail application contains', 'Case details, grounds for bail, the accused person\'s background and any undertaking. Attach relevant documents and keep the facts accurate.'], ['Anticipatory bail', 'This is sought before arrest when a person fears arrest in a non-bailable case. Courts may attach conditions such as cooperating with the investigation and not leaving the country without permission.'], ['Practical points', 'Check the court, the stage of the case and whether anticipatory bail is more suitable. Track hearing dates carefully and follow every bail condition.']],
    ['Know whether the offence is bailable.', 'Accurate facts matter more than long arguments.', 'Bail conditions must be followed strictly.']],
  ['A legal notice is often the first formal step in a dispute. A clear, accurate notice can settle a matter without court, and it also becomes a record if the matter goes further.',
    [['Why send a notice', 'A notice records your demand, gives the other side a fair chance to respond and shows that you tried to settle. For some claims, such as dishonoured cheques, a notice within the legal time is a required step.'], ['What to include', 'Names and addresses of both sides, a short statement of facts in date order, the exact demand (amount or action), a deadline, and a line that you will take legal steps if the demand is not met.'], ['How to send it', 'Send it by a method that gives proof, such as registered post or speed post with acknowledgment, and email where the other side has used it. Keep the receipts and delivery proof together with a copy of the notice.'], ['After sending', 'Note the deadline in your calendar. Keep every reply, and do not make fresh promises in calls or messages that contradict the notice. Have an advocate review the reply before you respond.']],
    ['Keep the notice factual, dated and specific.', 'Always keep proof of sending and delivery.', 'Time limits can apply, so act promptly.']],
  ['A dishonoured cheque can be pursued under the Negotiable Instruments Act, but the law is strict about timing. Missing a step can end the case before it starts. The outline below is general; confirm the current position with an advocate.',
    [['Step 1: get the return memo', 'When the bank returns the cheque unpaid, it gives a return memo stating the reason. Keep the original cheque and memo safely. The cheque must also have been presented within its validity period.'], ['Step 2: send the demand notice', 'The law requires a written notice to the drawer demanding payment, sent within 30 days of receiving information from the bank about the dishonour. Send it by traceable means.'], ['Step 3: wait for the payment period', 'The drawer gets 15 days from receiving the notice to pay. If payment is made in full within that time, the offence does not arise.'], ['Step 4: file the complaint', 'If payment is not made, a complaint can be filed before the Magistrate within one month after the payment period ends. Delay can be condoned only on good grounds shown to the court.'], ['Documents for the file', 'Original cheque, bank return memo, copy of notice with proof of sending and delivery, the underlying invoice, agreement or ledger, and your proof of the legal debt.']],
    ['Timing matters at every step.', 'The cheque must relate to a legally enforceable debt.', 'Keep the original documents safe and organised.']],
  ['Most rental disputes begin with something the agreement did not say. A clear agreement protects both the tenant and the landlord.',
    [['Core terms', 'Names and addresses of both sides, the exact property, the rent, the due date, the security deposit, the start date and the term. Eleven-month agreements are common for residential rent.'], ['Deposit, repairs and bills', 'State how much deposit is taken, when and how it is returned, who pays for repairs, maintenance and utilities, and how deductions will be calculated.'], ['Notice and lock-in', 'Write the notice period each side must give and any lock-in period, plus what happens if either side leaves early.'], ['Stamp duty and registration', 'Requirements differ by state and by the length of the term. Check your state rules, because an unstamped or unregistered document can create problems when you need to rely on it.'], ['Keep records', 'Take dated photographs of the property at move-in and move-out, and keep rent receipts or bank proof of every payment.']],
    ['Put deposit and notice terms in writing.', 'Check state stamp duty and registration rules.', 'Photographs and receipts settle most disputes.']],
  ['Many NRIs manage property and legal matters in India through a power of attorney. It is useful, but it is also a document that can be misused if it is careless.',
    [['General or special', 'A general power of attorney gives wide authority. A special one is limited to a specific act, such as selling one named property. For most NRIs, a specific, limited document is safer.'], ['Choose the person carefully', 'The agent acts in your name. Choose someone you trust fully, write their full details, and say exactly what they may and may not do, including any limits on price or time.'], ['Signing from abroad', 'A document signed abroad usually needs to be notarised or attested as required, and may need further steps before it is accepted in India. Requirements depend on the country and the purpose, so confirm them before you sign.'], ['Review and revoke', 'Keep a certified copy and review the document regularly. If you need to cancel it, do so in writing and inform everyone who relied on it, including the registrar or bank where relevant.']],
    ['Prefer a specific and limited power of attorney.', 'Attestation rules depend on where you sign.', 'Cancel in writing when it is no longer needed.']],
];
const DRAFT0 = [
  'LEGAL NOTICE',
  'Date: [date]\nBy Registered Post AD / Speed Post / Email: [email]',
  'To,\n[Name of drawer]\n[Address]',
  'From: [Name of payee or advocate]\n[Address]',
  'Subject: Notice demanding payment of Rs. [amount] against cheque no. [number], dishonoured on presentation, under Section 138 of the Negotiable Instruments Act, 1881.',
  'Sir / Madam,',
  '1. Under instructions from and on behalf of my client, [name], I give you this notice as follows.',
  '2. You issued cheque no. [number] dated [date] for Rs. [amount], drawn on [bank and branch], in favour of my client towards discharge of a legally enforceable debt or liability, namely [invoice no. / loan / agreement details].',
  '3. My client presented the cheque through [bank] on [date]. It was returned unpaid by return memo dated [date] with the remark "[reason]".',
  '4. You are called upon to pay Rs. [amount] to my client within 15 days of receiving this notice. If you fail to do so, my client will be compelled to take legal action under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881, and other available remedies, at your risk as to cost and consequences.',
  '5. A copy of this notice is retained for record.',
  'Yours faithfully,\n[Name]\nAdvocate / Authorised signatory\n[Enrolment no. and contact details]',
];
const COURTS = [['High Court', 'Appeals, writs and matters in its jurisdiction.', 'india-govt'], ['Family Courts', 'Matrimonial cases, maintenance and child matters.', 'hands-family'], ['Civil and District Courts', 'Injunctions, recovery and property suits.', 'court-hearing'], ['Tribunals and Arbitration', 'Statutory and commercial dispute forums.', 'supreme-court']];
const GLOSS = [['Plaint', 'The written document that starts a civil suit, stating facts and the relief sought.'], ['Written statement', "The defendant's reply to a plaint."], ['Affidavit', 'A written statement of facts confirmed by oath or affirmation.'], ['Injunction', 'A court order that stops a person from doing something or requires an action.'], ['Cognizable offence', 'A serious offence where the police can usually register an FIR and investigate without a court order.'], ['Ex parte', 'A decision made when one side did not appear.'], ['Stay', 'A temporary halt of an order or proceeding.'], ['Caveat', 'A notice asking the court to hear you before passing an order against you.'], ['Decree', 'The formal outcome of a civil suit that decides the rights of the parties.'], ['Limitation', 'The time within which a claim must be filed.']];
const slug = (t) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const BASE = '/ilmoralaw';
const COURSE_SLUGS = COURSES.map((c) => slug(c[0]));
const AREA_SLUGS = AREAS.map((a) => slug(a[0]));
const ARTICLE_SLUGS = ARTICLES.map((a) => slug(a[1]));
const PAPER_SLUG = 'sample-practice-paper';
const DRAFT_SLUG = 'cheque-bounce-notice';
const resolve = (path) => {
  const rest = path.startsWith(BASE) ? path.slice(BASE.length) : path;
  const seg = rest.split('/').filter(Boolean)[0] || 'home';
  if (PAGES.includes(seg)) return { pg: seg, art: 0 };
  let k = COURSE_SLUGS.indexOf(seg); if (k > -1) return { pg: 'course', art: k };
  k = AREA_SLUGS.indexOf(seg); if (k > -1) return { pg: 'area', art: k };
  k = ARTICLE_SLUGS.indexOf(seg); if (k > -1) return { pg: 'article', art: k };
  if (seg === PAPER_SLUG) return { pg: 'paper', art: 0 };
  if (seg === DRAFT_SLUG) return { pg: 'draft', art: 0 };
  return { pg: 'home', art: 0 };
};
const STEPS = [['Listen and understand', 'We review your facts and documents.'], ['Strategy and advice', 'Options, risks and procedure in plain language.'], ['Representation and updates', 'Agreed steps and regular progress notes.']];
const BRING = ['Government ID', 'All related documents in date order', 'A short written timeline of events', 'Previous notices, replies or court papers', 'Your questions, written down', 'Names and contact details of other parties'];
const STATS = [['15+', 'Years in legal practice'], ['100+', 'Legal drafts'], ['100+', 'Mock exams'], ['Pan-India', 'Recovery network']];
const WHY = [['Practitioner teachers', 'Every mentor works on live matters, not only theory.'], ['Real documents', 'Templates and drafts used in everyday practice.'], ['Revision friendly', 'Recordings, notes and practice for every batch.'], ['Plain language', 'No jargon without an explanation.'], ['Mentor access', 'Questions answered in every live session.'], ['Career support', 'Resume and interview guidance.']];
const SERVICES = [['B2B Trade Dues', 'Unpaid invoices between suppliers, distributors and traders.'], ['MSME Payment Delays', 'Delayed buyer payments for micro and small enterprises.'], ['Cheque Bounce', 'Dishonoured cheques issued toward a legal debt.'], ['Professional Fees', 'Unpaid fees for completed professional work.'], ['Contractor Dues', 'Running bills, retention and project payments.'], ['Rent and Lease Dues', 'Unpaid rent, lease or licence fees.'], ['Loans and Advances', 'Documented loans and advances left unpaid.'], ['Corporate Dues', 'Amounts due from companies and institutions.'], ['Disputed Dues', 'Claims that are partly disputed or part-acknowledged.']];
const RSTEPS = [['Connect', 'First discussion on your business and dues.'], ['Evaluate', 'We review invoices, agreements and messages.'], ['Assess', 'Debtor profile and recovery options are checked.'], ['Propose', 'Scope, fees and strategy are shared in writing.'], ['Onboard', 'ID verification and a digital service agreement.'], ['Execute', 'A dedicated executive handles follow-ups.'], ['Resolve', 'Recovery, case updates and closure.']];
const ROUTES = [['Reminders and negotiation', 'Structured follow-ups, payment plans and written settlement terms. Often the fastest and cheapest first step.'], ['Legal notice', 'A formal demand with a deadline. It records your claim and often brings the other side to the table.'], ['Cheque bounce complaint', 'For dishonoured cheques, a complaint under the Negotiable Instruments Act after the required notice period.'], ['MSME Facilitation Council', 'For micro and small enterprises with delayed payments from buyers, under the MSMED Act, subject to registration and conditions.'], ['Civil recovery suit', 'A suit for money, including summary procedure in suitable cases, when documents clearly show the debt.'], ['Insolvency notice', 'For certain company debts above the statutory minimum, subject to strict conditions. Used with great care.']];
const RFAQ = [['How long does recovery take?', 'It depends on the debtor, the documents and the route. Negotiated settlements can take weeks; court routes can take much longer. We share a realistic plan in writing, not a promise.'], ['Do you guarantee recovery?', 'No. Recovery depends on facts, documents and the debtor\'s ability to pay. We guarantee a clear process and regular updates, not an outcome.'], ['What does it cost?', 'Scope, fees and strategy are shared in writing before you decide to proceed. Fee models are discussed during the Propose step.'], ['Is my debtor told about my business details?', 'Only what is needed for the demand and the legal step chosen. We handle your documents confidentially.'], ['Can small claims be pursued?', 'Often yes, but we compare the cost of each route with the amount at stake and tell you honestly if a step is not worth it.']];
const DOCS = ['Invoices or bills', 'Purchase order or contract', 'Ledger or statement of account', 'Emails and WhatsApp reminders', 'Cheque and bank return memo', 'Debtor company or promoter details'];
const INDS = ['Manufacturing', 'Trading and distribution', 'MSME', 'Construction and EPC', 'Logistics', 'IT services', 'Consulting firms', 'Real estate and lease'];
const NRI = ['Property and inheritance', 'Overseas family and divorce matters', 'Power of attorney and documents', 'Consultations from abroad'];
const NEWS = [['Courts', 'Delhi HC orders medical care for Wangchuk'], ['Family', 'Allahabad HC on maintenance without a marriage certificate'], ['Analysis', 'Personal laws and gender justice in India'], ['Courts', 'Can 38 Supreme Court judges reduce the case backlog?']];
const TESTI = [['Abhiram', 'Junior lawyer', 'I joined as a junior lawyer with a good package, and the team helped me prepare for interviews.'], ['Meghana', 'Fresher', 'As a fresher I got a job within two months with their support.'], ['Palk Saini', 'Intern', 'They helped me build my resume and apply for an internship.']]; // Verify consent before launch
const YT = [['II_nuL33gNQ', 'Cheque bounce: legal routes to recover money'], ['7bHMQfaxSW0', 'Legal notice received? What to do'], ['KAu6Al0Bu9s', 'Cyber crime, bank freeze and digital arrest'], ['Ns-ULA9bTPQ', 'Workplace harassment and the POSH Act']];
const VALUES = [['Clarity in advice', 'Options explained in plain language.'], ['Thoughtful planning', 'Strategy grounded in law and documents.'], ['Confidential communication', 'Respect for sensitive information.'], ['Responsive coordination', 'Practical follow-ups on active matters.'], ['Honest expectations', 'We say what is likely, unlikely and unknown.'], ['Learning by doing', 'Every course uses real documents and procedure.']];
const LEGALTXT = {
  Privacy: [['What we collect', 'Name, phone number, email and the details you type into our forms. We do not ask for passwords or sensitive documents through this site.'], ['How we use it', 'To reply to your enquiry, confirm appointments, register you for courses and improve our service.'], ['Sharing', 'We do not sell your information. We may share it with service providers who help us run the site, or where the law requires.'], ['Storage and security', 'We keep information only as long as needed for the purpose above and use reasonable safeguards.'], ['Your choices', 'You may ask us to correct or delete your information, subject to legal record-keeping needs.'], ['Contact', 'Write to info@lawvs.com for any privacy question.']],
  Terms: [['Using this site', 'The site is for general information and learning. You agree to use it lawfully and not to misuse forms, courses or content.'], ['Courses and content', 'Course material is for your personal learning. Copying, resale or sharing recordings without permission is not allowed.'], ['Payments and refunds', 'Fees, schedules and refund terms will be stated clearly at registration. In this preview, payments are simulated.'], ['Enquiries and appointments', 'An enquiry or booking request does not create an advocate-client relationship until an engagement is confirmed in writing.'], ['Limits of liability', 'We work to keep content accurate but cannot guarantee that all information is complete or current.'], ['Changes', 'We may update these terms. Continued use means you accept the updated terms.']],
  Disclaimer: [['Not legal advice', 'Content here is general legal education, not legal advice or advertisement.'], ['No relationship', 'An enquiry does not create an advocate-client relationship.'], ['No guarantee', 'Outcomes are never guaranteed. Every matter depends on its own facts and documents.'], ['Laws change', 'Laws, rules and procedures change. Confirm the current position with a qualified advocate before acting.'], ['Third-party links', 'Videos and links come from other sources. We are not responsible for their content.']],
};
const OFFICE = 'Office No. 101, Himland House, Commercial Complex, Karampura, Delhi-110015';
const money = (n) => (n ? `₹${n.toLocaleString('en-IN')}` : 'Free');

/* ---------------- STYLES ---------------- */
const CSS = `@scope (.w){
:scope{--o:#f97316;--o2:#ea580c;--g:#16a34a;--p:#2a1a4a;--ink:#17181c;--mut:#5f6470;--ln:#ece7df;--px:clamp(12px,2.5vw,40px);font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:14px;color:var(--ink);background-color:#fff;background-image:linear-gradient(#eef0f3 1px,transparent 1px),linear-gradient(90deg,#eef0f3 1px,transparent 1px);background-size:26px 26px;min-height:60vh;padding-bottom:60px}
/* FULL WIDTH: PublicLayout ka container tod kar poori screen lena. Agar layout pehle se full width hai to ye 2 line hata dein */
:scope{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw)}
*{box-sizing:border-box;margin:0}
h1,h2,h3,h4,h5{font-weight:400;line-height:1.25}
a{color:inherit;text-decoration:none;cursor:pointer}button{font-family:inherit;cursor:pointer}
.snav{background:#fff;border-bottom:1px solid var(--ln);position:sticky;top:84px;z-index:20;display:flex;gap:4px;flex-wrap:wrap;justify-content:center;padding:6px var(--px)}
.snav a{padding:5px 10px;border-radius:8px;font-weight:500;font-size:13px;color:var(--mut)}.snav a:hover,.snav a.on{background:#fff3e8;color:var(--o2)}
.btn{display:inline-block;text-align:center;background:linear-gradient(90deg,var(--o2),var(--o));color:#fff;border:0;padding:9px 16px;border-radius:9px;font-weight:600;font-size:13px}
.btn.o{background:#fff;color:var(--ink);border:1.5px solid #d6d3cc}.btn.l{background:#fff;color:var(--ink);border:1px solid var(--ln)}.btn.s{padding:6px 11px;font-size:12px}.btn.p{background:var(--p)}
.note{background:#e3f3e8;text-align:center;font-size:12px;padding:5px;border-bottom:1px solid #bfe3c9}
.strip{background:linear-gradient(90deg,#c2410c,#f97316);color:#fff;text-align:center;padding:8px;font-weight:600;font-size:13px}.strip a{background:#fff;color:var(--ink);padding:4px 12px;border-radius:20px;margin-left:8px;font-size:12px}
.hero{background:#fff;border-bottom:1px solid var(--ln);padding:26px var(--px);display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:center}
.hero h1{font-size:clamp(24px,3.4vw,40px);margin:8px 0}.hero p{color:var(--mut);max-width:620px;margin-bottom:12px}
.pill{display:inline-flex;gap:6px;align-items:center;background:#f3f4f6;color:var(--ink);border-radius:20px;padding:5px 11px;font-size:12px;font-weight:500;margin:0 6px 6px 0}.dot{width:7px;height:7px;border-radius:50%;background:#f43f5e}
.col{position:relative;height:310px}.col img{position:absolute;object-fit:cover;border-radius:16px;border:4px solid #fff;box-shadow:0 10px 24px #0002}
.col .a{width:60%;height:210px;right:0;top:0;transform:rotate(2deg)}.col .b{width:40%;height:160px;left:0;top:60px;transform:rotate(-4deg)}
.live{position:absolute;right:0;bottom:0;width:72%;background:#fff;color:var(--ink);border:1px solid var(--ln);box-shadow:0 8px 20px #0001;border-radius:12px;padding:10px;font-size:12px}.live b{color:var(--o2)}.live h4{font-size:15px;margin:2px 0}
.sec{padding:20px var(--px);max-width:none;width:100%;margin:0}.sec h2{font-size:22px;margin-bottom:3px;display:table;background:#fff;padding:4px 12px;border-radius:8px}.sub{color:var(--mut);margin-bottom:12px;display:table;background:#fff;padding:3px 12px;border-radius:8px}
.sec>.step{background:#fff;padding:8px 12px;border-radius:10px;width:fit-content;max-width:100%}
.box{background:#fff;border:1px solid var(--ln);border-radius:14px;box-shadow:0 4px 14px #0000000d}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr));gap:14px}
.card{overflow:hidden;display:flex;flex-direction:column}.card img{width:100%;height:130px;object-fit:cover}.card .b{padding:12px;display:flex;flex-direction:column;gap:5px;flex:1}
.cat{color:var(--o2);font-size:11px;font-weight:600}.card h3,.pad h3{font-size:16px}.mut{color:var(--mut);font-size:12px}
.meta{display:flex;gap:10px;flex-wrap:wrap;font-size:11px;color:#444;border-top:1px dashed #e0d7c8;padding-top:7px}.meta b{color:var(--g)}
.row{display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-top:auto}.row>span:last-child{display:flex;gap:6px;flex-wrap:wrap}.pr{font-weight:700;font-size:16px}
.badge{position:absolute;top:8px;left:8px;background:#fff;color:var(--ink);border-radius:20px;padding:2px 9px;font-size:11px;font-weight:500}.badge i{background:#ffe9d6;color:var(--o2);padding:1px 7px;border-radius:10px;margin-left:5px;font-style:normal}
.rel{position:relative}.chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}.chip{border:1px solid var(--ln);background:#fff;padding:5px 12px;border-radius:20px;font-weight:500;font-size:12px}.chip.on{background:var(--o);color:#fff;border-color:var(--o)}
.ph{background:#fff;color:var(--ink);border-bottom:1px solid var(--ln);padding:26px var(--px);position:relative;overflow:hidden}.ph h1{font-size:28px;max-width:68%}.ph p{color:var(--mut);max-width:560px;margin-top:4px}
.ph img{position:absolute;right:0;top:0;height:100%;width:32%;object-fit:cover;mask-image:linear-gradient(90deg,transparent,#000 45%)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}.pad{padding:16px}
.art2{grid-template-columns:2fr 1fr}
.art .lead{font-size:15px;line-height:1.75;color:var(--mut);margin-bottom:16px;padding-left:12px;border-left:3px solid var(--o)}
.art h3{font-size:17px}.art p{line-height:1.75}
.take{background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:12px 14px;margin:14px 0}.take b{color:var(--o2)}
.stk{position:sticky;top:140px}
label{display:block;font-weight:500;font-size:12px;margin:8px 0 3px}input,select,textarea{width:100%;padding:8px;border:1px solid #ddd5c8;border-radius:8px;font:inherit;background:#fff}
table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:8px 10px;border-bottom:1px solid var(--ln);text-align:left;font-weight:400}th{background:#faf6ef}
details{border-bottom:1px solid #e8dfd0;padding:9px 4px}summary{font-weight:500;cursor:pointer;font-size:13px}details p,details li{color:var(--mut);margin-top:5px;font-size:13px}details ul{padding-left:18px}
.opt{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 12px;border:1px solid #ddd5c8;background:#fff;border-radius:9px;font:inherit}.opt.ok{background:#dff3e4;border-color:var(--g)}.opt.bad{background:#fde2e2;border-color:#dc2626}
.bar{height:6px;background:#eee;border-radius:5px;overflow:hidden;margin:8px 0 12px}.bar i{display:block;height:100%;background:var(--o)}
.step{display:flex;gap:10px;margin:10px 0}.step span{flex:none;width:30px;height:30px;border-radius:50%;background:var(--o);color:#fff;display:grid;place-items:center;font-weight:600;font-size:12px}
.sticky{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--ln);padding:8px var(--px);display:flex;justify-content:space-between;align-items:center;z-index:30}
.chat{position:fixed;right:16px;bottom:70px;width:46px;height:46px;border-radius:50%;background:var(--o);color:#fff;font-size:20px;display:grid;place-items:center;z-index:40;box-shadow:0 6px 16px #0004}
.toast{position:fixed;top:84px;right:20px;background:var(--g);color:#fff;padding:10px 16px;border-radius:10px;z-index:60}
.play{position:absolute;inset:0;display:grid;place-items:center;font-size:34px;color:#fff;text-shadow:0 2px 10px #000}
.vband{display:grid;grid-template-columns:1fr 1fr;align-items:center;overflow:hidden}.vband video{width:100%;height:260px;object-fit:cover;display:block}.vt{padding:18px 22px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;color:var(--ink)}.vt h2{font-size:22px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}.stat{padding:12px;text-align:center}.stat h3{font-size:24px;color:var(--o2)}
.chk{list-style:none;padding:0;display:grid;gap:5px}.chk li::before{content:"✓ ";color:var(--g)}
:scope{overflow-x:clip}
.hero .btn{margin:0 6px 8px 0}
.sticky{padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))}
.card video{display:block}
@media(min-width:1500px){:scope{font-size:15px}.grid{grid-template-columns:repeat(auto-fit,minmax(min(270px,100%),1fr))}.col{height:360px}.card img{height:160px}}
@media(max-width:1024px){.hero{gap:16px}.col{height:260px}}
@media(max-width:820px){.hero,.two,.art2,.vband{grid-template-columns:1fr}.stk{position:static}.col{height:250px;max-width:520px;margin:0 auto;width:100%}.ph img{display:none}.ph h1{max-width:100%}.vband video{height:200px}.snav{position:static;flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;scrollbar-width:none;-webkit-overflow-scrolling:touch}.snav::-webkit-scrollbar{display:none}.snav a{flex:none;white-space:nowrap}}
@media(max-width:560px){:scope{font-size:13.5px;padding-bottom:84px;--px:4%}.sec{padding:16px var(--px)}.hero{padding:18px var(--px)}.hero .btn{display:block;width:100%;margin:0 0 8px}.sec h2{font-size:19px}.ph{padding:18px var(--px)}.ph h1{font-size:23px}.stats{grid-template-columns:repeat(2,1fr)}.stat h3{font-size:20px}.strip a{display:inline-block;margin:4px 0 0}.sticky .mut{display:none}.sticky{gap:8px}.chat{width:40px;height:40px;font-size:17px;right:10px;bottom:64px}.toast{top:70px;right:10px;left:10px;text-align:center}.row{flex-wrap:wrap}table{display:block;overflow-x:auto}input,select,textarea{font-size:16px}.live{width:86%}.col .a{width:66%;height:170px}.col .b{width:42%;height:120px;top:50px}.pad{padding:13px}}
@media(max-width:360px){.grid{grid-template-columns:1fr}.snav a{padding:5px 8px}}
@media(pointer:coarse){.btn{min-height:40px}.btn.s{min-height:36px}.chip{padding:7px 12px}}
:scope.dark{--ink:#f1f5f9;--mut:#a8b0bd;--ln:#2b2f3a;background-color:#0c0c14;background-image:linear-gradient(#ffffff0d 1px,transparent 1px),linear-gradient(90deg,#ffffff0d 1px,transparent 1px)}
:scope.dark .snav,:scope.dark .box,:scope.dark .hero,:scope.dark .ph,:scope.dark .live,:scope.dark .sticky,:scope.dark .chip,:scope.dark .btn.o,:scope.dark .btn.l,:scope.dark .badge,:scope.dark .opt,:scope.dark input,:scope.dark select,:scope.dark textarea{background-color:#14151c;color:var(--ink);border-color:var(--ln)}
:scope.dark .chip.on{background-color:var(--o);color:#fff}
:scope.dark .pill{background:#232633;color:var(--ink)}
:scope.dark .badge i{background:#3a2412}
:scope.dark .snav a:hover,:scope.dark .snav a.on{background:#2a1c10}
:scope.dark th{background:#1b1d27}
:scope.dark .meta{color:#c4cad4;border-color:var(--ln)}
:scope.dark details{border-color:var(--ln)}
:scope.dark .bar{background:#2b2f3a}
:scope.dark .col img{border-color:#14151c}
:scope.dark .opt.ok{background:#12301d}
:scope.dark .opt.bad{background:#3a1717}
:scope.dark .note{background:#12301d;border-color:#1f5a35}
:scope.dark .btn.p{background:#4b2a8a}
:scope.dark .take{background:#2a1c10;border-color:#5a3a1c}
:scope.dark .sec h2,:scope.dark .sub,:scope.dark .sec>.step{background:#14151c}
}`;

/* ---------------- SMALL PARTS ---------------- */
const Head = ({ t, s, img }) => <div className="ph">{img && <img src={I(img)} alt="" />}<h1>{t}</h1><p>{s}</p></div>;
const Sec = ({ t, s, children, id }) => <div className="sec" id={id}>{t && <h2>{t}</h2>}{s && <p className="sub">{s}</p>}{children}</div>;
const Faq = ({ items = FAQ }) => <div className="box pad">{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
const Stats = () => <div className="stats">{STATS.map(([v, l]) => <div className="box stat" key={l}><h3>{v}</h3><p className="mut">{l}</p></div>)}</div>;
const Cards = ({ items }) => <div className="grid">{items.map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut" style={{ marginTop: 4, fontSize: 13 }}>{d}</p></div>)}</div>;
const Callback = ({ toast }) => <div className="box pad" style={{ maxWidth: 520 }}><h3>Request a callback</h3><label>Matter</label><select>{['Matrimonial / Divorce', 'Property / Inheritance', 'Criminal / Bail', 'Civil Litigation', 'NRI Legal Matter', 'Business / Debt Recovery', 'Other'].map((x) => <option key={x}>{x}</option>)}</select><label>Name</label><input /><label>Phone</label><input /><br /><button className="btn" onClick={() => toast('Request sent. We will call you back.')}>Send enquiry</button><p className="mut" style={{ marginTop: 6 }}>Do not share passwords or sensitive documents. An enquiry does not create an advocate-client relationship.</p></div>;
const Yt = ({ id, t }) => { const [on, setOn] = useState(false); return <div className="box card"><div className="rel" style={{ height: 150 }}>{on ? <iframe title={t} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media" allowFullScreen style={{ width: '100%', height: '100%', border: 0 }} /> : <a onClick={() => setOn(true)}><img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={t} style={{ height: 150 }} /><span className="play">▶</span></a>}</div><div className="b"><h3>{t}</h3></div></div>; };

function Quiz({ timed }) {
  const total = 600;
  const [i, setI] = useState(-1), [s, setS] = useState(0), [pick, setPick] = useState(null), [t, setT] = useState(total);
  useEffect(() => { if (!timed || i < 0 || i >= QS.length) return; const x = setInterval(() => setT((v) => { if (v <= 1) { setI(QS.length); return 0; } return v - 1; }), 1000); return () => clearInterval(x); }, [timed, i >= 0 && i < QS.length]);
  const go = (k) => { if (pick !== null) return; setPick(k); if (k === QS[i][2]) setS((v) => v + 1); setTimeout(() => { setPick(null); setI((v) => v + 1); }, 900); };
  if (i < 0) return <div className="box pad"><h3>{timed ? 'Legal Assessment' : 'Legal Basics Quiz'}</h3><p className="mut">{QS.length} questions · {timed ? '10 minutes · certificate at 60%+' : 'no timer · instant answers'}</p><ul className="chk" style={{ margin: '10px 0' }}>{(timed ? ['Answer all questions before time runs out', 'You cannot go back to a previous question', 'Score 60% or more to unlock the certificate'] : ['Pick an answer to see the correct one at once', 'Topics: procedure, writs, contract, limitation, Constitution', 'Retry as many times as you like']).map((x) => <li key={x}>{x}</li>)}</ul><button className="btn" onClick={() => { setI(0); setS(0); setT(total); }}>Start</button></div>;
  if (i >= QS.length) { const p = Math.round((s / QS.length) * 100); return <div className="box pad"><h2>Score {s}/{QS.length} ({p}%)</h2><p className="mut">{p >= 60 ? 'Passed. Well done.' : 'Not yet. Revise and retry.'}</p>{timed && p >= 60 && <div style={{ border: '6px double #c9962b', padding: 20, textAlign: 'center', margin: '12px 0', background: '#fffdf6', color: '#17181c' }}><h3>Certificate of Achievement</h3><p>ILM ORA Law · Assessment score {p}% (sample)</p></div>}<button className="btn" onClick={() => setI(-1)}>Try again</button></div>; }
  const [q, o] = QS[i];
  return <div className="box pad">{timed && <b style={{ float: 'right', color: '#dc2626' }}>{Math.floor(t / 60)}:{String(t % 60).padStart(2, '0')}</b>}<p className="mut">Question {i + 1} of {QS.length}</p><div className="bar"><i style={{ width: `${(i / QS.length) * 100}%` }} /></div><h3>{q}</h3>{o.map((x, k) => <button key={x} className={`opt ${pick !== null ? (k === QS[i][2] ? 'ok' : k === pick ? 'bad' : '') : ''}`} onClick={() => go(k)}>{x}</button>)}</div>;
}

const makeUI = ({ go, toast, setPick }) => {
  const Course = ([n, c, by, when, dur, lvl, seats, pr, im]) => (
    <div className="box card" key={n}><div className="rel"><img src={I(im)} alt={n} loading="lazy" /><span className="badge"><span className="dot" style={{ display: 'inline-block' }} /> Live{!pr && <i>Free</i>}</span></div>
      <div className="b"><span className="cat">{c}</span><h3>{n}</h3><span className="mut">with {by}</span><div className="meta"><span>{when}</span><span>{dur}</span><span>{lvl}</span><span><b>{seats} seats left</b></span></div>
        <div className="row"><span className="pr">{money(pr)}</span><span><a className="btn l s" onClick={() => go(COURSE_SLUGS[COURSES.findIndex((x) => x[0] === n)])}>View details</a> <button className="btn s" onClick={() => { setPick(n); go('book'); }}>Register now</button></span></div></div></div>);
  const Area = ([n, d, im]) => <div className="box card" key={n}><img src={I(im)} alt={n} loading="lazy" /><div className="b"><h3>{n}</h3><p className="mut">{d}</p><div className="row"><a className="btn l s" onClick={() => go(AREA_SLUGS[AREAS.findIndex((x) => x[0] === n)])}>Explore</a><button className="btn s" onClick={() => { setPick(n); go('book'); }}>Consult</button></div></div></div>;
  const Art = ([c, t, im, m]) => <div className="box card" key={t}><img src={I(im)} alt={t} loading="lazy" /><div className="b"><span className="cat">{c}</span><h3>{t}</h3><span className="mut">{m} min read</span><a className="btn l s" onClick={() => go(ARTICLE_SLUGS[ARTICLES.findIndex((a) => a[1] === t)])}>Read article</a></div></div>;
  return { Course, Area, Art };
};

/* ---------------- PAGES ---------------- */
const useLater = (ms) => { const [ok, setOk] = useState(false); useEffect(() => { const t = setTimeout(() => setOk(true), ms); return () => clearTimeout(t); }, [ms]); return ok; };

function Home({ go, toast, ui }) {
  const { Course, Area, Art } = ui;
  const vid = useLater(2500); // hero video page load ke baad hi shuru hoti hai
  return (
    <>
      <div className="strip">LIMITED SEATS: Register now for the December batches <a onClick={() => go('training')}>Reserve my seat</a></div>
      <div className="hero"><div><span className="pill"><i className="dot" /> 6 live batches open for registration</span><h1>Learn law by doing it. Get advice you can act on.</h1><p>Live legal training, one-to-one consulting, debt recovery support, quizzes and certified assessments for students, graduates, advocates and businesses.</p>
        <span className="pill">Drafting and litigation</span><span className="pill">Mock tests</span><span className="pill">Verified certificate</span><br /><br /><button className="btn" onClick={() => go('training')}>Browse courses</button> <button className="btn o" onClick={() => go('consulting')}>Book a consultation</button></div>
        <div className="col"><img className="a" src={I('advocate-woman')} alt="Advocate" /><img className="b" src={I('classroom-hall')} alt="Classroom" /><div className="live"><b>Next live session</b><h4>Drafting a sale agreement</h4>with Adv. Bilal Raza · Sun, 29 Nov, 6:30 pm</div></div></div>
      <Sec><Stats /></Sec>
      <Sec><div className="box vband"><div className="vt"><h2>See how we teach</h2><p className="mut">Real documents, real procedure, live practice with working advocates. Every session ends with questions, and every batch gets recordings and templates.</p><button className="btn" onClick={() => go('training')}>Join a live class</button></div>{vid ? <video src={V.hero} poster={I('court-hearing')} autoPlay muted loop playsInline preload="none" /> : <img src={I('court-hearing')} alt="" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />}</div></Sec>
      <Sec t="Why learners and clients choose us" s="What you can expect from every course and consultation."><Cards items={WHY} /></Sec>
      <Sec t="Four ways to grow here" s="Pick where you want to start."><div className="grid">{[['Training', 'Live and recorded courses with certificates.', 'laptop-student', 'training'], ['Consulting', 'One-to-one advice by practice area, for India and NRI clients.', 'client-handshake', 'consulting'], ['Quiz', 'Short quizzes with instant answers.', 'notebook-pen', 'quiz'], ['Assessment', 'Timed tests and certificates.', 'exam-omr', 'assessment']].map(([t, d, im, p]) => <a key={t} className="box card" onClick={() => go(p)}><img src={I(im)} alt={t} loading="lazy" /><div className="b"><h3>{t}</h3><p className="mut">{d}</p></div></a>)}</div></Sec>
      <Sec t="Featured workshops" s="Short live and on-demand sessions."><div className="grid">{COURSES.slice(0, 3).map(Course)}</div><br /><button className="btn l" onClick={() => go('training')}>See all courses</button></Sec>
      <Sec t="Practice areas" s="Matters you can ask about."><div className="grid">{AREAS.map(Area)}</div></Sec>
      <Sec t="A clear path from consultation to action">{STEPS.map(([t, d], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{d}</p></div></div>)}</Sec>
      <Sec t="Debt recovery for businesses" s="Unpaid invoice, bounced cheque or contractor dues? Commercial first, legal when the facts need it."><div className="grid">{SERVICES.slice(0, 6).map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div><br /><button className="btn" onClick={() => go('recovery')}>Explore recovery services</button></Sec>
      <Sec><div className="box pad two"><div><h2>India-focused legal support for NRIs</h2><p className="sub">Discuss property, family disputes, inheritance and ongoing cases in India from abroad.</p><ul className="chk">{NRI.map((x) => <li key={x}>{x}</li>)}</ul></div><div><p className="mut">Enquiries from</p><div className="chips" style={{ marginTop: 6 }}>{['USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore', 'Germany', 'New Zealand'].map((c) => <span className="chip" key={c}>{c}</span>)}</div><p className="mut">Office is in New Delhi. Foreign-law advice may need locally qualified counsel.</p></div></div></Sec>
      <Sec t="Free practice tools" s="Start learning today, no sign-in needed."><div className="grid">{[['Legal drafts', 'Starter formats for notices, agreements and court papers.', 'drafts'], ['Previous year papers', 'Practice papers for judiciary, AIBE and CLAT PG.', 'papers'], ['Legal quiz', 'Ten questions with instant feedback.', 'quiz'], ['Glossary and guides', 'Plain-language legal terms, articles and videos.', 'resources']].map(([t, d, p]) => <a key={t} className="box pad" onClick={() => go(p)}><h3>{t}</h3><p className="mut" style={{ marginTop: 4 }}>{d}</p></a>)}</div></Sec>
      <Sec t="Top stories"><div className="grid">{NEWS.map(([c, t]) => <div className="box pad" key={t}><span className="cat">{c}</span><h3>{t}</h3></div>)}</div></Sec>
      <Sec t="Legal explainers"><div className="grid">{YT.slice(0, 2).map(([id, t]) => <Yt key={id} id={id} t={t} />)}</div></Sec>
      <Sec t="Latest articles"><div className="grid">{ARTICLES.slice(0, 3).map(Art)}</div></Sec>
      <Sec t="What learners say" s="Verify consent for each review before launch."><div className="grid">{TESTI.map(([n, r, t]) => <div className="box pad" key={n}><p>“{t}”</p><br /><b>{n}</b><p className="mut">{r}</p></div>)}</div></Sec>
      <Sec t="Frequently asked questions"><Faq /></Sec>
      <Sec><Callback toast={toast} /></Sec>
    </>
  );
}

function Training({ ui, go }) {
  const { Course } = ui;
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(COURSES.map((c) => c[1]))];
  return (
    <><Head t="Training" s="Live and on-demand workshops with certificates." img="library-curve" />
      <Sec><div className="chips">{cats.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div><div className="grid">{COURSES.filter((c) => cat === 'All' || c[1] === cat).map(Course)}</div></Sec>
      <Sec t="Batch schedule and fees" s="Sample dates and fees."><div className="box"><table><thead><tr><th>Course</th><th>Start</th><th>Duration</th><th>Level</th><th>Fee</th></tr></thead><tbody>{COURSES.map(([n, , , w, d, l, , p]) => <tr key={n}><td>{n}</td><td>{w}</td><td>{d}</td><td>{l}</td><td>{money(p)}</td></tr>)}</tbody></table></div></Sec>
      <Sec t="What every course includes"><div className="grid">{[['Live classes', '2 to 3 sessions a week with Q&A'], ['Recordings', 'Revise at your own pace'], ['Templates', 'Real documents used in practice'], ['Certificate', 'After the final assessment'], ['Mentor support', 'Ask doubts in every session'], ['Practice tasks', 'Weekly assignments with feedback']].map(([t, d]) => <div className="box pad" key={t}><b>{t}</b><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="Course syllabus" s="Open a course to see the week-by-week plan."><div className="box pad">{COURSES.map(([n]) => <details key={n}><summary>{n}</summary><ul>{SYLLABUS[n].map((x) => <li key={x}>{x}</li>)}</ul></details>)}</div></Sec>
      <Sec t="Who these courses are for"><div className="grid">{[['Law students', 'Add practical skills that college rarely covers: drafting, procedure and research.'], ['Fresh graduates', 'Build a portfolio of documents and prepare for interviews and exams.'], ['Practising advocates', 'Sharpen drafting and court procedure and learn compliance basics.'], ['Business and HR teams', 'Understand contracts, notices and compliance without legal jargon.']].map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="How to get your certificate">{[['Attend the live sessions', 'Or watch the recordings and send your questions.'], ['Complete the tasks', 'Submit weekly assignments for feedback.'], ['Take the final assessment', 'A timed test at the end of the course.'], ['Download your certificate', 'Score 60% or more to unlock it.']].map(([t, d], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{d}</p></div></div>)}<button className="btn" onClick={() => go('assessment')}>Try a sample assessment</button></Sec>
      <Sec t="Your mentors"><div className="grid">{LAWYERS.map(([n, a, y, im]) => <div className="box card" key={n}><img src={I(im)} alt={n} style={{ height: 180, objectPosition: 'top' }} loading="lazy" /><div className="b"><b>{n}</b><span className="mut">{a} · {y}</span></div></div>)}</div></Sec>
      <Sec t="Inside our classes"><div className="grid">{[['court', 'Court procedure walkthrough', 'court-hearing'], ['laptop', 'Online drafting lab', 'laptop-student'], ['meet', 'Mentor meet-up', 'team-table']].map(([v, t, im]) => <div className="box card" key={v}><video src={V[v]} poster={I(im)} controls preload="none" playsInline style={{ height: 150, objectFit: 'cover', background: '#fff' }} /><div className="b"><h3>{t}</h3></div></div>)}</div></Sec>
      <Sec t="What learners say" s="Verify consent for each review before launch."><div className="grid">{TESTI.map(([n, r, t]) => <div className="box pad" key={n}><p>“{t}”</p><br /><b>{n}</b><p className="mut">{r}</p></div>)}</div></Sec>
      <Sec t="Frequently asked questions"><Faq /></Sec></>
  );
}

function Consulting({ go, ui }) {
  const { Area } = ui;
  return (
    <><Head t="Consulting" s="Talk to an advocate who handles your type of matter." img="client-handshake" />
      <Sec t="Practice areas"><div className="grid">{AREAS.map(Area)}</div></Sec>
      <Sec t="What we can help with" s="Examples of matters in each area."><div className="box pad">{AREA_DETAIL.map(([t, d]) => <details key={t}><summary>{t}</summary><p>{d}</p></details>)}</div></Sec>
      <Sec t="How a consultation works">{[['Book a slot', 'Choose your matter, date and time. We confirm by phone.'], ['Share your facts', 'Send a short summary and key documents before the call.'], ['Talk to the advocate', 'Get options, risks and next steps in plain language.'], ['Decide your next step', 'Continue with representation or take the advice and act yourself.']].map(([t, d], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{d}</p></div></div>)}</Sec>
      <Sec t="Our advocates"><div className="grid">{LAWYERS.map(([n, a, y, im]) => <div className="box card" key={n}><img src={I(im)} alt={n} style={{ height: 190, objectPosition: 'top' }} loading="lazy" /><div className="b"><h3>{n}</h3><span className="mut">{a} · {y}</span><button className="btn s" onClick={() => go('book')}>Book</button></div></div>)}</div></Sec>
      <Sec t="Consultation fees" s="Sample fees."><div className="box"><table><thead><tr><th>Session</th><th>Time</th><th>Best for</th><th>Fee</th></tr></thead><tbody>{[['Quick advice', '20 min', 'One clear question or a second opinion', 2000], ['Standard', '45 min', 'Understanding options and procedure', 4500], ['Document review', '60 min', 'Contracts, notices, orders and agreements', 7000]].map(([a, b, d, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{d}</td><td>{money(c)}</td></tr>)}</tbody></table></div></Sec>
      <Sec><div className="two"><div className="box pad"><h2>What to bring</h2><p className="sub">A prepared file saves time and money.</p><ul className="chk">{BRING.map((x) => <li key={x}>{x}</li>)}</ul></div><div className="box pad"><h2>What you can expect</h2><p className="sub">Our commitments to every client.</p><ul className="chk">{['Plain-language explanation of options and risks', 'Honest view of strengths and weaknesses', 'Confidential handling of your information', 'Clear written scope before any representation', 'No guarantee of outcome, ever'].map((x) => <li key={x}>{x}</li>)}</ul></div></div></Sec>
      <Sec t="For clients abroad" s="India-related matters by online consultation. Foreign-law advice may need locally qualified counsel."><ul className="chk" style={{ marginBottom: 10 }}>{NRI.map((x) => <li key={x}>{x}</li>)}</ul><div className="chips">{['USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore', 'Germany', 'New Zealand'].map((c) => <span className="chip" key={c}>{c}</span>)}</div></Sec>
      <Sec t="Frequently asked questions"><Faq items={FAQ.slice(3, 6).concat(FAQ.slice(8))} /></Sec></>
  );
}

function Recovery({ go, toast }) {
  return (
    <><Head t="Debt Recovery" s="You focus on your business. We focus on your recovery. Pan-India, commercial first." img="business-handshake" />
      <Sec t="What are you trying to recover?"><div className="grid">{SERVICES.map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="The R.E.C.O.V.E.R. process" s="From first conversation to case closure.">{RSTEPS.map(([t, d], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{d}</p></div></div>)}</Sec>
      <Sec t="Routes we may use" s="We choose the lightest route that fits your documents and the debtor. General information only."><Cards items={ROUTES} /></Sec>
      <Sec><div className="two"><div className="box pad"><h2>Before you contact us</h2><p className="sub">A clear paper trail improves the recovery strategy.</p><ul className="chk">{DOCS.map((x) => <li key={x}>{x}</li>)}</ul><br /><button className="btn" onClick={() => go('contact')}>Assess my matter</button></div><div className="box card"><img src={I('papers-stack')} alt="Documents" style={{ height: 260 }} /></div></div></Sec>
      <Sec t="Industries we understand"><div className="chips">{INDS.map((x) => <span className="chip" key={x}>{x}</span>)}</div></Sec>
      <Sec t="Why structured recovery helps"><div className="grid">{[['A cleaner claim file', 'Documents and chronology organised before escalation.'], ['Less random chasing', 'Planned communication instead of repeated reminders.'], ['Clearer escalation', 'Negotiation and legal routes chosen on the facts.'], ['Better visibility', 'Your team sees what is done and what is pending.']].map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="Tips to protect your next invoice"><div className="grid">{[['Write terms down', 'Payment days, interest and late fees should be in a signed agreement or purchase order.'], ['Invoice quickly and clearly', 'Include dates, tax details and a reference to the order or contract.'], ['Keep acknowledgments', 'Delivery receipts and written confirmations are strong evidence.'], ['Follow up in writing', 'Email or message reminders create a record. Calls alone do not.']].map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="Recovery FAQs"><Faq items={RFAQ} /></Sec>
      <Sec><Callback toast={toast} /></Sec></>
  );
}

function Book({ toast, ui }) {
  return (
    <><Head t="Book an appointment" s="Choose your matter, date and time. We confirm by phone." img="meeting-three" />
      <Sec><div className="two"><div className="box pad"><label>Course or matter</label><select value={ui.pick} onChange={(e) => ui.setPick(e.target.value)}>{[...COURSES.map((c) => c[0]), ...AREAS.map((a) => a[0])].map((x) => <option key={x}>{x}</option>)}</select><label>Date</label><input type="date" /><label>Time</label><select><option>10:00 AM</option><option>12:00 PM</option><option>3:00 PM</option><option>5:00 PM</option></select><label>Name</label><input /><label>Phone</label><input /><br /><button className="btn" onClick={() => toast('Request sent. We will confirm by phone.')}>Send request</button><p className="mut" style={{ marginTop: 8 }}>Do not include passwords or sensitive documents. An enquiry does not create an advocate-client relationship.</p></div>
        <div><div className="box card"><img src={I('corridor')} alt="Office" /><div className="b"><h3>Visit by appointment</h3><p className="mut">{OFFICE} · +91 98731 81685</p></div></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>What happens next</h3>{[['We call you', 'To confirm the slot and understand your matter.'], ['You send documents', 'A short summary and key papers, if needed.'], ['We meet or talk', 'In person, by phone or by video call.']].map(([t, d], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{d}</p></div></div>)}</div></div></div></Sec></>
  );
}

const QuizPage = () => <><Head t="Legal Quiz" s="Ten quick questions with instant feedback." img="notebook-pen" /><Sec><div className="two"><Quiz /><div className="box pad"><h3>How to use this quiz</h3><ul className="chk" style={{ marginTop: 8 }}>{['Attempt it once without looking anything up', 'Note the questions you missed', 'Read the matching article in Resources', 'Retry after a day to see what stuck'].map((x) => <li key={x}>{x}</li>)}</ul><p className="mut" style={{ marginTop: 10 }}>This quiz is for practice and does not give a certificate. For a scored report, try the timed Assessment.</p></div></div></Sec></>;
const Assessment = () => <><Head t="Assessment" s="Timed test with a score report and certificate." img="exam-omr" /><Sec><div className="two"><Quiz timed /><div className="box pad"><h3>About the assessment</h3><ul className="chk" style={{ marginTop: 8 }}>{['10 questions in 10 minutes', 'Instant score and result', 'Certificate for a score of 60% or more', 'Retake any time'].map((x) => <li key={x}>{x}</li>)}</ul><p className="mut" style={{ marginTop: 10 }}>The certificate here is a sample for this preview. Final certificates will carry a verification ID.</p></div></div></Sec></>;

function Papers({ go, toast }) {
  return <><Head t="Previous Year Papers" s="Download papers for practice." img="papers-stack" /><Sec><div className="box"><table><thead><tr><th>Paper</th><th>Year</th><th /></tr></thead><tbody>{PAPERS.map(([n, y], k) => <tr key={k}><td>{n}</td><td>{y}</td><td>{k === 0 ? <button className="btn s" onClick={() => go(PAPER_SLUG)}>Open paper</button> : <button className="btn s" onClick={() => toast('Download starts here (sample).')}>Download</button>}</td></tr>)}</tbody></table></div></Sec>
    <Sec t="How to use previous year papers"><Cards items={PAPERTIPS} /></Sec>
    <Sec t="Related practice"><div className="grid">{[['Take the legal quiz', 'Ten questions with instant answers.'], ['Try the timed assessment', 'Practise under exam conditions.'], ['Read the study plan', 'A 30-day judiciary plan in Resources.']].map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
    <Sec t="Frequently asked questions"><Faq items={[['Are these official papers?', 'Files in this preview are samples. Before launch, upload papers from official sources and note the source on each file.'], ['Do you provide answer keys?', 'Where available, an answer key is added next to the paper. Always verify keys against official releases.'], ['Can I request a paper?', 'Yes. Use the contact page to ask for a paper or a subject you want added.']]} /></Sec></>;
}

function Drafts({ go, toast }) {
  const [c, setC] = useState('All');
  return <><Head t="Legal Drafts" s="Starter formats for common documents." img="signing-docs" /><Sec><div className="chips">{['All', ...new Set(DRAFTS.map((d) => d[1]))].map((x) => <button key={x} className={`chip ${c === x ? 'on' : ''}`} onClick={() => setC(x)}>{x}</button>)}</div><div className="grid">{DRAFTS.filter((d) => c === 'All' || d[1] === c).map((dd) => { const [n, k, d] = dd; const idx = DRAFTS.indexOf(dd); return <div className="box pad" key={n}><span className="cat">{k}</span><h3>{n}</h3><p className="mut" style={{ margin: '4px 0' }}>{d}</p><p className="mut">Editable format · for guidance only</p><br />{idx === 0 ? <button className="btn s" onClick={() => go(DRAFT_SLUG)}>Open draft</button> : <button className="btn s" onClick={() => toast('Download starts here (sample).')}>Download</button>}</div>; })}</div></Sec>
    <Sec t="Before you use a draft"><Cards items={[['Adapt it to your facts', 'Replace every placeholder and delete clauses that do not apply.'], ['Check the law', 'Stamp duty, registration and format rules vary by state and by document type.'], ['Get it reviewed', 'For anything important, ask an advocate to review before you sign or file.'], ['Keep records', 'Save a signed copy and proof of sending or delivery.']]} /></Sec>
    <Sec t="Need a custom draft?"><div className="box pad" style={{ maxWidth: 560 }}><p className="mut">Our advocates can draft or review documents for your situation. Book a document review session.</p><br /><a className="btn" onClick={() => go('book')}>Book a document review</a></div></Sec></>;
}

function Resources({ ui }) {
  const { Art } = ui;
  const [rc, setRc] = useState('All');
  return (
    <><Head t="Resources" s="Videos, news, articles and free guides." img="library-busts" />
      <Sec t="Video library" s="Short legal explainers."><div className="grid">{YT.map(([id, t]) => <Yt key={id} id={id} t={t} />)}</div></Sec>
      <Sec t="Top stories" s="Court and legal news."><div className="grid">{NEWS.map(([c, t]) => <div className="box pad" key={t}><span className="cat">{c}</span><h3>{t}</h3></div>)}</div></Sec>
      <Sec t="Articles"><div className="chips">{['All', 'Guide', 'Exam', 'Practice'].map((c) => <button key={c} className={`chip ${rc === c ? 'on' : ''}`} onClick={() => setRc(c)}>{c}</button>)}</div><div className="grid">{ARTICLES.filter((a) => rc === 'All' || a[0] === rc).map(Art)}</div></Sec>
      <Sec t="Legal glossary" s="Common terms in plain language."><div className="box pad">{GLOSS.map(([t, d]) => <details key={t}><summary>{t}</summary><p>{d}</p></details>)}</div></Sec>
      <Sec t="Courts and forums" s="Which court handles which matter."><div className="grid">{COURTS.map(([t, d, im]) => <div className="box card" key={t}><img src={I(im)} alt={t} loading="lazy" /><div className="b"><h3>{t}</h3><p className="mut">{d}</p></div></div>)}</div></Sec></>
  );
}

function About() {
  return (
    <><Head t="About us" s="Practitioners teaching practitioners." img="supreme-court" />
      <Sec><div className="two"><div><h2>Our mission</h2><p className="sub">We close the gap between law school and the courtroom. Every course is taught by someone who works on live matters.</p>{[['2016', 'Weekend workshops begin'], ['2019', 'Online live classes launch'], ['2022', 'Consulting practice opens'], ['2025', 'Thousands of learners (sample)']].map(([y, t]) => <div className="step" key={y}><span style={{ fontSize: 10 }}>{y}</span><div style={{ paddingTop: 6 }}>{t}</div></div>)}</div><div className="box card"><video src={V.team} controls preload="none" poster={I('team-table')} style={{ height: 340, objectFit: 'cover' }} /></div></div></Sec>
      <Sec><Stats /></Sec>
      <Sec t="What we do"><div className="grid">{[['Train', 'Live and recorded courses, quizzes and certified assessments.'], ['Advise', 'One-to-one consultations by practice area for India and NRI clients.'], ['Recover', 'Structured, commercial-first support for unpaid business dues.']].map(([t, d]) => <div className="box pad" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></Sec>
      <Sec t="Professional care at every stage"><Cards items={VALUES} /></Sec>
      <Sec t="Our team"><div className="grid">{LAWYERS.map(([n, a, y, im]) => <div className="box card" key={n}><img src={I(im)} alt={n} style={{ height: 180, objectPosition: 'top' }} /><div className="b"><b>{n}</b><span className="mut">{a} · {y}</span></div></div>)}</div></Sec>
      <Sec t="Frequently asked questions"><Faq items={FAQ.slice(0, 5)} /></Sec></>
  );
}

function Contact({ toast }) {
  return (
    <><Head t="Contact" s="We reply within one working day." img="corridor" />
      <Sec><div className="two"><div className="box pad"><label>Name</label><input /><label>Email</label><input /><label>Matter</label><select>{['Matrimonial', 'Property', 'Criminal', 'Civil', 'NRI', 'Business / Recovery', 'Course enquiry', 'Other'].map((x) => <option key={x}>{x}</option>)}</select><label>Message</label><textarea rows={4} /><br /><button className="btn" onClick={() => toast('Message sent.')}>Send enquiry</button><p className="mut" style={{ marginTop: 8 }}>Do not share passwords or sensitive documents. An enquiry does not create an advocate-client relationship.</p></div>
        <div><div className="box pad"><h3>Visit or call</h3><p className="mut" style={{ marginTop: 6 }}>{OFFICE}<br />+91 98731 81685 · 8171974067<br />info@lawvs.com<br />By prior appointment</p></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>Office hours (sample)</h3><table style={{ marginTop: 6 }}><tbody>{[['Monday to Friday', '10:00 AM to 6:00 PM'], ['Saturday', '10:00 AM to 2:00 PM'], ['Sunday', 'Closed']].map(([d, t]) => <tr key={d}><td>{d}</td><td>{t}</td></tr>)}</tbody></table></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>Which team should I write to?</h3><ul className="chk" style={{ marginTop: 8 }}>{['Courses and certificates: choose Course enquiry', 'Legal advice: choose the matter type', 'Business dues: choose Business / Recovery'].map((x) => <li key={x}>{x}</li>)}</ul></div></div></div></Sec>
      <Sec t="Frequently asked questions"><Faq items={FAQ.slice(3, 5).concat(FAQ.slice(6, 9))} /></Sec></>
  );
}

function Legal() {
  const [leg, setLeg] = useState('Privacy');
  return (
    <><Head t="Legal" s="Privacy, terms and disclaimer." /><Sec><div className="chips">{['Privacy', 'Terms', 'Disclaimer'].map((c) => <button key={c} className={`chip ${leg === c ? 'on' : ''}`} onClick={() => setLeg(c)}>{c}</button>)}</div>
      <div className="box pad art"><h2>{leg === 'Privacy' ? 'Privacy policy' : leg === 'Terms' ? 'Terms of use' : 'Disclaimer'}</h2><p className="mut" style={{ margin: '4px 0 12px' }}>Placeholder text. Have your own advocate prepare the final {leg.toLowerCase()} before launch.</p>{LEGALTXT[leg].map(([h, p]) => <div key={h} style={{ marginBottom: 12 }}><h3>{h}</h3><p style={{ marginTop: 3 }}>{p}</p></div>)}</div></Sec></>
  );
}

function Article({ go, ui }) {
  const i = ARTICLES[ui.art] ? ui.art : 0;
  const [c, t, im, m] = ARTICLES[i];
  const [intro, secs, tips] = ARTBODY[i];
  return (
    <><Head t={t} s={`${c} · ${m} min read`} img={im} />
      <Sec><div className="two art2"><div className="box pad art"><p className="lead">{intro}</p>{secs.map(([h, p], k) => <div key={h} style={{ marginBottom: 16 }}><h3>{k + 1}. {h}</h3><p style={{ marginTop: 4 }}>{p}</p></div>)}<div className="take"><b>Key takeaways</b><ul className="chk" style={{ marginTop: 6 }}>{tips.map((x) => <li key={x}>{x}</li>)}</ul></div><p className="mut">General legal education, not legal advice. Laws change, so confirm the current position with an advocate.</p><br /><button className="btn l s" onClick={() => go('resources')}>← All articles</button></div>
        <div className="stk"><div className="box pad"><h3>More articles</h3>{ARTICLES.map((a, k) => k !== i && <p key={a[1]} style={{ margin: '8px 0' }}><a style={{ color: 'var(--o2)' }} onClick={() => go(ARTICLE_SLUGS[k])}>{a[1]}</a></p>)}</div><div className="box pad" style={{ marginTop: 14 }}><h3>Have a matter like this?</h3><p className="mut" style={{ margin: '4px 0 10px' }}>Talk to an advocate who handles it.</p><button className="btn" onClick={() => go('book')}>Talk to an advocate</button></div></div></div></Sec></>
  );
}

function CourseDetail({ go, ui }) {
  const i = COURSES[ui.art] ? ui.art : 0;
  const [n, c, by, when, dur, lvl, seats, pr, im] = COURSES[i];
  const info = COURSE_INFO[n];
  return (
    <><Head t={n} s={`${c} · with ${by}`} img={im} />
      <Sec><div className="two art2"><div className="box pad art"><p className="lead">{info.about}</p>
        <h3>What you will learn</h3><ul className="chk" style={{ margin: '8px 0 16px' }}>{info.out.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>Syllabus</h3><div style={{ margin: '6px 0 16px' }}>{SYLLABUS[n].map((x) => <div className="step" key={x} style={{ margin: '6px 0' }}><span style={{ width: 8, height: 8, marginTop: 6 }} /><div>{x}</div></div>)}</div>
        <h3>Who it is for</h3><ul className="chk" style={{ margin: '8px 0 16px' }}>{info.who.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>What is included</h3><ul className="chk" style={{ margin: '8px 0 16px' }}>{INCLUDES.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="mut">Dates and fees are sample. A certificate is issued after you pass the final assessment with 60% or more.</p><br /><button className="btn l s" onClick={() => go('training')}>← All courses</button></div>
        <div className="stk"><div className="box pad"><h3>Course snapshot</h3><table style={{ margin: '6px 0 10px' }}><tbody>{[['Starts', when], ['Duration', dur], ['Level', lvl], ['Seats left', seats], ['Fee', money(pr)]].map(([a, b]) => <tr key={a}><td>{a}</td><td><b>{b}</b></td></tr>)}</tbody></table><button className="btn" style={{ width: '100%' }} onClick={() => { ui.setPick(n); go('book'); }}>Register now</button></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>Other courses</h3>{COURSES.map((x, k) => k !== i && <p key={x[0]} style={{ margin: '8px 0' }}><a style={{ color: 'var(--o2)' }} onClick={() => go(COURSE_SLUGS[k])}>{x[0]}</a></p>)}</div></div></div></Sec>
      <Sec t="Questions about this course"><Faq items={FAQ.slice(0, 3).concat(FAQ.slice(6, 8))} /></Sec></>
  );
}

function AreaDetail({ go, ui }) {
  const i = AREAS[ui.art] ? ui.art : 0;
  const [n, d, im] = AREAS[i];
  const f = AREA_FULL[n];
  return (
    <><Head t={n} s={d} img={im} />
      <Sec><div className="two art2"><div className="box pad art"><p className="lead">{f.about}</p>
        <h3>Matters we handle</h3><ul className="chk" style={{ margin: '8px 0 16px' }}>{f.matters.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>Documents to keep ready</h3><ul className="chk" style={{ margin: '8px 0 16px' }}>{f.docs.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>How we work</h3>{STEPS.map(([t, s2], k) => <div className="step" key={t}><span>{k + 1}</span><div><b>{t}</b><p className="mut">{s2}</p></div></div>)}
        <h3 style={{ marginTop: 16 }}>Common questions</h3>{f.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <p className="mut" style={{ marginTop: 14 }}>General information, not legal advice. An enquiry does not create an advocate-client relationship, and outcomes are never guaranteed.</p><br /><button className="btn l s" onClick={() => go('consulting')}>← All practice areas</button></div>
        <div className="stk"><div className="box pad"><h3>Talk to an advocate</h3><p className="mut" style={{ margin: '4px 0 8px' }}>{f.adv.length ? f.adv.join(', ') : 'An advocate is assigned after your first call.'}</p><button className="btn" style={{ width: '100%' }} onClick={() => { ui.setPick(n); go('book'); }}>Book a consultation</button></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>Other practice areas</h3>{AREAS.map((x, k) => k !== i && <p key={x[0]} style={{ margin: '8px 0' }}><a style={{ color: 'var(--o2)' }} onClick={() => go(AREA_SLUGS[k])}>{x[0]}</a></p>)}</div></div></div></Sec></>
  );
}

function PaperDetail({ go }) {
  return (
    <><Head t="Sample Practice Paper" s="Legal basics · 10 questions · answers included" img="papers-stack" />
      <Sec><div className="two art2"><div className="box pad art"><p className="lead">Original practice questions for revision. Try each question first, then open the answer. This is not an official exam paper.</p>
        {QS.map(([q, o, a], k) => <div key={q} style={{ marginBottom: 14 }}><h3>Q{k + 1}. {q}</h3><ol type="A" style={{ margin: '6px 0 6px 22px' }}>{o.map((x) => <li key={x}>{x}</li>)}</ol><details><summary>Show answer</summary><p><b>{String.fromCharCode(65 + a)}. {o[a]}</b></p></details></div>)}
        <br /><button className="btn l s" onClick={() => go('papers')}>← All papers</button></div>
        <div className="stk"><div className="box pad"><h3>About this paper</h3><table style={{ margin: '6px 0 10px' }}><tbody>{[['Questions', QS.length], ['Level', 'Basic'], ['Type', 'Practice, not official'], ['Answers', 'Included']].map(([a, b]) => <tr key={a}><td>{a}</td><td><b>{b}</b></td></tr>)}</tbody></table><button className="btn" style={{ width: '100%' }} onClick={() => go('assessment')}>Try it as a timed test</button></div></div></div></Sec></>
  );
}

function DraftDetail({ go, toast }) {
  const copy = () => { try { navigator.clipboard.writeText(DRAFT0.join('\n\n')); toast('Draft copied.'); } catch { toast('Copy not supported here.'); } };
  return (
    <><Head t="Legal notice for cheque bounce" s="Notice · editable format · for guidance only" img="signing-docs" />
      <Sec><div className="two art2"><div className="box pad art"><p className="lead">Replace every [bracket] with your facts and delete anything that does not apply. Have an advocate review it before you send.</p>
        <div style={{ border: '1px solid var(--ln)', borderRadius: 10, padding: 16, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{DRAFT0.map((x, k) => <p key={k} style={{ marginBottom: 12 }}>{x}</p>)}</div>
        <br /><button className="btn" onClick={copy}>Copy text</button> <button className="btn l" onClick={() => go('drafts')}>← All drafts</button></div>
        <div className="stk"><div className="box pad"><h3>Before you send</h3><ul className="chk" style={{ marginTop: 8 }}>{['Send it within 30 days of receiving the bank return memo', 'Use registered or speed post and keep the receipt', 'Attach no originals; keep copies of the cheque and memo', 'Note the 15-day payment period in your calendar', 'Check current rules with an advocate'].map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="box pad" style={{ marginTop: 14 }}><h3>Need it reviewed?</h3><p className="mut" style={{ margin: '4px 0 10px' }}>Book a document review with an advocate.</p><button className="btn" onClick={() => go('book')}>Book a review</button></div></div></div></Sec></>
  );
}

function Soon({ t, s, img, go }) {
  return (
    <><Head t={t} s={s} img={img} />
      <Sec><div className="box pad" style={{ maxWidth: 560, textAlign: 'center', margin: '0 auto' }}><h2 style={{ margin: '0 auto 6px' }}>Coming soon</h2><p className="mut" style={{ marginBottom: 14 }}>We are preparing this section. In the meantime, try a live course, the legal quiz or a consultation.</p><button className="btn" onClick={() => go('training')}>Browse courses</button> <button className="btn l" onClick={() => go('quiz')}>Take the quiz</button></div></Sec></>
  );
}

// true karne par page wapas live ho jayega
const LIVE = { papers: true, drafts: true, resources: true };
const soon = (t, s, img) => function SoonPage(props) { return <Soon t={t} s={s} img={img} go={props.go} />; };
const MAP = { paper: PaperDetail, draft: DraftDetail, article: Article, course: CourseDetail, area: AreaDetail, home: Home, training: Training, consulting: Consulting, recovery: Recovery, book: Book, quiz: QuizPage, assessment: Assessment, about: About, contact: Contact, legal: Legal,
  papers: LIVE.papers ? Papers : soon('Previous Year Papers', 'Practice papers are coming soon.', 'papers-stack'),
  drafts: LIVE.drafts ? Drafts : soon('Legal Drafts', 'Starter formats are coming soon.', 'signing-docs'),
  resources: LIVE.resources ? Resources : soon('Resources', 'Videos, articles and guides are coming soon.', 'library-busts'),
  courts: LIVE.resources ? Resources : soon('Resources', 'Videos, articles and guides are coming soon.', 'library-busts') };

export default function IlmoraLaw({ theme: themeProp, toggleTheme: toggleProp, scrollToSection }) {
  const [localTheme, setLocalTheme] = useState('light');
  useEffect(() => {
    const read = () => {
      try {
        const t = window.localStorage.getItem('theme') || window.localStorage.getItem('ilmora-theme');
        if (t) setLocalTheme(t);
        else if (document.documentElement.classList.contains('dark')) setLocalTheme('dark');
      } catch {}
    };
    read();
    addEventListener('storage', read);
    const iv = setInterval(read, 1000);
    return () => { removeEventListener('storage', read); clearInterval(iv); };
  }, []);
  const theme = themeProp ?? localTheme;
  const toggleTheme = toggleProp ?? (() => {
    const n = localTheme === 'dark' ? 'light' : 'dark';
    setLocalTheme(n);
    try { window.localStorage.setItem('theme', n); } catch {}
  });

  /* Navigation client-side (pushState): server round trip aur page remount nahi hota, isliye tez hai */
  const nextPath = usePathname() || BASE;
  const [path, setPath] = useState(nextPath);
  const { pg, art } = resolve(path);
  useEffect(() => { setPath(window.location.pathname); }, [nextPath]);
  useEffect(() => { const f = () => setPath(window.location.pathname); window.addEventListener('popstate', f); return () => window.removeEventListener('popstate', f); }, []);
  const [msg, setMsg] = useState(''), [pick, setPick] = useState('');
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  const toast = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };
  const go = (p) => { const u = `${BASE}/${p}`; if (window.location.pathname !== u) window.history.pushState(null, '', u); setPath(window.location.pathname); };
  const L = (k) => ({ href: `${BASE}/${k}`, onClick: (e) => { e.preventDefault(); go(k); } });
  const ui = { ...makeUI({ go, toast, setPick }), pick, setPick, art, toast };
  const Page = MAP[pg];

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} scrollToSection={scrollToSection}>
      <div className={'w' + (theme === 'dark' ? ' dark' : '')}>
        <style>{CSS}</style>
        <nav className="snav" aria-label="ILM ORA Law sections">
          <a {...L('home')} className={pg === 'home' ? 'on' : ''}>Home</a>
          {NAV.map(([k, l]) => <a key={k} {...L(k)} className={pg === k ? 'on' : ''}>{l}</a>)}
          <a {...L('book')} className={pg === 'book' ? 'on' : ''}>Book</a>
          <a {...L('contact')} className={pg === 'contact' ? 'on' : ''}>Contact</a>
          <a {...L('legal')} className={pg === 'legal' ? 'on' : ''}>Legal</a>
        </nav>
        <div className="note">Preview mode: sample content, sign-in and payment are simulated.</div>
        <Page go={go} toast={toast} ui={ui} />
        <div className="sticky"><div><b className="pr">{money(199)}</b> <s className="mut">{money(9999)}</s> <span className="mut">· launch price (sample)</span></div><button className="btn p" onClick={() => go('book')}>Register Now</button></div>
        {msg && <div className="toast">{msg}</div>}
      </div>
    </PublicLayout>
  );
}