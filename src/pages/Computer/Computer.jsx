import React, { useEffect, useState } from 'react';
import './Computer.css';
import Card from '../../components/Card/Card';
import { getComps } from '../../utils/api/compApi';

function Games() {
  const [comps, setComps] = useState([]); // Данные компьютеров
  const [selectedGenre, setSelectedGenre] = useState('Все'); // Выбранный жанр
  const [genres, setGenres] = useState([]); // Список уникальных жанров

  // Загрузка данных с API
  useEffect(() => {
    getComps().then((data) => setComps(data));
  }, []);

  // Получаем уникальные жанры из данных компьютеров
  useEffect(() => {
    if (comps.length > 0) {
      const uniqueGenres = [...new Set(comps.map((comp) => comp.genre))];
      setGenres(['Все', ...uniqueGenres]); // Добавляем "Все" для отображения всех компьютеров
    }
  }, [comps]); // Зависимость от comps

  // Фильтруем компьютеры по выбранному жанру
  const filteredComps =
    selectedGenre === 'Все'
      ? comps
      : comps.filter((comp) => comp.genre === selectedGenre);

  return (
    <div className='games'>
      <h2 className='title'>Новинки</h2>
      <ul className='cards'>
        {comps.slice(0, 4).map((comp) => (
          <Card
            key={comp._id}
            name={comp.name}
            description={comp.description}
            price={comp.price}
            image={comp.image}
            id={comp._id}
            isAdmin={false}
            IsComp={true}
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
        {filteredComps.map((comp) => (
          <Card
            key={comp._id}
            name={comp.name}
            description={comp.description}
            price={comp.price}
            image={comp.image}
            id={comp._id}
            isAdmin={false}
            IsComp={true}
          />
        ))}
      </ul>
    </div>
  );
}

export default Games;