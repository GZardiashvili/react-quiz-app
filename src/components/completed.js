import React from 'react';
import '../css/completed.css';

function EndStat({ label, value }) {
  return (
    <div className="completed__stat">
      <div className="completed__stat-label">{label}</div>
      <div className="completed__stat-value">{value}</div>
    </div>
  );
}

function Completed({ score, onRetryClick }) {
  return (
    <div className="completed">
      <h1>Quizz Complete!</h1>
      <EndStat label="Score" value={score} />
      <button className="completed__button" onClick={onRetryClick}>
        Try Again
      </button>
    </div>
  );
}

export default Completed;
