import React from 'react';
import { useCart } from '../../components/CartContext';
import CardBig from '../../components/CardBig/CardBig';
import './OrderPage.css';

const OrderPage = () => {
  const { state, dispatch } = useCart();

  // Состояние для промокода и итоговой цены
  const [promocode, setPromocode] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);

  // Вычисляем общую стоимость товаров в корзине
  const calculateTotalPrice = () => {
    return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Применяем промокод
  const applyPromocode = () => {
    let newTotalPrice = calculateTotalPrice();
    if (promocode === 'Промокод123') {
      newTotalPrice = newTotalPrice * 0.9; // Скидка 10%
    }
    setTotalPrice(newTotalPrice); // Обновляем итоговую цену
  };

  // Удаление товара из корзины
  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  // Очистка корзины
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const makeOrder = () => {
    clearCart();
    alert('Заказ успешно оформлен!');
  };

  // Пересчитываем итоговую цену при изменении корзины
  React.useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [state.items]);

  // Общее количество товаров
  const totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='order'>
      <div>
        <h2 className='title'>Корзина</h2>
        {state.items.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul>
            {state.items.map((item) => (
              <CardBig
                key={item.id}
                item={item}
                isInOrder={true}
                deleteFunction={removeFromCart}
              />
            ))}
          </ul>
        )}
      </div>

      <div className='order-data'>
        <div className='order-top'>
          <span className='order-text'>Ваш заказ:</span>
          <span>Товары ({totalQuantity})</span>
        </div>

        <div className='order-bottom'>
          <p className='order-text'>Промокод</p>
          <input
            onChange={(e) => setPromocode(e.target.value)}
            className='order-input'
            type='text'
            placeholder='Введите промокод'
          />
          <button onClick={applyPromocode} className='promo-button'>
            Применить
          </button>
        </div>

        <p className='order-total'>Итого: {totalPrice.toFixed(2)}₽</p>
        <button onClick={makeOrder} className='order-button'>Оформить заказ</button>
      </div>
    </div>
  );
};

export default OrderPage;