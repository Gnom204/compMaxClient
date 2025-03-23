import React, { useEffect, useState } from 'react';
import './Computer.css';
import Card from '../../components/Card/Card';
import { getComps } from '../../utils/api/compApi';
import { useNavigate } from 'react-router-dom';

function Games() {
  const [comps, setComps] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getComps().then((data) => setComps(data));
  }, []);

  useEffect(() => {
    if (comps.length > 0) {
      const uniqueGenres = [...new Set(comps.map((comp) => comp.genre))];
      setGenres(['Все', ...uniqueGenres]);
    }
  }, [comps]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = comps.filter(comp => 
        comp.name.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/computers/${id}`);
    setSearchQuery('');
    setSuggestions([]);
  };

  const filteredComps =
    selectedGenre === 'Все'
      ? comps
      : comps.filter((comp) => comp.genre === selectedGenre);

  return (
    <div className='games'>
       <div className="search-container">
        <input
          type="text"
          placeholder="Поиск компьютеров..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map(comp => (
              <li
                key={comp._id}
                onClick={() => handleSuggestionClick(comp._id)}
                className="suggestion-item"
              >
                {comp.name}
              </li>
            ))}
          </ul>
        )}
      </div>
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