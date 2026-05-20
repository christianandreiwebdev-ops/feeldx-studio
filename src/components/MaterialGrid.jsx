import { OPTIONS } from "../data/rooms";
import { calcProgress } from "../utils/analysis";

export default function MaterialGrid({ currentRoom, selections, onSelect }) {
  const progress = calcProgress(currentRoom, selections);

  return (
    <main className="main">
      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="progress-meta">
          <span className="section-label" style={{ marginBottom: 0 }}>
            Materials &amp; Furniture
          </span>
          <span className="progress-pct">{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Material cards */}
      <div className="material-grid">
        {OPTIONS[currentRoom].map((group) => (
          <div key={group.category} className="material-card">
            <p className="material-card-title">{group.category}</p>
            <div className="material-options">
              {group.items.map((item) => (
                <button
                  key={item}
                  className={`option-btn ${selections[group.category] === item ? "selected" : ""}`}
                  onClick={() => onSelect(group.category, item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
