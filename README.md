# Decision Simulator

Interactive companion to the *Cloud Transformation 2030* proposal for ABC Technology Services: a short overview, a live what-if simulator, and an "Ask the Deck" chatbot that answers only from the proposal.

All figures are illustrative assumptions taken from the deck.

## Run
Open `index.html` in a browser. It is one self-contained file (fonts load from Google Fonts, with system fallbacks).

## Source (`src/`)
- `data.js` – deck content, single source of truth
- `sim.js` – simulator model (calibrated so the Board plan hits the deck's targets)
- `app.js` – rendering, charts, simulator UI
- `chat.js` – chatbot knowledge base and retrieval
- `styles.css`, `body.html` – styles and page skeleton
- `build.py` – concatenates `src/` into `index.html` (`python3 src/build.py`)
