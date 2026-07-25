import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { OT_GROUPS, NT_GROUPS } from "../../data/canon";
import { DEUTEROCANON, APPENDIX } from "../../data/apocrypha";
import { PSEUDEPIGRAPHA } from "../../data/pseudepigrapha";
import "./Sidebar.css";

function statusFor(book, lens) {
  if (lens === "all") return "in";
  const flag = book.canon ? book.canon[lens] : true; // canonical 66 has no .canon => always in
  if (flag === true) return "in";
  if (flag === "appendix" || flag === "some") return "partial";
  return "out";
}

function Group({ title, subtitle, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="sidebar__group">
      <button className="sidebar__group-head" onClick={() => setOpen((v) => !v)}>
        <span className={`sidebar__chevron ${open ? "is-open" : ""}`}>›</span>
        <span className="sidebar__group-title">{title}</span>
        {subtitle && <span className="sidebar__group-subtitle">{subtitle}</span>}
      </button>
      {open && <div className="sidebar__group-body">{children}</div>}
    </div>
  );
}

export default function Sidebar({ lens, open, onNavigate }) {
  return (
    <nav className={`sidebar ${open ? "is-open" : ""}`} aria-label="Table of contents">
      <div className="sidebar__section-label">Old Testament</div>
      {OT_GROUPS.map((g) => (
        <Group key={g.id} title={g.label} subtitle={g.subtitle}>
          {g.books.map((b) => (
            <NavLink
              key={b.id}
              to={`/read/canon/${b.id}/1`}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar__book status-in ${isActive ? "is-active" : ""}`}
            >
              {b.name}
            </NavLink>
          ))}
        </Group>
      ))}

      <div className="sidebar__section-label">New Testament</div>
      {NT_GROUPS.map((g) => (
        <Group key={g.id} title={g.label} subtitle={g.subtitle}>
          {g.books.map((b) => (
            <NavLink
              key={b.id}
              to={`/read/canon/${b.id}/1`}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar__book status-in ${isActive ? "is-active" : ""}`}
            >
              {b.name}
            </NavLink>
          ))}
        </Group>
      ))}

      <div className="sidebar__section-label">Deuterocanon &amp; Apocrypha</div>
      <Group title="Removed from the Protestant canon" subtitle="Douay-Rheims only" defaultOpen>
        {DEUTEROCANON.map((b) => {
          const status = statusFor(b, lens);
          return (
            <NavLink
              key={b.id}
              to={`/read/apocrypha/${b.id}/1`}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar__book status-${status} ${isActive ? "is-active" : ""}`}
            >
              {b.name}
              {status === "out" && <span className="sidebar__dot" title="Not in this tradition's canon" />}
            </NavLink>
          );
        })}
      </Group>
      <Group title="Vulgate appendix" subtitle="printed after Revelation">
        {APPENDIX.map((b) => {
          const status = statusFor(b, lens);
          return (
            <NavLink
              key={b.id}
              to={`/read/apocrypha/${b.id}/1`}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar__book status-${status} ${isActive ? "is-active" : ""}`}
            >
              {b.name}
              {status === "out" && <span className="sidebar__dot" title="Not in this tradition's canon" />}
            </NavLink>
          );
        })}
      </Group>

      <div className="sidebar__section-label">Pseudepigrapha</div>
      <Group title="Never in the mainstream canon" subtitle="external, public-domain source" defaultOpen>
        {PSEUDEPIGRAPHA.map((b) => (
          <a key={b.id} className="sidebar__book status-external" href={b.sourceUrl} target="_blank" rel="noreferrer">
            {b.name} <span className="sidebar__ext">↗</span>
          </a>
        ))}
      </Group>
    </nav>
  );
}
