# Vancity Jun — Portfolio

Portfolio website for **Hyung-Jun Lee**, a full-stack Software Engineer with 8+ years of experience building and shipping production web applications. Specializes in React and TypeScript on the frontend, with solid backend experience across Node.js, Ruby on Rails, and PostgreSQL.

Live site: [vancityjun.com](https://www.vancityjun.com)

---

## Tech Stack

| | |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Slider | Swiper 11 (vertical fade, rewind) |
| Animation | GSAP 3 |
| Styling | SCSS |
| Icons | Font Awesome 6 |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Deploy to GitHub Pages |

---

## Project Structure

```
src/
├── component/       # UI components (Slide, Topbar, Menu, Cursor, ...)
├── helper/          # Hooks and image imports
├── data.json        # Project content (title, description, images, links)
├── App.jsx          # Root component, Swiper setup
├── App.scss         # Global layout styles
└── variables.scss   # SCSS tokens (colors, fonts)
```

## Adding / Editing Projects

All project data lives in `src/data.json`. Each entry supports:

```json
{
  "title": "Project Name",
  "category": "UI Design & Development",
  "date": "Month YYYY",
  "shortDescription": "One-line description shown in the slider",
  "background": "filename.jpg",
  "url": "https://...",
  "pc": ["screenshot1.png", "screenshot2.png"],
  "mobile": ["mobile1.png"],
  "hide": false
}
```

Set `"hide": true` to remove a project from the slider without deleting it.

## Config

In `src/App.jsx`:

```js
const AUTO_SLIDE = false   // set true to enable auto-advance + progress bar
const AUTOPLAY_DELAY = 7000  // ms between auto slides
```
