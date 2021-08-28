import React from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";

export default function Cell({
  row,
  column,
  setSheet,
  sheet,
  text,
  id: idN,
  style,
}) {
  const { id } = useParams();
  const cellId = `R${row}C${column}`;
  const changeText = ({ target: { value: text } }) => {
    setSheet((prev) => ({ ...prev, [cellId]: text }));
    socket.emit("change", {
      row,
      column,
      text,
      sheetId: id,
      sender: socket.id,
    });
  };
  return (
    <div className={"Cell " + (text && "nos")} id={idN} style={style}>
      {text ? (
        <p>{text}</p>
      ) : (
        <input value={sheet[cellId] || ""} onChange={changeText} />
      )}
    </div>
  );
}
