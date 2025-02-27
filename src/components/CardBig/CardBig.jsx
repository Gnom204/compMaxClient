import React from 'react'
import './CardBig.css'

function CardBig({isInOrder, deleteFunction, item}) {
  
    return (
    <div className='cardBig'>
        <div className='cardBig_img-container'>
            <img src={item.image} alt={item.name}/>
        </div>
        <div className='cardBig_content'>
        {isInOrder && <div onClick={() => deleteFunction(item)} className='cardBig_delete-icon'></div>}
            <h2 className='cardBig_title'>{item.name}</h2>
            <p className='cardBig_description'>{item.description}</p>
            <div className='cardBig_func'>
                <span className='cardBig_price'>{item.price}₽</span>
            </div>
            {isInOrder && item.quantity>0 && <p>Количество: {item.quantity}</p>}
        </div>
    </div>
  )
}

export default CardBig

//<CardBig item={item} isInOrder={true} product={item} key={item.id} {...item} deleteFunction={removeFromCart}/>   
