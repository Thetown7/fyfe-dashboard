import React from 'react';
import cakeIcon from '../assets/torta_icon.png';
import saladIcon from '../assets/salad_icon.png';
import specialsIcon from '../assets/special_icon.png';

export default function ProductsPage({ category, onBack }) {
  const products = {
    Cake: [
      { id: 1, name: 'Red Velvet', count: 0 },
      { id: 2, name: 'Torta al Limone', count: 0 },
    ],
    Insalate: [
      { id: 3, name: 'Greca', count: 0 },
      { id: 4, name: 'Caprese', count: 0 },
    ],
    Speciali: [
      { id: 5, name: 'Paccheri', count: 0 },
      { id: 6, name: 'Risotto Tartufato', count: 0 },
    ],
  };

  const dishes = products[category] || [];

  const categoryIcons = {
    Cake: cakeIcon,
    Insalate: saladIcon,
    Speciali: specialsIcon,
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#D39BFF] p-4 rounded-b-2xl text-white text-center mb-6 relative">
        <button onClick={onBack} className="text-white text-sm underline absolute left-6 top-4">
          ← Indietro
        </button>
        <div className="flex items-center justify-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f3e8ff]">
            <img
              src={categoryIcons[category]}
              alt={category}
              className="w-8 h-8 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold">{category}</h1>
        </div>
      </div>

      {/* Lista Piatti */}
      {dishes.map((dish) => (
        <div key={dish.id} className="border rounded-2xl shadow p-4 mb-6">
          <div className="w-full h-48 rounded-xl mb-2 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/300x200"
              alt={dish.name}
              className="object-cover w-full h-full"
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
          <div className="flex justify-center gap-2 mb-2">
            <button className="bg-[#D39BFF] text-white px-4 py-1 rounded-xl">+2</button>
            <button className="bg-[#D39BFF] text-white px-4 py-1 rounded-xl">+5</button>
            <button className="bg-gray-400 text-white px-4 py-1 rounded-xl">+Altro</button>
          </div>
          <p className="text-sm text-gray-600">Totale: {dish.count}</p>
        </div>
      ))}
    </div>
  );
}
