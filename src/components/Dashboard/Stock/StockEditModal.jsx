import { AnimatePresence, motion } from 'framer-motion';

export default function StockEditModal({
    editingStock,
    setEditingStock,
    handleUpdateStock,
  }) {
    return (
        <>
      {/* Modale Modifica Stock */}
<AnimatePresence>
  {editingStock && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white p-6 rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto relative">
        <button onClick={() => setEditingStock(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-2xl font-bold text-[#D39BFF] mb-4">Modifica Stock</h2>

        {/* Form modifica */}
        <input
          type="text"
          placeholder="Nome prodotto"
          className="w-full border p-2 rounded-xl mb-2"
          value={editingStock.name}
          onChange={(e) => setEditingStock({ ...editingStock, name: e.target.value })}
        />
        <select
          className="w-full border p-2 rounded-xl mb-2"
          value={editingStock.type}
          onChange={(e) => setEditingStock({ ...editingStock, type: e.target.value })}
        >
          <option value="">Seleziona Categoria</option>
          <option value="Cake">Cake</option>
          <option value="Insalate">Insalate</option>
          <option value="Speciali">Speciali</option>
        </select>
        <input
          type="number"
          placeholder="Stock porzioni da 2"
          className="w-full border p-2 rounded-xl mb-2"
          value={editingStock.stock2}
          onChange={(e) => setEditingStock({ ...editingStock, stock2: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock porzioni da 5"
          className="w-full border p-2 rounded-xl mb-2"
          value={editingStock.stock5}
          onChange={(e) => setEditingStock({ ...editingStock, stock5: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prezzo porzione da 2 (€)"
          className="w-full border p-2 rounded-xl mb-2"
          value={editingStock.price2}
          onChange={(e) => setEditingStock({ ...editingStock, price2: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prezzo porzione da 5 (€)"
          className="w-full border p-2 rounded-xl mb-4"
          value={editingStock.price5}
          onChange={(e) => setEditingStock({ ...editingStock, price5: e.target.value })}
        />

        {/* Bottone Salva Modifica */}
        <button
          onClick={handleUpdateStock}
          className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold"
        >
          Salva Modifiche
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </>
    );
  }
  