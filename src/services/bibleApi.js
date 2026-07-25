// All scripture text in BAVIBLE is fetched live, at read-time, from free,
// public-domain, no-API-key sources. Nothing is bundled or paraphrased.
//
//  - KJV / WEB (66-book canon):  bible-api.com            (sends CORS headers)
//  - Douay-Rheims (66-book canon + Deuterocanon + appendix): thedouayrheims.com
//
// thedouayrheims.com's API does not appear to send
// `Access-Control-Allow-Origin`, so a direct browser fetch() to it fails
// with a generic "Failed to fetch" (that's the browser's fetch() throwing a
// network-level TypeError for a blocked cross-origin request, not an HTTP
// error — res.ok / res.status never even get reached). fetchJson() below
// tries the direct request first and, only on that specific failure mode,
// automatically retries through a public read-only CORS proxy so the app
// keeps working without you having to run your own backend.

const KJV_BASE = "https://bible-api.com";
const DR_BASE = "";
const REQUEST_TIMEOUT_MS = 12000;
const PROXIES = [
  (url) => url, // direct
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

class HttpError extends Error {
  constructor(status, label) {
    super(`${label} responded with an error (HTTP ${status}).`);
    this.status = status;
  }
}

async function fetchWithTimeout(url, ms = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch JSON from `url`. If the direct request fails at the network level
 * (CORS block, DNS failure, offline — anything that makes fetch() itself
 * reject rather than resolve with a status code), retry once through a
 * CORS proxy before giving up.
 */
async function fetchJson(url, { label } = {}) {
  for (const proxy of PROXIES) {
    try {
      const res = await fetchWithTimeout(proxy(url));

      if (!res.ok) {
        throw new HttpError(res.status, label || url);
      }

      return await res.json();
    } catch (err) {
      if (err instanceof HttpError) {
        throw err;
      }
    }
  }

  throw new Error(
    `Couldn't reach ${label || "the source"}. Check your network or CORS restrictions.`
  );
}

/**
 * Fetch a chapter in the King James Version or World English Bible.
 * @param {string} kjvBookName - e.g. "genesis", "1 corinthians"
 * @param {number} chapter
 * @param {"kjv"|"web"} translation
 */
export async function fetchKjvChapter(kjvBookName, chapter, translation = "kjv") {
  const ref = encodeURIComponent(`${kjvBookName} ${chapter}`);
  const data = await fetchJson(`${KJV_BASE}/${ref}?translation=${translation}`, {
    label: `${kjvBookName} ${chapter} (${translation.toUpperCase()})`,
  });
  if (!data.verses || data.verses.length === 0) {
    throw new Error(`No verses came back for ${kjvBookName} ${chapter}. That chapter may not exist.`);
  }
  return {
    reference: data.reference,
    translationName: data.translation_name,
    verses: data.verses.map((v) => ({ verse: v.verse, text: v.text.trim() })),
  };
}

/**
 * Fetch a chapter in the Douay-Rheims (covers the 66-book canon, the
 * Deuterocanon, and the Vulgate appendix — same API, same shape).
 * @param {string} drSlug - e.g. "genesis", "tobias", "3-esdras"
 * @param {number} chapter
 */
export async function fetchDouayChapter(drSlug, chapter) {
  const data = await fetchJson(`${DR_BASE}/api/chapter/${drSlug}/${chapter}`, {
    label: `${drSlug} ${chapter} (Douay-Rheims)`,
  });
  if (!data.verses || data.verses.length === 0) {
    throw new Error(`No verses came back for that chapter. It may not exist in the Douay-Rheims.`);
  }
  return {
    reference: `${data.book_title} ${data.chapter}`,
    translationName: "Douay-Rheims (Challoner rev.)",
    verses: data.verses.map((v) => ({ verse: v.verse, text: v.text.trim() })),
  };
}

/** Full-text search across the Douay-Rheims. */
export async function searchDouay(query, limit = 30) {
  return fetchJson(`${DR_BASE}/api/search?q=${encodeURIComponent(query)}&scope=verses&limit=${limit}`, {
    label: "Douay-Rheims search",
  });
}
