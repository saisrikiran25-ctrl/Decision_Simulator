/* ============================================================
   SIMULATOR MODEL — transparent, illustrative formulas.
   Every output equals the deck's stated figure at the
   Board-recommended plan (BASE). Levers move outputs with
   diminishing returns: pw(ratio, k) = ratio^k, k < 1.
   ============================================================ */
const BASE = {
  budget: [40, 25, 10, 10, 10, 5],   // Migration, Infra/PaaS, Skills, AI build, Security/Gov, Contingency (% of ₹25 Cr)
  cloud: [60, 25, 15],               // Azure, AWS, On-prem retained (% of footprint) — illustrative split of "Azure primary, AWS secondary, limited on-prem"
  svc: [25, 55, 20],                 // IaaS, PaaS, SaaS (% of workloads) — illustrative split of "PaaS-led"
  pace: "rec", reskill: "rec", finops: "adv"
};
const PACE = {
  agg:  { name: "Aggressive",  ends: [5, 14, 30], mig: 1.08, sav: 1.03, pay: 0.93, dual: 1.15, y2: 0.50, sec: 0.94, cert: 0.94, cost: 8, breach: 8, skill: 10, sla: 22 },
  rec:  { name: "Recommended", ends: [6, 18, 36], mig: 1.00, sav: 1.00, pay: 1.00, dual: 1.00, y2: 0.40, sec: 1.00, cert: 1.00, cost: 0, breach: 0, skill: 0, sla: 0 },
  cons: { name: "Conservative", ends: [8, 22, 42], mig: 0.88, sav: 0.94, pay: 1.12, dual: 0.90, y2: 0.28, sec: 1.03, cert: 1.03, cost: 3, breach: -3, skill: -6, sla: -8 }
};
const RESK = { low: { name: "Light", m: 0.7, y1: -0.02 }, rec: { name: "Recommended", m: 1, y1: 0 }, high: { name: "Intensive", m: 1.3, y1: 0.04 } };
const FIN = { off: { name: "Off", sav: 0.78, gov: 0.85, cost: 18, br: 10 }, basic: { name: "Basic", sav: 0.92, gov: 0.95, cost: 7, br: 4 }, adv: { name: "Advanced", sav: 1, gov: 1, cost: 0, br: 0 } };
const REGISTER_BASE = [75, 75, 50, 50, 25];  // High, High, Med, Med, Low, as in the deck's risk register
const RISK_NAMES = ["Cost overrun", "Multi-tenant data breach", "Skills gap delaying migration", "Vendor lock-in", "Client SLA disruption"];

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const pw = (r, k) => Math.pow(Math.max(r, 0.05), k);
const clone = (o) => JSON.parse(JSON.stringify(o));
const level = (v) => (v >= 65 ? "high" : v >= 40 ? "med" : "low");

/* Keep linked sliders summing to exactly 100. */
function rebalance(arr, i, v) {
  v = clamp(Math.round(v), 0, 100);
  const others = arr.map((_, j) => j).filter((j) => j !== i);
  const sumO = others.reduce((s, j) => s + arr[j], 0);
  const rest = 100 - v;
  const out = arr.slice();
  out[i] = v;
  others.forEach((j) => { out[j] = sumO === 0 ? rest / others.length : (arr[j] * rest) / sumO; });
  const r = out.map((x) => Math.max(0, Math.round(x)));
  let diff = 100 - r.reduce((s, x) => s + x, 0);
  const order = others.slice().sort((a, b) => r[b] - r[a]);
  let k = 0;
  while (diff !== 0 && k < 200) {
    const j = order.length ? order[k % order.length] : i;
    const step = diff > 0 ? 1 : -1;
    if (r[j] + step >= 0) { r[j] += step; diff -= step; }
    k++;
  }
  return r;
}

function model(s) {
  const [mig, inf, ski, ai, sec, cont] = s.budget;
  const [az, aw, op] = s.cloud;
  const [iaas, paas, saas] = s.svc;
  const P = PACE[s.pace], R = RESK[s.reskill], F = FIN[s.finops];
  const effSkill = ski * R.m;

  const cert = clamp(70 * pw(effSkill / 10, 0.6) * P.cert, 4, 97);

  let mg = 80 * ((100 - op) / 85) * pw(mig / 40, 0.5) * pw(inf / 25, 0.25) * P.mig;
  mg = clamp(mg, 5, 100 - op - 2);

  const migRel = mg / 80;
  const plat = pw(inf / 25, 0.5) * pw(paas / 55, 0.45);
  const prov = clamp(8 / plat / clamp(0.5 + 0.5 * migRel, 0.4, 1.1), 0.5, 504);

  const paasF = 1 + 0.004 * (paas - 55);
  const awsPen = aw > 25 ? 1 - 0.002 * (aw - 25) : 1;
  const sav = clamp(22.5 * pw(migRel, 0.9) * paasF * F.sav * awsPen * P.sav * pw(inf / 25, 0.2), 2, 40);

  const aiEff = pw(ai / 10, 0.25);
  const pay = clamp(27 * pw(22.5 / sav, 0.7) / aiEff * P.pay * (1 + 0.03 * Math.max(0, 5 - cont)), 10, 60);

  const legacy = [100, 104, 108];
  const dual = 0.22 * pw(mig / 40, 0.5) * P.dual;
  const s3 = sav / 100, s2 = s3 * P.y2;
  const cloud = [100 * (1 + dual) * (1 + R.y1), legacy[1] * (1 - s2), legacy[2] * (1 - s3)];

  const cloudPen = 1 - 0.003 * (aw - 25);
  const secScore = pw(sec / 10, 0.7) * F.gov * pw(effSkill / 10, 0.2) * cloudPen * P.sec;
  const secTrend = secScore >= 0.95 ? "down" : secScore >= 0.75 ? "flat" : "up";

  const rv = [
    75 - 4 * (cont - 5) + F.cost + P.cost,
    75 - 4 * (sec - 10) + 0.35 * (aw - 25) + F.br + P.breach,
    50 - 3 * (effSkill - 10) + P.skill,
    50 - 1.1 * (aw - 25) + 0.25 * (paas - 55),
    25 + P.sla + 0.25 * (mig - 40) - 0.3 * (op - 15) - 2 * (cont - 5)
  ].map((v) => clamp(v, 3, 98));
  const risks = rv.map((v, i) => ({ k: RISK_NAMES[i], v, base: REGISTER_BASE[i], lvl: level(v), up: v > REGISTER_BASE[i] + 8 }));
  const avg = rv.reduce((a, b) => a + b, 0) / rv.length;
  const posture = avg >= 62 ? "high" : avg >= 40 ? "med" : "low";

  const provF = pw(8 / prov, 0.12);
  const slaAdj = 1 - (rv[4] - 25) / 400;
  const npsIdx = pw(ai / 10, 0.25) * provF * pw(secScore, 0.15) * slaAdj;
  const nps = npsIdx >= 0.97 ? "up" : npsIdx >= 0.88 ? "flat" : "down";

  return { cert, mg, prov, sav, pay, tco: { legacy, cloud }, secScore, secTrend, risks, avg, posture, npsIdx, nps, effSkill, dual, ends: P.ends };
}
