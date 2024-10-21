import React, { useEffect, useState } from 'react';
import { TextInput } from 'flowbite-react';
import TokenSelector from './TokenSelector';

function SwapBox({ label, amount, onAmountChange, token, onTokenChange, tokens }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const selectedToken = tokens.find((t) => t.symbol === token);
    if (selectedToken) {
      setPrice(selectedToken.price);
      onAmountChange(1); // Autofill unit with 1 when token changes
    }
  }, [token, tokens, onAmountChange]);

  const handleAmountChange = (newAmount) => {
    onAmountChange(newAmount);
  };

  const handleDollarChange = (dollarValue) => {
    const newAmount = dollarValue / price || 0; // Calculate amount based on dollar value and price
    onAmountChange(newAmount); 
  };

  // Safeguard for amount
  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : '0.00';

  return (
    <div className="p-4 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-2 dark:text-white">{label}</h2>

      <div className='flex flex-row space-x-4 items-center'>
        <span className='font-semibold basis-2/12'>Units:</span>
        <TextInput
          type="number"
          placeholder="Units"
          value={formattedAmount} 
          onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
          className="border-none basis-6/12"
        />

        <TokenSelector
          selectedToken={tokens.find((t) => t.symbol === token)}
          onSelectToken={(selected) => {
            onTokenChange(selected.symbol);
            onAmountChange(1); // Reset amount when the token changes
          }}
          tokens={tokens}
          className="basis-4/12"
        />
      </div>

      <div className='flex flex-row space-x-4 items-center'>
        <span className='font-semibold basis-2/12'>Dollars ($):</span>
        <TextInput
          type="number"
          placeholder="Amount"
          value={(amount * price).toFixed(2) || ''}
          onChange={(e) => handleDollarChange(parseFloat(e.target.value) || 0)}
          className="border-none basis-6/12"
        />
      </div>
    </div>
  );
}

export default SwapBox;
