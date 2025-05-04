import React from "react";

/**
 * Lista dello stock prodotti.
 * Props:
 *  - items: array di prodotti in magazzino
 *  - onEdit: funzione per aprire il form di modifica (riceve l'item)
 */
export default function StockList({ items = [], onEdit }) {
  return (
    <section className="bg-white border rounded-2xl shadow p-4 mb-6">
     <summary className="flex items-center gap-2 cursor-default">
        <span className="h-6 w-6 bg-[#D39BFF] rounded-full" />
        <span className="text-lg font-semibold text-[#D39BFF]">Stock Prodotti</span>
      </summary> 

      {items.length === 0 ? (
        <p className="mt-2 text-sm text-gray-400">Nessun prodotto a magazzino.</p>
      ) : (
        <ul className="divide-y divide-gray-200 mt-2">
          {items.map((item) => (
            <li key={item.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-400">Quantità: {item.quantity}</p>
              </div>
              <button
                onClick={() => onEdit(item)}
                className="text-sm text-[#D39BFF] underline"
              >
                Modifica
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
