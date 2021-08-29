import React from "react";

export default function Raw({
  sheet,
  activeCell: { row, column },
  setActiveCell,
}) {
  const address = `R${row}C${column}`;
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <p>{address}:</p>
      <p type="text">{sheet[address]}</p>
    </div>
  );
}
