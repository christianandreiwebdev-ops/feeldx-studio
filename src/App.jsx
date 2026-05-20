import { useState } from "react";
import { ROOMS, OPTIONS } from "./data/rooms";
import Header       from "./components/Header";
import RoomSidebar  from "./components/RoomSidebar";
import MaterialGrid from "./components/MaterialGrid";
import SummaryPanel from "./components/SummaryPanel";

export default function App() {
  const [currentRoom, setCurrentRoom] = useState("kitchen");
  const [selections,  setSelections]  = useState({});

  function handleRoomSelect(key) {
    setCurrentRoom(key);
    setSelections({});
  }

  function handleMaterialSelect(category, item) {
    setSelections((prev) => ({ ...prev, [category]: item }));
  }

  const room = ROOMS[currentRoom];

  return (
    <>
      <Header />
      <div className="shell">
        <RoomSidebar
          currentRoom={currentRoom}
          onSelect={handleRoomSelect}
        />
        <MaterialGrid
          currentRoom={currentRoom}
          selections={selections}
          onSelect={handleMaterialSelect}
        />
        <SummaryPanel
          currentRoom={currentRoom}
          room={room}
          selections={selections}
        />
      </div>
    </>
  );
}
