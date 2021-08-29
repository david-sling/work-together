import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import stringMath from "string-math";

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
  const raw = text || sheet[cellId] || "";
  const [calc, setCalc] = useState(raw);
  const [showRaw, setShowRaw] = useState(false);

  const getCalc = (raw) => {
    const str = raw.split("=")[1];
    try {
      var result = stringMath(str);
    } catch (error) {
      var result = raw;
    }
    return result;
  };

  useEffect(() => {
    const isExp = raw[0] == "=" && raw.length > 1;
    if (isExp) {
      const result = getCalc(raw);
      return setCalc(result);
    }
    setCalc(raw);
  }, [raw]);

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
    <div className={"Cell " + (text ? "nos" : "")} id={idN} style={style}>
      {text ? (
        <p>{text}</p>
      ) : (
        <input
          onFocus={() => setShowRaw(true)}
          onBlur={() => setShowRaw(false)}
          value={showRaw ? raw : calc}
          onChange={changeText}
        />
      )}
    </div>
  );
}
