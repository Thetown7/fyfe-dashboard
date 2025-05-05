import React from 'react';
import ActiveOrders from './ActiveOrders';

export default function ActiveOrdersSection({
  activeOrders,
  calculateTotal,
  setOpenOrderModal,
}) {
  return (
    <>
      {/* Sezione Ordini Attivi */}
      <details open className="bg-white border rounded-2xl shadow p-4 mb-6">
        <summary className="flex items-center gap-2 cursor-pointer">
          <span className="h-6 w-6 bg-[#D39BFF] rounded-full" />
          <span className="text-lg font-semibold text-[#D39BFF]">Ordini Attivi</span>
          <span className="ml-auto text-sm text-[#D39BFF] font-bold">
            ({activeOrders.length})
          </span>
        </summary>

        <ul className="divide-y divide-gray-200 mt-2">
          <ActiveOrders
            orders={activeOrders}
            onOpen={setOpenOrderModal}
            calculateTotal={calculateTotal}
          />
        </ul>
      </details>
    </>
  );
}
