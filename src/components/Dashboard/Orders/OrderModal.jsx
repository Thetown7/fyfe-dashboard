import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatBox from '../Chat/ChatBox';

export default function OrderModal({
  openOrderModal,
  setOpenOrderModal,
  calculateTotal,
  handleCloseOrder,
  showChat,
  setShowChat,
  chatMessages,
  setChatMessages,
  newMessage,
  setNewMessage,
}) {
  const customerName = openOrderModal?.nick || 'il Cliente';

  return (
    <>
      {/* Modale Dettagli Ordine */}
      <AnimatePresence>
        {openOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white p-6 rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setOpenOrderModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              {/* Info Ordine */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Info Ordine</h2>
                <p><span className="font-semibold">Nome:</span> {openOrderModal.name}</p>
                <p><span className="font-semibold">Categoria:</span> {openOrderModal.category}</p>
                <p><span className="font-semibold">Quantità:</span> {openOrderModal.quantity}</p>
                <p><span className="font-semibold">Prezzo unitario:</span> €{openOrderModal.price}</p>
                <p><span className="font-semibold">Totale Ordine:</span> €{calculateTotal(openOrderModal)}</p>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Info Cliente */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Info Cliente</h2>
                <p><span className="font-semibold">Nick:</span> {customerName}</p>
                <p><span className="font-semibold">Messaggio:</span> {openOrderModal.message || '-'}</p>
              </div>

              <button
                onClick={() => {
                  setChatMessages(openOrderModal.message ? [openOrderModal.message] : []);
                  setShowChat(true);
                }}
                className="w-full bg-[#D39BFF] text-white py-2 mt-2 rounded-xl font-semibold"
              >
                📞 Contatta Cliente
              </button>


              {showChat && (
                <ChatBox
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  customerName={customerName}
                  showChat={showChat}
                />
              )}
              <hr className="border-gray-200 my-4" />

              {/* Consegna */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#D39BFF] mb-2">Consegna</h2>
                <p><span className="font-semibold">Indirizzo:</span> {openOrderModal.address}</p>
              </div>

              <button
                onClick={() => handleCloseOrder(openOrderModal)}
                className="w-full bg-[#D39BFF] text-white py-2 rounded-xl font-semibold"
              >
                Chiudi Ordine
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
