import React from 'react';
import ProgressBar from './ProgressBar';
import './ProgressBar.css';

export default function ResultPage({ data, onBack }) {
  if (data && data.isLaptop === false) {
    return (
      <div className="card result-card">
        <button className="back" onClick={onBack}>← Back</button>
        <h2>Hmm... that's not a laptop 😅</h2>
        <p className="funny">{data.message}</p>
        <p>Try pasting a different product — we love laptops, not socks! 🧦</p>
      </div>
    );
  }

  const { specs, analysis } = data;

  return (
    <div className="card result-card">
      <button className="back" onClick={onBack}>← Back</button>

      <div className="product-box">
        <h2 className="prod-title">{specs.title}</h2>
        <div className="meta">{specs.price && <span className="price">{specs.price}</span>} <span className="source">Amazon</span></div>
        <p className="prod-details">{specs.bullets || specs.details}</p>
      </div>

      <h3>General Requirements</h3>
      {analysis.attributes.slice(0, 8).map(attr => (
        <ProgressBar key={attr.name} label={attr.name} value={attr.score} reason={attr.reason} />
      ))}

      <h3>Purpose-specific checks</h3>
      {analysis.attributes.slice(8).map(attr => (
        <ProgressBar key={attr.name} label={attr.name} value={attr.score} reason={attr.reason} />
      ))}

      <div className="verdict-row">
        <div className={`verdict-circle ${analysis.verdict}`}>{analysis.verdict.toUpperCase()}</div>
        <div className="verdict-text">
          <p className="comment">{analysis.comment}</p>
          <pre className="debug">{JSON.stringify(analysis.debug.generalSummary, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
