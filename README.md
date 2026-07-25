# BAVIBLE — A Complete Scriptural Library

A Create React App project: the 66-book canon (KJV, WEB, and Douay-Rheims), the
Deuterocanon/Apocrypha removed from Protestant Bibles in 1885, and pointers to
the Pseudepigrapha (Enoch, Jubilees, Jasher) that never entered any mainstream
canon at all. Plain CSS throughout, no UI framework.

## Running it

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. This is a normal CRA app — `npm run build`
produces a static `build/` folder you can deploy anywhere (Netlify, Vercel,
GitHub Pages, S3, etc.).

## Where the text comes from

Nothing is bundled or retyped — every chapter is fetched live, in your
browser, from free public-domain sources, no API keys required:

| Content | Source | Notes |
|---|---|---|
| 66-book canon, KJV/WEB | [bible-api.com](https://bible-api.com) | Public domain translations |
| 66-book canon + Deuterocanon + Vulgate appendix, Douay-Rheims | [thedouayrheims.com/api](https://thedouayrheims.com/api) | Includes footnotes/cross-refs in the raw response, not currently surfaced in the UI |
| Enoch, Jubilees, Jasher | [sacred-texts.com](https://sacred-texts.com) | Linked externally — see below |

**Why Enoch/Jubilees/Jasher are links, not embedded text:** no free API
serving these exists with the CORS headers a browser app needs, and these are
long works (tens of thousands of words each). Rather than retype them from
memory — with real risk of silently introducing errors into a text presented
as scripture — the app links straight to the actual public-domain editions.

If you want them readable *inside* the app instead:

1. Copy the plain text from the linked sacred-texts.com pages into a file
   under `src/data/localTexts/` (e.g. `enoch.json`, one entry per chapter).
2. Add a `local: true` flag and the chapter data to the corresponding entry
   in `src/data/pseudepigrapha.js`.
3. Extend `ReaderPane.js` with a branch that reads from the local file
   instead of calling the API when `local` is set.

The code is structured so that's a small, mechanical change.

## A note on "removed" books

The Deuterocanon (Tobit, Judith, Wisdom, Sirach, Baruch, 1–2 Maccabees, plus
the Prayer of Manasseh and 1–2 Esdras appendix) were part of the King James
Bible until 1885 and remain in Catholic and Orthodox Bibles today — they
aren't secret, just differently canonized. The Pseudepigrapha (Enoch,
Jubilees, Jasher) were never in the mainstream Jewish or Christian canon,
except that Enoch and Jubilees are canonical scripture specifically in the
Ethiopian Orthodox Tewahedo Church. `src/data/apocrypha.js` and
`src/data/pseudepigrapha.js` carry short historical notes on each book.

## Offline mode (PWA)

The app is a installable PWA with a Workbox service worker (`src/service-worker.js`):

- **App shell** (JS/CSS/fonts/icons) is precached on first visit, so the app
  itself opens instantly offline, including deep links like
  `/read/canon/genesis/1` — a navigation fallback serves the cached
  `index.html` and React Router takes it from there.
- **Scripture chapters** use a **network-first** strategy: online, you always
  get a fresh fetch from bible-api.com / thedouayrheims.com; if that fails or
  times out (6s), it falls back to whatever was cached from the last time you
  read that exact chapter. So anything you've opened once stays readable
  offline — the library just doesn't pre-download the whole Bible up front.
- A small gold banner appears at the top when the browser goes offline.

No extra setup needed — `npm run build` includes the service worker
automatically (CRA detects `src/service-worker.js` and wires up Workbox's
`InjectManifest` plugin under the hood). It only activates on HTTPS or
`localhost`, per the Service Worker spec, so test it against `npm run build`
+ `npx serve build` rather than `npm start` (dev server doesn't register it).

## Project structure

```
src/
  data/
    canon.js           66-book metadata (chapters, API slugs per translation)
    apocrypha.js        Deuterocanon + Vulgate appendix metadata
    pseudepigrapha.js    Enoch / Jubilees / Jasher metadata + source links
  services/
    bibleApi.js          fetch functions for both live APIs
  components/
    Layout/               TopBar (translation + canon lens), Sidebar (nav)
    Home/                  Landing page, canon-lens comparison
    Reader/                Chapter reader with drop caps, verse numbers, pager
```

## Extending it

- **Search:** `services/bibleApi.js` already exports `searchDouay()` against
  the Douay-Rheims full-text search endpoint — wire it into a search box.
- **More translations:** bible-api.com also serves `bbe` (Bible in Basic
  English) and others — add to the `TRANSLATIONS` list in `TopBar.js`.
- **Offline/local text:** see the Enoch/Jubilees/Jasher note above — the same
  pattern works for any translation you'd rather bundle than fetch live.
