import React, { useEffect, useState } from 'react';
import { createGame, deleteGame, getGames } from '../../utils/api/gameApi';
import { loadImage } from '../../utils/api/loadImage';
import './AddGames.css';
import Card from '../../components/Card/Card';
const GameForm = () => {
  const [gameName, setGameName] = useState('');
  const [gameGenre, setGameGenre] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [gameImage, setGameImage] = useState(null);

  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(data => setGames(data.games));
  }, []);

  const handleDeleteGame = async (id) => {
    try {
      const response = await deleteGame(id);
      if(response){
        setGames(prevGames => prevGames.filter(game => game._id !== id));
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при удалении игры');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const gameData = {
        name: gameName,
        genre: gameGenre,
        description: gameDescription,
        price: gamePrice,
        image: gameImage
      };

      console.log('Отправляемые данные:', gameData);

      const response = await createGame(gameData);

      if (response){
        console.log('Игра успешно создана:', response);
        setGames(prevGames => [...prevGames, response.game]);
        setGameName('');
        setGameGenre('');
        setGameDescription('');
        setGamePrice('');
        setGameImage(null);
      } 
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке данных');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
const imageData = new FormData();
imageData.append("image", file);
loadImage(imageData)
        .then((response) => {
          console.log('Изображение успешно загружено:', response.filePath);
          setGameImage(response.filePath);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке изображения:', error);
        })
    }
  };

  return (
    <div >
      <h1 className="game-form-title">Добавить игру</h1>
      <form className="game-form" onSubmit={handleSubmit}>
        <div className="game-form-group">
          <label>Название:</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </div>
        <div className="game-form-group">
          <label>Жанр:</label>
          <input
            type="text"
            value={gameGenre}
            onChange={(e) => setGameGenre(e.target.value)}
            required
          />
        </div>
        <div className="game-form-group">
          <label>Описание:</label>
          <textarea
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
            required
          />
        </div>
        <div className="game-form-group">
          <label>Цена:</label>
          <input
            type="number"
            value={gamePrice}
            onChange={(e) => setGamePrice(e.target.value)}
            required
          />
        </div>
        <div className="game-form-group">
          <label>Изображение:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Добавить игру</button>
      </form>
      <h2 className="game-list-title">Список игр</h2>
      <ul className="game-list">
        {games.map((game) => (
          <Card key={game._id} name={game.name} price={game.price} image={game.image} id={game._id} deleteFunction={handleDeleteGame} isAdmin={true} />
        ))}
      </ul>

    </div>
  );
};

export default GameForm;

