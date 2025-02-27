import React, { useEffect, useState } from 'react';
import './Games.css';
import { getGames } from '../../utils/api/gameApi';
import Card from '../../components/Card/Card';

function Games() {
  const [products, setProducts] = useState([]); // Данные товаров
  const [selectedGenre, setSelectedGenre] = useState('Все'); // Выбранный жанр
  const [genres, setGenres] = useState([]); // Список уникальных жанров

  // Загрузка данных с API
  useEffect(() => {
    getGames().then((data) => setProducts(data.games));
  }, []);

  // Получаем уникальные жанры из данных товаров
  useEffect(() => {
    if (products.length > 0) {
      const uniqueGenres = [...new Set(products.map((product) => product.genre))];
      setGenres(['Все', ...uniqueGenres]); // Добавляем "Все" для отображения всех товаров
    }
  }, [products]); // Зависимость от products

  // Фильтруем товары по выбранному жанру
  const filteredProducts =
    selectedGenre === 'Все'
      ? products
      : products.filter((product) => product.genre === selectedGenre);

  return (
    <div className='games'>
      <h2 className='title'>Новинки</h2>
      <ul className='cards'>
        {products &&
          products.length > 0 &&
          products.slice(0, 4).map((game) => (
            <Card
              key={game._id}
              name={game.name}
              description={game.description}
              price={game.price}
              image={game.image}
              id={game._id}
              isAdmin={false}
              IsComp={false}
            />
          ))}
      </ul>

      <h2 className='title'>Рекомендуемое</h2>
      <div className='genres'>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`${selectedGenre === genre ? 'active' : ''} genre-button`}
          >
            {genre}
          </button>
        ))}
      </div>

      <ul className='cards'>
        {products &&
          products.length > 0 &&
          filteredProducts.map((game) => (
            <Card
              key={game._id}
              name={game.name}
              description={game.description}
              price={game.price}
              image={game.image}
              id={game._id}
              isAdmin={false}
              IsComp={false}
            />
          ))}
      </ul>
    </div>
  );
}

export default Games;