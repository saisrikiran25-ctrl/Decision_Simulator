/* ============================================================
   APP — rendering, charts, scroll-spy, simulator UI
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const rupee = (n) => "₹" + n.toFixed(2) + " Cr";

/* ---------- nav, progress, scroll-spy ---------- */
$("#mandate").textContent = DECK.mandate;
$("#links").innerHTML = `<a href="#overview" data-s="overview"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1.2"/><rect x="9" y="2" width="5" height="5" rx="1.2"/><rect x="2" y="9" width="5" height="5" rx="1.2"/><rect x="9" y="9" width="5" height="5" rx="1.2"/></svg>Overview</a><a href="#simulator" data-s="simulator"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4.5h7M12 4.5h2M2 11.5h2M7 11.5h7"/><circle cx="10.5" cy="4.5" r="1.7"/><circle cx="5.5" cy="11.5" r="1.7"/></svg>Simulator</a>`;
const linkEls = $$("#links a");
function setActive(id) {
  linkEls.forEach((a) => {
    const on = a.dataset.s === id;
    a.classList.toggle("on", on);
    if (on) { a.setAttribute("aria-current", "true"); const L = $("#links"); L.scrollTo({ left: a.offsetLeft - L.clientWidth / 2 + a.clientWidth / 2, behavior: reduce ? "auto" : "smooth" }); }
    else a.removeAttribute("aria-current");
  });
}
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { setActive(e.target.id); } }); }, { rootMargin: "-42% 0px -52% 0px" });
  $$("main section.sec").forEach((s) => io.observe(s));
  const rio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("rise"); }), { threshold: 0.08 });
  $$(".sec .sh, .sec .blk, .sec .grid").forEach((el) => rio.observe(el));
}
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => { const d = document.documentElement; const p = d.scrollTop / Math.max(1, d.scrollHeight - innerHeight); $("#prog").style.width = (p * 100).toFixed(1) + "%"; ticking = false; });
}, { passive: true });

/* ---------- tooltip ---------- */
const tip = $("#tip");
function placeTip(x, y) { const w = tip.offsetWidth, h = tip.offsetHeight; tip.style.left = Math.min(innerWidth - w - 8, Math.max(8, x + 12)) + "px"; tip.style.top = Math.max(8, y - h - 12) + "px"; }
document.addEventListener("mouseover", (e) => { const t = e.target.closest("[data-tip]"); if (!t) { tip.classList.remove("on"); return; } tip.textContent = t.dataset.tip; tip.classList.add("on"); placeTip(e.clientX, e.clientY); });
document.addEventListener("mousemove", (e) => { if (tip.classList.contains("on")) placeTip(e.clientX, e.clientY); });
document.addEventListener("click", (e) => { const t = e.target.closest("[data-tip]"); if (t && matchMedia("(hover:none)").matches) { tip.textContent = t.dataset.tip; tip.classList.add("on"); placeTip(e.clientX, e.clientY); setTimeout(() => tip.classList.remove("on"), 2200); } });

/* ---------- small builders ---------- */
const chipFor = (s) => `<span class="chip ${s}">${s === "high" ? "High" : s === "med" ? "Med" : "Low"}</span>`;
const dots = (n, cls) => `<span class="dots ${cls}" role="img" aria-label="${n} of 4">${[1, 2, 3, 4].map((i) => `<i class="${i <= n ? "f" : ""}"></i>`).join("")}</span>`;
const goBtn = (preset, label) => `<button class="btn sm" type="button" data-preset="${preset}">${label} →</button>`;

