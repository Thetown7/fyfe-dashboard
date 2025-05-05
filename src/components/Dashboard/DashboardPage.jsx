import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardProvider } from '../../context/DashboardProvider';
import Header from './Header';
import ActiveOrders from './Orders/ActiveOrders';
import CompletedOrders from './Orders/CompletedOrders';
import StockList from './Stock/StockList';
import ActiveOrdersSection from './Orders/ActiveOrdersSection';
import CompletedOrdersSection from './Orders/CompletedOrdersSection';
import StockSection from './Stock/StockSection';
import StockEditModal from './Stock/StockEditModal';
import StockAddModal from './Stock/StockAddModal';










export default function DashboardPage({ onLogout }) {
  // Stati principali
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(null);
  const [showStockForm, setShowStockForm] = useState(false);
  const [openStockModal, setOpenStockModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  


  // Ordini Attivi
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 1,
      name: 'Red Velvet',
      quantity: 2,
      category: 'Cake',
      price: 5,
      details: 'Con crema di formaggio, 2 strati, 500g.',
      nick: 'Cliente1',
      message: 'Grazie!',
      address: 'Via Roma 123, Milano'
    },
    {
      id: 2,
      name: 'Caprese',
      quantity: 5,
      category: 'Insalate',
      price: 8,
      details: 'Pomodoro, mozzarella, basilico fresco.',
      nick: 'Cliente2',
      message: 'Buon appetito',
      address: 'Corso Italia 45, Napoli'
    }
  ]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Calcolo incasso totale
  const calculateTotal = (order) => order.price * order.quantity;
  const totalRevenue = completedOrders.reduce((sum, order) => sum + calculateTotal(order), 0);

  // Prodotti in vendita (menù)
  const [products, setProducts] = useState([]);
const [newProduct, setNewProduct] = useState({ name: '', category: '', price2: '', price5: '', quantity: '', image: null, imageUrl: '' });


  // Stock di magazzino
  const [stockItems, setStockItems] = useState([]);
  const [newStock, setNewStock] = useState({ name: '', type: '', stock2: '', stock5: '', price2: '', price5: '' });



  const hiddenFileInput = useRef(null);

  // Chat Live Fyfe
const [chatMessages, setChatMessages] = useState([]);
const [showChat, setShowChat] = useState(false);
const [newMessage, setNewMessage] = useState('');

// Gestione Modifica Stock
const handleEditStock = (item) => {
  setEditingStock({ ...item });
};

const handleUpdateStock = () => {
  setStockItems((prev) =>
    prev.map((item) => (item.name === editingStock.name ? editingStock : item))
  );
  setEditingStock(null);
};

  // Gestione chiusura ordine
  const handleCloseOrder = (order) => {
    setCompletedOrders((prev) => [...prev, order]);
    setActiveOrders((prev) => prev.filter((o) => o.id !== order.id));

    // Aggiorna stock
    setStockItems((prev) =>
      prev.map((item) => {
        if (item.name === order.name) {
          const updated = { ...item };
          if (order.quantity === 2) updated.stock2 = Math.max(0, updated.stock2 - 1);
          if (order.quantity === 5) updated.stock5 = Math.max(0, updated.stock5 - 1);
          return updated;
        }
        return item;
      })
    );

    // Aggiorna prodotti menù
    setProducts((prev) =>
      prev.map((prod) =>
        prod.name === order.name
          ? { ...prod, quantity: Math.max(0, prod.quantity - order.quantity) }
          : prod
      )
    );

    setOpenOrderModal(null);
  };

  // Gestione immagine
  const handleImageClick = () => hiddenFileInput.current.click();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewProduct((p) => ({ ...p, image: file, imageUrl: URL.createObjectURL(file) }));
  };

  // Aggiunge nuovo prodotto al menù
 const handleAddProduct = () => {
  const { name, category, price2, price5, quantity2, quantity5, image, imageUrl } = newProduct;
  if (name && category && price2 && price5 && (quantity2 || quantity5)) {
    setProducts((prev) => [
      ...prev,
      { name, category, price2, price5, quantity2, quantity5, image, imageUrl }
    ]);
    setNewProduct({
      name: '',
      category: '',
      price2: '',
      price5: '',
      quantity2: '',
      quantity5: '',
      image: null,
      imageUrl: ''
    });
    setShowPreviewPanel(false);
  } else {
    alert('Compila tutti i campi per aggiungere il prodotto.');
  }
};



  
  // Aggiunge o aggiorna stock di magazzino
