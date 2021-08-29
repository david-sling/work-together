import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import Cell from "./Cell";
import Raw from "./Raw";

export default function Sheet() {
  const [firstLoad, setFirstLoad] = useState(true);
  const { id } = useParams();
  const [sheet, setSheet] = useState({});
  const [dimensions, setDimensions] = useState({
    rows: 20,
    columns: 20,
  });

  const [activeCell, setActiveCell] = useState({ row: 1, column: 1 });

  const rows = Array.apply(null, Array(dimensions.rows + 1)).map((_, rIdx) =>
    Array.apply(null, Array(dimensions.columns + 1)).map((_, cIdx) => ({
      row: rIdx,
      column: cIdx,
    }))
  );

  useEffect(() => {
    console.log({ sheet });
  }, [sheet]);

  useEffect(() => {
    socket.on(id, ({ column, row, text, sender }) => {
      if (sender == socket.id) return;
      setSheet((prev) => ({ ...prev, [`R${row}C${column}`]: text }));
    });
  }, []);

  return (
    <div className="Sheet">
      <Raw
        sheet={sheet}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
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
            {cells.map(
              (cell, cIdx) =>
                !!cIdx && (
                  <>
                    {!rIdx ? (
                      <Cell text={cIdx + ""} id="column" />
                    ) : (
                      <Cell
                        key={cell.column}
                        {...cell}
                        setSheet={setSheet}
                        sheet={sheet}
                        setActiveCell={setActiveCell}
                        activeCell={activeCell}
                      />
                    )}
                  </>
                )
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setDimensions(({ rows, columns }) => ({ columns, rows: 20 + rows }))
        }
      >
        SHOW MORE ROWS
      </button>
    </div>
  );
}
