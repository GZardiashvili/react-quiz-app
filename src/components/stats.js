import React from 'react';
import '../css/stats.css';

function Stat({ label, value }) {
  return (
    <li className="stats__stat-container">
      <div className="stats__stat-label">{label}</div>
      <div className="stats__stat-value">{value}</div>
    </li>
  );
}

function Stats({ score, questionNumber, totalQuestions }) {
  return (
    <ul className="stats">
      <Stat label="Score" value={score} />
      <Stat
        label="Question Number"
        value={`${questionNumber} / ${totalQuestions}`}
      />
    </ul>
  );
}

export default Stats;
