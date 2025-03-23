import React, { useEffect, useState } from 'react';
import './Games.css';
import { getGames } from '../../utils/api/gameApi';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';

function Games() {
  const [products, setProducts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGames().then((data) => setProducts(data.games));
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueGenres = [...new Set(products.map((product) => product.genre))];
      setGenres(['Все', ...uniqueGenres]);
    }
  }, [products]);

  // Обработка поиска
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = products.filter(game => 
        game.name.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Переход на страницу игры
  const handleSuggestionClick = (id) => {
    navigate(`/games/${id}`);
    setSearchQuery('');
    setSuggestions([]);
  };

  const filteredProducts =
    selectedGenre === 'Все'
      ? products
      : products.filter((product) => product.genre === selectedGenre);

  return (
    <div className='games'>
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск игр..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map(game => (
              <li
                key={game._id}
                onClick={() => handleSuggestionClick(game._id)}
                className="suggestion-item"
              >
                {game.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className='title'>Новинки</h2>
      <ul className='cards'>
        {products &&
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
        {filteredProducts.map((game) => (
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