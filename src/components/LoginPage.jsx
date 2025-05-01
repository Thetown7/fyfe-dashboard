import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === 'fyfeadmin') {
      onLogin(true);  // Admin login
    } else if (password === 'fyfe2025') {
      onLogin(false); // User login
    } else {
      setError(true); // Password sbagliata
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-7">U Are Real👇</h1>

      <input
        type="password"
        className="border-2 border-[#D39BFF] px-4 py-2 rounded-2xl text-lg mb-4 focus:ring-2 focus:ring-[#D39BFF] focus:outline-none transition-all duration-300"
        placeholder="Inserisci password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-4">🤘🤘🤘🤘🤘🤘</p>}

      <button
        onClick={handleLogin}
        className="bg-[#D39BFF] text-white px-6 py-2 rounded-2xl text-lg"
      >
        Entra
      </button>
    </div>
  );
}
