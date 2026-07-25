// The 66-book canon common to virtually every Christian tradition.
// `kjv` = query key for bible-api.com (KJV / WEB translations)
// `dr`  = book slug for thedouayrheims.com API (Douay-Rheims, 1582-1610/1752)
// Chapter counts are the standard divisions; a handful of DR books use
// different chapter breaks (esp. Psalms) — the reader falls back gracefully
// if a chapter number is out of range for the chosen translation.

export const OT_GROUPS = [
  {
    id: "torah",
    label: "The Law",
    subtitle: "Torah / Pentateuch",
    books: [
      { id: "genesis", name: "Genesis", chapters: 50, kjv: "genesis", dr: "genesis" },
      { id: "exodus", name: "Exodus", chapters: 40, kjv: "exodus", dr: "exodus" },
      { id: "leviticus", name: "Leviticus", chapters: 27, kjv: "leviticus", dr: "leviticus" },
      { id: "numbers", name: "Numbers", chapters: 36, kjv: "numbers", dr: "numbers" },
      { id: "deuteronomy", name: "Deuteronomy", chapters: 34, kjv: "deuteronomy", dr: "deuteronomy" },
    ],
  },
  {
    id: "historical",
    label: "History",
    subtitle: "Historical books",
    books: [
      { id: "joshua", name: "Joshua", chapters: 24, kjv: "joshua", dr: "josue", drNote: "Douay: Josue" },
      { id: "judges", name: "Judges", chapters: 21, kjv: "judges", dr: "judges" },
      { id: "ruth", name: "Ruth", chapters: 4, kjv: "ruth", dr: "ruth" },
      { id: "1samuel", name: "1 Samuel", chapters: 31, kjv: "1 samuel", dr: "1-kings", drNote: "Douay: 1 Kings" },
      { id: "2samuel", name: "2 Samuel", chapters: 24, kjv: "2 samuel", dr: "2-kings", drNote: "Douay: 2 Kings" },
      { id: "1kings", name: "1 Kings", chapters: 22, kjv: "1 kings", dr: "3-kings", drNote: "Douay: 3 Kings" },
      { id: "2kings", name: "2 Kings", chapters: 25, kjv: "2 kings", dr: "4-kings", drNote: "Douay: 4 Kings" },
      { id: "1chronicles", name: "1 Chronicles", chapters: 29, kjv: "1 chronicles", dr: "1-paralipomenon", drNote: "Douay: 1 Paralipomenon" },
      { id: "2chronicles", name: "2 Chronicles", chapters: 36, kjv: "2 chronicles", dr: "2-paralipomenon", drNote: "Douay: 2 Paralipomenon" },
      { id: "ezra", name: "Ezra", chapters: 10, kjv: "ezra", dr: "1-esdras", drNote: "Douay: 1 Esdras" },
      { id: "nehemiah", name: "Nehemiah", chapters: 13, kjv: "nehemiah", dr: "2-esdras", drNote: "Douay: 2 Esdras" },
      { id: "esther", name: "Esther", chapters: 10, kjv: "esther", dr: "esther" },
    ],
  },
  {
    id: "wisdom",
    label: "Wisdom & Poetry",
    subtitle: "Poetic & wisdom books",
    books: [
      { id: "job", name: "Job", chapters: 42, kjv: "job", dr: "job" },
      { id: "psalms", name: "Psalms", chapters: 150, kjv: "psalms", dr: "psalms", drNote: "Douay numbering shifts by ~1 from Ps. 10–147" },
      { id: "proverbs", name: "Proverbs", chapters: 31, kjv: "proverbs", dr: "proverbs" },
      { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12, kjv: "ecclesiastes", dr: "ecclesiastes" },
      { id: "songofsolomon", name: "Song of Solomon", chapters: 8, kjv: "song of solomon", dr: "canticle-of-canticles", drNote: "Douay: Canticle of Canticles" },
    ],
  },
  {
    id: "major-prophets",
    label: "Major Prophets",
    subtitle: "",
    books: [
      { id: "isaiah", name: "Isaiah", chapters: 66, kjv: "isaiah", dr: "isaie", drNote: "Douay: Isaie" },
      { id: "jeremiah", name: "Jeremiah", chapters: 52, kjv: "jeremiah", dr: "jeremie", drNote: "Douay: Jeremy" },
      { id: "lamentations", name: "Lamentations", chapters: 5, kjv: "lamentations", dr: "lamentations" },
      { id: "ezekiel", name: "Ezekiel", chapters: 48, kjv: "ezekiel", dr: "ezechiel", drNote: "Douay: Ezechiel" },
      { id: "daniel", name: "Daniel", chapters: 12, kjv: "daniel", dr: "daniel" },
    ],
  },
  {
    id: "minor-prophets",
    label: "Minor Prophets",
    subtitle: "The Twelve",
    books: [
      { id: "hosea", name: "Hosea", chapters: 14, kjv: "hosea", dr: "osee", drNote: "Douay: Osee" },
      { id: "joel", name: "Joel", chapters: 3, kjv: "joel", dr: "joel" },
      { id: "amos", name: "Amos", chapters: 9, kjv: "amos", dr: "amos" },
      { id: "obadiah", name: "Obadiah", chapters: 1, kjv: "obadiah", dr: "abdias", drNote: "Douay: Abdias" },
      { id: "jonah", name: "Jonah", chapters: 4, kjv: "jonah", dr: "jonas", drNote: "Douay: Jonas" },
      { id: "micah", name: "Micah", chapters: 7, kjv: "micah", dr: "micheas", drNote: "Douay: Micheas" },
      { id: "nahum", name: "Nahum", chapters: 3, kjv: "nahum", dr: "nahum" },
      { id: "habakkuk", name: "Habakkuk", chapters: 3, kjv: "habakkuk", dr: "habacuc", drNote: "Douay: Habacuc" },
      { id: "zephaniah", name: "Zephaniah", chapters: 3, kjv: "zephaniah", dr: "sophonias", drNote: "Douay: Sophonias" },
      { id: "haggai", name: "Haggai", chapters: 2, kjv: "haggai", dr: "aggeus", drNote: "Douay: Aggeus" },
      { id: "zechariah", name: "Zechariah", chapters: 14, kjv: "zechariah", dr: "zacharias", drNote: "Douay: Zacharias" },
      { id: "malachi", name: "Malachi", chapters: 4, kjv: "malachi", dr: "malachie", drNote: "Douay: Malachie" },
    ],
  },
];

