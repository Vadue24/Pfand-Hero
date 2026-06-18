import React from 'react';
import styles from './BottleCard.module.css';

export default function BottleCard({ bottle, count, onAdd, onRemove }) {
  return (
    <div className={styles.card} onClick={onAdd} role="button" tabIndex={0}
         onKeyDown={e => e.key === 'Enter' && onAdd()}
         aria-label={`${bottle.name} hinzufügen, ${bottle.label} pro Stück`}>
      <span className={styles.icon} aria-hidden="true">{bottle.icon}</span>
      <div className={styles.name}>{bottle.name}</div>
      <div className={styles.price}>{bottle.label}</div>

      {count > 0 && (
        <div className={styles.counter} onClick={e => e.stopPropagation()}>
          <button
            className={styles.minus}
            onClick={onRemove}
            aria-label="Eins entfernen"
          >−</button>
          <span className={styles.countNum}>{count}</span>
          <span className={styles.times}>×</span>
        </div>
      )}
    </div>
  );
}
