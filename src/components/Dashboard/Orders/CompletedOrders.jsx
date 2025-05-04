import React from "react";

export default function CompletedOrders({ orders = [], total = 0 }) {
  return (
    <section className="bg-white border rounded-2xl shadow p-4 mb-6">
      <summary className="flex items-center gap-2 cursor-default">
        <span className="h-6 w-6 bg-gray-300 rounded-full" />
        <span className="text-lg font-semibold text-[#D39BFF]">Ordini Totali</span>
        <span className="ml-auto text-sm text-[#D39BFF]">Incasso: €{total}</span>
      </summary>

      {orders.length === 0 ? (
        <p className="mt-2 text-sm text-gray-400">Nessun ordine completato.</p>
      ) : (
        <ul className="divide-y divide-gray-200 mt-2">
          {orders.map((order) => (
            <li key={order.id} className="py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-xs text-gray-400">Categoria: {order.category}</p>
                  <p className="text-xs text-gray-400">Address: {order.address}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-green-500">x{order.quantity}</span>
                  <span className="text-sm text-gray-500">€{order.price * order.quantity}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
