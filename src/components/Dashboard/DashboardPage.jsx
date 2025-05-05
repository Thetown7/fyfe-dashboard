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
import ProductAddModal from './Products/ProductAddModal';
import OrderModal from './Orders/OrderModal';











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

<ProductAddModal
  showPreviewPanel={showPreviewPanel}
  setShowPreviewPanel={setShowPreviewPanel}
  stockItems={stockItems}
  newProduct={newProduct}
  setNewProduct={setNewProduct}
  handleAddProduct={handleAddProduct}
/>


<OrderModal
  openOrderModal={openOrderModal}
  setOpenOrderModal={setOpenOrderModal}
  calculateTotal={calculateTotal}          
  handleCloseOrder={handleCloseOrder}
  showChat={showChat}
  setShowChat={setShowChat}
  chatMessages={chatMessages}
  setChatMessages={setChatMessages}
  newMessage={newMessage}
  setNewMessage={setNewMessage}
/>


<h1 className="text-sm text-[#D39BFF] underline"> "FyfeApp 0.01(Beta)" </h1>





    
  
    </div>
    </DashboardProvider>
);
}
