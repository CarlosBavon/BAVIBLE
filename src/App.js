import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import TopBar from "./components/Layout/TopBar";
import Home from "./components/Home/Home";
import ReaderPane from "./components/Reader/ReaderPane";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import "./App.css";

export default function App() {
  const [translation, setTranslation] = useState("kjv"); // "kjv" | "web" | "dr"
  const [lens, setLens] = useState("protestant"); // canon lens: protestant | catholic | orthodox | ethiopian | all
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const online = useOnlineStatus();

  return (
    <div className="bavible-shell">
      {!online && (
        <div className="bavible-offline-banner" role="status">
          Offline — showing previously loaded chapters. New ones will load once you're back online.
        </div>
      )}
      <TopBar
        translation={translation}
        setTranslation={setTranslation}
        lens={lens}
        setLens={setLens}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="bavible-body">
        <Sidebar lens={lens} open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <div className="bavible-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}
        <main className="bavible-main">
          <Routes>
            <Route path="/" element={<Home lens={lens} setLens={setLens} />} />
            <Route
              path="/read/:section/:bookId/:chapter"
              element={<ReaderPane translation={translation} setTranslation={setTranslation} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
