import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TRANSLATIONS } from './i18n';
import { MONTH_NAMES } from './constants';
import AddTab   from './components/AddTab';
import StatsTab from './components/StatsTab';
import MapTab   from './components/MapTab';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('de');          
  const [tab,  setTab]  = useState(0);            
  const [counts, setCounts] = useState({});
  const [sessions, setSessions] = useLocalStorage('pfand_sessions_v2', []);

  const t = TRANSLATIONS[lang];

  function handleAdd(id)    { setCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 })); }
  function handleRemove(id) {
    setCounts(prev => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  }

  function handleSave() {
    const types = t.bottleTypes;
    const totalBottles = Object.entries(counts).reduce((s, [id, c]) => {
      const bt = types.find(b => b.id === id); return s + (bt ? c : 0);
    }, 0);
    if (!totalBottles) return;

    const total = +Object.entries(counts).reduce((s, [id, c]) => {
      const bt = types.find(b => b.id === id); return s + (bt ? bt.price * c : 0);
    }, 0).toFixed(2);

    const now = new Date();
    const session = {
      date:    now.toLocaleDateString('de-DE'),
      time:    now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      month:   MONTH_NAMES[now.getMonth()],
      items:   { ...counts },
      total,
      bottles: totalBottles,
    };
    setSessions(prev => [session, ...prev].slice(0, 50));
    setCounts({});
  }

  return (
    <div className="app">
      <header className="header">
        <h1>♻️ {t.appName}</h1>
        <p>{t.tagline}</p>
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>DE</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>

      <nav className="tabs" role="tablist">
        {t.tabs.map((label, i) => (
          <button key={i} role="tab" aria-selected={tab === i}
            className={`tab ${tab === i ? 'tab--active' : ''}`}
            onClick={() => setTab(i)}>
            {label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 0 && <AddTab   t={t} counts={counts} onAdd={handleAdd} onRemove={handleRemove} onSave={handleSave} onClear={() => setCounts({})} sessions={sessions} />}
        {tab === 1 && <StatsTab t={t} sessions={sessions} currentCounts={counts} />}
        {tab === 2 && <MapTab   t={t} />}
      </main>
    </div>
  );
}
