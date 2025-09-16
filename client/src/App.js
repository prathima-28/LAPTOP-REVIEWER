import React, { useState } from 'react';
import HomeForm from './components/HomeForm';
import ResultPage from './components/ResultPage';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Laptop Reviewer — Student Edition 💻🎓</h1>
        <p className="subtitle">Paste an Amazon laptop link, your budget & purpose — get a friendly, emoji-powered review.</p>
      </header>

      <main>
        {!result && <HomeForm setResult={setResult} setLoading={setLoading} />}

        {loading && <div className="loading card">Analyzing... please wait ⚙️</div>}

        {result && <ResultPage data={result} onBack={() => setResult(null)} />}
      </main>

      <footer className="footer">Made with ❤️ for students</footer>
    </div>
  );
}
