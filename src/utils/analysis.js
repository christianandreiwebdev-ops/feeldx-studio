import { OPTIONS } from "../data/rooms";

const COSTLY  = ["Marble", "Granite", "Hardwood", "Leather", "Walnut", "King Bed - Oak", "Pendant Lights"];
const CHEAP   = ["Vinyl", "Laminate", "Carpet", "Utility Shelving"];
const DARK    = ["Navy Blue", "Walnut", "Concrete", "Black Matte"];
const PREMIUM = ["Marble", "Granite", "Hardwood", "Leather", "King Bed - Oak"];

export function estimateCost(selections) {
  let score = 0;
  Object.values(selections).forEach((v) => {
    if (COSTLY.some((c) => v.includes(c))) score += 2;
    else if (CHEAP.some((c) => v.includes(c))) score -= 1;
    else score += 1;
  });
  if (score >= 5) return { label: "High",   cls: "cost-high"   };
  if (score >= 2) return { label: "Medium", cls: "cost-medium" };
  return               { label: "Low",    cls: "cost-low"    };
}

export function buildNotes(currentRoom, selections) {
  const notes   = [];
  const values  = Object.values(selections);
  const missing = OPTIONS[currentRoom]
    .filter((g) => !selections[g.category])
    .map((g) => g.category);

  if (selections["Benchtop"] === "Marble" || selections["Wall Finish"] === "Marble")
    notes.push("💎 <strong>Marble selected</strong> — premium look but higher cost and ongoing maintenance.");

  if (values.filter((v) => DARK.some((d) => v.includes(d))).length >= 2)
    notes.push("🌑 <strong>Multiple dark finishes</strong> — the room may feel smaller. Consider lighter accents.");

  if (!selections["Lighting"])
    notes.push("💡 <strong>No lighting selected</strong> — a lighting choice will greatly improve ambience.");

  if (values.filter((v) => PREMIUM.some((p) => v.includes(p))).length >= 2)
    notes.push("✨ <strong>Premium combination</strong> — expect a high-end finish with a higher overall budget.");

  if (missing.length)
    notes.push(`📋 <strong>Not yet selected:</strong> ${missing.join(", ")}.`);

  return notes;
}

export function calcProgress(currentRoom, selections) {
  const total  = OPTIONS[currentRoom].length;
  const filled = OPTIONS[currentRoom].filter((g) => selections[g.category]).length;
  return total ? Math.round((filled / total) * 100) : 0;
}

export function buildPrompt(roomName, selections) {
  const lines = Object.entries(selections)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join("\n");
  return `You are an interior design consultant. A client is designing their ${roomName} with these selections:\n\n${lines}\n\nWrite a warm, specific 2–3 paragraph design analysis covering: (1) the overall aesthetic and feel, (2) any material compatibility or maintenance concerns, and (3) recommended next steps or finishing touches. Be concise — under 200 words. Flowing prose only, no bullet points.`;
}
