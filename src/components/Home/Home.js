import React from "react";
import { Link } from "react-router-dom";
import { DEUTEROCANON, APPENDIX } from "../../data/apocrypha";
import { PSEUDEPIGRAPHA } from "../../data/pseudepigrapha";
import "./Home.css";

const TRADITIONS = [
  { id: "protestant", label: "Protestant", books: 66, note: "Settled at the Westminster Assembly, 1647" },
  { id: "catholic", label: "Catholic", books: 73, note: "Fixed at the Council of Trent, 1546" },
  { id: "orthodox", label: "Eastern Orthodox", books: "76–78", note: "Varies by synod; never dogmatically closed" },
  { id: "ethiopian", label: "Ethiopian Orthodox", books: "81+", note: "Includes Enoch & Jubilees as scripture" },
];

export default function Home({ lens, setLens }) {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-initial" aria-hidden="true">
          I
        </div>
        <div className="home__hero-copy">
          <p className="home__eyebrow">A complete scriptural library</p>
          <h1 className="home__title">
            Every book. <br />Every tradition. <br />No omissions.
          </h1>
          <p className="home__lede">
            The 66-book canon in the King James and Douay-Rheims translations, the seven
            Deuterocanonical books and Vulgate appendix removed from Protestant Bibles in
            1885, and the Pseudepigrapha — Enoch, Jubilees, and Jasher — that never made it
            into any mainstream canon at all. Every verse is fetched live from public-domain
            sources; nothing here is paraphrased or summarized.
          </p>
          <div className="home__cta-row">
            <Link className="home__cta home__cta--primary" to="/read/canon/genesis/1">
              Begin at Genesis 1
            </Link>
            <Link className="home__cta" to="/read/apocrypha/tobit/1">
              Start with a removed book
            </Link>
          </div>
        </div>
      </section>

      <section className="home__lens">
        <h2 className="home__section-title">The Canon Lens</h2>
        <p className="home__section-sub">
          "Removed" depends entirely on which tradition you're standing in. Nothing below was
          suppressed or hidden — each column reflects a documented historical decision about
          where to draw the canon's boundary. Choose a lens; it re-shapes the whole library in
          the sidebar.
        </p>
        <div className="home__lens-grid">
          {TRADITIONS.map((t) => (
            <button
              key={t.id}
              className={`home__lens-card ${lens === t.id ? "is-active" : ""}`}
              onClick={() => setLens(t.id)}
            >
              <span className="home__lens-count">{t.books}</span>
              <span className="home__lens-label">{t.label}</span>
              <span className="home__lens-note">{t.note}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home__catalog">
        <div className="home__catalog-col">
          <h3>Deuterocanon &amp; Apocrypha</h3>
          <p className="home__catalog-sub">
            In the Douay-Rheims, live text, chapter by chapter, same as the 66-book canon.
          </p>
          <ul>
            {[...DEUTEROCANON, ...APPENDIX].map((b) => (
              <li key={b.id}>
                <Link to={`/read/apocrypha/${b.id}/1`}>{b.name}</Link>
                <span className="home__catalog-era">{b.era}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="home__catalog-col">
          <h3>Pseudepigrapha</h3>
          <p className="home__catalog-sub">
            Linked to their public-domain source editions — see why in the note below.
          </p>
          <ul>
            {PSEUDEPIGRAPHA.map((b) => (
              <li key={b.id}>
                <a href={b.sourceUrl} target="_blank" rel="noreferrer">
                  {b.name} ↗
                </a>
                <span className="home__catalog-era">{b.canonWhere}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home__note">
        <h3>A note on sourcing</h3>
        <p>
          Every verse you'll read here is fetched live from two public-domain archives — the
          King James Version and World English Bible via bible-api.com, and the
          Douay-Rheims (with its Deuterocanon and Vulgate appendix) via thedouayrheims.com.
          For Enoch, Jubilees, and Jasher, no free API with browser access exists, so rather
          than retype tens of thousands of words from memory and risk quietly corrupting a
          text presented as scripture, BAVIBLE links straight to the R. H. Charles and 1840
          public-domain editions hosted at the Internet Sacred Text Archive.
        </p>
      </section>
    </div>
  );
}
