import React from "react";

/**
 * Header della Dashboard
 * Mostra il titolo e il bottone di logout.
 * Riceve `onLogout` come prop.
 */
export default function Header({ onLogout }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      <h1 className="text-2xl font-semibold">Fyfe Dashboard</h1>
      <button
        onClick={onLogout}
        className="rounded-lg px-4 py-2 border font-medium hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </header>
  );
}
