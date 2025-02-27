import React from 'react'
import './Home.css'
import { Link } from 'react-router'
import gameImg from '../../utils/images/game.png'
import compImg from '../../utils/images/pc.png'

function Home() {
  return (
    <div className='home'>
<div className='to-game'>
    <Link className='to-gameLink' to={'/games'}>
    <img src={gameImg} alt="Картинка с игрой" className='game-img' />
    <p className='game-text'>Купить игры</p>
    </Link>
</div>
<div className='to-computer'>
    <Link className='to-computerLink' to={'/computers'}>
    <img src={compImg} alt="Картинка с компьютером" className='comp-img' />
    <p className='comp-text'>Собрать ПК</p>
    </Link>
</div>
    </div>
  )
}

export default Home