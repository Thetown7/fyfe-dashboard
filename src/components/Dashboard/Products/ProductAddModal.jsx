import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';


    export default function ProductAddModal({
        showPreviewPanel,
        setShowPreviewPanel,
        stockItems,
        newProduct,
        setNewProduct,
        handleAddProduct,
      }) {
      
  return (
    <>
      {/* Popup Aggiungi Prodotto */}
    <AnimatePresence>
  {showPreviewPanel && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="border rounded-2xl shadow p-4 mb-6"
    >

       <select
  className="w-full border p-2 rounded-xl mb-2"
  onChange={(e) => {
    const selectedName = e.target.value;
    const selectedStock = stockItems.find((item) => item.name === selectedName);
    if (selectedStock) {
      setNewProduct((prev) => ({
        ...prev,
        name: selectedStock.name,
        category: selectedStock.type,
        price2: selectedStock.price2,
        price5: selectedStock.price5,
      }));
      

    }
  }}
  
>
  <option value="">Seleziona dal Magazzino</option>
  {stockItems.map((item, idx) => (
    <option key={idx} value={item.name}>
      {item.name} ({item.type})
    </option>
  ))}
</select>


      {/* Nome prodotto compilato automatico */}
      <input
        type="text"
        placeholder="Nome Prodotto"
        className="w-full border p-2 rounded-xl mb-2"
        value={newProduct.name}
        onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
        disabled
      />

      {/* Prezzo libero */}
      <input
  type="number"
  placeholder="Prezzo porzione da 2"
  className="w-full border p-2 rounded-xl mb-2"
  value={newProduct.price2}
  onChange={(e) => setNewProduct((p) => ({ ...p, price2: e.target.value }))}
  step="0.01"
/>
<input
  type="number"
  placeholder="Prezzo porzione da 5"
  className="w-full border p-2 rounded-xl mb-2"
  value={newProduct.price5}
  onChange={(e) => setNewProduct((p) => ({ ...p, price5: e.target.value }))}
  step="0.01"
/>


      {/* Categoria compilata automatico */}
      <select
        className="w-full border p-2 rounded-xl mb-2"
        value={newProduct.category || ''}
        disabled
      >
        <option value="">Seleziona Categoria</option>
        <option value="Cake">Cake</option>
        <option value="Insalate">Insalate</option>
        <option value="Speciali">Speciali</option>
      </select>

      {/* Disponibilità libera */}
      <input
  type="number"
  placeholder="Disponibilità porzioni da 2"
  className="w-full border p-2 rounded-xl mb-2"
  value={newProduct.quantity2}
  onChange={(e) => setNewProduct((p) => ({ ...p, quantity2: e.target.value }))}
  min="0"
/>

<input
  type="number"
  placeholder="Disponibilità porzioni da 5"
  className="w-full border p-2 rounded-xl mb-4"
  value={newProduct.quantity5}
  onChange={(e) => setNewProduct((p) => ({ ...p, quantity5: e.target.value }))}
  min="0"
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
    </>
  );
}