export const NT_GROUPS = [
  {
    id: "gospels",
    label: "The Gospels",
    subtitle: "",
    books: [
      { id: "matthew", name: "Matthew", chapters: 28, kjv: "matthew", dr: "matthew" },
      { id: "mark", name: "Mark", chapters: 16, kjv: "mark", dr: "mark" },
      { id: "luke", name: "Luke", chapters: 24, kjv: "luke", dr: "luke" },
      { id: "john", name: "John", chapters: 21, kjv: "john", dr: "john" },
    ],
  },
  {
    id: "history-nt",
    label: "History",
    subtitle: "",
    books: [{ id: "acts", name: "Acts", chapters: 28, kjv: "acts", dr: "acts" }],
  },
  {
    id: "pauline",
    label: "Pauline Epistles",
    subtitle: "",
    books: [
      { id: "romans", name: "Romans", chapters: 16, kjv: "romans", dr: "romans" },
      { id: "1corinthians", name: "1 Corinthians", chapters: 16, kjv: "1 corinthians", dr: "1-corinthians" },
      { id: "2corinthians", name: "2 Corinthians", chapters: 13, kjv: "2 corinthians", dr: "2-corinthians" },
      { id: "galatians", name: "Galatians", chapters: 6, kjv: "galatians", dr: "galatians" },
      { id: "ephesians", name: "Ephesians", chapters: 6, kjv: "ephesians", dr: "ephesians" },
      { id: "philippians", name: "Philippians", chapters: 4, kjv: "philippians", dr: "philippians" },
      { id: "colossians", name: "Colossians", chapters: 4, kjv: "colossians", dr: "colossians" },
      { id: "1thessalonians", name: "1 Thessalonians", chapters: 5, kjv: "1 thessalonians", dr: "1-thessalonians" },
      { id: "2thessalonians", name: "2 Thessalonians", chapters: 3, kjv: "2 thessalonians", dr: "2-thessalonians" },
      { id: "1timothy", name: "1 Timothy", chapters: 6, kjv: "1 timothy", dr: "1-timothy" },
      { id: "2timothy", name: "2 Timothy", chapters: 4, kjv: "2 timothy", dr: "2-timothy" },
      { id: "titus", name: "Titus", chapters: 3, kjv: "titus", dr: "titus" },
      { id: "philemon", name: "Philemon", chapters: 1, kjv: "philemon", dr: "philemon" },
    ],
  },
  {
    id: "general",
    label: "General Epistles",
    subtitle: "",
    books: [
      { id: "hebrews", name: "Hebrews", chapters: 13, kjv: "hebrews", dr: "hebrews" },
      { id: "james", name: "James", chapters: 5, kjv: "james", dr: "james" },
      { id: "1peter", name: "1 Peter", chapters: 5, kjv: "1 peter", dr: "1-peter" },
      { id: "2peter", name: "2 Peter", chapters: 3, kjv: "2 peter", dr: "2-peter" },
      { id: "1john", name: "1 John", chapters: 5, kjv: "1 john", dr: "1-john" },
      { id: "2john", name: "2 John", chapters: 1, kjv: "2 john", dr: "2-john" },
      { id: "3john", name: "3 John", chapters: 1, kjv: "3 john", dr: "3-john" },
      { id: "jude", name: "Jude", chapters: 1, kjv: "jude", dr: "jude" },
    ],
  },
  {
    id: "apocalyptic",
    label: "Apocalypse",
    subtitle: "",
    books: [{ id: "revelation", name: "Revelation", chapters: 22, kjv: "revelation", dr: "apocalypse", drNote: "Douay: Apocalypse" }],
  },
];

export const ALL_CANON_GROUPS = [...OT_GROUPS, ...NT_GROUPS];

export function findCanonBook(bookId) {
  for (const group of ALL_CANON_GROUPS) {
    const book = group.books.find((b) => b.id === bookId);
    if (book) return book;
  }
  return null;
}
