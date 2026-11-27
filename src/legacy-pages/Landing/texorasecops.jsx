"use client";
// ILM ORA · Observability Management page
// File: src/legacy-pages/Landing/texorasecops.jsx (navbar + footer come from PublicLayout)
// Images (webp): src/assets/observability/
import { useEffect, useRef, useState } from "react";
import PublicLayout from "./components/PublicLayout";
import grafanaLogo from "@/assets/observability/grafana.webp";
import texoraLogo from "@/assets/observability/texora-logo.webp";

import opentelemetryLogo from "@/assets/observability/opentelemetry.webp";
import prometheusLogo from "@/assets/observability/prometheus.webp";
import shot01 from "@/assets/observability/01-domain-controller.webp";
import shot02 from "@/assets/observability/02-ldap-directory.webp";
import shot03 from "@/assets/observability/03-sso.webp";
import shot04 from "@/assets/observability/04-secure-file-transfer.webp";
import shot05 from "@/assets/observability/05-cgi-gateway.webp";
import shot06 from "@/assets/observability/06-siem.webp";
import shot07 from "@/assets/observability/07-vpn.webp";
import shot08 from "@/assets/observability/08-security-server.webp";
import shot09 from "@/assets/observability/09-qap.webp";
import shot10 from "@/assets/observability/10-90-day-plan.webp";
import vid1 from "@/assets/observability/video-1-secure-sign-in.webp";
import vid2 from "@/assets/observability/video-2-file-quarantine.webp";
import vid3 from "@/assets/observability/video-3-failed-test-to-ticket.webp";

// Next.js gives an object ({ src }), Vite gives a string.
const logoSrc = (l) => (typeof l === "string" ? l : l.src);

const PARTNERS = [
  { name: "Texora", logo: texoraLogo, url: "https://texora.ai", wide: true },
  { name: "OpenTelemetry", logo: opentelemetryLogo, url: "https://opentelemetry.io" },
  { name: "Prometheus", logo: prometheusLogo, url: "https://prometheus.io" },
  { name: "Grafana", logo: grafanaLogo, url: "https://grafana.com" },
];

const STACK = [
  ["Lang", "Java 21 · Spring Boot 3"], ["Data", "PostgreSQL"], ["Cache", "Redis"], ["Events", "Kafka"],
  ["Observe", "OpenTelemetry · Prometheus · Grafana"], ["Run", "Docker · Kubernetes"],
  ["Secrets", "External Vault / KMS"], ["Federation", "OIDC · SAML"],
  ["Transport", "TLS 1.3 · mTLS"], ["Tests", "Selenium Grid · API runners"],
];

// Service order: DC, LDAP, SSO, SFT, CGI, Security Server, SIEM, VPN, QAP
const SERVICES = [
  ["DC", "Domain Controller", "Identity", "Critical path for all", "Identity and directory control plane. The source of truth for accounts, groups and organization structure.", "High", ["Account and group lifecycle", "Admin and control REST API", "Depends on LDAP and SEC"], "Spring Boot is the control plane, not the protocol."],
  ["LD", "LDAP Directory", "Identity", "Directory operations", "A standards-based LDAP server for bind, search and ACLs, managed by a Spring Boot control plane.", "High", ["Schema, ACLs and synchronization", "Lifecycle management", "Depends on DC and SEC"], "Uses a vetted LDAP implementation, never a custom one."],
  ["SS", "SSO", "Identity", "Sign-in and sessions", "OIDC and SAML identity provider. Reads identity from LDAP and DC, then issues tokens to downstream apps.", "Critical", ["Federation and session policy", "MFA and role checks via SEC", "Sessions held in Redis"], "Standards-based federation only."],
  ["FT", "Secure File Transfer", "Infrastructure", "Managed transfers", "A control plane over an SFTP or FTPS engine. Records metadata and audit, and quarantines files before release.", "High", ["Quarantine hooks before release", "Files stored encrypted", "Depends on SEC and SIEM"], "Files are isolated and never executed."],
  ["CG", "CGI / Web Gateway", "Infrastructure", "Legacy execution", "Runs legacy gateway logic only inside allowlisted, sandboxed workers.", "Medium", ["Allowlisted routes", "Strict timeouts, minimal privileges", "Payload redaction"], "Treated as high risk: containment is mandatory."],
  ["SC", "Security Server", "Security & SOC", "Policy and secrets", "The policy and audit backbone. Connects to an external KMS or Vault and never stores secrets itself.", "Critical", ["Central policy and MFA decisions", "Audit events to Kafka", "Secrets by reference only"], "No long-lived raw secrets in any database."],
  ["SI", "SIEM Log Server", "Security & SOC", "Watching and alerts", "Ingests, normalizes, stores, correlates and alerts, as separate stages that scale independently.", "Critical", ["Ingestion, storage tiers, correlation", "Receives audit from every service", "Alerts move open, triaged, closed"], "Stages stay separate for clean failure isolation."],
  ["VP", "VPN Access Server", "Security & SOC", "Remote access", "Control plane for VPN policy and sessions, working with an approved VPN data plane for the tunnels.", "Critical", ["Policy and session control", "Depends on SEC and SSO", "Withdrawn on doubt"], "Spring Boot manages, the data plane tunnels."],
  ["QA", "Quality Automation Platform", "Cross-cutting · new", "Verifies, never decides", "Runs UI (Selenium) and API tests across the 8 services and 5 products. On failure it follows the trace ID to the exact backend endpoint, error and stack trace, then files one deduplicated defect.", "Supporting", ["Triggered by CI/CD webhook via the gateway", "Own namespace, scalable test workers", "Own audit trail into SIEM"], "Same security baseline as the core services."],
];

// Same order as SERVICES
const SVC_SHOTS = [shot01, shot02, shot03, shot04, shot05, shot08, shot06, shot07, shot09];

// Product screens (zig-zag). svc = index into SERVICES
const SHOTS = [
  { img: shot01, svc: 0, title: "Domain Controller", text: "The master record of users and groups. Every change syncs to LDAP, and risky config changes need a second admin." },
  { img: shot02, svc: 1, title: "LDAP Directory", text: "Sync state for every entry, schema changes approved by two people, and TLS on every bind." },
  { img: shot03, svc: 2, title: "SSO", text: "One sign-in with MFA. Tokens are issued only after the Security Server says allow." },
  { img: shot04, svc: 3, title: "Secure File Transfer", text: "Allowlisted endpoints, checksums, and quarantine for unclear files. A second person releases them." },
  { img: shot05, svc: 4, title: "CGI Gateway", text: "Only approved routes run, inside sandboxed workers with no root and no network." },
  { img: shot06, svc: 6, title: "SIEM Log Server", text: "Every audit event in one place, with alerts that move from open to closed." },
  { img: shot07, svc: 7, title: "VPN Access Server", text: "Sessions open on a clear yes and are revoked when the policy answer is unsure." },
  { img: shot08, svc: 5, title: "Security Server", text: "Every policy decision with its reason code, backed by a tamper-evident audit chain." },
  { img: shot09, svc: 8, title: "Quality Automation Platform", text: "A failed test is traced to the exact backend error and filed as one ticket." },
];

