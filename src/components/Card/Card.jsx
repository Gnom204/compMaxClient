import React from 'react';
import './Card.css'; // Импортируем стили
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router';

const Card = ({ name, price, image, id, isAdmin, deleteFunction, descrition, IsComp }) => {
  const { dispatch, state } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, name, price, image, descrition } });
    console.log('Добавлен в корзину:', { id, name, price, image,descrition });
  };

const navigate = useNavigate();
  const isItemInCart = state.items.some(item => item.id === id);

  return (
    <div className="card">
      {isAdmin && (
        <button className="card-delete" onClick={() => deleteFunction(id)}>
          X
        </button>
      )}
      {/* Верхняя часть: картинка */}
      <div className="card-image_container">
        <img className="card-image" src={image} alt={name} />
      </div>

      {/* Нижняя часть: текст и кнопка */}
      <div className="card-content">
        <div className="card-text">
          <p className="card-description">{name}</p>
          <p className="card-price">{price}₽</p>
        </div>
        <div className="card-buttons">
          {!isAdmin && (
            <>
              <button onClick={IsComp ? () => navigate(`/computers/${id}`) : () => navigate(`/games/${id}`)} className="card-button">Подробнее</button>
              <button
                className={isItemInCart ? "card-button-plus-added" : "card-button-plus"}
                onClick={() => addToCart({ id, name, price, image, descrition })}
              >
                {isItemInCart ? "✔" : ""}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;