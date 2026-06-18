import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { MONTH_NAMES } from '../constants';
import styles from './StatsTab.module.css';

const PIE_COLORS = ['#7c3aed','#059669','#f59e0b','#ef4444','#3b82f6','#ec4899'];

function generateDemo() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const bottles = Math.floor(Math.random() * 35) + 8;
    return { month: MONTH_NAMES[d.getMonth()], bottles, amount: +(bottles * 0.25 + Math.random() * 1.5).toFixed(2) };
  });
}

export default function StatsTab({ t, sessions, currentCounts }) {
  const demo = useMemo(generateDemo, []);
  const monthly = useMemo(() => {
    if (sessions.length === 0) return demo;
    const map = {};
    sessions.forEach(s => {
      const k = s.month || '?';
      if (!map[k]) map[k] = { month: k, bottles: 0, amount: 0 };
      map[k].bottles += s.bottles;
      map[k].amount = +(map[k].amount + s.total).toFixed(2);
    });
    return Object.values(map).slice(-6);
  }, [sessions, demo]);

  const allBottles = sessions.reduce((s, x) => s + x.bottles, 0);
  const allMoney   = sessions.reduce((s, x) => s + x.total,   0).toFixed(2);
  const co2kg      = (allBottles * 30 / 1000).toFixed(1);

  const pieData = (t.bottleTypes || [])
    .map(bt => ({ name: bt.name, value: currentCounts[bt.id] || 0 }))
    .filter(x => x.value > 0);

  const isEmpty = sessions.length === 0 && pieData.length === 0;

  function exportCSV() {
    const csv = ['Date,Time,Bottles,Amount (€)', ...sessions.map(s => `${s.date},${s.time},${s.bottles},${s.total.toFixed(2)}`)].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'pfand-hero.csv';
    a.click();
  }

  return (
    <div className={styles.section}>
      <div className={styles.cards}>
        {[
          { label: t.totalEarned, value: `€${allMoney}`, sub: t.allTime },
          { label: t.totalBottles, value: allBottles,    sub: t.redeemed },
          { label: t.co2,          value: `${co2kg} kg`, sub: t.co2sub },
          { label: t.sessions,     value: sessions.length, sub: t.visits },
        ].map(c => (
          <div key={c.label} className={styles.card}>
            <div className={styles.cardLabel}>{c.label}</div>
            <div className={styles.cardValue}>{c.value}</div>
            <div className={styles.cardSub}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>
          {t.chartEarnings}
          {sessions.length === 0 && <span className={styles.demoTag}>· {t.demo}</span>}
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthly} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => [`€${Number(v).toFixed(2)}`, '€']} />
            <Bar dataKey="amount" fill="#7c3aed" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>{t.chartBottles}</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={monthly} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="bottles" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: '#059669' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {pieData.length > 0 && (
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>{t.chartSession}</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ value }) => `${value}×`}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {isEmpty && (
        <div className={styles.empty}>
          {t.empty.split('\n').map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}

      {sessions.length > 0 && (
        <button className={styles.exportBtn} onClick={exportCSV}>{t.exportBtn}</button>
      )}
    </div>
  );
}
