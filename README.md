# Algorithmistic public website

Standalone, responsive product site for the Algorithmistic email forensics project. Plain HTML, CSS and JavaScript. It does not include the analyzer, backend, credentials, datasets or any upload handling.

## Preview

Open `index.html`, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Files

- `index.html`: structure, copy, inline SVG icon sprite, favicon
- `styles.css`: tokens (colour, type, radius) at the top, then components; light and dark themes
- `script.js`: mobile menu, theme toggle (saved choice, else system preference), footer year

## Design notes

- Palette comes from the project brand: navy ink, one cyan accent, amber for the "high" severity. Colour is used for meaning, not decoration.
- Type uses the system font stack: no third-party requests, which suits a privacy-first project. To use a brand typeface, self-host it and set `--sans` in `styles.css`.
- The hero report and the weights chart use the real scoring weights from the project README (38 / 18 / 15 / 12 / 12 / 5). The report values are an illustrative sample and are labelled as such.
- The sextortion detector is labelled "In development"; no accuracy figures are claimed.
- No analytics, forms or email upload.

## Hosting

Static hosting only. The Streamlit analysis app is a separate service.
