import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Sheet from "../components/Sheet";
import Title from "../components/Title";
import useLocalStorage from "../hooks/useLocalStorage";

export default function File() {
  const { id } = useParams();
  const [, setList] = useLocalStorage("list", []);
  useState(() => {
    if (!id) return;
    setList((prev) => [...prev.filter((i) => i != id), id]);
  }, [id]);
  return (
    <div>
      <Title />
      <Sheet />
    </div>
  );
}
