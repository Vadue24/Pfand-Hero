import React from 'react';
import BottleCard from './BottleCard';
import styles from './AddTab.module.css';

export default function AddTab({ t, counts, onAdd, onRemove, onSave, onClear, sessions }) {
  const types = t.bottleTypes;

  const totalBottles = Object.entries(counts).reduce((s, [id, c]) => {
    const bt = types.find(b => b.id === id); return s + (bt ? c : 0);
  }, 0);

  const totalMoney = Object.entries(counts).reduce((s, [id, c]) => {
    const bt = types.find(b => b.id === id); return s + (bt ? bt.price * c : 0);
  }, 0);

  const co2 = Object.entries(counts).reduce((s, [id, c]) => {
    const bt = types.find(b => b.id === id); return s + (bt ? bt.co2 * c : 0);
  }, 0);

  return (
    <div className={styles.section}>
      <div className={styles.summary}>
        <div>
          <div className={styles.summaryTotal}>€{totalMoney.toFixed(2)}</div>
          <div className={styles.summaryLabel}>{t.readyLabel}</div>
          {co2 > 0 && <div className={styles.ecoBadge}>🌱 {co2}{t.co2Saved}</div>}
        </div>
        <div className={styles.summaryRight}>
          <div className={styles.summaryCount}>{totalBottles}</div>
          <div className={styles.summaryLabel}>{t.bottles}</div>
        </div>
      </div>

      <div className={styles.grid}>
        {types.map(bt => (
          <BottleCard
            key={bt.id}
            bottle={bt}
            count={counts[bt.id] || 0}
            onAdd={() => onAdd(bt.id)}
            onRemove={() => onRemove(bt.id)}
          />
        ))}
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btnSave} onClick={onSave} disabled={totalBottles === 0}>
          {t.saveBtn}
        </button>
        <button className={styles.btnClear} onClick={onClear} aria-label="Alles löschen">🗑</button>
      </div>

      {sessions.length > 0 && (
        <div>
          <div className={styles.historyTitle}>{t.lastSessions}</div>
          {sessions.slice(0, 5).map((s, i) => (
            <div key={i} className={styles.historyItem}>
              <div>
                <div className={styles.historyDate}>{s.date} · {s.time}</div>
                <div className={styles.historyDetail}>{s.bottles} {t.bottles}</div>
              </div>
              <div className={styles.historyAmount}>€{s.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
