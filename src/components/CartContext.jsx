import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext();

// Функция для получения начального состояния из localStorage
const getInitialState = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { items: [] };
};

// Начальное состояние корзины
const initialState = getInitialState();

// Редуктор для управления состоянием корзины
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Проверяем, есть ли товар уже в корзине
      const existingItem = state.items.find(item => item.id === action.payload.id);

      let newItems;
      if (existingItem) {
        // Если товар уже есть, обновляем его количество (если есть поле quantity)
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 } // Увеличиваем количество
            : item
        );
      } else {
        // Если товара нет, добавляем его в корзину
        newItems = [...state.items, { ...action.payload, quantity: 1 }]; // Добавляем поле quantity
      }

      // Сохраняем обновленную корзину в localStorage
      localStorage.setItem('cart', JSON.stringify({ items: newItems }));

      return {
        ...state,
        items: newItems,
      };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify({ items: newItems }));
      return {
        ...state,
        items: newItems,
      };
    }
    case 'CLEAR_CART': {
      localStorage.removeItem('cart');
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

// Провайдер контекста
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // При монтировании компонента загружаем данные из localStorage
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      dispatch({ type: 'INIT_CART', payload: JSON.parse(cart) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста
export const useCart = () => {
  return useContext(CartContext);
};