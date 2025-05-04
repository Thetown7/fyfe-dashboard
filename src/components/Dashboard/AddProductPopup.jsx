// src/components/dashboard/AddProductPopup.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddProductPopup({
  showPreviewPanel,
  stockItems,
  newProduct,
  setNewProduct,
  handleAddProduct,
  hiddenFileInput,
  handleImageClick,
  handleImageUpload,
}) {
  return (
    <AnimatePresence>
      {showPreviewPanel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="border rounded-2xl shadow p-4 mb-6"
        >
          {/* Lista Stock disponibile */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-[#D39BFF]">Stock Disponibile</h2>
            <ul className="divide-y divide-gray-200 text-sm mb-4">
              {stockItems.length > 0 ? (
                stockItems.map((item, idx) => (
                  <li key={idx} className="py-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">
                      Categoria: {item.type} | x2: {item.stock2} (€{item.price2}) | x5: {item.stock5} (€{item.price5})
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Nessun prodotto in stock.</p>
              )}
            </ul>
          </div>

          {/* Form aggiunta prodotto */}
          <div
            className="w-full h-48 rounded-xl mb-2 bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            {newProduct.imageUrl ? (
              <img src={newProduct.imageUrl} alt="Anteprima" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">Clicca per caricare immagine</span>
            )}
            <input type="file" accept="image/*" className="hidden" ref={hiddenFileInput} onChange={handleImageUpload} />
          </div>
          <input
            type="text"
            placeholder="Nome Prodotto"
            className="w-full border p-2 rounded-xl mb-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Categoria"
            className="w-full border p-2 rounded-xl mb-2"
            value={newProduct.category || ''}
            onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Disponibilità (x2)"
            className="w-full border p-2 rounded-xl mb-2"
            value={newProduct.stock2 || ''}
            onChange={(e) => setNewProduct((p) => ({ ...p, stock2: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Disponibilità (x5)"
            className="w-full border p-2 rounded-xl mb-4"
            value={newProduct.stock5 || ''}
            onChange={(e) => setNewProduct((p) => ({ ...p, stock5: e.target.value }))}
          />
          <button
            onClick={handleAddProduct}
            className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold"
          >
            Inserisci Prodotto
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
