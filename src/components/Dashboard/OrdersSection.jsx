// src/components/dashboard/OrdersSection.jsx

import React from 'react';

export default function OrdersSection({ activeOrders, setOpenOrderModal, calculateTotal }) {
  return (
    <details open className="bg-white border rounded-2xl shadow p-4 mb-6">
      <summary className="flex items-center gap-2 cursor-pointer">
        <span className="h-6 w-6 bg-[#D39BFF] rounded-full" />
        <span className="text-lg font-semibold text-[#D39BFF]">Ordini Attivi</span>
        <span className="ml-auto text-sm text-[#D39BFF]">{activeOrders.length} attivi</span>
      </summary>
      <ul className="divide-y divide-gray-200 mt-2">
        {activeOrders.map((order) => (
          <li key={order.id} className="py-2">
            <div onClick={() => setOpenOrderModal(order)} className="flex justify-between items-center cursor-pointer">
              <div>
                <p className="font-semibold">{order.name}</p>
                <p className="text-xs text-gray-400">Categoria: {order.category}</p>
                <p className="text-xs text-gray-400">Address: {order.address}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-[#D39BFF]">x{order.quantity}</span>
                <span className="text-sm text-gray-500">€{calculateTotal(order)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