/* bars: fill / dot, optional target band, optional ghost marker */
function barHTML(id, cfg) {
  const band = cfg.band ? `<div class="band" style="left:${cfg.band[0]}%;width:${Math.max(cfg.band[1] - cfg.band[0], 1.4)}%"></div>` : "";
  const mark = cfg.dot ? `<div class="dot" id="m-${id}"></div>` : `<div class="fill" id="m-${id}" style="width:0"></div>`;
  const ax = cfg.axis.map(([p, l]) => `<span style="left:${p}%">${l}</span>`).join("");
  return `<div class="bar" id="bar-${id}">${band}${mark}<div class="ghostm" id="g-${id}"></div></div><div class="axis" aria-hidden="true">${ax}</div>`;
}
function setBar(id, pos, ghost, cfg) {
  const m = $("#m-" + id); if (!m) return;
  if (cfg.dot) m.style.left = clamp(pos, 0, 100) + "%"; else m.style.width = clamp(pos, 0, 100) + "%";
  if (cfg.dot) m.classList.toggle("warn", !!cfg.warn && cfg.warn(pos));
  const b = $("#bar-" + id), g = $("#g-" + id);
  if (ghost == null) b.classList.remove("pin"); else { b.classList.add("pin"); g.style.left = clamp(ghost, 0, 100) + "%"; }
}
const BARS = {
  sav: { axis: [[0, "0%"], [25, "10%"], [50, "20%"], [75, "30%"], [100, "40%"]], band: [50, 62.5], max: 40 },
  prov: { dot: true, band: [0, 51], axis: [[0, "1 hr"], [51, "1 day"], [82, "1 wk"], [100, "3 wks"]] },
  pay: { dot: true, band: [50, 62.5], axis: [[0, "M0"], [25, "M12"], [50, "M24"], [75, "M36"], [100, "M48"]], warn: (p) => p > 75 },
  mg: { axis: [[0, "0%"], [50, "50%"], [100, "100%"]], band: [79, 81], max: 100 },
  cert: { axis: [[0, "0%"], [50, "50%"], [100, "100%"]], band: [69, 71], max: 100 }
};
const provPos = (h) => (Math.log(clamp(h, 1, 504)) / Math.log(504)) * 100;

