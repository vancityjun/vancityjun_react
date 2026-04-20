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
├── component/       # UI components (Slide, Topbar, Menu, ProjectContent, ...)
│   └── projectContent/
│       # Project detail sections used inside the See more panel
├── helper/          # Hooks and image imports
├── data.json        # Project content, detail copy, images, links
├── App.jsx          # Root component, Swiper setup
├── App.scss         # Global layout styles
└── variables.scss   # SCSS tokens (colors, fonts)
```

## Adding / Editing Projects

All project data lives in `src/data.json`. Top-level fields drive the slider,
hero, menu, and screenshot gallery:

```json
{
  "title": "Project Name",
  "category": "UI Design & Development",
  "type": "Company Website",
  "date": "Month YYYY",
  "shortDescription": "One-line description shown in the slider",
  "background": "filename.jpg",
  "url": "https://...",
  "techStack": ["React", "JavaScript"],
  "pc": ["screenshot1.png", "screenshot2.png"],
  "mobile": ["mobile1.png"],
  "hide": false,
  "details": {
    "summary": "Describe what the project is and what users can do with it.",
    "role": {
      "title": "UI Design & Development",
      "description": "Explain your responsibility on the project."
    },
    "features": [
      {
        "label": "Main Feature",
        "title": "Name the feature, such as Job Posting System",
        "description": "Explain what this feature lets users do."
      },
      {
        "label": "Responsive Design",
        "title": "Name the screenshot-backed feature",
        "description": "Describe what is shown in the screenshot.",
        "imagePosition": "right",
        "images": ["mobile1.png", "mobile2.png"]
      }
    ],
    "challenge": "Describe the problem you solved.",
    "process": [
      "Mention how you approached the work.",
      "Mention important design or implementation details."
    ]
  }
}
```

Set `"hide": true` to remove a project from the slider without deleting it.

### Detail Rendering Rules

`details.summary` is the main project overview in the open detail panel.

`details.role.title` appears in the metadata area. `details.role.description`
appears as the "My Role" paragraph.

`details.features` is the repeatable content list:

- A feature with no `image` or `images` renders as a text-only functionality block.
- A feature with `image` or `images` renders as an image/text row.
- `imagePosition` is optional and only applies to image/text rows. Use `"right"`
  to place the image on the right; otherwise the image defaults to the left.
- Image names must match files imported by `src/helper/projectImages.js`.

`pc` and `mobile` are still used for the final screenshot gallery. They are also
kept as legacy fields while the detail view is expanded.

`description` is no longer used. Move useful text into `details.summary`.

For `challenge`, focus on the problem or constraint, such as making complex data
easy to scan or organizing text-heavy requirements into a clear interface.

For `process`, briefly mention the methods you used, such as grid layouts,
responsive design, reusable components, or translating Korean requirements into UI.

`customContent` is legacy-only and should only be used by RecSee:

```json
{
  "title": "RecSee",
  "customContent": "recsee",
  "hide": true
}
```

## Config

In `src/App.jsx`:

```js
const AUTO_SLIDE = false   // set true to enable auto-advance + progress bar
const AUTOPLAY_DELAY = 7000  // ms between auto slides
```
