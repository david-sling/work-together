import React from "react";
import { useParams } from "react-router-dom";
import Sheet from "../components/Sheet";
import Title from "../components/Title";

export default function File() {
  return (
    <div>
      <Title />
      <Sheet />
    </div>
  );
}