const handleAddStock = () => {
  const { name, type, stock2, stock5, price2, price5 } = newStock;
  if (name && type && stock2 && stock5 && price2 && price5) {
    setStockItems((prev) => {
      const exists = prev.find((item) => item.name === name);
      if (exists) {
        return prev.map((item) =>
          item.name === name
            ? {
                name,
                type,
                stock2: parseInt(stock2, 10),
                stock5: parseInt(stock5, 10),
                price2: parseFloat(price2),
                price5: parseFloat(price5),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          name,
          type,
          stock2: parseInt(stock2, 10),
          stock5: parseInt(stock5, 10),
          price2: parseFloat(price2),
          price5: parseFloat(price5),
        },
      ];
    });
    setNewStock({ name: '', type: '', stock2: '', stock5: '', price2: '', price5: '' });
  } else {
    alert('Compila tutti i campi per aggiornare lo stock.');
  }
};



  return (

   <DashboardProvider>
    <Header onLogout={onLogout} />


    <div className="p-6 max-w-md mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="bg-[#D39BFF] p-4 rounded-b-2xl text-white text-center mb-6 relative">
        <button onClick={onLogout} className="text-white text-sm underline absolute left-6 top-4">← Logout</button>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Tasto + Aggiungi Prodotto */}
      <div className="flex justify-end pr-4 mb-6">
        <motion.button
          onClick={() => setShowPreviewPanel((prev) => !prev)}
          className="text-2xl bg-[#D39BFF] text-white rounded-full w-12 h-12 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >+
        </motion.button>
      </div>

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



<ActiveOrdersSection
  activeOrders={activeOrders}
  calculateTotal={calculateTotal}
  setOpenOrderModal={setOpenOrderModal}
/>

      
      
<CompletedOrdersSection
  completedOrders={completedOrders}
  totalRevenue={totalRevenue}
  calculateTotal={calculateTotal}
/>

<StockSection
  stockItems={stockItems}
  handleEditStock={handleEditStock}
  showStockForm={showStockForm}
  setOpenStockModal={setOpenStockModal}
  newStock={newStock}
  setNewStock={setNewStock}
  handleAddStock={handleAddStock}
  editingStock={editingStock}
  handleUpdateStock={handleUpdateStock}
  setEditingStock={setEditingStock}
/>

<StockEditModal
  editingStock={editingStock}
  setEditingStock={setEditingStock}
  handleUpdateStock={handleUpdateStock}
/>


<StockAddModal
  openStockModal={openStockModal}
  setOpenStockModal={setOpenStockModal}
  newStock={newStock}
  setNewStock={setNewStock}
  handleAddStock={handleAddStock}
/>





<h1 className="text-sm text-[#D39BFF] underline"> "FyfeApp 0.01(Beta)" </h1>






      {/* Modale Dettagli Ordine */}
      <AnimatePresence>
        {openOrderModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white p-6 rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto relative">
              <button onClick={() => setOpenOrderModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Info Ordine</h2>
                <p><span className="font-semibold">Nome:</span> {openOrderModal.name}</p>
                <p><span className="font-semibold">Categoria:</span> {openOrderModal.category}</p>
                <p><span className="font-semibold">Quantità:</span> {openOrderModal.quantity}</p>
                <p><span className="font-semibold">Prezzo unitario:</span> €{openOrderModal.price}</p>
                <p><span className="font-semibold">Totale Ordine:</span> €{calculateTotal(openOrderModal)}</p>
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Info Cliente</h2>
                <p><span className="font-semibold">Nick:</span> {openOrderModal.nick || 'Anonimo'}</p>
                <p><span className="font-semibold">Messaggio:</span> {openOrderModal.message || '-'}</p>
              </div>
              <button
  onClick={() => {
    setChatMessages(openOrderModal.message ? [openOrderModal.message] : []);
    setShowChat(true);
  }}
  className="w-full bg-[#D39BFF] text-white py-2 mt-2 rounded-xl font-semibold"
>
  📞 Contatta Cliente
</button>

{showChat && (
  <div className="bg-gray-100 p-4 mt-4 rounded-2xl shadow-inner max-h-60 overflow-y-auto space-y-2">
    <div className="font-semibold mb-2 text-[#D39BFF]">Chat Live con {openOrderModal.nick || 'il Cliente'}</div>
    <div className="space-y-1 max-h-32 overflow-y-auto">
      {chatMessages.map((msg, idx) => (
        <div key={idx} className="text-sm bg-white p-2 rounded-xl shadow">
          {msg}
        </div>
      ))}
    </div>
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        className="flex-1 border rounded-xl p-2 text-sm"
        placeholder="Scrivi un messaggio..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        onClick={() => {
          if (newMessage.trim()) {
            setChatMessages((prev) => [...prev, newMessage]);
            setNewMessage('');
          }
        }}
        className="bg-[#D39BFF] text-white px-4 rounded-xl text-sm"
      >
        Invia
      </button>
    </div>
  </div>
            )}

              <hr className="border-gray-200 my-4" />
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Consegna</h2>
                <p><span className="font-semibold">Indirizzo:</span> {openOrderModal.address}</p>
              </div>
              <button onClick={() => handleCloseOrder(openOrderModal)} className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold">Chiudi Ordine</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
  
    </div>
    </DashboardProvider>
);
}
