// Books present in the Douay-Rheims Old Testament beyond the Protestant 39,
// plus the three texts printed as an appendix in many Vulgate editions.
// Canon-status flags are necessarily a simplification — exact contents vary
// by rite and by printed edition — but this reflects the broad consensus.
// dr = slug on thedouayrheims.com API, which hosts the actual verse text.

export const DEUTEROCANON = [
  {
    id: "tobit",
    name: "Tobit",
    altName: "Tobias",
    dr: "tobias",
    chapters: 14,
    era: "c. 225–175 BC",
    summary:
      "A tale of a righteous, blinded exile and his son Tobias, guided by the archangel Raphael, that closes with a hymn of thanksgiving and a vision of a restored Jerusalem.",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "judith",
    name: "Judith",
    dr: "judith",
    chapters: 16,
    era: "c. 2nd century BC",
    summary:
      "A widow of Bethulia beheads the besieging Assyrian general Holofernes, saving her city — one of the Bible's most vivid war narratives.",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "wisdom",
    name: "Wisdom of Solomon",
    dr: "wisdom",
    chapters: 19,
    era: "c. 1st century BC",
    summary:
      "A Greek-language meditation on divine Wisdom, immortality, and the folly of idolatry, written in Solomon's voice by an Alexandrian Jewish author.",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "sirach",
    name: "Sirach",
    altName: "Ecclesiasticus",
    dr: "ecclesiasticus",
    chapters: 51,
    era: "c. 180 BC",
    summary:
      "A long collection of practical, proverbial wisdom by Yeshua ben Sira of Jerusalem, closing with a famous 'Praise of the Ancestors' (ch. 44–50).",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "baruch",
    name: "Baruch",
    dr: "baruch",
    chapters: 6,
    era: "c. 2nd–1st century BC",
    summary:
      "Attributed to Jeremiah's scribe, a book of confession, wisdom poetry, and consolation for exiles; the Letter of Jeremiah is appended as its 6th chapter in the Vulgate.",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "1maccabees",
    name: "1 Maccabees",
    dr: "1-machabees",
    chapters: 16,
    era: "c. 100 BC",
    summary:
      "A sober historical account of the Jewish revolt against the Seleucid Empire and the founding of the Hasmonean dynasty — the source of the Hanukkah story.",
    canon: { catholic: true, orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "2maccabees",
    name: "2 Maccabees",
    dr: "2-machabees",
    chapters: 15,
    era: "c. 2nd–1st century BC",
    summary:
      "A theologically-charged retelling of part of the same revolt, notable for an early, explicit statement of belief in bodily resurrection (ch. 7, 12).",
    canon: { catholic: true, orthodox: true, ethiopian: false },
  },
];

// Printed as an appendix after the New Testament in many historic Vulgate
// and Douay-Rheims editions — 'included but not dogmatically canonical' in
// the Catholic tradition, while functioning as scripture in others.
export const APPENDIX = [
  {
    id: "prayer-of-manasses",
    name: "Prayer of Manasseh",
    dr: "prayer-of-manasses",
    chapters: 1,
    era: "c. 2nd–1st century BC",
    summary:
      "A short penitential psalm placed in the mouth of the wicked King Manasseh of Judah (2 Chronicles 33), read liturgically in several Orthodox churches.",
    canon: { catholic: "appendix", orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "3esdras",
    name: "1 Esdras",
    dr: "3-esdras",
    drNote: "Called '3 Esdras' in the Douay-Rheims appendix, since Ezra/Nehemiah already occupy '1–2 Esdras' there.",
    chapters: 9,
    era: "c. 2nd–1st century BC",
    summary:
      "A Greek variant retelling of Ezra–Nehemiah with an added court tale about King Darius's three bodyguards; canonical scripture in Orthodox Bibles.",
    canon: { catholic: "appendix", orthodox: true, ethiopian: true, protestant: false },
  },
  {
    id: "4esdras",
    name: "2 Esdras",
    altName: "4 Ezra",
    dr: "4-esdras",
    drNote: "Called '4 Esdras' in the Douay-Rheims appendix.",
    chapters: 16,
    era: "c. 1st century AD",
    summary:
      "An apocalyptic work of visions and angelic dialogue wrestling with the destruction of Jerusalem, printed in the Slavonic Bible and the Vulgate appendix.",
    canon: { catholic: "appendix", orthodox: "some", ethiopian: false },
  },
];

export const ALL_APOCRYPHA = [...DEUTEROCANON, ...APPENDIX];
