import AiPanel from "./AiPanel";

export default function SummaryPanel({ currentRoom, room, selections }) {
  return (
    <aside className="sidebar-right">
      {/* Room visual — top */}
      <div
        className="room-visual"
        style={{ background: room.grad }}
      >
        <div className="room-visual-inner">
          <i
            className={`fa-solid ${room.icon}`}
            style={{ color: room.iconColor }}
          />
          <p>Room Preview</p>
        </div>
      </div>

      {/* Selections + AI — bottom, space-between */}
      <div className="sidebar-bottom">
        <div className="selection-list">
          <p className="section-label">Current Selection</p>
          {Object.keys(selections).length === 0 ? (
            <p className="selection-empty">Make selections to see them here.</p>
          ) : (
            Object.entries(selections).map(([cat, val]) => (
              <div key={cat} className="selection-row">
                <span className="selection-cat">{cat}</span>
                <span className="selection-val">{val}</span>
              </div>
            ))
          )}
        </div>

        <AiPanel
          currentRoom={currentRoom}
          roomName={room.name}
          selections={selections}
        />
      </div>
    </aside>
  );
}
