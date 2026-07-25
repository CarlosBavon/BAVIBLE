import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findCanonBook } from "../../data/canon";
import { ALL_APOCRYPHA } from "../../data/apocrypha";
import { fetchKjvChapter, fetchDouayChapter } from "../../services/bibleApi";
import "./ReaderPane.css";

function findBook(section, bookId) {
  if (section === "canon") return findCanonBook(bookId);
  if (section === "apocrypha") return ALL_APOCRYPHA.find((b) => b.id === bookId) || null;
  return null;
}

export default function ReaderPane({ translation, setTranslation }) {
  const { section, bookId, chapter } = useParams();
  const chapterNum = parseInt(chapter, 10) || 1;
  const book = findBook(section, bookId);

  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [retryCount, setRetryCount] = useState(0);

  // Apocrypha only exists in Douay-Rheims — force that translation for this section.
  const effectiveTranslation = section === "apocrypha" ? "dr" : translation;

  useEffect(() => {
    if (!book) return;
    let cancelled = false;
    setState({ loading: true, error: null, data: null });

    const run = async () => {
      try {
        const data =
          effectiveTranslation === "dr"
            ? await fetchDouayChapter(book.dr, chapterNum)
            : await fetchKjvChapter(book.kjv, chapterNum, effectiveTranslation);
        if (!cancelled) setState({ loading: false, error: null, data });
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err.message, data: null });
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [book, chapterNum, effectiveTranslation, retryCount]);

  if (!book) {
    return (
      <div className="reader reader--empty">
        <p>That book isn't in the library yet.</p>
        <Link to="/">Back to the library</Link>
      </div>
    );
  }

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < book.chapters ? chapterNum + 1 : null;
  const first = state.data?.verses?.[0];
  const rest = state.data?.verses?.slice(1) || [];

  return (
    <article className="reader">
      <header className="reader__head">
        <div>
          <p className="reader__breadcrumb">
            <Link to="/">Library</Link> / {section === "apocrypha" ? "Deuterocanon" : "Canon"}
          </p>
          <h1 className="reader__title">
            {book.name} <span className="reader__chapter-num">{chapterNum}</span>
          </h1>
          {book.drNote && effectiveTranslation === "dr" && <p className="reader__note">{book.drNote}</p>}
        </div>

        {section === "canon" && (
          <div className="reader__translation-switch">
            <button className={translation === "kjv" ? "is-active" : ""} onClick={() => setTranslation("kjv")}>
              KJV
            </button>
            <button className={translation === "web" ? "is-active" : ""} onClick={() => setTranslation("web")}>
              WEB
            </button>
            <button className={translation === "dr" ? "is-active" : ""} onClick={() => setTranslation("dr")}>
              Douay-Rheims
            </button>
          </div>
        )}
        {section === "apocrypha" && <p className="reader__locked-note">Douay-Rheims only — this book has no Protestant-canon translation.</p>}
      </header>

      {state.loading && <p className="reader__status">Fetching {book.name} {chapterNum}…</p>}
      {state.error && (
        <div className="reader__status reader__status--error">
          <p>{state.error}</p>
          <button className="reader__retry" onClick={() => setRetryCount((c) => c + 1)}>
            Try again
          </button>
        </div>
      )}

      {state.data && (
        <>
          <p className="reader__translation-credit">{state.data.translationName}</p>
          <div className="reader__text">
            {first && (
              <p className="reader__opening">
                <span className="reader__dropcap">{first.text.charAt(0)}</span>
                <sup className="reader__vnum">{first.verse}</sup>
                {first.text.slice(1)}
              </p>
            )}
            {rest.map((v) => (
              <p key={v.verse} className="reader__verse">
                <sup className="reader__vnum">{v.verse}</sup>
                {v.text}
              </p>
            ))}
          </div>
        </>
      )}

      <nav className="reader__pager">
        {prevChapter ? (
          <Link to={`/read/${section}/${bookId}/${prevChapter}`}>← Chapter {prevChapter}</Link>
        ) : (
          <span />
        )}
        {nextChapter ? (
          <Link to={`/read/${section}/${bookId}/${nextChapter}`}>Chapter {nextChapter} →</Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
