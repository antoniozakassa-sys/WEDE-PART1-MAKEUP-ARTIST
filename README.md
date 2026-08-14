# WEDE-PART1-MAKEUP-ARTIST
# Marlowe & Muse — Website Project

## Project Title
**Marlowe & Muse Makeup Studio Website**
A five-page responsive website for a fictional Johannesburg-based freelance makeup artist small business.

## Student Information

- **Name:** [Zakassa Antonio]
- **Student Number:** [ST10522875]
- **Group:** [Group 1]
- **Subject:** [Web Development WEDE]
- **Institution:** [Rosebank international]

## Project Overview
Marlowe & Muse is a freelance makeup artist studio offering bridal, editorial/shoot, and special-occasion makeup services across Johannesburg and the greater Gauteng area. This website was built as the chosen "Small Business" target organisation for the Website Development assignment, using realistic (fictional) content for the business, its founder, its services, and its pricing.

The site is a static, five-page HTML/CSS/JS website with no backend — form submissions are intercepted client-side and shown as a confirmation message, per the scope of this assignment.

## Website Goals and Objectives
- Present the studio's services and pricing clearly enough that a visitor can self-qualify before enquiring.
- Convert visitors into booking enquiries via a structured enquiry form (captures date, headcount, service type, venue).
- Build trust through founder story, mission/vision, and a client testimonial.
- Be fully navigable and legible on mobile, given that most bridal-industry traffic is mobile/Instagram-driven.

**Key performance indicators (for future phases):**
- Enquiry form completion rate
- Time on Services page (pricing engagement)
- Click-through rate from homepage CTA to Enquiry page

## Key Features and Functionality
- Responsive 5-page site: Home, About, Services, Enquiry, Contact
- Sticky navigation with active-page indication (`aria-current`)
- Structured enquiry form: text/email/tel/date/number inputs, radio button service-type selector, checkbox add-ons, fieldsets/legends for grouping
- Contact page with **two** studio locations, each with an embedded Google Map and address
- Client-side form validation and success-state feedback (`js/main.js`)
- Accessibility basics: skip-to-content link, visible focus states, semantic landmarks (`header`, `nav`, `main`, `footer`), `prefers-reduced-motion` support
- Custom design system (see `marlowe-muse/css/styles.css`): plum/brass editorial palette, Fraunces + Inter type pairing, deliberately avoiding generic "beauty pastel" templates

## Timeline and Milestones
| Milestone | Target | Status |
|---|---|---|
| Website Project Proposal (2 orgs) submitted & approved | Part 1 due date | ✅ Drafted (see `Website-Project-Proposal.docx`) |
| Content research & sourcing | Part 1 due date |  Complete (see `content-research.zip`) |
| Sitemap & file structure | Part 1 due date |  Complete (`sitemap.mermaid`) |
| Initial HTML structure (5 pages) | Part 1 due date |  Complete |
| CSS styling & responsive layout | Part 1 due date |  Complete |
| Cross-browser testing & debugging | Part 1 due date |  To confirm on your machine (see Testing section) |
| GitHub repository pushed | Part 1 due date |  Pending your push (see below) |

## Part 1 Details
Part 1 ("Building the Foundation") covers:
1. Website Project Proposal — see `Website-Project-Proposal.docx`
2. Content research and sourcing — see `content-research.zip` and its `references/` folder
3. Sitemap — see `sitemap.mermaid` (render at https://mermaid.live or via a Markdown previewer that supports Mermaid)
4. HTML file structure — see `marlowe-muse/` folder:
   ```
   marlowe-muse/
   ├── index.html
   ├── about.html
   ├── services.html
   ├── enquiry.html
   ├── contact.html
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── main.js
   └── images/
       └── (add sourced/original images here — see content-research.zip for sourcing notes)
   ```

## Sitemap
```
Home (index.html)
 ├── About (about.html)
 ├── Services (services.html)
 ├── Enquiry (enquiry.html)
 └── Contact (contact.html) 
```
See `sitemap` for the diagram source.

### [0.1.0] – Initial Part 1 submission
- Added: initial HTML structure for 5 pages (index, about, services, enquiry, contact)
- Added: shared stylesheet (`css/styles.css`) with custom plum/brass design system
- Added: shared JS (`js/main.js`) for nav active-state and demo form handling
- Added: enquiry form with grouped fieldsets, radio/checkbox inputs, and required-field validation
- Added: contact page with two mapped studio locations
- Added: content research files and references (`content-research.zip`)
- Added: Website Project Proposal document
- Added: this README.md

## References
General/technical sources referenced while building this site are listed in `content-research/references/references.md` inside `content-research`. Organisation-specific sources used for the Website Project Proposal are listed in that document's own References section.
