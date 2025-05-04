import React from "react";

/**
 * Mostra la lista degli ordini ancora aperti.
 * Per ora riceve i dati come prop.
 */
 export default function ActiveOrders({ orders = [], onOpen, calculateTotal }) {

  if (!orders.length) {
    return (
      <section className="p-4">
        <h2 className="text-lg font-semibold mb-2">Ordini attivi</h2>
        <p className="text-sm text-gray-500">Nessun ordine in corso.</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="py-2">
          <div onClick={() => onOpen(order)} className="flex justify-between items-center cursor-pointer">
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
    </section>
  );
}
