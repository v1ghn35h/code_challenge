// // TokenSelector.jsx
// import React from 'react';
// import { Select } from 'flowbite-react';

// function TokenSelector({ label, value, onChange, options }) {
//   return (
//     <div className="mb-4">
//       <Select value={value} onChange={onChange}>
//         <option value="" disabled>{`Select ${label}`}</option>
//         {options.map((option) => (
//           <option key={option.symbol} value={option.symbol}>
//             {option.symbol}
//           </option>
//         ))}
//       </Select>
//     </div>
//   );
// }

// export default TokenSelector;

// TokenSelector.jsx
import React, { useState } from 'react';
import { Modal, Button, TextInput } from 'flowbite-react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function TokenSelector({ selectedToken, onSelectToken, tokens }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Filter tokens based on the search query
  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div>
      {/* Display the selected token */}
      <Button
        onClick={openModal}
        gradientDuoTone="purpleToPink"
        className="flex items-center rounded-lg border dark:border-gray-700 h-7"
      >
        {selectedToken ? (
          <>
            <img
              src={selectedToken.imageUrl}
              alt={selectedToken.symbol}
              className="w-6 h-6 mr-2 rounded-full"
            />
            {selectedToken.symbol}
          </>
        ) : (
          'Select Token'
        )}
        <span><MdOutlineKeyboardArrowDown className='w-6 h-6'/></span>
      </Button>

      {/* Modal for token selection */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Select a Token</Modal.Header>
        <Modal.Body>
          <TextInput
            type="text"
            placeholder="Search tokens"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <div className="max-h-64 overflow-y-auto">
            {filteredTokens.map((token) => (
              <div
                key={token.symbol}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  onSelectToken(token);
                  closeModal();
                }}
              >
                <img
                  src={token.imageUrl}
                  alt={token.symbol}
                  className="w-6 h-6 mr-2 rounded-full"
                />
                <span>{token.symbol}</span>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TokenSelector;
