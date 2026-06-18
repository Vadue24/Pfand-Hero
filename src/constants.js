export const BOTTLE_TYPES = [
  { id: 'einweg_plastic', name: 'Einweg Plastik',    icon: '🧴', price: 0.25, co2: 30,  label: '0,25 €' },
  { id: 'einweg_glass',   name: 'Einweg Glas',       icon: '🍺', price: 0.25, co2: 35,  label: '0,25 €' },
  { id: 'dose',           name: 'Dose / Büchse',     icon: '🥫', price: 0.25, co2: 40,  label: '0,25 €' },
  { id: 'mehrweg_klein',  name: 'Mehrweg klein',     icon: '🍶', price: 0.15, co2: 25,  label: '0,15 €' },
  { id: 'mehrweg_gross',  name: 'Mehrweg groß',      icon: '🫙', price: 0.15, co2: 28,  label: '0,15 €' },
  { id: 'bierkasten',     name: 'Bierkasten (20×)',  icon: '📦', price: 1.50, co2: 600, label: '1,50 €' },
];

export const CITIES = [
  {
    name: 'Berlin', lat: 52.52, lng: 13.405,
    machines: [
      { lat: 52.5196, lng: 13.4069, name: 'REWE Mitte',          addr: 'Alexanderstraße 3',      hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 52.5312, lng: 13.3846, name: 'Lidl Wedding',         addr: 'Badstraße 4',            hours: 'Mo–Sa 7–21 Uhr' },
      { lat: 52.4965, lng: 13.4448, name: 'EDEKA Kreuzberg',      addr: 'Urbanstraße 47',         hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 52.5436, lng: 13.4216, name: 'ALDI Prenzlauer Berg', addr: 'Greifswalder Str. 30',   hours: 'Mo–Sa 8–20 Uhr' },
      { lat: 52.5089, lng: 13.3765, name: 'Penny Tiergarten',     addr: 'Turmstraße 21',          hours: 'Mo–Sa 7–22 Uhr' },
    ],
  },
  {
    name: 'München', lat: 48.137, lng: 11.576,
    machines: [
      { lat: 48.1374, lng: 11.5754, name: 'REWE Marienplatz',  addr: 'Kaufingerstraße 1',    hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 48.1493, lng: 11.5607, name: 'Penny Schwabing',   addr: 'Leopoldstraße 82',     hours: 'Mo–Sa 7–21 Uhr' },
      { lat: 48.1215, lng: 11.5957, name: 'Lidl Haidhausen',   addr: 'Rosenheimer Str. 52',  hours: 'Mo–Sa 7–21 Uhr' },
      { lat: 48.1558, lng: 11.5409, name: 'ALDI Maxvorstadt',  addr: 'Schellingstraße 5',    hours: 'Mo–Sa 8–20 Uhr' },
    ],
  },
  {
    name: 'Hamburg', lat: 53.551, lng: 9.993,
    machines: [
      { lat: 53.5512, lng: 9.9934, name: 'EDEKA Altstadt',    addr: 'Spitalerstraße 12',    hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 53.5698, lng: 9.9741, name: 'REWE Eimsbüttel',   addr: 'Grindelhof 10',        hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 53.5303, lng: 10.0268,name: 'ALDI Hammerbrook',  addr: 'Wendenstraße 14',      hours: 'Mo–Sa 8–20 Uhr' },
    ],
  },
  {
    name: 'Dresden', lat: 51.050, lng: 13.737,
    machines: [
      { lat: 51.0503, lng: 13.7372, name: 'REWE Centrum',   addr: 'Prager Straße 10',          hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 51.0599, lng: 13.7526, name: 'Netto Neustadt', addr: 'Königsbrücker Str. 30',     hours: 'Mo–Sa 7–21 Uhr' },
    ],
  },
  {
    name: 'Köln', lat: 50.937, lng: 6.960,
    machines: [
      { lat: 50.9383, lng: 6.9603, name: 'REWE Altstadt',   addr: 'Breite Straße 5',           hours: 'Mo–Sa 7–22 Uhr' },
      { lat: 50.9510, lng: 6.9509, name: 'Lidl Nippes',     addr: 'Neusser Straße 112',        hours: 'Mo–Sa 7–21 Uhr' },
      { lat: 50.9195, lng: 6.9809, name: 'ALDI Deutz',      addr: 'Deutz-Kalker-Str. 52',      hours: 'Mo–Sa 8–20 Uhr' },
    ],
  },
];

export const MONTH_NAMES = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
