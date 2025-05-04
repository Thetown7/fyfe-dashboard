// src/components/dashboard/DashboardPage.jsx

import React from 'react';
import Header from './Header';
import StockSection from './StockSection';
import OrdersSection from './OrdersSection';
import CompletedOrdersSection from './CompletedOrdersSection';
import AddProductPopup from './AddProductPopup';
import OrderModal from './OrderModal';
import ChatLive from './ChatLive';
import PreviewPanel from './PreviewPanel';

export default function DashboardPage({
  onLogout,
  showPreviewPanel,
  setShowPreviewPanel,
  activeOrders,
  completedOrders,
  products,
  stockItems,
  openOrderModal,
  setOpenOrderModal,
  showChat,
  setShowChat,
  chatMessages,
  setChatMessages,
  newMessage,
  setNewMessage,
  newProduct,
  setNewProduct,
  handleAddProduct,
  newStock,
  setNewStock,
  handleAddStock,
  handleCloseOrder,
  hiddenFileInput,
  handleImageClick,
  handleImageUpload,
  calculateTotal,
}) {
  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen relative">
      <PreviewPanel products={products} stockItems={stockItems} />
      <Header onLogout={onLogout} />
      <AddProductPopup
        showPreviewPanel={showPreviewPanel}
        stockItems={stockItems}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        hiddenFileInput={hiddenFileInput}
        handleImageClick={handleImageClick}
        handleImageUpload={handleImageUpload}
      />
      <OrdersSection
        activeOrders={activeOrders}
        setOpenOrderModal={setOpenOrderModal}
        calculateTotal={calculateTotal}
      />
      <CompletedOrdersSection
        completedOrders={completedOrders}
        totalRevenue={completedOrders.reduce((sum, order) => sum + calculateTotal(order), 0)}
        calculateTotal={calculateTotal}
      />
      <StockSection
        stockItems={stockItems}
        newStock={newStock}
        setNewStock={setNewStock}
        handleAddStock={handleAddStock}
      />
      <OrderModal
        openOrderModal={openOrderModal}
        setOpenOrderModal={setOpenOrderModal}
        handleCloseOrder={handleCloseOrder}
        showChat={showChat}
        setShowChat={setShowChat}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        calculateTotal={calculateTotal}
      />
      <ChatLive
        showChat={showChat}
        chatMessages={chatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
