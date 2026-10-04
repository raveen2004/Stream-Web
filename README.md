# Streamora

A streaming-style website UI built with plain **HTML, CSS and JavaScript**. No frameworks, no build tools, no server needed.

**Live demo:** https://raveen2004.github.io/Stream-Web/

> This is a learning / demo project. "Streamora" is a fictional brand, and all titles, descriptions and posters are made up.

## Features

- Sticky navbar that changes background on scroll
- Hero banner with Play and More Info buttons
- Horizontal scrolling rows with left/right arrows
- Hover zoom effect on cards
- Details popup (modal) for every title
- Search by title or genre
- Filter by Home, Series, Movies and My List
- My List saved in the browser (localStorage)
- Responsive layout for laptop and mobile

## Project Structure

```
Stream-Web/
├── index.html   # Page structure
├── style.css    # All styling and animations
├── script.js    # Data, rendering rows, search, modal, My List
└── README.md
```

## How to Run

1. Download or clone this repository.
2. Keep all three files in the same folder.
3. Double-click `index.html` to open it in Chrome, Edge or any browser.

Or clone with Git:

```bash
git clone https://github.com/raveen2004/Stream-Web.git
cd Stream-Web
```

## Customize

**Add or edit titles:** open `script.js` and edit the `titles` array:

```js
{ id: 17, name: "My New Show", type: "series", genre: "Drama", year: 2026,
  rating: "U/A 13+", c: ["#ff512f", "#dd2476"], desc: "Short description here." }
```

**Use real images:** posters are currently CSS gradients (`c: [...]`). To use images, add an `img` field and set it as the card background in `renderRows()`.

**Change theme color:** edit `--accent` in the `:root` block of `style.css`.

## Deploy on GitHub Pages

1. Go to **Settings → Pages**.
2. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
3. Your site will be live in 1-2 minutes.

## Tech Used

- HTML5
- CSS3 (Flexbox, gradients, animations)
- Vanilla JavaScript (ES6)

## Future Ideas

- Real video player
- Login / signup page
- Movie data from a public API
- Dark / light theme toggle

## License

Free to use for learning and personal projects.
