// These texts were never part of any mainstream Jewish or Christian canon
// except where noted — 1 Enoch and Jubilees are canonical scripture in the
// Ethiopian Orthodox Tewahedo Church specifically, which preserved their
// only complete surviving copies (in Ge'ez).
//
// No free, CORS-enabled JSON API serves their full text, so rather than
// retype tens of thousands of words from memory (and risk introducing
// errors into a document presented as scripture), BAVIBLE links directly to
// the public-domain source editions at the Internet Sacred Text Archive.
// Anyone can copy that text into /src/data/localTexts/ to read it offline
// inside the app — see the README.

export const PSEUDEPIGRAPHA = [
  {
    id: "enoch",
    name: "1 Enoch",
    altName: "The Ethiopic Book of Enoch",
    chapters: 108,
    era: "c. 300–100 BC (composite, several authors)",
    canonWhere: "Ethiopian Orthodox Tewahedo Church only",
    summary:
      "Visions attributed to the antediluvian patriarch Enoch (Genesis 5:24): the fall of the Watchers and origin of the Nephilim, tours of heaven and the places of the dead, and the 'Son of Man' judgment scenes later echoed in the New Testament. Jude 1:14–15 directly quotes it.",
    edition: "R. H. Charles translation, 1917",
    sourceUrl: "https://sacred-texts.com/bib/boe/index.htm",
  },
  {
    id: "jubilees",
    name: "Jubilees",
    altName: "The Little Genesis",
    chapters: 50,
    era: "c. 2nd century BC",
    canonWhere: "Ethiopian Orthodox Tewahedo Church only",
    summary:
      "A retelling of Genesis and part of Exodus as dictated to Moses by an angel, organized around a 49-year 'jubilee' calendar and pressing a 364-day solar calendar against the mainstream lunar one.",
    edition: "R. H. Charles translation, 1902",
    sourceUrl: "https://sacred-texts.com/bib/jub/index.htm",
  },
  {
    id: "jasher",
    name: "The Book of Jasher",
    altName: 'Sepher haYashar ("Book of the Upright")',
    chapters: 91,
    era: "Disputed — see note",
    canonWhere: "Never canonical anywhere",
    summary:
      "Covers Genesis-to-Deuteronomy ground with added narrative detail. Genuinely referenced by name at Joshua 10:13 and 2 Samuel 1:18 — but the book actually referenced there has not survived. Several later works have circulated under this title; the popular English edition read today is an 1840 publication of a Hebrew text printed in 1613, widely judged by scholars to be a late literary composition rather than the ancient work the Bible names.",
    edition: "1840 English edition (Salt Lake City reprint, 1887)",
    sourceUrl: "https://sacred-texts.com/chr/apo/jasher/index.htm",
    scholarlyNote: true,
  },
];
