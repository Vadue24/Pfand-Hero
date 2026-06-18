# ♻️ Pfand-Hero
A lifestyle app for tracking returned plastic cards and calculating Pfand cashback in Germany.

.. Features //
.. Adding containers — 6 types: plastic, glass, cans, reusable bottles, crates //
.. Calculator — instant calculation of the amount in euros //
.. CO₂ tracker — how many grams of carbon dioxide have been saved //
.. Donation history — stored in localStorage //
.. Charts (Recharts) — earnings and number of bottles by month, pie chart //
.. Export to CSV — download the entire history //
.. Map (Leaflet + OpenStreetMap) — Pfandautomaten in 5 cities: Berlin, Munich, Hamburg, Dresden, Cologne //
## Quick Start

```bash
npm install
npm start
```

The application will open at http://localhost:3000

## Build for Production

```bash
npm run build
```

## Stack

| Technologies | The purpose |
|---|---|
| React 18 | UI |
| Recharts | Графики |
| Leaflet + react-leaflet | Карта |
| CSS Modules | Стили компонентов |
| localStorage | Персистентность данных |

## The Project Structure

```
src/
constants.js ← container types and cities
hooks/
useLocalStorage.js ← hook for localStorage
components/
BottleCard.jsx ← card for one container type
AddTab.jsx ← adding tab
StatsTab.jsx ← statistics and graphs
MapTab.jsx ← machine map
App.js ← root component
App.css ← global styles
```

## Extension

To add a new city to the map, edit the CITIES array `CITIES` в `src/constants.js`.

To add a new container type, add an object to `BOTTLE_TYPES` в `src/constants.js`.
