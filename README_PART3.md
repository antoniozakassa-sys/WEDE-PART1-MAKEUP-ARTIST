# Marlowe & Muse - Part 3 README additions

> Paste these sections into your existing README.md. Replace the placeholders in [square brackets].

## Part 3 summary
- **Live site:** [your Netlify / GitHub Pages link]
- **Repository:** [your GitHub link]
- **Run locally:** open with a local server (e.g. VS Code Live Server), because the services page loads `data/services.json` with `fetch()`.
- **Forms:** in `enquiry.html`, replace `your-form-id` in the form `action` with your own Formspree form ID (https://formspree.io). Until then the AJAX send is simulated.
- **SEO URLs:** replace `https://wede-part1-makeup-artist.netlify.app/` in the canonical tags, `sitemap.xml`, `robots.txt` and the JSON-LD on `index.html` with your real URL.
- **Gallery images:** `images/*.svg` are placeholders. Replace with your own optimised `.webp` or `.jpg` photos, keeping descriptive file names and updating the `alt` text.

## Features added
| Requirement | Where | How |
|---|---|---|
| Accordion | services.html | FAQ using buttons with `aria-expanded` |
| Tabs | services.html | Category tabs with arrow-key support |
| Modal | services.html, enquiry.html | Service details and the quote result |
| Interactive map | contact.html | Leaflet + OpenStreetMap, two markers, "Show on map" buttons |
| Animations | all pages | CSS transitions, IntersectionObserver scroll reveal (respects reduced-motion) |
| Advanced DOM | js/main.js | Elements built with `createElement`, back-to-top button, live counters |
| Lightbox gallery | gallery.html | Click to enlarge, prev/next, keyboard and Esc |
| Dynamic content | services.html | Services loaded from `data/services.json` via fetch |
| Search / sort | services.html | Live search, category filter, sort by price or name |
| Form validation | enquiry, contact | JavaScript validation with inline error messages (SA phone, dates, lengths) |
| AJAX submission | enquiry.html | `fetch()` POST to the form `action`, with success and error states |
| Enquiry response | enquiry.html | Estimated cost, availability message and travel note |
| Contact email | contact.html | Compiled into an email preview with a `mailto:` button to the recipient in code |

## SEO
- Unique `<title>`, meta description, keywords, canonical and Open Graph tags on every page.
- One `<h1>` per page (the logo is now a `<p class="logo">`), with `h2`/`h3` for structure.
- Descriptive image file names, alt text, `width`/`height` and `loading="lazy"`.
- Internal links between pages, plus a link from the gallery to services and enquiry.
- `robots.txt` and `sitemap.xml` added. Submit the sitemap in Google Search Console.
- Local SEO: JSON-LD `HealthAndBeautyBusiness` data with Melville address and Gauteng service area.
- Off-page (actions to take): create a Google Business Profile, post work on Instagram (linked in the footer), and ask vendors and photographers to link to the site.
- Performance: scripts use `defer`, images are lazy loaded, no frameworks. Security: `_headers` file (CSP, X-Frame-Options, nosniff), `rel="noopener noreferrer"` on external links, and all dynamic text is inserted with `textContent`.

## Changelog
### Part 3 feedback edits (from Part 2 marks)
- [Add each lecturer feedback point here, e.g. "Fixed ...: changed ... in ... because ..."]
- Changed the logo from `<h1>` to `<p class="logo">` and the hero heading to `<h1>` on every page, so each page has one h1 (updated `.site-header h1` and `.hero h2` in styles.css).
- Added a Gallery link to the navigation and footer of every page.

### Part 3 new entries
- Added `js/main.js` with all interactive and form logic; scripts now load with `defer`.
- Replaced the static services lists with dynamically rendered content from `data/services.json`; added tabs, search and sort; kept the add-ons table.
- Added FAQ accordion and service-details modal on services.html.
- Added gallery.html with a lightbox and 8 placeholder images in `images/`.
- Replaced the contact page iframes with a Leaflet map; added message-type select, validation and an email preview.
- Added select, counter, validation, AJAX submit and cost/availability response to enquiry.html.
- Added SEO meta tags, JSON-LD, robots.txt, sitemap.xml and `_headers`.
- Appended Part 3 styles to styles.css (tabs, accordion, modal, lightbox, map, errors, animations).

## References
- Leaflet (2023) *Leaflet 1.9.4*. Available at: https://leafletjs.com
- OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org
- MDN Web Docs (2026) *Fetch API*, *IntersectionObserver*, *Constraint validation*. Available at: https://developer.mozilla.org
- W3C (2026) *WAI-ARIA Authoring Practices: Accordion, Tabs, Dialog*. Available at: https://www.w3.org/WAI/ARIA/apg/
- Google (2026) *Search Central documentation*. Available at: https://developers.google.com/search
- Schema.org (2026) *LocalBusiness*. Available at: https://schema.org/LocalBusiness
- Formspree (2026) *Formspree documentation*. Available at: https://help.formspree.io
