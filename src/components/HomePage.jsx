import React from 'react';
import cakeIcon from '../assets/torta_icon.png';
import saladIcon from '../assets/salad_icon.png';
import specialsIcon from '../assets/special_icon.png';

export default function HomePage({ onSelectCategory, onLogout }) {
  const categories = [
    { name: 'Cake', icon: cakeIcon },
    { name: 'Insalate', icon: saladIcon },
    { name: 'Speciali', icon: specialsIcon },
  ];

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      {/* Titolo */}
      <div className="bg-[#D39BFF] p-4 rounded-2xl text-white text-center mb-6">
        <h1 className="text-4xl font-bold">Fyfe 🍭</h1>
        <button
          onClick={onLogout}
          className="text-white text-sm underline mt-2"
        >
          Esci
        </button>
      </div>

      {/* Liste Categorie */}
      {categories.map((cat) => (
        <div key={cat.name} className="mb-4">
          <button
            onClick={() => onSelectCategory(cat.name)}
            className="w-full flex items-center bg-white border-2 rounded-2xl p-4 shadow text-lg font-semibold text-[#D39BFF] hover:bg-[#f3e8ff] transition-all duration-300"
          >
            <div className="h-16 w-16 flex items-center justify-center rounded-full mr-4 bg-[#f3e8ff] border border-[#D39BFF]">
              <img src={cat.icon} alt={cat.name} className="w-10 h-10 object-contain" />
            </div>
            {cat.name}
          </button>
        </div>
      ))}
    </div>
  );
}
