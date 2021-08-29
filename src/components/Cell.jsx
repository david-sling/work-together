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
  setActiveCell,
  activeCell,
}) {
  const { id } = useParams();
  const cellId = `R${row}C${column}`;
  const raw = text || sheet[cellId] || "";
  const [calc, setCalc] = useState(raw);
  const [showRaw, setShowRaw] = useState(false);

  const getCalc = (raw) => {
    var str = raw.split("=")[1];
    console.log({ str });
    try {
      str = str.replace(/\#\{([^#]+)\}/g, function (match, key) {
        const address = key.toUpperCase();
        const val = sheet[address] || 0;
        var num = parseInt(val);
        num = isNaN(num) ? 0 : num;
        console.log({ address, val, key, num });
        return num;
      });
      var result = stringMath(str);
      console.log({ calc: result });
    } catch (error) {
      console.log({ raw });
      var result = raw;
    }
    return result;
  };

  useEffect(() => {
    const isExp = raw[0] == "=" && raw.length > 1;
    if (isExp) return setCalc(getCalc(raw));
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
          onFocus={() => {
            setShowRaw(true);
            setActiveCell({ row, column });
          }}
          onBlur={() => setShowRaw(false)}
          value={showRaw ? raw : calc}
          onChange={changeText}
        />
      )}
    </div>
  );
}
