jsx
import React, { useRef } from 'react';
import { DashboardProvider } from '../../context/DashboardProvider';
import { useDashboardState } from './state/DashboardState';
import { useDashboardHandlers } from './handlers/DashboardHandlers';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import ActiveOrdersSection from './Orders/ActiveOrdersSection';
import CompletedOrdersSection from './Orders/CompletedOrdersSection';
import OrderModal from './Orders/OrderModal';
import StockSection from './Stock/StockSection';
import StockEditModal from './Stock/StockEditModal';
import StockAddModal from './Stock/StockAddModal';
import ProductAddModal from './Products/ProductAddModal';
export default function DashboardPage({ onLogout }) {
  const state = useDashboardState();
  const handlers = useDashboardHandlers(state);
  const hiddenFileInput = useRef(null);
  const activeOrders = state?.orders?.active || [];
  const completedOrders = state?.orders?.completed || [];
  return (
    <DashboardProvider>
      <div className="p-6 max-w-md mx-auto bg-white min-h-screen relative">
        <Header onLogout={onLogout} />
        <ActiveOrdersSection 
          activeOrders={activeOrders}
          setOpenOrderModal={handlers.setOpenOrderModal}
          calculateTotal={handlers.calculateTotal}
        />
        
        <CompletedOrdersSection
          completedOrders={completedOrders}
          totalRevenue={handlers.calculateTotalRevenue()}
          calculateTotal={handlers.calculateTotal}
        />
        <StockSection
          stockItems={state.stock}
          handleEditStock={handlers.handleEditStock}
          showStockForm={handlers.showStockForm}
          setOpenStockModal={handlers.setOpenStockModal}
          newStock={state.newStock}
          setNewStock={handlers.setNewStock}
          handleAddStock={handlers.handleAddStock}
          editingStock={state.editingStock}
          handleUpdateStock={handlers.handleUpdateStock}
          setEditingStock={handlers.setEditingStock}
        />
        <OrderModal 
          openOrderModal={state.modalState.openOrderModal}
          setOpenOrderModal={handlers.setOpenOrderModal}
          calculateTotal={handlers.calculateTotal}
          handleCloseOrder={handlers.handleCloseOrder}
          showChat={state.chatState.showChat}
          setShowChat={handlers.setShowChat}
          chatMessages={state.chatState.chatMessages}
          setChatMessages={handlers.setChatMessages}
          newMessage={state.chatState.newMessage}
          setNewMessage={handlers.setNewMessage}
        />
        <StockEditModal
          editingStock={state.stockState.editingStock}
          setEditingStock={handlers.setEditingStock}
          handleUpdateStock={handlers.handleUpdateStock}
        />
        <StockAddModal
          openStockModal={state.modalState.openStockModal}
          setOpenStockModal={handlers.setOpenStockModal}
          newStock={state.stockState.newStock}
          setNewStock={handlers.setNewStock}
          handleAddStock={handlers.handleAddStock}
        />
        <Footer />
      </div>
    </DashboardProvider>
  );
}

