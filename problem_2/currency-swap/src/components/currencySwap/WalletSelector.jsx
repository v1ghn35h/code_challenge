import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';

function WalletSelector({ wallets, selectedWallet, onWalletChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWalletSelection = (walletId) => {
    onWalletChange(walletId);
    setIsModalOpen(false); // Close modal after selection
  };

  const selectedWalletName = selectedWallet
    ? wallets.find((wallet) => wallet.id === selectedWallet)?.name
    : 'Connect to Wallet';

  return (
    <div className='flex justify-center'>
      {/* Connect Wallet Button */}
      <Button onClick={() => setIsModalOpen(true)} gradientDuoTone="purpleToPink" className='w-96'>
        {selectedWalletName}
      </Button>

      {/* Wallet Selection Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Select a Wallet</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <Button
                key={wallet.id}
                onClick={() => handleWalletSelection(wallet.id)}
                className="w-full"
                outline gradientDuoTone="purpleToPink"
              >
                {wallet.name}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalOpen(false)} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WalletSelector;
