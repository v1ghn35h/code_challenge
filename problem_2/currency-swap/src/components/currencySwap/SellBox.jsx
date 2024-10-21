// SellBox.jsx
import React from 'react';
import SwapBox from './SwapBox';

function SellBox({ amount, onAmountChange, token, onTokenChange, tokens }) {
  return (
    <SwapBox
      label="Sell"
      amount={amount}
      onAmountChange={onAmountChange}
      token={token}
      onTokenChange={onTokenChange}
      tokens={tokens}
    />
  );
}

export default SellBox;
