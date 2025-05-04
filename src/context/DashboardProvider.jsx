import { createContext, useContext, useReducer } from "react";

// -----------------------------
// Dashboard Context + Provider
// -----------------------------

const DashboardContext = createContext();

const initialState = {
  orders: {
    active: [],
    completed: [],
  },
  stock: [],
  products: [],
};

/**
 * Reducer centrale per la Dashboard
 * Ogni action ha la forma { type: string, payload?: any }
 */
function reducer(state, action) {
  switch (action.type) {
    // ──────── ORDERS ────────
    case "ORDER_ADD":
      return {
        ...state,
        orders: {
          ...state.orders,
          active: [...state.orders.active, action.payload],
        },
      };

    case "ORDER_CLOSE":
      return {
        ...state,
        orders: {
          active: state.orders.active.filter((o) => o.id !== action.payload.id),
          completed: [...state.orders.completed, action.payload],
        },
      };

    // ──────── PRODUCTS ────────
    case "PRODUCT_ADD":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    // ──────── STOCK ────────
    case "STOCK_ADD":
      return {
        ...state,
        stock: [...state.stock, action.payload],
      };

    case "STOCK_UPDATE":
      return {
        ...state,
        stock: state.stock.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };

    default:
      return state;
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Hook di comodo per accedere al context
 */
export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
};
