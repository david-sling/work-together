import { Delete, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [search, setSearch] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [list, setList] = useLocalStorage("list", []);

  const submit = (e) => {
    e.preventDefault();
    setRedirect(`/${search}`);
  };
  const remove = (id) => setList((prev) => prev.filter((i) => i != id));

  if (redirect) return <Redirect to={redirect} />;
  return (
    <div className="Home">
      <h1>WORK TOGETHER</h1>
      <form action="submit" className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Enter id"
        />
        <Link to={`/${search}`}>
          <button type="submit">
            <Search />
          </button>
        </Link>
      </form>
      <div className="list">
        <h6>
          {list.length || "NO "} RECENT FILE{list.length == 1 ? "" : "S"}
        </h6>
        {list.map((item) => (
          <div className="item">
            <Link to={`/${item}`}>
              <p>{item}</p>
            </Link>
            <Delete onClick={() => remove(item)} />
          </div>
        ))}
      </div>
    </div>
  );
}
