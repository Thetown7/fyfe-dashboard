jsx
import { useDashboard } from '../../../context/DashboardProvider';
export function useDashboardHandlers(state) {
  const { dispatch } = useDashboard();
  
  const handleEditStock = (item) => {
    state.stockState.setEditingStock({ ...item });
  };
  
  const handleUpdateStock = () => {
    dispatch({ type: 'STOCK_UPDATE', payload: state.stockState.editingStock });
    state.stockState.setEditingStock(null);
  };
  
  const calculateTotal = (order) => order.price * order.quantity;
  
  const handleCloseOrder = (order) => {
    dispatch({ type: 'ORDER_CLOSE', payload: order });
  };
  
  const handleImageUpload = (e, hiddenFileInput) => {
    const file = e.target.files[0];
    if (file) state.productState.setNewProduct((p) => ({ 
      ...p, 
      image: file, 
      imageUrl: URL.createObjectURL(file) 
    }));
  };
  
  return {
    handleEditStock,
    handleUpdateStock,
    calculateTotal,
    handleCloseOrder,
    handleImageUpload
  };
}