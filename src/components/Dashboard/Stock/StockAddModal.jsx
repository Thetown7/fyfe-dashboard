import { AnimatePresence, motion } from 'framer-motion';

export default function StockAddModal({
    openStockModal,
    setOpenStockModal,
    newStock,
    setNewStock,
    handleAddStock,
  }) {
    return (
        <>
      {/* Modale Aggiunta Stock */}
<AnimatePresence>
  {openStockModal && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white p-6 rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto relative">
        
        <button onClick={() => setOpenStockModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        
        <h2 className="text-2xl font-bold text-[#D39BFF] mb-4 text-center">Aggiungi Nuovo Stock</h2>

        {/* Form di Aggiunta Stock */}
        <div className="space-y-2">
          <input type="text" placeholder="Nome per Stock" className="w-full border p-2 rounded-xl" value={newStock.name} onChange={(e) => setNewStock((s) => ({ ...s, name: e.target.value }))} />
          <select className="w-full border p-2 rounded-xl" value={newStock.type || ''} onChange={(e) => setNewStock((s) => ({ ...s, type: e.target.value }))}>
            <option value="">Seleziona Categoria</option>
            <option value="Cake">Cake</option>
            <option value="Insalate">Insalate</option>
            <option value="Speciali">Speciali</option>
          </select>
          <input type="number" placeholder="Stock porzioni da 2" className="w-full border p-2 rounded-xl" value={newStock.stock2} onChange={(e) => setNewStock((s) => ({ ...s, stock2: e.target.value }))} />
          <input type="number" placeholder="Prezzo porzione da 2 (€)" className="w-full border p-2 rounded-xl" value={newStock.price2} onChange={(e) => setNewStock((s) => ({ ...s, price2: e.target.value }))} step="0.01" />
          <input type="number" placeholder="Stock porzioni da 5" className="w-full border p-2 rounded-xl" value={newStock.stock5} onChange={(e) => setNewStock((s) => ({ ...s, stock5: e.target.value }))} />
          <input type="number" placeholder="Prezzo porzione da 5 (€)" className="w-full border p-2 rounded-xl" value={newStock.price5} onChange={(e) => setNewStock((s) => ({ ...s, price5: e.target.value }))} step="0.01" />
          
          <button onClick={() => { handleAddStock(); setOpenStockModal(false); }} className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold">
            Salva Stock
          </button>
        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </>
    );
  }
  