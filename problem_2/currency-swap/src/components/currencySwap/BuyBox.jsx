// BuyBox.jsx
import React from 'react';
import SwapBox from './SwapBox';

function BuyBox({ amount, onAmountChange, token, onTokenChange, tokens }) {
  return (
    <SwapBox
      label="Buy"
      amount={amount}
      onAmountChange={onAmountChange}
      token={token}
      onTokenChange={onTokenChange}
      tokens={tokens}
    />
  );
}

export default BuyBox;
