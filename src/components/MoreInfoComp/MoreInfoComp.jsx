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
        <div className='more-info-comp'>
            <div className='right-column-comp'>
                <div className='more-info_img-comp'>
                    <img src={comp.image} alt={comp.name} />
                </div>
                <div className='description-section-comp'>
                    <p>Описание</p>
                    <p className='more-info_description-comp'>{comp.description}</p>
                </div>
            </div>
    
            <div className='left-column-comp'>
                <h2 className='more-info_title-comp'>{comp.name}</h2>
                <div className='more-info_bot-comp'>
                    <p className='more-info_price-comp'>{comp.price}₽</p>
                    <button onClick={addCart} className='more-info_buy-comp'>
                        {isInCart ? 'В корзине' : 'Купить'}
                    </button>
                </div>
            </div>
        </div>
      )
    }

export default MoreInfoComp
