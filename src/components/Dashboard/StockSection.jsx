// src/components/dashboard/StockSection.jsx

import React from 'react';

export default function StockSection({ stockItems, newStock, setNewStock, handleAddStock }) {
  return (
    <details className="bg-white border rounded-2xl shadow p-4 mb-6">
      <summary className="flex items-center gap-2 cursor-pointer">
        <span className="h-6 w-6 bg-[#D39BFF] rounded-full" />
        <span className="text-lg font-semibold text-[#D39BFF]">Stock Prodotti</span>
      </summary>

      <div className="mt-4 mb-2 space-y-2">
        <input
          type="text"
          placeholder="Nome per Stock"
          className="w-full border p-2 rounded-xl"
          value={newStock.name}
          onChange={(e) => setNewStock((s) => ({ ...s, name: e.target.value }))}
        />
        <select
          className="w-full border p-2 rounded-xl"
          value={newStock.type || ''}
          onChange={(e) => setNewStock((s) => ({ ...s, type: e.target.value }))}
        >
          <option value="">Seleziona Categoria</option>
          <option value="Cake">Cake</option>
          <option value="Insalate">Insalate</option>
          <option value="Speciali">Speciali</option>
        </select>
        <input
          type="number"
          placeholder="Stock porzioni da 2"
          className="w-full border p-2 rounded-xl"
          value={newStock.stock2}
          onChange={(e) => setNewStock((s) => ({ ...s, stock2: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Stock porzioni da 5"
          className="w-full border p-2 rounded-xl"
          value={newStock.stock5}
          onChange={(e) => setNewStock((s) => ({ ...s, stock5: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Prezzo porzione da 2"
          className="w-full border p-2 rounded-xl"
          value={newStock.price2}
          onChange={(e) => setNewStock((s) => ({ ...s, price2: e.target.value }))}
          step="0.01"
        />
        <input
          type="number"
          placeholder="Prezzo porzione da 5"
          className="w-full border p-2 rounded-xl"
          value={newStock.price5}
          onChange={(e) => setNewStock((s) => ({ ...s, price5: e.target.value }))}
          step="0.01"
        />
        <button
          onClick={handleAddStock}
          className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold"
        >
          Aggiorna Stock
        </button>
      </div>

      <ul className="divide-y divide-gray-200 mt-2">
        {stockItems.map((item, idx) => (
          <li key={idx} className="py-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-[#D39BFF]">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Categoria: {item.type}<br />
                  x2: {item.stock2} (prezzo €{item.price2})<br />
                  x5: {item.stock5} (prezzo €{item.price5})
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
