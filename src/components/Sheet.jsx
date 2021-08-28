import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import Cell from "./Cell";

export default function Sheet() {
  const [firstLoad, setFirstLoad] = useState(true);
  const { id } = useParams();
  const [sheet, setSheet] = useState({});
  const [dimensions, setDimensions] = useState({
    rows: 21,
    columns: 20,
  });

  const rows = Array.apply(null, Array(dimensions.rows)).map((_, rIdx) =>
    Array.apply(null, Array(dimensions.columns)).map((_, cIdx) => ({
      row: rIdx,
      column: cIdx,
    }))
  );

  useEffect(() => {
    socket.on(id, ({ column, row, text, sender }) => {
      if (sender == socket.id) return;
      setSheet((prev) => ({ ...prev, [`R${row}C${column}`]: text }));
    });
  }, []);

  return (
    <div className="Sheet">
      <div className="grid">
        {rows.map((cells, rIdx) => (
          <div
            key={cells[0].row}
            style={{
              display: "flex",
            }}
          >
            {
              <Cell
                text={rIdx + ""}
                id={"R" + rIdx}
                // style={!rIdx && { visibility: "none" }}
              />
            }
            {cells.map((cell, cIdx) => (
              <>
                {!rIdx ? (
                  <Cell text={cIdx + 1 + ""} id="column" />
                ) : (
                  <Cell
                    key={cell.column}
                    {...cell}
                    setSheet={setSheet}
                    sheet={sheet}
                  />
                )}
              </>
            ))}
          </div>
        ))}
        <button
          onClick={() =>
            setDimensions(({ rows, columns }) => ({ columns, rows: 20 + rows }))
          }
        >
          SHOW MORE ROWS
        </button>
      </div>
    </div>
  );
}
