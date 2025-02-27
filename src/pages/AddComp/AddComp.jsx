import React from 'react'
import './AddComp.css'
import { createComp, deleteComp, getComps } from '../../utils/api/compApi'
import Card from '../../components/Card/Card'
import { useState, useEffect } from 'react'
import { loadImage } from '../../utils/api/loadImage'

function CompForm() {
  const [compName, setCompName] = useState('');
  const [compType, setCompType] = useState('');
  const [compDescription, setCompDescription] = useState('');
  const [compPrice, setCompPrice] = useState('');
  const [compImage, setCompImage] = useState(null);

  const [comps, setComps] = useState([]);

  useEffect(() => {
    getComps().then(data => setComps(data));
  }, []);

  const handleDeleteComp = async (id) => {
    try {
      const response = await deleteComp(id);
      if(response){
        setComps(prevComps => prevComps.filter(comp => comp._id !== id));
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при удалении компонента');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const compData = {
        name: compName,
        genre: compType,
        description: compDescription,
        price: compPrice,
        image: compImage
      };

      console.log('Отправляемые данные:', compData);

      const response = await createComp(compData);

      if (response){
        console.log('Компонент успешно создан:', response);
        setComps([...comps, response.comp]);
        setCompName('');
        setCompType('');
        setCompDescription('');
        setCompPrice('');
        setCompImage(null);
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
          setCompImage(response.filePath);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке изображения:', error);
        })
    }
  };

  return (
    <div >
      <h1 className="comp-form-title">Добавить компонент</h1>
      <form className="comp-form" onSubmit={handleSubmit}>
        <div className="comp-form-group">
          <label>Название:</label>
          <input
            type="text"
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
            required
          />
        </div>
        <div className="comp-form-group">
          <label>Тип:</label>
          <input
            type="text"
            value={compType}
            onChange={(e) => setCompType(e.target.value)}
            required
          />
        </div>
        <div className="comp-form-group">
          <label>Описание:</label>
          <textarea
            value={compDescription}
            onChange={(e) => setCompDescription(e.target.value)}
            required
          />
        </div>
        <div className="comp-form-group">
          <label>Цена:</label>
          <input
            type="number"
            value={compPrice}
            onChange={(e) => setCompPrice(e.target.value)}
            required
          />
        </div>
        <div className="comp-form-group">
          <label>Изображение:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Добавить компонент</button>
      </form>
      <h2 className="comp-list-title">Список компонентов</h2>
      <ul className="comp-list">
        {comps && comps.length > 0 && comps.map((comp) => (
          <Card key={comp._id} name={comp.name} price={comp.price} image={comp.image} id={comp._id} deleteFunction={handleDeleteComp} isAdmin={true} />
        ))}
      </ul>

    </div>
  );
}

export default CompForm