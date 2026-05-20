import { useState, useEffect } from "react";
import { estimateCost, buildNotes, buildPrompt } from "../utils/analysis";

const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3131"
    : "/api/chat";

export default function AiPanel({ currentRoom, roomName, selections }) {
  const [visible,    setVisible]    = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [streamText, setStreamText] = useState("");
  const [done,       setDone]       = useState(false);

  // ✅ Reset everything when room changes
  useEffect(() => {
    setVisible(false);
    setLoading(false);
    setStreamText("");
    setDone(false);
  }, [currentRoom]);

  async function generate() {
    if (!Object.keys(selections).length) {
      alert("Please select at least one material or furniture item first.");
      return;
    }
    setVisible(true);
    setLoading(true);
    setStreamText("");
    setDone(false);

    const prompt = buildPrompt(roomName, selections);
    let full = "";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          stream: true,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error("API " + res.status);

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.type === "content_block_delta" && parsed.delta?.text) {
              full += parsed.delta.text;
              setStreamText(full);
            }
          } catch (_) {}
        }
      }
    } catch {
      full = `Your ${roomName.toLowerCase()} selections establish a promising design direction. Review the notes above and complete any missing categories for a cohesive result.`;
      setStreamText(full);
    }

    setLoading(false);
    setDone(true);
  }

  const cost  = estimateCost(selections);
  const notes = buildNotes(currentRoom, selections);
  const paras = streamText.split(/\n\n+/).filter(Boolean);

  const itemsHtml = Object.entries(selections).map(([k, v]) => (
    <div key={k} className="selection-row">
      <span className="selection-cat">{k}</span>
      <span className="selection-val">{v}</span>
    </div>
  ));

  return (
    <div className="ai-btn-wrap">
      <button className="ai-btn" disabled={loading} onClick={generate}>
        <i className="fa-solid fa-wand-magic-sparkles" />
        <span>{loading ? "Generating…" : done ? "Regenerate AI Summary" : "Generate AI Summary"}</span>
      </button>

      {visible && (
        <div className="ai-panel visible">
          <div className="ai-panel-title">
            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: "var(--gold)", fontSize: 13 }} />
            AI Summary — {roomName}
          </div>

          <p className="ai-section-label" style={{ marginTop: 0 }}>Selected Items</p>
          {itemsHtml}

          <div className="ai-divider" />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
            <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Cost Estimate
            </span>
            <span className={`cost-badge ${cost.cls}`}>{cost.label}</span>
          </div>

          {notes.length > 0 && (
            <>
              <div className="ai-divider" />
              <p className="ai-section-label">Design Notes</p>
              {notes.map((n, i) => (
                <div key={i} className="note-item" dangerouslySetInnerHTML={{ __html: n }} />
              ))}
            </>
          )}

          <div className="ai-divider" />
          <p className="ai-section-label">Analysis</p>
          <div className="ai-stream-body">
            {loading && paras.length === 0 && (
              <p className="cursor-blink" style={{ color: "var(--text-3)", fontStyle: "italic", fontSize: 12 }}>
                Analysing your selections…
              </p>
            )}
            {paras.map((p, i) => (
              <p key={i} className={loading && i === paras.length - 1 ? "cursor-blink" : ""}>
                {p}
              </p>
            ))}
          </div>

          {done && (
            <>
              <div className="ai-divider" />
              <p className="ai-section-label">Next Steps</p>
              <div className="note-item">Review your budget estimate with a supplier</div>
              <div className="note-item">Save and share this design configuration</div>
              <div className="note-item">Request a full moodboard from your designer</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
