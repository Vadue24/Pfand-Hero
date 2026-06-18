import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CITIES } from '../constants';
import styles from './MapTab.module.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const greenIcon = L.divIcon({
  html: `<div style="background:linear-gradient(135deg,#7c3aed,#059669);color:#fff;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:17px;border:2px solid #fff;box-shadow:0 2px 8px rgba(124,58,237,.4)">♻️</div>`,
  className: '',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

export default function MapTab({ t }) {
  const mapRef     = useRef(null);
  const leafletMap = useRef(null);
  const markers    = useRef([]);
  const [city, setCity] = useState(CITIES[0]);

  useEffect(() => {
    if (leafletMap.current) return;
    leafletMap.current = L.map(mapRef.current).setView([city.lat, city.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(leafletMap.current);
  }, []); 

  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;
    map.flyTo([city.lat, city.lng], 13, { duration: 0.8 });
    markers.current.forEach(m => m.remove());
    markers.current = [];
    city.machines.forEach(m => {
      markers.current.push(
        L.marker([m.lat, m.lng], { icon: greenIcon }).addTo(map)
          .bindPopup(`<b style="font-size:13px">${m.name}</b><br><span style="font-size:12px;color:#555">${m.addr}</span><br><span style="font-size:11px;color:#7c3aed">🕐 ${m.hours}</span>`)
      );
    });
    setTimeout(() => map.invalidateSize(), 100);
  }, [city]);

  return (
    <div className={styles.section}>
      <div className={styles.cityRow}>
        {CITIES.map(c => (
          <button key={c.name} className={`${styles.cityBtn} ${city.name === c.name ? styles.active : ''}`} onClick={() => setCity(c)}>
            {c.name}
          </button>
        ))}
      </div>

      <div ref={mapRef} className={styles.map} />

      <div className={styles.tip}>
        📍 <strong>{city.machines.length} Pfandautomaten</strong> {t.cityLabel} {city.name} {t.found}. {t.mapTip}
      </div>

      <div className={styles.list}>
        {city.machines.map((m, i) => (
          <div key={i} className={styles.listItem}>
            <span className={styles.listIcon}>♻️</span>
            <div>
              <div className={styles.listName}>{m.name}</div>
              <div className={styles.listAddr}>{m.addr} · {m.hours}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
