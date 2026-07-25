import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopBar.css";

const TRANSLATIONS = [
  { id: "kjv", label: "KJV", full: "King James Version, 1611" },
  { id: "web", label: "WEB", full: "World English Bible" },
  { id: "dr", label: "D-R", full: "Douay-Rheims, 1582–1610" },
];

const LENSES = [
  { id: "protestant", label: "Protestant" },
  { id: "catholic", label: "Catholic" },
  { id: "orthodox", label: "Orthodox" },
  { id: "ethiopian", label: "Ethiopian" },
  { id: "all", label: "Every tradition" },
];

export default function TopBar({ translation, setTranslation, lens, setLens, onToggleSidebar }) {
  const [controlsOpen, setControlsOpen] = useState(false);
  const location = useLocation();

  // Close the mobile controls panel whenever the route changes (e.g. after
  // tapping a chapter link), same as the sidebar does.
  useEffect(() => {
    setControlsOpen(false);
  }, [location.pathname]);

  const activeTranslation = TRANSLATIONS.find((t) => t.id === translation);
  const activeLens = LENSES.find((l) => l.id === lens);

  return (
    <header className="topbar">
      <div className="topbar__row">
        <button
          className="topbar__burger"
          onClick={onToggleSidebar}
          aria-label="Toggle table of contents"
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="topbar__wordmark">
          <span className="topbar__glyph">✠</span>
          <span className="topbar__title">BAVIBLE</span>
        </Link>

        <div className="topbar__controls topbar__controls--desktop">
          <div className="topbar__group" role="group" aria-label="Translation">
            {TRANSLATIONS.map((t) => (
              <button
                key={t.id}
                className={`topbar__pill ${translation === t.id ? "is-active" : ""}`}
                onClick={() => setTranslation(t.id)}
                title={t.full}
              >
                {t.label}
              </button>
            ))}
          </div>

          <label className="topbar__lens">
            <span className="topbar__lens-label">Canon lens</span>
            <select value={lens} onChange={(e) => setLens(e.target.value)}>
              {LENSES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="topbar__options-toggle"
          onClick={() => setControlsOpen((v) => !v)}
          aria-expanded={controlsOpen}
          aria-controls="topbar-mobile-controls"
        >
          <span className="topbar__options-summary">
            {activeTranslation?.label} · {activeLens?.label}
          </span>
          <span className={`topbar__options-caret ${controlsOpen ? "is-open" : ""}`}>⌄</span>
        </button>
      </div>

      <div id="topbar-mobile-controls" className={`topbar__controls topbar__controls--mobile ${controlsOpen ? "is-open" : ""}`}>
        <div className="topbar__mobile-block">
          <span className="topbar__mobile-label">Translation</span>
          <div className="topbar__group topbar__group--mobile" role="group" aria-label="Translation">
            {TRANSLATIONS.map((t) => (
              <button
                key={t.id}
                className={`topbar__pill ${translation === t.id ? "is-active" : ""}`}
                onClick={() => setTranslation(t.id)}
                title={t.full}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="topbar__mobile-block">
          <span className="topbar__mobile-label">Canon lens</span>
          <select value={lens} onChange={(e) => setLens(e.target.value)}>
            {LENSES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
