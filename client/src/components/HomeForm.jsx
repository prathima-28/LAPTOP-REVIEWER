import React, { useState } from 'react';
import axios from 'axios';

export default function HomeForm({ setResult, setLoading }) {
  const [budget, setBudget] = useState('');
  const [purpose, setPurpose] = useState('computer-science');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!url || !budget) return setError('Please add a budget and a product link.');

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/analyze', { budget, purpose, url });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze. Check console for details or try a different link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="home-form">
      <form onSubmit={submit} className="card form-card">
        <label>Budget (₹)</label>
        <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 60000" />

        <label>Purpose</label>
        <select value={purpose} onChange={e => setPurpose(e.target.value)}>
          <option value="computer-science">Computer Science & Engineering</option>
          <option value="design">Graphic Design & Media</option>
          <option value="gaming">Gaming</option>
          <option value="architecture">Architecture & Interior Design</option>
          <option value="business">Business & Liberal Arts</option>
          <option value="film">Film & Media Arts</option>
          <option value="medical">Medical Students</option>
        </select>

        <label>Amazon Product Link</label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste full Amazon product URL here" />

        <button type="submit" className="cta">Get Review</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>

      <aside className="hint-card card">
        <h3>How it works</h3>
        <p>We scrape product title & specs, run general checks (CPU, RAM, SSD, battery) and purpose-specific checks, then present an emoji-rich review with progress bars and a colorful verdict.</p>
      </aside>
    </section>
  );
}
