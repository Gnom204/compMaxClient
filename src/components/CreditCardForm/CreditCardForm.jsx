import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({saveCard}) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [flipped, setFlipped] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Форматирование номера карты
    if (name === 'number') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19);
      setCardData(prev => ({...prev, [name]: formattedValue || ''}));
      return;
    }

    // Форматирование срока действия
    if (name === 'expiry') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,2}/g)
        ?.join('/')
        .substr(0, 5);
      setCardData(prev => ({...prev, [name]: formattedValue || ''}));
      return;
    }

    setCardData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные карты:', cardData);
  };

  return (
    <div className="card-form-container">
      <div className={`credit-card ${flipped ? 'flipped' : ''}`}>
        <div className="front">
          <div className="card-logo">VISA</div>
          <div className="card-number">
            {cardData.number || '•••• •••• •••• ••••'}
          </div>
          <div className="card-details">
            <div className="card-holder">
              <label>Владелец карты</label>
              <div>{cardData.name.toUpperCase() || 'ИМЯ ВЛАДЕЛЬЦА'}</div>
            </div>
            <div className="card-expiry">
              <label>Срок действия</label>
              <div>{cardData.expiry || '••/••'}</div>
            </div>
          </div>
        </div>
        
        <div className="back">
          <div className="magnetic-strip"></div>
          <div className="cvv-field">
            <label>CVV</label>
            <div>{cardData.cvv.replace(/./g, '•') || '•••'}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-fields">
        <div className="form-group">
          <label>Номер карты</label>
          <input
            type="text"
            name="number"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            value={cardData.number}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Имя владельца</label>
          <input
            type="text"
            name="name"
            placeholder="ИВАНОВ ИВАН"
            value={cardData.name}
            onChange={handleInputChange}
            pattern="[А-Яа-яA-Za-z ]+"
            title="Только буквы и пробелы"
          />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Срок действия</label>
            <input
              type="text"
              name="expiry"
              placeholder="ММ/ГГ"
              maxLength="5"
              value={cardData.expiry}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="•••"
              maxLength="3"
              value={cardData.cvv}
              onChange={handleInputChange}
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
            />
          </div>
        </div>

        <button onClick={saveCard} type="submit" className="submit-btn">
          Сохранить карту
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;