import { useState } from 'react';
export function useDashboardState() {
  // Stati per gestione modali e pannelli
  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(null);
  const [openStockModal, setOpenStockModal] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false);
  
  // Stati per gestione stock
  const [editingStock, setEditingStock] = useState(null);
  const [stockItems, setStockItems] = useState([]);
  const [newStock, setNewStock] = useState({ 
    name: '', 
    type: '', 
    stock2: '', 
    stock5: '', 
    price2: '', 
    price5: '' 
  });
  // Stati per gestione ordini
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  // Stati per gestione prodotti
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price2: '',
    price5: '',
    quantity2: '',
    quantity5: '',
    image: null,
    imageUrl: ''
  });
  // Stati per gestione chat
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  return {
    modalState: {
      showPreviewPanel,
      setShowPreviewPanel,
      openOrderModal,
      setOpenOrderModal,
      openStockModal, 
      setOpenStockModal,
      showStockForm,
      setShowStockForm
    },
    stockState: {
      editingStock,
      setEditingStock,
      stockItems,
      setStockItems,
      newStock,
      setNewStock
    },
    orderState: {
      activeOrders,
      setActiveOrders,
      completedOrders,
      setCompletedOrders
    },
    productState: {
      products,
      setProducts,
      newProduct,
      setNewProduct
    },
    chatState: {
      chatMessages,
      setChatMessages,
      showChat,
      setShowChat,
      newMessage,
      setNewMessage
    }
  };
}