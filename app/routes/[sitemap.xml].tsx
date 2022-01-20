import { padNumber } from "~/utils/pad";

let siteUrl = "https://syntax.fm";

export async function loader() {
  const response = await fetch('https://syntax.fm/api/shows')
  const shows = await response.json();

  const showsXML = shows.map(show => {
    return `<url>
    <loc>${siteUrl}/syntax/${padNumber(show.number)}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>`;
  }).join("");

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${showsXML}
  </urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}