const FLOW_VIDS = { "Sign in (SSO)": vid1, "Risky file (SFT)": vid2, "Test run (QAP)": vid3 };

// Hero rotating product preview
const HERO_SHOTS = [
  { img: shot03, short: "SSO", cap: "SSO · one sign-in with MFA" },
  { img: shot06, short: "SIEM", cap: "SIEM · every audit event in one place" },
  { img: shot04, short: "File transfer", cap: "Secure File Transfer · quarantine and release" },
  { img: shot09, short: "QAP", cap: "QAP · failed test traced to one ticket" },
  { img: shot07, short: "VPN", cap: "VPN · sessions revoked on doubt" },
];

const CSS = `
.ilmora-obs{--bg:#f9fafc;--card:#fff;--ink:#1e293b;--mute:#64748b;--line:#eaebef;--or:#f97316;--vi:#7c4dff;--gr:#16a34a;--rd:#e5484d;--navy:#0b1020}
.ilmora-obs[data-theme=dark]{--bg:#12141c;--card:#1b1e29;--ink:#eaf0fb;--mute:#9aa8c2;--line:#262b3a}
.ilmora-obs{font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-family:inherit;color:var(--ink);background-color:var(--bg);background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:30px 30px;overflow-x:clip;scroll-behavior:smooth}
.ilmora-obs *{box-sizing:border-box;margin:0}
.ilmora-obs a{color:inherit;text-decoration:none}.ilmora-obs button{font:inherit;color:inherit;cursor:pointer}
.ilmora-obs a:focus-visible,.ilmora-obs button:focus-visible{outline:2px solid var(--or);outline-offset:3px}
.ilmora-obs img,.ilmora-obs svg,.ilmora-obs canvas{max-width:100%}
.ilmora-obs .w{max-width:1360px;margin:0 auto;padding:0 clamp(16px,3vw,32px)}
.ilmora-obs section{padding:16px 0 12px;scroll-margin-top:100px}
.ilmora-obs .or{color:var(--or)}

/* headings */
.ilmora-obs h1,.ilmora-obs h2{font-size:26px;font-weight:400;line-height:1.3;letter-spacing:0;margin:0 0 6px}
.ilmora-obs h2{text-align:center}
.ilmora-obs .lead{font-size:14px;line-height:1.55;color:var(--mute);text-align:center;margin:6px auto 0;max-width:760px}
.ilmora-obs .kick{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--or);margin-bottom:10px}
.ilmora-obs .hband{width:100vw;margin:0 0 14px calc(50% - 50vw);background:var(--card);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px 16px 12px;text-align:center}
.ilmora-obs .hband h2{font-size:26px;font-weight:400;line-height:1.3;letter-spacing:0;margin:0}
.ilmora-obs .hband .lead{font-size:14px;line-height:1.55;max-width:none;white-space:nowrap;margin:6px auto 0}
@media(max-width:900px){.ilmora-obs .hband .lead{white-space:normal;max-width:680px}}
.ilmora-obs .panel h3{font-size:16px;font-weight:600}
.ilmora-obs .btn{display:inline-block;background:var(--or);color:#fff;font-size:14px;font-weight:700;padding:9px 18px;border-radius:10px;border:0;white-space:nowrap;box-shadow:0 6px 16px rgba(249,115,22,.3);transition:transform .2s,box-shadow .2s}
.ilmora-obs .btn:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(249,115,22,.5)}
.ilmora-obs .btn.g{background:var(--card);color:var(--ink);border:1px solid var(--line);box-shadow:none}

/* hero */
.ilmora-obs .hero{position:relative;overflow:hidden;padding:56px 0 0}
.ilmora-obs .ptt img.wide{width:auto;max-width:none;height:40px}
@media(max-width:600px){.ilmora-obs .ptt img.wide{height:32px}}
.ilmora-obs #net{position:absolute;inset:0;width:100%;height:100%}
.ilmora-obs .hero>.w{position:relative;z-index:2;display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;align-items:center}
.ilmora-obs .hero .w>*{min-width:0}
.ilmora-obs .crumb{display:inline-block;font-size:13px;font-weight:600;padding:7px 14px;border-radius:99px;border:1px solid var(--line);background:var(--card);color:var(--mute)}
.ilmora-obs .hero h1{font-size:clamp(30px,3.8vw,48px);font-weight:600;line-height:1.08;letter-spacing:-.025em;margin:0 0 16px}
.ilmora-obs #rw{display:inline-block;color:var(--or);font-style:normal}.ilmora-obs #rw.wi{animation:obs-wi .6s cubic-bezier(.2,.8,.2,1)}
@keyframes obs-wi{from{opacity:0;transform:translateY(.45em) rotateX(70deg);filter:blur(6px)}}
.ilmora-obs .hero p.l{font-size:15px;line-height:1.6;color:#475569;max-width:520px}
.ilmora-obs[data-theme=dark] .hero p.l{color:var(--mute)}
.ilmora-obs .row{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.ilmora-obs .mini{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:30px;max-width:540px}
.ilmora-obs .t2{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px;box-shadow:0 8px 20px rgba(20,30,60,.06)}
.ilmora-obs .t2 b{font-size:22px;display:block;line-height:1.2}.ilmora-obs .t2 span{font-size:11.5px;color:var(--mute)}.ilmora-obs .t2.wn b{color:var(--or)}
.ilmora-obs .stage{position:relative;padding:0 0 34px 28px}
.ilmora-obs .stage:before{content:"";position:absolute;left:10%;right:-2%;top:6%;bottom:12%;background:rgba(249,115,22,.2);filter:blur(70px);border-radius:50%;z-index:0}
.ilmora-obs .stage:after{content:"";position:absolute;left:-4%;width:46%;top:30%;bottom:0;background:rgba(124,77,255,.16);filter:blur(70px);border-radius:50%;z-index:0}
.ilmora-obs .frame{position:relative;z-index:1;border-radius:18px;overflow:hidden;background:var(--card);box-shadow:0 40px 80px rgba(20,30,60,.22),0 0 0 1px var(--line);transform:perspective(1600px) rotateY(-6deg) rotateX(2deg);transition:transform .5s}
.ilmora-obs .stage:hover .frame{transform:none}
.ilmora-obs .fbar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--line);font-size:12.5px;color:var(--mute);background:var(--card)}
.ilmora-obs .fbar i{width:10px;height:10px;border-radius:50%;display:block}
.ilmora-obs .fbar i:nth-child(1){background:#ff5f57}.ilmora-obs .fbar i:nth-child(2){background:#febc2e}.ilmora-obs .fbar i:nth-child(3){background:#28c840}
.ilmora-obs .fbar span{margin-left:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ilmora-obs .fimgs{position:relative;aspect-ratio:1680/880;background:#fff}
.ilmora-obs .fimgs img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;z-index:1;transition:opacity .6s .6s}
.ilmora-obs .fimgs img.on{opacity:1;z-index:2;transition:opacity .6s 0s}
.ilmora-obs .fdots{position:relative;z-index:1;display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
.ilmora-obs .fdots button{border:1px solid var(--line);background:var(--card);border-radius:99px;padding:6px 14px;font-size:13px;font-weight:600;color:var(--mute);transition:.2s}
.ilmora-obs .fdots button:hover{border-color:var(--or);color:var(--ink)}
.ilmora-obs .fdots button.on{background:var(--or);border-color:var(--or);color:#fff;box-shadow:0 6px 18px rgba(249,115,22,.35)}
.ilmora-obs .fc{position:absolute;z-index:3;background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:0 20px 50px rgba(20,30,60,.22)}
.ilmora-obs .fc1{left:0;bottom:62px;width:300px;padding:12px 14px;animation:obs-bob 6s ease-in-out infinite}
.ilmora-obs .fc2{right:-10px;top:-16px;padding:10px 14px;font-size:13px;font-weight:600;display:flex;gap:8px;align-items:center;animation:obs-bob 5s ease-in-out -2s infinite}
.ilmora-obs .fc2:before{content:"✓";width:20px;height:20px;border-radius:50%;background:rgba(22,163,74,.18);color:var(--gr);display:grid;place-items:center;font-size:12px;font-weight:800}
@keyframes obs-bob{50%{transform:translateY(-8px)}}
.ilmora-obs .ph{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;margin-bottom:8px}
.ilmora-obs .live{color:var(--gr);font-weight:600;animation:obs-pls 1.6s ease-in-out infinite}@keyframes obs-pls{50%{opacity:.4}}
.ilmora-obs .feed{list-style:none;padding:0;display:grid;gap:6px}
.ilmora-obs .feed li{display:flex;gap:10px;align-items:center;font-size:12.5px;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:6px 10px;animation:obs-in .5s}
.ilmora-obs .feed li:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--gr);flex:none}
.ilmora-obs .feed .wn:before{background:var(--or)}.ilmora-obs .feed .d:before{background:var(--rd)}
@keyframes obs-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ilmora-obs .mq{position:relative;margin-top:44px;overflow:hidden;z-index:2;border-block:1px solid var(--line);background:var(--card)}
.ilmora-obs #mq{display:flex;width:max-content;animation:obs-mqs 38s linear infinite;padding:10px 0}
.ilmora-obs #mq span{font-size:14px;font-weight:600;color:var(--mute);white-space:nowrap}
.ilmora-obs #mq span:before{content:"◆";color:var(--or);margin:0 34px}
@keyframes obs-mqs{to{transform:translateX(-50%)}}
@keyframes obs-ptm{to{transform:translateX(-50%)}}

/* stats */
.ilmora-obs .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:20px}
.ilmora-obs .stats div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;box-shadow:0 8px 20px rgba(20,30,60,.06)}
.ilmora-obs .stats b{font-size:28px;display:block;color:var(--or)}.ilmora-obs .stats span{color:var(--mute);font-size:13px}

/* architecture */
.ilmora-obs .arch{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:stretch}
.ilmora-obs .arch>*{min-width:0}
.ilmora-obs .arch>div:first-child{display:flex;flex-direction:column}
.ilmora-obs .dom{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.ilmora-obs .col{display:flex;flex-direction:column;border:1px solid var(--line);background:var(--card);border-radius:16px;padding:12px;box-shadow:0 6px 18px rgba(20,30,60,.05)}
.ilmora-obs .col>div{display:flex;flex-direction:column;flex:1}
.ilmora-obs .col h4{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin-bottom:10px}
.ilmora-obs .sv{display:flex;gap:10px;align-items:center;width:100%;text-align:left;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:10px;padding:8px 10px;margin-bottom:8px;transition:.2s}
.ilmora-obs .col .sv{flex:1}.ilmora-obs .col .sv:last-child{margin-bottom:0}
.ilmora-obs .sv b{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:12px;background:#1f2a44;color:#ffb27a;flex:none}
.ilmora-obs .sv span{font-size:14px;font-weight:600;line-height:1.2}.ilmora-obs .sv small{display:block;color:var(--mute);font-weight:400;font-size:12px}
.ilmora-obs .sv:hover,.ilmora-obs .sv.on{border-color:var(--or);background:rgba(249,115,22,.08);box-shadow:0 0 22px rgba(249,115,22,.18)}
.ilmora-obs .qap{margin-top:14px;border:1px dashed rgba(124,77,255,.8);background:rgba(124,77,255,.06);border-radius:16px;padding:12px}
.ilmora-obs .qap .sv{margin:8px 0 0;padding:10px 12px}
.ilmora-obs .qh{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--vi)}
.ilmora-obs .det{position:relative;overflow:hidden;border:1px solid var(--line);background:var(--card);border-radius:18px;padding:14px 16px 18px;box-shadow:0 10px 28px rgba(20,30,60,.08)}
.ilmora-obs .topo{margin-top:14px;flex:1;display:flex;align-items:center;border:1px solid var(--line);background:var(--card);border-radius:18px;padding:14px;box-shadow:0 8px 24px rgba(20,30,60,.06)}
.ilmora-obs #topo{width:100%;height:auto;display:block}
.ilmora-obs .fl{stroke:rgba(100,116,139,.45);stroke-width:1.4;stroke-dasharray:4 6;animation:obs-dash 1s linear infinite}.ilmora-obs .fl.q{stroke:rgba(124,77,255,.6)}
@keyframes obs-dash{to{stroke-dashoffset:-20}}
.ilmora-obs .nd{cursor:pointer}.ilmora-obs .nd text{fill:#ffb27a;font:700 11px system-ui;pointer-events:none}.ilmora-obs .nd:hover circle{stroke-opacity:1;filter:drop-shadow(0 0 8px #f97316)}
.ilmora-obs .dimg{display:block;width:100%;height:auto;aspect-ratio:1680/880;object-fit:cover;border-radius:12px;border:1px solid var(--line);margin:8px 0 14px;box-shadow:0 10px 26px rgba(20,30,60,.12)}
.ilmora-obs .det h3{font-size:20px;font-weight:600}
.ilmora-obs .pri{display:inline-block;font-size:12px;font-weight:700;padding:4px 10px;border-radius:99px;background:rgba(124,77,255,.1);color:var(--vi);margin:8px 0 12px}
.ilmora-obs .det p,.ilmora-obs .det ul{color:var(--mute)}.ilmora-obs .det ul{margin:12px 0 0 18px;font-size:15px}.ilmora-obs .det li{margin:6px 0}
.ilmora-obs .det h5{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;margin-top:16px}

/* flows */
.ilmora-obs .tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.ilmora-obs .tab{border:1px solid var(--line);background:var(--card);border-radius:99px;padding:7px 16px;font-size:14px;font-weight:600}
.ilmora-obs .tab.on{background:var(--or);color:#fff;border-color:transparent;box-shadow:0 8px 24px rgba(249,115,22,.35)}
.ilmora-obs .flow{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:start}
.ilmora-obs .flow>*{min-width:0}
.ilmora-obs .panel{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px}
.ilmora-obs .fmedia{display:grid;gap:16px}
.ilmora-obs .fv{display:block;width:100%;height:auto;aspect-ratio:1260/660;object-fit:cover;border-radius:16px;border:1px solid var(--line);background:#fff;box-shadow:0 14px 40px rgba(20,30,60,.12)}
.ilmora-obs ol.st{list-style:none;padding:0;display:grid;gap:4px}
.ilmora-obs ol.st li{display:flex;gap:14px;padding:12px 8px;border-radius:12px;opacity:.38;transition:.4s}
.ilmora-obs ol.st li.on{opacity:1}.ilmora-obs ol.st li.cur{background:rgba(249,115,22,.1);box-shadow:inset 3px 0 0 var(--or)}
.ilmora-obs ol.st em{width:32px;height:32px;border-radius:50%;border:2px solid var(--or);display:grid;place-items:center;font-style:normal;font-weight:700;color:var(--or);flex:none}
.ilmora-obs ol.st b{display:block}.ilmora-obs ol.st span{font-size:14px;color:var(--mute)}
.ilmora-obs .log{background:var(--navy);color:#9fe8c8;border-radius:16px;padding:16px;font:13px ui-monospace,Consolas,monospace;display:grid;gap:6px;align-content:start;min-height:150px;overflow-x:auto}
.ilmora-obs .log b{color:#aab6cd;font-family:system-ui;font-size:14px;margin-bottom:6px}.ilmora-obs .log div{animation:obs-in .4s}.ilmora-obs .log em{color:#ffb27a;font-style:normal}

/* zig-zag: image one side, text the other, alternating */
.ilmora-obs .zz{display:grid;gap:20px}
.ilmora-obs .zr{display:grid;grid-template-columns:1.3fr .7fr;gap:28px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;box-shadow:0 6px 20px rgba(20,30,60,.05)}
.ilmora-obs .zr:nth-child(even){grid-template-columns:.7fr 1.3fr}
.ilmora-obs .zr:nth-child(even) .zm{order:2}
.ilmora-obs .zr>*{min-width:0}
.ilmora-obs .zm{position:relative}
.ilmora-obs .zm img{display:block;width:100%;height:auto;border-radius:14px;border:1px solid var(--line);background:#fff;box-shadow:0 18px 44px rgba(20,30,60,.14);transition:transform .25s}
.ilmora-obs .zr:hover .zm img{transform:translateY(-4px)}
.ilmora-obs .zm .lv{position:absolute;top:12px;left:12px;font-size:12px;font-weight:700;color:#fff;background:rgba(11,16,32,.8);padding:4px 10px;border-radius:99px}
.ilmora-obs .zm .lv:before{content:"● ";color:#28c840}
.ilmora-obs .zt .kk{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--or)}
.ilmora-obs .zt h3{font-size:19px;font-weight:600;margin:4px 0 8px;line-height:1.25}
.ilmora-obs .zt p{color:var(--mute);font-size:14px}
.ilmora-obs .zt ul{list-style:none;padding:0;display:grid;gap:6px;margin-top:10px}
.ilmora-obs .zt li{display:flex;gap:10px;align-items:flex-start;font-size:13.5px}
.ilmora-obs .zt li:before{content:"✓";width:20px;height:20px;border-radius:50%;background:rgba(22,163,74,.16);color:var(--gr);display:grid;place-items:center;font-size:12px;font-weight:800;flex:none}

/* cards */
.ilmora-obs .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.ilmora-obs .card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px;position:relative;overflow:hidden;transition:.25s}
.ilmora-obs .card:before{content:"";position:absolute;inset:0 0 auto;height:3px;background:var(--or);z-index:1}
.ilmora-obs .card:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,30,60,.14)}
.ilmora-obs .card i{font-style:normal;font-size:12px;font-weight:800;color:var(--or)}
.ilmora-obs .card h3{margin:6px 0 8px;font-size:18px;font-weight:600}.ilmora-obs .card p{color:var(--mute);font-size:14.5px}
.ilmora-obs .card.nw{border-color:var(--vi)}.ilmora-obs .card.nw i{color:var(--vi)}
.ilmora-obs .cimg{display:block;width:100%;aspect-ratio:1680/880;object-fit:cover;object-position:top left;border-radius:12px;border:1px solid var(--line);margin:4px 0 14px;background:#fff}
.ilmora-obs .gm{width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;padding:6px 0 10px}
.ilmora-obs .gt{display:flex;width:max-content;animation:obs-ptm 70s linear infinite}
.ilmora-obs .gm:hover .gt{animation-play-state:paused}
.ilmora-obs .gt .card{width:250px;flex:none;margin-right:12px;padding:12px 14px;border-radius:14px}
.ilmora-obs .gt .card h3{font-size:15px;margin:4px 0 4px}.ilmora-obs .gt .card p{font-size:13px}

/* before / after */
.ilmora-obs .ba{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ilmora-obs .ba div{padding:10px 14px;border-radius:10px;font-weight:600;font-size:14px;background:var(--card);border:1px solid var(--line)}
.ilmora-obs .ba .h{font-weight:700;font-size:15px}.ilmora-obs .ba .x,.ilmora-obs .ba .x2{color:var(--mute)}.ilmora-obs .ba .y{border-color:var(--or)}
.ilmora-obs .ba .x2:before{content:"✕";margin-right:10px;color:var(--mute);font-weight:800}
.ilmora-obs .ba .y2:before{content:"✓";margin-right:10px;color:var(--or);font-weight:800}

/* stack marquee */
.ilmora-obs .stm{width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;padding:4px 0}
.ilmora-obs .stt{display:flex;width:max-content;animation:obs-ptm 40s linear infinite}.ilmora-obs .stm:hover .stt{animation-play-state:paused}
.ilmora-obs .stt span{flex:none;white-space:nowrap;margin-right:10px;border:1px solid var(--line);background:var(--card);border-radius:99px;padding:9px 16px;font-size:14px;font-weight:600}
.ilmora-obs .stt span b{color:var(--or);margin-right:6px}

/* status */
.ilmora-obs .status{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:20px}
.ilmora-obs .status>*{min-width:0}
.ilmora-obs .ck{list-style:none;padding:0;display:grid;gap:10px}
.ilmora-obs .ck li{display:flex;gap:12px;align-items:flex-start;font-size:15px}
.ilmora-obs .ck li:before{content:"✓";width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,.18);color:var(--gr);display:grid;place-items:center;font-size:13px;font-weight:800;flex:none}
.ilmora-obs .ck.o li:before{content:"•";background:rgba(249,115,22,.18);color:var(--or)}

/* faq + cta */
.ilmora-obs .faq{display:grid;gap:10px;margin-top:16px}
.ilmora-obs details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:0 16px}
.ilmora-obs summary{cursor:pointer;font-size:15px;font-weight:600;padding:14px 0;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px}
.ilmora-obs summary::-webkit-details-marker{display:none}
.ilmora-obs summary:after{content:"+";font-size:22px;color:var(--or);transition:.25s}
.ilmora-obs details[open] summary:after{transform:rotate(45deg)}
.ilmora-obs details p{color:var(--mute);font-size:14px;padding:0 0 14px}
.ilmora-obs .cta{margin-top:24px;background:var(--navy);color:#fff;border-radius:18px;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.ilmora-obs .cta h2{text-align:left;font-size:24px;font-weight:500;letter-spacing:0}.ilmora-obs .cta p{color:#c4cde0;margin-top:8px;font-size:14px}
.ilmora-obs .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.ilmora-obs .chips span{font-size:12px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.07);padding:5px 11px;border-radius:99px}

/* partners */
.ilmora-obs .pts{text-align:center;padding:0}
.ilmora-obs .ptk{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.ilmora-obs .ptm{width:100vw;margin-left:calc(50% - 50vw);background:#fff;border-block:1px solid var(--line);padding:16px 0;overflow:hidden}
.ilmora-obs .ptt{display:flex;width:max-content;animation:obs-ptm 34s linear infinite}.ilmora-obs .ptm:hover .ptt{animation-play-state:paused}
.ilmora-obs .ptt a{display:flex;align-items:center;gap:12px;margin-right:72px;flex:none;color:#1e293b}
.ilmora-obs .ptt img{height:40px;width:40px;object-fit:contain;display:block;transition:transform .2s}
.ilmora-obs .ptt span{font-size:22px;font-weight:600;letter-spacing:-.01em;white-space:nowrap}
.ilmora-obs .ptt a:hover img{transform:scale(1.08)}

/* reveal (small blocks only) */
.ilmora-obs .rv{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.ilmora-obs .rv.in{opacity:1;transform:none}

/* responsive */
@media(min-width:1600px){.ilmora-obs .hband h2{font-size:30px}.ilmora-obs .hband .lead{font-size:15px}.ilmora-obs .w{max-width:1500px}.ilmora-obs h1,.ilmora-obs h2{font-size:30px}.ilmora-obs .lead,.ilmora-obs .cta p{font-size:15px}}
@media(min-width:2200px){.ilmora-obs .hband h2{font-size:34px}.ilmora-obs .w{max-width:1800px}.ilmora-obs h1,.ilmora-obs h2{font-size:34px}}
@media(max-width:1200px){.ilmora-obs .arch{grid-template-columns:1fr}}
@media(max-width:1000px){
.ilmora-obs .hero>.w,.ilmora-obs .flow,.ilmora-obs .status{grid-template-columns:1fr}
.ilmora-obs .hero>.w{gap:36px}.ilmora-obs .stage{padding-left:0}.ilmora-obs .fc1{left:12px}.ilmora-obs .fc2{right:8px}.ilmora-obs .frame{transform:none}
.ilmora-obs .grid,.ilmora-obs #gr{grid-template-columns:1fr 1fr}
.ilmora-obs .stats{grid-template-columns:1fr 1fr}
.ilmora-obs .dom{grid-template-columns:1fr 1fr}
.ilmora-obs .col .sv{flex:none}
.ilmora-obs .zr,.ilmora-obs .zr:nth-child(even){grid-template-columns:1fr;gap:18px}
.ilmora-obs .zr:nth-child(even) .zm{order:0}
}
@media(max-width:600px){
.ilmora-obs .hband{padding:12px 12px 10px}.ilmora-obs .hband .lead{font-size:13.5px}
.ilmora-obs .grid,.ilmora-obs #gr,.ilmora-obs .dom,.ilmora-obs .ba{grid-template-columns:1fr}
.ilmora-obs .hero{padding:28px 0 0}.ilmora-obs #mq span:before{margin:0 20px}
.ilmora-obs .stage{padding:0}.ilmora-obs .frame{transform:none}.ilmora-obs .fc{position:static;width:auto;margin-top:12px;animation:none}.ilmora-obs .fc2{display:none}.ilmora-obs .mini{grid-template-columns:repeat(2,1fr)}
.ilmora-obs .row{flex-direction:column}.ilmora-obs .row .btn,.ilmora-obs .cta>.btn{width:100%;text-align:center}
.ilmora-obs .tiles{grid-template-columns:repeat(2,1fr)}
.ilmora-obs .stats{gap:10px}.ilmora-obs .stats div{padding:14px}.ilmora-obs .stats b{font-size:26px}.ilmora-obs .stats span{font-size:12.5px}
.ilmora-obs .panel,.ilmora-obs .zr{padding:12px}
.ilmora-obs .zt h3{font-size:17px}.ilmora-obs .zt p{font-size:13.5px}
.ilmora-obs .tab{padding:8px 14px;font-size:14px}
.ilmora-obs .log{padding:16px;font-size:12px}
.ilmora-obs .cta{padding:18px 16px;border-radius:16px;flex-direction:column;align-items:stretch;gap:14px}.ilmora-obs .cta h2{font-size:19px!important}.ilmora-obs .cta p{font-size:13px}.ilmora-obs .chips{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ilmora-obs .chips span{text-align:center;font-size:11.5px;padding:6px 6px}.ilmora-obs .cta>.btn{padding:10px 16px}
.ilmora-obs details{padding:0 14px}.ilmora-obs summary{padding:14px 0;font-size:15px}
.ilmora-obs .ptt a{margin-right:44px}.ilmora-obs .ptt span{font-size:18px}.ilmora-obs .ptt img{height:32px;width:32px}
.ilmora-obs .det h3{font-size:22px}
}
@media(max-width:380px){.ilmora-obs .hband h2{font-size:22px}.ilmora-obs .stats{grid-template-columns:1fr}.ilmora-obs .hero h1{font-size:30px}.ilmora-obs h1,.ilmora-obs h2{font-size:22px}.ilmora-obs .ph{flex-direction:column}}
@media(hover:none){.ilmora-obs .card:hover,.ilmora-obs .btn:hover,.ilmora-obs .zr:hover .zm img{transform:none;box-shadow:none}}
@media(prefers-reduced-motion:reduce){.ilmora-obs *{animation:none!important;transition:none!important}.ilmora-obs .stm,.ilmora-obs .ptm,.ilmora-obs .gm{overflow-x:auto}}
`;

