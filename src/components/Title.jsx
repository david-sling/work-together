import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Title() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const copyId = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="Title">
      <h1>{id}</h1>
      <button className={copied ? "copied" : ""} onClick={copyId}>
        <p>{copied ? "LINK COPIED" : "COPY LINK"}</p>
      </button>
    </div>
  );
}
