import React, { useEffect, useState } from 'react'
import { getCompById } from '../../utils/api/compApi';
import { useNavigate, useParams } from 'react-router';
import './MoreInfoComp.css'
import { useCart } from '../CartContext';

function MoreInfoComp() {
const [comp, setComp] = useState({});    
const {id} = useParams();
const navigate = useNavigate()
const {dispatch} = useCart()
const [isInCart, setIsInCart] = useState(false);

const addCart = () => {
isInCart ? navigate('/cart') :
 dispatch({type: 'ADD_TO_CART', payload: comp})
 setIsInCart(true)
}


    useEffect(() => {
        getCompById(id).then((data) => {
            setComp(data)
console.log(data)
        });
    }, []);

  return (
    <>
    {console.log(comp)}
    <div className='more-info'>
        <div className='more-info_img'>
            <img src={comp.image} alt={comp.name} />
        </div>
        <div className='more-info_content'>
        <h2 className='more-info_title'>{comp.name}</h2>
        <p>Описание</p>
        <p className='more-info_description'>{comp.description}</p>
        <div className='more-info_bot'>
            <p className='more-info_price'>{comp.price}₽</p>
            <button onClick={addCart} className='more-info_buy'>{isInCart ? 'В корзине' : 'Купить'}</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default MoreInfoComp