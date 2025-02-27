import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import './MoreInfoGame.css'
import { useCart } from '../CartContext';
import { getGameById } from '../../utils/api/gameApi';

function MoreInfoGame() {
const [game, setGame] = useState({});    
const {id} = useParams();
const navigate = useNavigate()
const {dispatch} = useCart()
const [isInCart, setIsInCart] = useState(false);

const addCart = () => {
isInCart ? navigate('/cart') :
 dispatch({type: 'ADD_TO_CART', payload: game})
 setIsInCart(true)
}


    useEffect(() => {
        getGameById(id).then((data) => {
            setGame(data.game)
            console.log(data)
        });
    }, []);

  return (
    <>
    {console.log(game)}
    <div className='more-info'>
        <div className='more-info_img'>
            <img src={game.image} alt={game.name} />
        </div>
        <div className='more-info_content'>
        <h2 className='more-info_title'>{game.name}</h2>
        <p>Описание</p>
        <p className='more-info_description'>{game.description}</p>
        <div className='more-info_bot'>
            <p className='more-info_price'>{game.price}₽</p>
            <button onClick={addCart} className='more-info_buy'>{isInCart ? 'В корзине' : 'Купить'}</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default MoreInfoGame