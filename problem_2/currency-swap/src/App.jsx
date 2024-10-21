import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'flowbite-react'
import Header from './components/navigation/Header';
import SellBox from './components/currencySwap/SellBox';
import BuyBox from './components/currencySwap/BuyBox';
import WalletSelector from './components/currencySwap/WalletSelector'; 
import ConfirmationModal from './components/ConfirmationModal'
import { dummyWallets } from './constants';
import { MdSwapHoriz } from 'react-icons/md';
import { HiCheck, HiX } from 'react-icons/hi';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for Sell and Buy
  const [sellAmount, setSellAmount] = useState('');
  const [sellToken, setSellToken] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [buyToken, setBuyToken] = useState('');
  
  // Wallet State
  const [selectedWallet, setSelectedWallet] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transaction status state
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false)
  const [isTransactionError, setIsTransactionError] = useState(false)

  useEffect(() => {
    // Fetch token prices
    fetch('https://interview.switcheo.com/prices.json')
      .then(response => response.json())
      .then(data => {
        const uniquePrices = [];
        const seenTokens = new Set();

        data.forEach(item => {
          if (!seenTokens.has(item.currency)) {
            seenTokens.add(item.currency);
            uniquePrices.push({
              symbol: item.currency,
              price: item.price,
              imageUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`,
            });
          }
        });

        setPrices(uniquePrices);
      })
      .catch(error => console.error('Error fetching prices:', error));
  }, []);

  // Swap function
  const handleSwap = () => {
    const tempAmount = sellAmount;
    const tempToken = sellToken;

    setSellAmount(buyAmount);
    setSellToken(buyToken);
    setBuyAmount(tempAmount);
    setBuyToken(tempToken);
  };

  // Transaction function
  const handleTransaction = () => {

    // Simulate a transaction
    const isSuccess = Math.random() > 0.5; // Simulate success/failure randomly

    if (isSuccess) {
      setTransactionMessage('Transaction successful');
      setIsTransactionSuccess(true);
    } else {
      setTransactionMessage('Transaction error');
      setIsTransactionError(true)
    }
  };

  const openConfirmationModal = () => {
    setIsTransactionError(false);
    setIsTransactionSuccess(false);

    if (!selectedWallet) {
      setTransactionMessage('Please select a wallet to perform the transaction.');
      setIsTransactionError(true)
      return;
    }
    setIsModalOpen(true);
  }

    // Handle confirmation of transaction
    const confirmTransaction = () => {
      handleTransaction();
      setIsModalOpen(false);
    };

  return (
    <div>
      <Header />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <SellBox
          amount={sellAmount}
          onAmountChange={setSellAmount}
          token={sellToken}
          onTokenChange={setSellToken}
          tokens={prices}
        />

        {/* Swap Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="bg-gray-300 dark:bg-gray-700 rounded-full p-2 shadow-md"
            onClick={handleSwap}
            title="Swap"
          >
            <MdSwapHoriz size={24} />
          </button>
        </div>

        <BuyBox
          amount={buyAmount}
          onAmountChange={setBuyAmount}
          token={buyToken}
          onTokenChange={setBuyToken}
          tokens={prices}
        />
      </div>

      {/* Transaction */}
      <div className="p-4 space-y-4">

        <WalletSelector
          wallets={dummyWallets}
          selectedWallet={selectedWallet}
          onWalletChange={setSelectedWallet}
        />

        <div className='flex justify-center'>
          {/* Perform Transaction Button */}
          <Button
            outline
            gradientDuoTone="purpleToPink"
            className="w-96"
            onClick={openConfirmationModal}
          >
            Perform Transaction
          </Button>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            header="Confirm Transaction"
            body="Are you sure you want to perform this transaction?"
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmTransaction}
          />
        </div>
      </div>

      {/* Transaction Message */}
      {isTransactionSuccess && (
        <div className="fixed top-5 right-5 z-50">
          {' '}
          {/* Positioned top-right of the page*/}
          <Toast className=" top-5 right-5">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {transactionMessage}
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      {isTransactionError && (
        <div className="fixed top-5 right-5 z-50">
          {' '}
          {/* Positioned top-right of the page*/}
          <Toast className=" top-5 right-5">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{transactionMessage}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </div>
  );
}

export default App;
