import React, { useState } from "react";

export default function AccItem({ name, children }) {
  const [state, setState] = useState(false);
  return (
    <div className="sidebarAccord">
      <div
        className={`sidebarAccord__title ${state ? "active" : ""}`}
        onClick={() => setState(!state)}
      >
        {name} <span></span>
      </div>
      <div className={`sidebarAccord__content ${state ? "active" : ""}`}>
        {children}
      </div>
    </div>
  );
}