// URL mein # lagaye bina smooth scroll
const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function TexoraSecOps() {
  const rootRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try { const t = localStorage.getItem("theme"); if (t === "dark" || t === "light") setTheme(t); } catch (e) {}
  }, []);
  const toggleTheme = () =>
    setTheme((t) => {
      const n = t === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", n); } catch (e) {}
      return n;
    });

  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    let alive = true, raf = 0; const ivs = [], offs = [];
    const si = (f, t) => { const id = setInterval(f, t); ivs.push(id); return id; };
    const ael = (t, e, f, o) => { t.addEventListener(e, f, o); offs.push(() => t.removeEventListener(e, f, o)); };
    const $ = (s) => root.querySelector(s);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = SERVICES;
    const img = (i) => logoSrc(SVC_SHOTS[i]);

    /* architecture */
    const mk = (i) => `<button class="sv" data-i="${i}"><b>${S[i][0]}</b><span>${S[i][1]}<small>${S[i][3]}</small></span></button>`;
    $("#d1").innerHTML = [0, 1, 2].map(mk).join(""); $("#d2").innerHTML = [3, 4].map(mk).join("");
    $("#d3").innerHTML = [5, 6, 7].map(mk).join(""); $("#d4").innerHTML = mk(8);
    let show = (i) => {
      const s = S[i];
      root.querySelectorAll(".sv").forEach((b) => b.classList.toggle("on", +b.dataset.i == i));
      $("#dt").innerHTML = `<img class="dimg" src="${img(i)}" alt="${s[1]} screen" width="1680" height="880" decoding="async"/><h3>${s[1]}</h3><span class="pri">${s[2]} · ${s[5] === "Supporting" ? "Supporting role" : s[5] + " priority"}</span><p>${s[4]}</p><h5>What it covers</h5><ul>${s[6].map((x) => `<li>${x}</li>`).join("")}</ul><h5>Guardrail</h5><p>${s[7]}</p>`;
    };
    /* topology */
    const P2 = [[120, 205], [120, 130], [120, 55], [345, 205], [235, 40], [235, 130], [345, 55], [345, 130], [235, 225]], pt = (i) => i == 9 ? [36, 130] : P2[i];
    const E = [[9, 2], [2, 1], [1, 0], [2, 5], [1, 5], [0, 5], [5, 6], [5, 7], [5, 3], [5, 4], [3, 6], [9, 4], [8, 5, 1], [8, 6, 1], [8, 3, 1]];
    let sv = "";
    E.forEach(([a, b, q]) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); sv += `<line class="fl${q ? " q" : ""}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; });
    E.forEach(([a, b, q], k) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); sv += `<circle r="3.2" fill="${q ? "#c9b8ff" : "#ffb27a"}"><animateMotion dur="${2 + k % 3 * .8}s" begin="${(k * .35).toFixed(2)}s" repeatCount="indefinite" path="M${x1} ${y1}L${x2} ${y2}"/></circle>`; });
    sv += '<g><circle cx="36" cy="130" r="17" fill="#0b1020" stroke="#9aa8c2" stroke-opacity=".6"/><text x="36" y="134" text-anchor="middle" style="fill:#9aa8c2;font:700 10px system-ui">GW</text></g><circle id="ring" r="18" fill="none" stroke="#f97316" stroke-width="2"><animate attributeName="r" values="20;38" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="1.5s" repeatCount="indefinite"/></circle>';
    P2.forEach((p, i) => { sv += `<g class="nd" data-i="${i}"><circle cx="${p[0]}" cy="${p[1]}" r="${i == 5 ? 23 : 18}" fill="#1f2a44" stroke="${i == 8 ? "#a98bff" : "#f97316"}" stroke-opacity=".75"/><text x="${p[0]}" y="${p[1] + 4}" text-anchor="middle">${S[i][0]}</text></g>`; });
    $("#topo").innerHTML = sv;
    const sh0 = show;
    show = (i) => { sh0(i); const p = P2[i]; $("#ring").setAttribute("cx", p[0]); $("#ring").setAttribute("cy", p[1]); $("#ring").setAttribute("stroke", i == 8 ? "#a98bff" : "#f97316"); };
    let auto = 0;
    root.querySelectorAll(".sv,.nd").forEach((b) => b.onclick = () => { clearInterval(auto); show(+b.dataset.i); });
    show(2);
    let k = 2; auto = reduce ? 0 : si(() => { k = (k + 1) % 9; show(k); }, 4500);

    /* guardrails (each rule shows the screen it protects) */
    const G = [
      ["Treat as one platform", "Identity, audit and secrets stay consistent across all services.", shot01],
      ["No custom crypto", "Only vetted, standards-based libraries for crypto and auth.", shot08],
      ["Control plane, not protocol", "DC, LDAP and VPN integrate with proven implementations.", shot02],
      ["Standards-based SSO", "OIDC and SAML for interoperability.", shot03],
      ["Files never execute", "Uploads are isolated and quarantined.", shot04],
      ["CGI is high risk", "Allowlist, isolate, time-limit, least privilege.", shot05],
      ["Separate SIEM stages", "Ingest, normalize, store, correlate, alert.", shot06],
      ["Secrets stay in the vault", "No raw long-lived secrets in app databases.", shot07],
      ["QAP verifies only", "Signs in via SSO, secret references only, never production data.", shot09],
    ];
    $("#gr").innerHTML = G.map((g, i) => `<div class="card${i == 8 ? " nw" : ""}"><i>RULE ${i + 1}${i == 8 ? " · NEW" : ""}</i><h3>${g[0]}</h3><p>${g[1]}</p></div>`).join("");
    $("#gr").innerHTML += $("#gr").innerHTML;

    /* flows (each tab has its own video) */
    const F = {
      "Sign in (SSO)": [["Request reaches the gateway", "User authenticates at the API Gateway, which redirects to SSO."], ["Credentials checked", "SSO validates against LDAP and fetches user and group claims."], ["Policy decision", "SSO asks the Security Server about MFA and role entitlement."], ["Tokens issued", "On approval, ID and access tokens go back through the gateway."], ["Audit recorded", "SEC writes an audit event, consumed by SIEM."]],
      "Risky file (SFT)": [["Upload to allowlisted endpoint", "The sender pushes the file over SFTP or FTPS to an approved endpoint."], ["Checksum and scan", "The file is checksummed and scanned before anything else touches it."], ["Unclear result, quarantine", "An unclear scan holds the file in isolation. It is never executed."], ["Second person releases", "The sender cannot release it. A different approver decides."], ["Audit recorded", "SFT writes an audit event, consumed by SIEM."]],
      "Test run (QAP)": [["CI/CD webhook", "A deployment triggers QAP through the same gateway edge."], ["Tests execute", "API and Selenium UI tests run against the target."], ["Failure traced", "QAP takes the failing request's trace ID and queries SIEM for the endpoint, error and stack trace."], ["Defect filed once", "A failure signature creates or updates one issue with the backend error attached."], ["Audit recorded", "QAP writes its own audit event, consumed by SIEM."]],
    };
    let cur = "Sign in (SSO)", timers = [];
    $("#tabs").innerHTML = Object.keys(F).map((t) => `<button class="tab" data-t="${t}">${t}</button>`).join("");
    const play = () => {
      timers.forEach(clearTimeout); timers = [];
      const L = F[cur];
      const fv = $("#fv"); fv.src = logoSrc(FLOW_VIDS[cur]); fv.alt = cur + " recording";
      $("#st").innerHTML = L.map((s, i) => `<li><em>${i + 1}</em><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join("");
      $("#log").innerHTML = "<b>Recorded live in the SIEM</b>";
      root.querySelectorAll(".tab[data-t]").forEach((b) => b.classList.toggle("on", b.dataset.t === cur));
      L.forEach((s, i) => timers.push(setTimeout(() => {
        const li = $("#st").children; [...li].forEach((x) => x.classList.remove("cur")); li[i].classList.add("on", "cur");
        const d = document.createElement("div"); d.innerHTML = `10:42:0${i} <em>${s[0].toLowerCase()}</em> recorded`; $("#log").appendChild(d);
      }, reduce ? 0 : i * 1100)));
    };
    root.querySelectorAll(".tab[data-t]").forEach((b) => b.onclick = () => { cur = b.dataset.t; play(); });
    $("#rp").onclick = play; play();

    /* hero: rotating product preview (dots are clickable) */
    const hi = [...root.querySelectorAll(".fimgs img")], hd = [...root.querySelectorAll(".fdots button")], hc = $("#hcap"); let hk = 0, ht = 0;
    const hs = () => { hi.forEach((im, j) => im.classList.toggle("on", j === hk)); hd.forEach((d, j) => d.classList.toggle("on", j === hk)); hc.textContent = hi[hk].dataset.cap; };
    hs();
    const hrun = () => { clearInterval(ht); if (!reduce) ht = si(() => { hk = (hk + 1) % hi.length; hs(); }, 3600); };
    hrun();
    hd.forEach((d, j) => d.onclick = () => { hk = j; hs(); hrun(); });

    /* hero: live audit feed */
    const ev = [["User signed in with a second-step check", ""], ["File held in quarantine after unclear scan", "wn"], ["Policy denied: no access rule found", "d"], ["VPN session opened for a trusted device", ""], ["QAP test run passed, 0 defects", ""], ["CGI request rejected: route not allowlisted", "wn"], ["Defect filed with correlated backend trace", ""], ["VPN session closed after device check failed", "d"]];
    const feed = $("#feed"); let n = 0;
    const add = () => { const e = ev[n++ % ev.length], li = document.createElement("li"); li.className = e[1]; li.textContent = e[0]; feed.prepend(li); while (feed.children.length > 2) feed.lastChild.remove(); };
    for (let i = 0; i < 2; i++) add();
    if (!reduce) si(add, 2600);

    /* counters + reveal (reveal skips large image blocks so they are never hidden) */
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; const el = e.target; io.unobserve(el);
      if (el.dataset.n) {
        const t = +el.dataset.n; let st = null;
        const f = (ts) => { st = st || ts; const p = Math.min((ts - st) / 1400, 1); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(f); };
        requestAnimationFrame(f);
      } else { el.classList.add("in"); setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 1200); }
    }), { threshold: .01 });
    root.querySelectorAll("[data-n]").forEach((e) => io.observe(e));
    if (!reduce) {
      root.querySelectorAll(".card,.stats>div,.ba>div,.ck li,.faq details,.zr,.panel,.cta,.col,.qap").forEach((e, i) => {
        if (e.closest(".hero") || e.closest(".gm")) return;
        e.classList.add("rv"); e.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(e);
      });
    }

    /* hero headline word */
    const W2 = ["click.", "sign-in.", "file.", "session.", "alert.", "release."]; let wi = 0;
    si(() => { const r = $("#rw"); r.classList.remove("wi"); void r.offsetWidth; r.textContent = W2[++wi % W2.length]; r.classList.add("wi"); }, 2400);
    $("#mq").innerHTML = Array(2).fill(S.map((x) => "<span>" + x[1] + "</span>").join("") + "<span>OIDC · SAML</span><span>Audit everything</span><span>Zero custom crypto</span>").join("");

    /* hero network canvas */
    (() => {
      const c = $("#net"), x = c.getContext("2d"); let W, H, P = [], m = { x: -999, y: -999 };
      const rs = () => { const r = c.parentNode.getBoundingClientRect(); W = c.width = r.width; H = c.height = r.height; P = Array.from({ length: Math.min(80, W / 16 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .55, vy: (Math.random() - .5) * .55, c: ["#f97316", "#a98bff", "#2be39a"][Math.random() * 3 | 0] })); };
      rs(); ael(window, "resize", rs);
      ael(c.parentNode, "pointermove", (e) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
      ael(c.parentNode, "pointerleave", () => { m.x = m.y = -999; });
      const t = () => {
        x.clearRect(0, 0, W, H);
        P.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
          const dx = m.x - p.x, dy = m.y - p.y, d = Math.hypot(dx, dy); if (d < 170) { p.x += dx * .014; p.y += dy * .014; }
          x.fillStyle = p.c; x.beginPath(); x.arc(p.x, p.y, 2.2, 0, 7); x.fill();
          for (let j = i + 1; j < P.length; j++) { const q = P[j], e = Math.hypot(p.x - q.x, p.y - q.y); if (e < 130) { x.strokeStyle = "rgba(150,130,230," + (1 - e / 130) * .3 + ")"; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); } }
          if (d < 180) { x.strokeStyle = "rgba(249,115,22," + (1 - d / 180) * .8 + ")"; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(m.x, m.y); x.stroke(); }
        });
        if (!reduce && alive) raf = requestAnimationFrame(t);
      };
      t();
    })();

    return () => { alive = false; cancelAnimationFrame(raf); ivs.forEach(clearInterval); offs.forEach((f) => f()); timers.forEach(clearTimeout); io.disconnect(); };
  }, []);

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="ilmora-obs" data-theme={theme} ref={rootRef}>
        <style>{CSS}</style>

        {/* HERO: headline left, big live product stage right */}
        <div className="hero">
          <canvas id="net"></canvas>
          <div className="w">
                       <div>
              <h1>See everything. Trust every <span id="rw">click.</span></h1>
              <p className="l">One live view of who signs in, which files move, and whether every part of the platform is healthy. Eight security services decide, one quality platform verifies, and everything lands in one auditable record.</p>
                            <div className="row"><button type="button" className="btn" onClick={() => goTo("arch")}>Explore the architecture</button><button type="button" className="btn g" onClick={() => goTo("flows")}>Watch it happen</button></div>
              <div className="mini">
                <div className="t2"><b data-n="1284">0</b><span>Secure sign-ins</span></div>
                <div className="t2"><b data-n="342">0</b><span>Files checked</span></div>
                <div className="t2"><b data-n="57">0</b><span>VPN sessions</span></div>
                <div className="t2 wn"><b data-n="2">0</b><span>Open alerts</span></div>
              </div>
            </div>
            <div className="stage">
              <div className="frame">
                <div className="fbar"><i></i><i></i><i></i><span id="hcap"></span></div>
                <div className="fimgs">
                  {HERO_SHOTS.map((s, i) => (
                    <img key={i} className={i === 0 ? "on" : ""} data-cap={s.cap} src={logoSrc(s.img)} alt={s.cap} width="1680" height="880" decoding="async" loading="eager" />
                  ))}
                </div>
              </div>
              <div className="fdots">
                {HERO_SHOTS.map((s, i) => (<button key={i} type="button">{s.short}</button>))}
              </div>
              <div className="fc fc2">MFA passed, token issued</div>
              <div className="fc fc1">
                <div className="ph"><b>Live audit feed</b><span className="live">● Sample data</span></div>
                <ul className="feed" id="feed"></ul>
              </div>
            </div>
          </div>
          <div className="mq"><div id="mq"></div></div>
        </div>

        <div className="w"><div className="stats">
          <div><b data-n="8">0</b><span>security control-plane services</span></div>
          <div><b data-n="1">0</b><span>quality platform that verifies, never decides</span></div>
          <div><b data-n="5">0</b><span>business products tested automatically</span></div>
          <div><b data-n="9">0</b><span>guardrails every design is checked against</span></div>
        </div></div>

        {/* ARCHITECTURE: pick a service, its screen shows on the right */}
        <section id="arch"><div className="w">
          <div className="hband"><h2>Eight services. One <span className="or">platform.</span></h2><p className="lead">Eight services designed as one platform, so identity, audit and secrets behave the same everywhere. Select any service.</p></div>
          <div className="arch">
            <div>
              <div className="dom">
                <div className="col"><h4>Identity domain</h4><div id="d1"></div></div>
                <div className="col"><h4>Infrastructure domain</h4><div id="d2"></div></div>
                <div className="col"><h4>Security &amp; SOC domain</h4><div id="d3"></div></div>
              </div>
              <div className="qap"><h4 className="qh">Cross-cutting quality layer · new in v0.2</h4><div id="d4"></div></div>
              <div className="topo"><svg id="topo" viewBox="0 0 440 260"></svg></div>
            </div>
            <div className="det"><div id="dt"></div></div>
          </div>
        </div></section>

        {/* FLOWS: steps left, video + log right */}
        <section id="flows"><div className="w">
          <div className="hband"><h2>Three flows, one audit <span className="or">trail</span></h2><p className="lead">Every flow follows one pattern: a gateway request, a policy check, then an audit event to the SIEM.</p></div>
          <div className="tabs" id="tabs"></div>
          <div className="flow">
            <div className="panel"><ol className="st" id="st"></ol><button className="tab" id="rp" style={{ marginTop: "12px" }}>Replay</button></div>
            <div className="fmedia">
              <img id="fv" className="fv" alt="" width="1260" height="660" decoding="async" />
              <div className="log" id="log"></div>
            </div>
          </div>
        </div></section>

        {/* PRODUCT SCREENS: zig-zag, image left then right */}
        <section id="screens"><div className="w">
          <div className="hband"><h2>What each service <span className="or">looks like</span></h2><p className="lead">Sample screens for all nine blocks.</p></div>
          <div className="zz">
            {SHOTS.map((v, i) => {
              const sv = SERVICES[v.svc];
              return (
                <article className="zr" key={i}>
                  <figure className="zm"><img src={logoSrc(v.img)} alt={v.title + " screen"} width="1680" height="880" loading="lazy" decoding="async" /></figure>
                  <div className="zt"><div className="kk">{sv[2]} · {sv[0]}</div><h3>{v.title}</h3><p>{v.text}</p><ul>{sv[6].map((x, j) => <li key={j}>{x}</li>)}</ul></div>
                </article>
              );
            })}
          </div>
        </div></section>

        {/* GUARDRAILS */}
        <section id="rules"><div className="w">
          <div className="hband"><h2>Nine rules every design must <span className="or">pass</span></h2><p className="lead">Checked before any build starts. The ninth was added for the quality platform.</p></div>
          <div className="gm"><div className="gt" id="gr"></div></div>
        </div></section>

        <section><div className="w">
          <div className="hband"><h2>Without it and with <span className="or">it</span></h2><p className="lead">What changes when security and observability are designed in from day one.</p></div>
          <div className="ba">
            <div className="h x">Without Observability Management</div><div className="h y">With it</div>
            <div className="x2">Separate logins and policies per tool</div><div className="y2">One SSO with central policy and MFA decisions</div>
            <div className="x2">Files opened with no checks</div><div className="y2">Files held in quarantine until scanned, never executed</div>
            <div className="x2">Secrets stored in application databases</div><div className="y2">Secrets only in a vault, services keep pointers</div>
            <div className="x2">Failed tests need manual investigation</div><div className="y2">Failures traced to the exact endpoint, error and trace</div>
            <div className="x2">Audit gaps between services</div><div className="y2">Every action emits an immutable audit event to SIEM</div>
          </div>
        </div></section>

        <section><div className="w">
          <div className="hband"><h2>Built on proven <span className="or">parts</span></h2><p className="lead">No custom crypto, no home-grown protocols. Standard tools throughout.</p></div>
          <div className="stm"><div className="stt">{[0, 1].map((k) => STACK.map(([a, b], i) => (<span key={k + "-" + i} aria-hidden={k ? "true" : undefined}><b>{a}</b>{b}</span>)))}</div></div>
        </div></section>

        {/* STATUS: 90-day plan image + done / open */}
        <section id="status"><div className="w">
          <div className="hband"><h2>Design complete, sign-off <span className="or">next</span></h2><p className="lead">High-Level Design v0.2 is a draft pending review. Nothing here claims the services are live yet.</p></div>
          <div className="zz">
            <article className="zr">
              <figure className="zm"><img src={logoSrc(shot10)} alt="90-day build plan" width="1680" height="880" loading="lazy" decoding="async" /></figure>
              <div className="zt"><div className="kk">Roadmap</div><h3>90-day build plan</h3><p>Identity is built first, the Security Server last, and the pilot starts on day 90.</p><ul><li>Domain Controller, LDAP and SSO first</li><li>Policy, SIEM and VPN next</li><li>Pilot starts on day 90</li></ul></div>
            </article>
          </div>
          <div className="status">
            <div className="panel"><h3 style={{ marginBottom: "14px" }}>Done</h3><ul className="ck"><li>HLD v0.2 written, with QAP added as the 9th block</li><li>Low-level designs complete for all 8 core services</li><li>Low-level design complete for QAP</li><li>Guardrails, data, security and deployment model defined</li></ul></div>
            <div className="panel"><h3 style={{ marginBottom: "14px" }}>Still open</h3><ul className="ck o"><li>Architecture review and sign-off</li><li>Targets (SLOs, recovery time and point) per service</li><li>LDAP server and VPN data-plane vendor choice</li><li>Issue tracker and Selenium Grid hosting choice</li><li>Test-data approach for the 5 business products</li></ul></div>
          </div>
        </div></section>

        <section id="faq"><div className="w">
          <div className="hband"><h2>What people ask <span className="or">most</span></h2></div>
          <div className="faq">
            <details><summary>Does the quality platform make security decisions?</summary><p>No. It only verifies. It signs in through SSO, holds secret references only, and never runs against production data.</p></details>
            <details><summary>Why is the quality platform rated “Supporting”?</summary><p>The Critical, High and Medium scale measures the damage if a service makes a wrong security decision. An outage here delays defect detection but creates no security exposure.</p></details>
            <details><summary>What if the identity services are delayed?</summary><p>They sit on the critical path for everything, so they are built and stabilized first, in the order Domain Controller, LDAP, SSO.</p></details>
            <details><summary>How is the risky CGI gateway contained?</summary><p>Allowlisted routes, isolated workers, strict timeouts and minimum privileges, plus a security review before any production exposure.</p></details>
          </div>
          <div className="cta">
            <div><h2>Ready to review the design?</h2><p>Bring the HLD to the architecture review for sign-off.</p><div className="chips"><span>Every action audited</span><span>Standards-based auth</span><span>Secrets in a vault</span><span>Tested every release</span></div></div>
            <a className="btn" href="/manager-hub">Open Manager Hub</a>
          </div>
        </div></section>

        <section className="pts"><div className="w">
          <div className="hband"><h2>Our Technology <span className="or">Partners</span></h2><p className="lead">Open standards and tools behind our telemetry, metrics and dashboards.</p></div>
          <div className="ptm"><div className="ptt">{[0, 1].map((k) => [...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (<a key={k + "-" + i} href={p.url} target="_blank" rel="noopener noreferrer" aria-hidden={k ? "true" : undefined} tabIndex={k ? -1 : undefined}><img className={p.wide ? "wide" : undefined} src={logoSrc(p.logo)} alt={k ? "" : p.name + " logo"} width={p.wide ? undefined : "40"} height="40" loading="lazy" decoding="async" />{!p.wide && <span>{p.name}</span>}</a>)))}</div></div>
        </div></section>
      </div>
    </PublicLayout>
  );
}