/* ---------- TCO chart (shared by Section 05 and the simulator) ---------- */
function rbar(x, y, w, h, r) {
  if (h <= 0) return "";
  r = Math.min(r, h, w / 2);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
function tcoChart(t, g) {
  const W = 600, H = 300, ml = 44, mr = 12, mt = 20, mb = 40;
  const all = [...t.legacy, ...t.cloud, ...(g ? g.cloud : [])];
  const ymax = Math.max(160, Math.ceil(Math.max(...all) / 40) * 40);
  const y = (v) => mt + (1 - v / ymax) * (H - mt - mb);
  const gw = (W - ml - mr) / 3, bw = 44, gap = 8;
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Three-year annual cost index, legacy versus proposed cloud. Year 1 cloud ${t.cloud[0].toFixed(0)}, Year 2 ${t.cloud[1].toFixed(0)}, Year 3 ${t.cloud[2].toFixed(0)} against legacy 100, 104, 108.">`;
  for (let v = 0; v <= ymax; v += 40) s += `<line x1="${ml}" x2="${W - mr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line);stroke-width:1"/><text x="${ml - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" style="fill:var(--ink3)">${v}</text>`;
  for (let i = 0; i < 3; i++) {
    const cx = ml + gw * i + gw / 2, x1 = cx - bw - gap / 2, x2 = cx + gap / 2;
    const lv = t.legacy[i], cv = t.cloud[i];
    s += `<path d="${rbar(x1, y(lv), bw, y(0) - y(lv), 4)}" style="fill:var(--slate)" data-tip="Year ${i + 1} · Legacy (do nothing): ${lv.toFixed(0)}"/>`;
    s += `<path d="${rbar(x2, y(cv), bw, y(0) - y(cv), 4)}" style="fill:var(--blue)" data-tip="Year ${i + 1} · Cloud (proposed): ${cv.toFixed(0)}"/>`;
    if (g) { const gv = g.cloud[i]; s += `<path d="${rbar(x2 + 2, y(gv), bw - 4, y(0) - y(gv), 3)}" style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-dasharray:4 3" data-tip="Year ${i + 1} · Scenario A cloud: ${gv.toFixed(0)}"/>`; }
    s += `<text x="${x1 + bw / 2}" y="${y(lv) - 6}" text-anchor="middle" font-size="11" style="fill:var(--ink3)">${lv.toFixed(0)}</text>`;
    s += `<text x="${x2 + bw / 2}" y="${y(cv) - 6}" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">${cv.toFixed(0)}</text>`;
    s += `<text x="${cx}" y="${H - 14}" text-anchor="middle" font-size="12" style="fill:var(--ink2)">Year ${i + 1}</text>`;
  }
  s += `<line x1="${ml}" x2="${W - mr}" y1="${y(0)}" y2="${y(0)}" style="stroke:var(--line2)"/></svg>`;
  return s;
}
const tcoLegend = (g) => `<div class="legendrow"><span><i style="background:var(--slate)"></i>Legacy (do nothing)</span><span><i style="background:var(--blue)"></i>Cloud (proposed)</span>${g ? '<span><i class="ghost"></i>Scenario A cloud</span>' : ""}</div>`;
const tcoTable = (t) => `<details class="tbl"><summary>Table view</summary><table><thead><tr><th>Cost index</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead><tbody><tr><td>Legacy</td>${t.legacy.map((v) => `<td>${v.toFixed(0)}</td>`).join("")}</tr><tr><td>Cloud</td>${t.cloud.map((v) => `<td>${v.toFixed(0)}</td>`).join("")}</tr></tbody></table></details>`;

/* ---------- Overview (short) ---------- */
(function () {
  const items = [
    ["The problem", "On-prem, siloed delivery with little automation is costing ABC deals and margin."],
    ["The strategy", "Multi-cloud and PaaS-led. Azure primary, AWS secondary, limited on-prem kept for data residency."],
    ["The architecture", "Seven layers on standard landing zones. The Data & AI layer is the new revenue engine."],
    ["The migration", "5Rs across three waves in 36 months, lowest risk first, with parallel-run and rollback."],
    ["The economics", "₹25 Cr investment. Targets: 20–25% infra saving and a 24–30 month payback."],
    ["Risk & governance", "Zero-trust, central IAM and FinOps, governed by a CCoE. Top risks: cost overrun and multi-tenant breach."],
    ["People & change", "Reskill into five cloud and AI roles, ~70% certified by Year 2, and move to Cloud + AI Pods."],
    ["The roadmap", "Assess, Migrate, Transform, Optimise over 36 months, with four Board decisions to open it."]
  ];
  const bud = DECK.econ.budget;
  $("#ovBody").innerHTML = `
  <div class="callout">${DECK.problem.statement}</div>
  <div class="grid g4 blk">${items.map((x) => `<div class="card"><span class="eyebrow">${x[0]}</span><p style="margin-top:8px;color:var(--ink)">${x[1]}</p></div>`).join("")}</div>
  <div class="blk card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><h3>Where the ₹25 Cr goes</h3><span class="tag">Illustrative</span></div>
    <div style="display:flex;gap:3px;margin-top:16px;height:14px" role="img" aria-label="Budget allocation">${bud.map((b) => `<div style="flex:${b.pct};background:${b.c};border-radius:4px" data-tip="${b.k}: ${b.pct}% · ${rupee(b.pct * 25 / 100)}"></div>`).join("")}</div>
    <div class="legendrow" style="margin-top:14px;gap:8px 18px">${bud.map((b) => `<span><i style="background:${b.c}"></i>${b.k} ${b.pct}%</span>`).join("")}</div></div>
  <div class="blk card"><span class="eyebrow">The Board is asked to</span><div class="dec">${DECK.roadmap.decisions.map((d, i) => `<span class="dbtn" style="cursor:default"><b>${i + 1}</b>${d.k}</span>`).join("")}</div></div>`;
})();

/* ============================================================
   SIMULATOR UI
   ============================================================ */
let S = clone(BASE), pinned = null, compare = false;
const baseOut = model(BASE);
const PRESETS = {
  awsfirst: { cloud: [25, 60, 15] },
  finopsoff: { finops: "off" },
  iaas: { svc: [45, 35, 20] },
  cons: { pace: "cons" },
  lowsec: { budget: [42, 27, 11, 11, 2, 7] },
  lightskills: { reskill: "low", budget: [42, 27, 5, 11, 10, 5] },
  intensive: { reskill: "high" }
};
const GROUPS = [
  { key: "budget", title: "Budget allocation · ₹25 Cr", labels: ["Migration", "Infra / PaaS", "Skills", "AI build", "Security / Governance", "Contingency"], max: 70, fmt: (v) => `${v}% · ${rupee((v * 25) / 100)}`, hint: "Six linked sliders. Moving one rebalances the rest so the total stays ₹25 Cr." },
  { key: "cloud", title: "Cloud mix", labels: ["Azure (primary)", "AWS (secondary)", "On-prem retained"], max: 100, fmt: (v) => v + "%", hint: "" },
  { key: "svc", title: "Service model blend", labels: ["IaaS", "PaaS", "SaaS"], max: 100, fmt: (v) => v + "%", hint: "PaaS is the primary focus. IaaS bridges legacy and regulated workloads; SaaS serves internal functions (Section 02)." }
];
const seg = (name, opts, cur) => `<div class="seg" role="radiogroup">${opts.map(([v, l]) => `<span><input type="radio" name="${name}" id="${name}-${v}" value="${v}" ${v === cur ? "checked" : ""}><label for="${name}-${v}">${l}</label></span>`).join("")}</div>`;

$("#levers").innerHTML =
  GROUPS.map((g) => `<fieldset class="lever"><legend>${g.title}</legend>${g.labels.map((l, i) => `<div class="sl"><label for="sl-${g.key}-${i}">${l}</label><output id="o-${g.key}-${i}" for="sl-${g.key}-${i}"></output><input type="range" id="sl-${g.key}-${i}" data-key="${g.key}" data-i="${i}" min="0" max="${g.max}" step="1"></div>`).join("")}<p class="hint" id="hint-${g.key}">${g.hint}</p></fieldset>`).join("") +
  `<fieldset class="lever"><legend>Migration pace</legend>${seg("pace", [["agg", "Aggressive"], ["rec", "Recommended"], ["cons", "Conservative"]], S.pace)}
    <div class="pace"><div class="track" id="paceTrack"></div><small aria-hidden="true"><span>M0</span><span id="paceEnd"></span><span>M42</span></small></div><p class="hint" id="hint-pace"></p></fieldset>
  <fieldset class="lever"><legend>Reskilling intensity</legend>${seg("reskill", [["low", "Light"], ["rec", "Recommended"], ["high", "Intensive"]], S.reskill)}<p class="hint" id="hint-reskill"></p></fieldset>
  <fieldset class="lever"><legend>FinOps maturity</legend>${seg("finops", [["off", "Off"], ["basic", "Basic"], ["adv", "Advanced"]], S.finops)}<p class="hint" id="hint-finops"></p></fieldset>`;

const tile = (id, label, unit, extra) => `<article class="tile" id="t-${id}"><div class="hd"><span class="eyebrow">${label}</span><span class="dl" id="d-${id}">–</span></div><div class="val"><b id="v-${id}">–</b><span class="u" id="u-${id}">${unit}</span><span class="pinv" id="p-${id}"></span></div>${extra}<p class="why" id="w-${id}"></p></article>`;
const stateTile = (id, label, extra) => `<article class="tile" id="t-${id}"><div class="hd"><span class="eyebrow">${label}</span><span class="dl" id="d-${id}">–</span></div><div class="state"><span id="a-${id}"></span><b id="v-${id}">–</b><span class="pinv" id="p-${id}"></span></div>${extra || ""}<p class="why" id="w-${id}"></p></article>`;
$("#outs").innerHTML = `
  <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><h3>3-year TCO curve</h3><span class="tag">Illustrative estimate</span></div>
    <div id="tcoBox" style="margin-top:12px"></div><p class="eyebrow" style="margin-top:10px">Annual cost index, Year 1 legacy = 100</p><p class="why" id="w-tco" style="color:var(--ink2);font-size:13px;margin-top:8px"></p></div>
  <div class="tiles">
    ${tile("sav", "Infra cost reduction", "% by Year 3", barHTML("sav", BARS.sav) + '<p class="eyebrow" style="margin-top:10px">Target band 20–25%</p>')}
    ${tile("prov", "Provisioning time", "", barHTML("prov", BARS.prov) + '<p class="eyebrow" style="margin-top:10px">Weeks today → hours (shaded)</p>')}
    ${tile("pay", "Estimated payback", "months", barHTML("pay", BARS.pay) + '<p class="eyebrow" style="margin-top:10px">Target band 24–30 months</p>')}
    ${tile("mg", "Workloads migrated by Year 3", "%", barHTML("mg", BARS.mg) + '<p class="eyebrow" style="margin-top:10px">Target ~80%</p>')}
    ${tile("cert", "Workforce certified by Year 2", "%", barHTML("cert", BARS.cert) + '<p class="eyebrow" style="margin-top:10px">Target ~70%</p>')}
    ${stateTile("sec", "Security incident trend", '<p class="eyebrow" style="margin-top:10px">Deck target: downward</p>')}
    ${stateTile("nps", "Client NPS direction", '<p class="eyebrow" style="margin-top:10px">Deck target: improved vs baseline</p>')}
    ${stateTile("post", "Risk posture", '<p class="eyebrow" style="margin-top:10px" id="postSub"></p>')}
  </div>
  <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><h3>Risk register, live</h3><span class="tag">Illustrative estimate</span></div>
    <p style="margin:6px 0 10px;font-size:13px;color:var(--ink2)">Bars show each risk's current exposure. The white tick marks the deck's register severity.</p><div id="regBox"></div></div>`;

/* count-up */
function tw(el, to, fmt) {
  if (typeof el === "string") el = $(el); if (!el) return;
  const from = el._v == null ? to : el._v; el._v = to;
  cancelAnimationFrame(el._raf);
  if (reduce || from === to) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = (t) => { const p = Math.min(1, (t - t0) / 450), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) el._raf = requestAnimationFrame(step); };
  el._raf = requestAnimationFrame(step);
}
function hrsParts(h) { return h < 48 ? [1, "hrs"] : h < 336 ? [24, "days"] : [168, "wks"]; }
const numFor = (div) => (v) => { const x = v / div; return div === 1 ? (x < 10 ? x.toFixed(1) : String(Math.round(x))) : x.toFixed(1); };

