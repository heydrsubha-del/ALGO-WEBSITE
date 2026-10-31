# Algorithmistic public website

Standalone, responsive product site for the Algorithmistic email forensics project. Plain HTML, CSS and JavaScript. It does not include the analyzer, backend, credentials, datasets or any upload handling.

## Preview

Open `index.html`, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Files

- `assets/algorithmistic-logo.png`: brand logo (header, footer, favicon, closing seal)
- `index.html`: structure, copy, inline SVG icon sprite, favicon
- `styles.css`: tokens (colour, type, radius) at the top, then components; light and dark themes
- `script.js`: mobile menu, theme toggle (saved choice, else system preference), footer year

## Design notes

- Five brand hues (cyan, green, violet, orange, red) map to Detect / Trace / Correlate / Report / Defend and are reused for card icons, workflow steps and the six scoring signals, so a colour always means the same thing.
- Motion: one hero entrance, a sliding verb in the hero pill, a pausable capability ticker, two floating chips (desktop only) and a rotating ring on the closing logo. All stop under reduced-motion.
- Type uses the system font stack: no third-party requests, which suits a privacy-first project. To use a brand typeface, self-host it and set `--sans` in `styles.css`.
- The hero report and the weights chart use the real scoring weights from the project README (38 / 18 / 15 / 12 / 12 / 5). The report values are an illustrative sample and are labelled as such.
- The sextortion detector is labelled "In development"; no accuracy figures are claimed.
- No analytics, forms or email upload.

## Hosting

Static hosting only. The Streamlit analysis app is a separate service.
