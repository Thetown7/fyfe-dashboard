// src/components/dashboard/Header.jsx

import React from 'react';

export default function Header({ onLogout }) {
  return (
    <div className="bg-[#D39BFF] p-4 rounded-b-2xl text-white text-center mb-6 relative">
      <button
        onClick={onLogout}
        className="text-white text-sm underline absolute left-6 top-4"
      >
        ← Logout
      </button>
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  );
}