const arrowSVG = (kind, color) => {
  const d = kind === "flat" ? "M9 17h16" : "M17 9v16M10 18l7 7 7-7";
  const rot = kind === "up" ? "rotate(180 17 17)" : "";
  return `<svg class="arrow" viewBox="0 0 34 34" aria-hidden="true" style="color:${color}"><circle cx="17" cy="17" r="16" fill="none" stroke="currentColor" opacity=".35"/><path d="${d}" transform="${rot}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
};
function setDelta(id, diff, unit, goodDir, dig, rl) {
  const el = $("#d-" + id), a = Math.abs(diff);
  if (a < Math.pow(10, -dig) / 2) { el.textContent = "On " + rl; el.className = "dl"; return; }
  el.textContent = (diff > 0 ? "▲ +" : "▼ −") + a.toFixed(dig) + unit + " vs " + rl;
  el.className = "dl " + (diff * goodDir > 0 ? "good" : "bad");
}
function setRank(id, diff, rl) {
  const el = $("#d-" + id);
  if (diff === 0) { el.textContent = "On " + rl; el.className = "dl"; } else { el.textContent = (diff > 0 ? "▲ Better than " : "▼ Worse than ") + rl; el.className = "dl " + (diff > 0 ? "good" : "bad"); }
}
const setPin = (id, txt) => { const el = $("#p-" + id); el.textContent = txt == null ? "" : "A: " + txt; el.classList.toggle("on", txt != null); };
const HRS = (h) => { const [d, u] = hrsParts(h); return numFor(d)(h) + " " + u; };

/* plain-English "why" lines, each tied to a deck section */
function whyLines(o, s) {
  const [mig, inf, ski, ai, sec, cont] = s.budget, [az, aw, op] = s.cloud, paas = s.svc[1];
  const W = {};
  W.sav = s.finops !== "adv" ? `FinOps is set to ${FIN[s.finops].name.toLowerCase()}. Tagging, budgets and rightsizing reviews are what hold the 20–25% saving (Section 05).`
    : paas < 45 ? "A lighter PaaS share leaves more workloads on IaaS, which keeps more run cost. PaaS is the core modernisation driver (Section 02)."
    : aw > 40 ? "A heavier AWS footprint lowers lock-in but adds a second platform to run, trimming savings (Section 02)."
    : o.mg < 72 ? "Fewer workloads reach the cloud by Year 3, so less legacy maintenance is retired (Section 04)."
    : op > 25 ? "More retained on-prem keeps legacy run cost in the base (Section 02)."
    : o.sav > baseOut.sav + 1.5 ? "Stronger migration and platform spend retire legacy maintenance faster (Section 05)."
    : "Savings come from retiring legacy maintenance as workloads move to PaaS. The plan targets 20–25% by Year 3 (Section 05).";
  W.prov = inf < 18 ? "Less Infra / PaaS spend slows the self-service platform that turns weeks into hours (Section 03)."
    : paas < 45 ? "With less PaaS, environments lean on manual IaaS builds. DevOps automation is a PaaS benefit (Section 02)."
    : o.prov > 24 ? "Provisioning is drifting out of the hours zone (Section 05)."
    : "IaC, CI/CD and environment self-service on standard landing zones compress provisioning from weeks to hours (Section 03).";
  W.pay = s.pace === "cons" ? "A slower pace stretches dual-running of legacy and cloud, which delays break-even (Section 04)."
    : s.pace === "agg" ? "Compressing the waves brings savings forward, but raises SLA and skills risk below (Section 04)."
    : s.finops !== "adv" ? "Weaker FinOps lowers the saving and pushes payback out (Section 05)."
    : ai < 6 ? "A thinner AI build delays the new AI-services revenue line that helps repay the investment (Section 05)."
    : cont < 3 ? "With little contingency, overruns land directly on payback (Section 05)."
    : "Payback lands inside the deck's 24–30 month target when savings ramp from Year 2 (Section 05).";
  W.mg = op > 25 ? `More retained on-prem caps what can move: only ${100 - op}% of workloads are eligible (Section 02).`
    : s.pace === "cons" ? "A slower pace leaves more workloads in Wave 3 at the 36-month mark (Section 04)."
    : s.pace === "agg" ? "Compressed waves move more workloads inside 36 months (Section 04)."
    : mig < 30 ? "A smaller migration budget moves fewer workloads by Year 3 (Section 05)."
    : "Waves 1–3 move workloads in risk order, leaving HR / Payroll and regulated systems for later (Section 04).";
  W.cert = s.reskill === "low" || ski < 7 ? "Light reskilling investment slows certification against the ~70% Year 2 target (Section 07)."
    : s.reskill === "high" || ski > 13 ? "More reskilling effort lifts certification, with diminishing returns (Section 07)."
    : "Associate to Professional tracks, bootcamps and AI/ML cohorts drive the ~70% Year 2 target (Section 07).";
  W.sec = sec < 7 ? "Under-funded security and governance weakens segmentation and monitoring, so incidents trend up (Section 06)."
    : s.finops === "off" ? "Without FinOps and governance guardrails, control drift raises incident risk (Section 06)."
    : aw > 40 ? "More clouds mean more identities to govern. Identity sprawl is a named risk (Section 06)."
    : s.pace === "agg" ? "Rushed cutovers leave less time for periodic access reviews (Section 06)."
    : "Zero-trust segmentation, centralised IAM and CASB/SIEM monitoring bend the incident trend down (Section 06).";
  W.nps = o.nps === "up" ? "Cloud-native AI services, fast provisioning and stable SLAs are what clients say they expect (Section 01)."
    : "Client experience depends on fast provisioning, a live AI offer and stable SLAs. One of them is weakening (Sections 01 and 06).";
  const up = o.risks.filter((r) => r.up).map((r) => r.k);
  W.post = up.length ? `${up.join(" and ")} ${up.length > 1 ? "are" : "is"} above the deck's register severity. Each has a named mitigation in Section 06.` : "Risk sits at the deck's register levels, each with a named mitigation (Section 06).";
  W.tco = `Year 1 runs ${(o.tco.cloud[0] - 100).toFixed(0)}% above legacy from dual-running. Year 3 lands ${(o.sav).toFixed(1)}% below the legacy curve, where the deck targets 20–25% (Sections 04 and 05).`;
  return W;
}
function hints(s) {
  const [az, aw, op] = s.cloud;
  $("#hint-cloud").textContent = aw > az ? "AWS-led mix: lock-in risk falls, but you give up Azure's edge on hybrid tooling fit (4 vs 3) and cost predictability (3 vs 2), per Section 02."
    : aw > 40 ? "A heavier AWS weighting reduces lock-in but slightly raises cost predictability uncertainty, per the Section 02 evaluation criteria."
    : "Azure primary scores higher on hybrid tooling fit and cost predictability. AWS keeps resilience and avoids lock-in. On-prem is retained for data residency (Section 02).";
  const P = PACE[s.pace];
  $("#hint-pace").textContent = { agg: "Waves end M5 / M14 / M30. Savings arrive sooner, but SLA and skills risk rise.", rec: "Waves end M6 / M18 / M36, the deck's plan.", cons: "Waves end M8 / M22 / M42. The last wave runs past the Board's 36-month window." }[s.pace];
  $("#paceEnd").textContent = "M" + P.ends[2] + " last wave ends";
  $("#hint-reskill").textContent = "Multiplies the effect of the Skills budget. Intensive adds about 4% to Year 1 cost for backfill; Light trims about 2%.";
  $("#hint-finops").textContent = { off: "No tagging, chargeback or budget alerts. Cost overrun and breach risks rise (Section 06).", basic: "Tagging and budgets only, without savings plans or CCoE rightsizing reviews.", adv: "Tagging, chargeback, budgets, savings plans and regular CCoE rightsizing reviews (Section 05)." }[s.finops];
}
function paceTrack(s) {
  const e = PACE[s.pace].ends, TOTAL = 42, segs = [];
  const add = (len, bg, tip) => len > 0 && segs.push(`<div style="flex:${len} 1 0;background:${bg}" data-tip="${tip}"></div>`);
  add(e[0], "#8fcaff", `Wave 1 · M0–M${e[0]}`);
  add(e[1] - e[0], "#3ea6ff", `Wave 2 · M${e[0]}–M${e[1]}`);
  if (e[2] <= 36) add(e[2] - e[1], "#2a72b5", `Wave 3 · M${e[1]}–M${e[2]}`);
  else { add(36 - e[1], "#2a72b5", `Wave 3 · M${e[1]}–M36`); add(e[2] - 36, "#ffb84d", `Beyond the 36-month window · M36–M${e[2]}`); }
  add(TOTAL - e[2], "transparent", "");
  $("#paceTrack").innerHTML = segs.join("") + `<span class="win" style="left:${(36 / TOTAL) * 100}%" aria-hidden="true"></span>`;
}

