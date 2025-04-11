import React from 'react';
import './Popup.css';
import CreditCardForm from '../CreditCardForm/CreditCardForm';

const Popup = ({ isOpen, onClose, saveCard }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="popup-title">Добавление банковской карты</h2>
        <CreditCardForm saveCard={saveCard}/>
      </div>
    </div>
  );
};

export default Popup;