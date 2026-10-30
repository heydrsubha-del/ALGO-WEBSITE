# Algorithmistic public website

This is a standalone, responsive product website for the Algorithmistic email forensics project. It uses plain HTML, CSS, and JavaScript; it does not include the email analyzer, backend, credentials, private datasets, or uploaded-message handling.

## Preview

Open `index.html` in a browser. For a local HTTP preview, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Files

- `index.html` — page structure and original website copy
- `styles.css` — responsive visual design and layout
- `script.js` — mobile navigation and current-year footer

The sample report panel is illustrative and uses no live analysis. The sextortion detector is labeled as in development because the project materials describe it as planned work, not a released, validated feature. The site contains no analytics, forms, or email upload interface.

## Hosting

These files can be hosted as a static site. The actual Streamlit analysis application is a separate service and needs its own hosting configuration. No public deployment has been made from this draft.