function syncSliders() {
  GROUPS.forEach((g) => S[g.key].forEach((v, i) => {
    const inp = $(`#sl-${g.key}-${i}`); inp.value = v; inp.style.setProperty("--p", (v / g.max) * 100 + "%");
    $(`#o-${g.key}-${i}`).textContent = g.fmt(v); inp.setAttribute("aria-valuetext", g.fmt(v));
  }));
  ["pace", "reskill", "finops"].forEach((n) => { const r = $(`#${n}-${S[n]}`); if (r) r.checked = true; });
}

function update() {
  const o = model(S), ref = compare && pinned ? pinned : baseOut, rl = compare && pinned ? "A" : "plan", pn = compare && pinned ? pinned : null;
  const W = whyLines(o, S); hints(S); paceTrack(S);

  /* sticky strip */
  tw("#ss-sav", o.sav, (v) => v.toFixed(1) + "%");
  { const [d, u] = hrsParts(o.prov), f = numFor(d); tw("#ss-prov", o.prov, (v) => f(v) + " " + u); }
  tw("#ss-pay", o.pay, (v) => v.toFixed(0) + " mo");
  tw("#ss-mg", o.mg, (v) => v.toFixed(0) + "%");
  tw("#ss-cert", o.cert, (v) => v.toFixed(0) + "%");

  /* numeric tiles */
  tw("#v-sav", o.sav, (v) => v.toFixed(1)); setDelta("sav", o.sav - ref.sav, " pts", 1, 1, rl); setPin("sav", pn && pn.sav.toFixed(1) + "%"); setBar("sav", (o.sav / 40) * 100, pn && (pn.sav / 40) * 100, BARS.sav);
  { const [d, u] = hrsParts(o.prov); tw("#v-prov", o.prov, numFor(d)); $("#u-prov").textContent = u; setDelta("prov", ((o.prov - ref.prov) / ref.prov) * 100, "%", -1, 0, rl); setPin("prov", pn && HRS(pn.prov)); setBar("prov", provPos(o.prov), pn && provPos(pn.prov), BARS.prov); }
  tw("#v-pay", o.pay, (v) => v.toFixed(1)); setDelta("pay", o.pay - ref.pay, " mo", -1, 1, rl); setPin("pay", pn && pn.pay.toFixed(1) + " mo"); setBar("pay", (o.pay / 48) * 100, pn && (pn.pay / 48) * 100, BARS.pay);
  tw("#v-mg", o.mg, (v) => v.toFixed(0)); setDelta("mg", o.mg - ref.mg, " pts", 1, 1, rl); setPin("mg", pn && pn.mg.toFixed(0) + "%"); setBar("mg", o.mg, pn && pn.mg, BARS.mg);
  tw("#v-cert", o.cert, (v) => v.toFixed(0)); setDelta("cert", o.cert - ref.cert, " pts", 1, 1, rl); setPin("cert", pn && pn.cert.toFixed(0) + "%"); setBar("cert", o.cert, pn && pn.cert, BARS.cert);

  /* state tiles */
  const rk = { down: 2, flat: 1, up: 0 }, rkN = { up: 2, flat: 1, down: 0 }, rkP = { low: 2, med: 1, high: 0 };
  const secTxt = { down: "Downward", flat: "Flat", up: "Upward" }, npsTxt = { up: "Improved", flat: "Flat", down: "Declining" }, postTxt = { low: "Low", med: "Medium", high: "High" };
  const col = (good) => (good === 2 ? "var(--green)" : good === 1 ? "var(--ink2)" : "var(--amber)");
  $("#v-sec").textContent = secTxt[o.secTrend]; $("#a-sec").innerHTML = arrowSVG(o.secTrend === "down" ? "down" : o.secTrend === "up" ? "up" : "flat", col(rk[o.secTrend])); setRank("sec", rk[o.secTrend] - rk[ref.secTrend], rl); setPin("sec", pn && secTxt[pn.secTrend]);
  $("#v-nps").textContent = npsTxt[o.nps]; $("#a-nps").innerHTML = arrowSVG(o.nps === "up" ? "up" : o.nps === "down" ? "down" : "flat", col(rkN[o.nps])); setRank("nps", rkN[o.nps] - rkN[ref.nps], rl); setPin("nps", pn && npsTxt[pn.nps]);
  $("#v-post").textContent = postTxt[o.posture]; $("#a-post").innerHTML = `<span class="chip ${o.posture}" style="font-size:11px">${o.posture === "high" ? "High" : o.posture === "med" ? "Med" : "Low"}</span>`; setRank("post", rkP[o.posture] - rkP[ref.posture], rl); setPin("post", pn && postTxt[pn.posture]);
  $("#postSub").textContent = o.risks.filter((r) => r.up).length + " of 5 risks above register severity";

  ["sav", "prov", "pay", "mg", "cert", "sec", "nps", "post"].forEach((k) => ($("#w-" + k).textContent = W[k]));
  $("#w-tco").textContent = W.tco;

  /* TCO chart */
  $("#tcoBox").innerHTML = tcoChart(o.tco, pn && pn.tco) + tcoLegend(pn) + tcoTable(o.tco);

  /* risk register */
  $("#regBox").innerHTML = o.risks.map((r, i) => {
    const p = pn && pn.risks[i];
    return `<div class="regrow"><div><b style="color:var(--ink)">${r.k}</b><div class="mit">${DECK.risk.register[i].m}</div></div>${chipFor(r.lvl)}<div class="rbar" role="img" aria-label="${r.k} exposure ${Math.round(r.v)} of 100"><i class="${r.up ? "hi" : ""}" style="width:${r.v}%"></i><u style="left:${r.base}%" title="Register severity"></u></div><span class="eyebrow" style="text-align:right">${p ? "A: " + (p.lvl === "high" ? "High" : p.lvl === "med" ? "Med" : "Low") : r.up ? "▲ above register" : r.v < r.base - 8 ? "▼ below register" : "at register"}</span></div>`;
  }).join("");

  /* compare UI */
  $("#cmpBtn").setAttribute("aria-pressed", String(compare));
  $("#repinBtn").hidden = !compare; $("#cmpNote").hidden = !compare;
}

/* wiring */
$("#levers").addEventListener("input", (e) => {
  const t = e.target;
  if (t.type === "range") { S[t.dataset.key] = rebalance(S[t.dataset.key], +t.dataset.i, +t.value); syncSliders(); }
  else if (t.type === "radio") S[t.name] = t.value;
  update();
});
$("#resetBtn").addEventListener("click", () => { S = clone(BASE); syncSliders(); update(); });
$("#cmpBtn").addEventListener("click", () => { compare = !compare; pinned = compare ? model(S) : null; update(); });
$("#repinBtn").addEventListener("click", () => { pinned = model(S); update(); });
function applyPreset(name) {
  if (!PRESETS[name]) return;
  S = Object.assign(clone(BASE), clone(PRESETS[name])); syncSliders(); update();
  $("#simulator").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
document.addEventListener("click", (e) => { const b = e.target.closest("[data-preset]"); if (b) applyPreset(b.dataset.preset); });

syncSliders(); update();
