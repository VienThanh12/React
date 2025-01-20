import React, { useState } from 'react';

export default function DropdownWithSearch() {
  const [selectedOption, setSelectedOption] = useState('GPT-4o');
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'GPT-4o', description: 'Best for complex tasks', icon: '✨' },
    {
      label: 'GPT-4o mini',
      description: 'Faster for everyday tasks',
      icon: '⚡',
    },
    { label: 'GPT-4', description: 'Legacy model', icon: '✨' },
  ];

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        width: '250px',
        margin: '20px auto',
        position: 'relative',
      }}
    >
      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 15px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div>
          <span style={{ marginRight: '10px' }}>✨</span>
          {selectedOption}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>▼</div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '0',
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            padding: '10px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          >
            <input
              type='text'
              placeholder='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                flex: '1',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Options */}
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedOption(option.label);
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor:
                  selectedOption === option.label ? '#f5f5f5' : '#ffffff',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px', fontSize: '16px' }}>
                  {option.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {option.description}
                  </div>
                </div>
              </div>
              {selectedOption === option.label && (
                <div style={{ fontSize: '16px', color: '#4caf50' }}>✔</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
