import { ROOMS } from "../data/rooms";

export default function RoomSidebar({ currentRoom, onSelect }) {
  return (
    <aside className="sidebar-left">
      <p className="sidebar-left-label">Room Type</p>
      {Object.entries(ROOMS).map(([key, room]) => (
        <button
          key={key}
          className={`room-btn ${key === currentRoom ? "active" : ""}`}
          onClick={() => onSelect(key)}
        >
          <span className="room-icon-wrap">
            <i className={`fa-solid ${room.icon}`} />
          </span>
          <span>{room.name}</span>
        </button>
      ))}
    </aside>
  );
}
