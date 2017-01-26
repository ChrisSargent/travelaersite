import React from 'react'
import css from '../../lib/css'
import './_menu-toggle.sass'

const MenuButton = ({controls}) => {
  return (
    <label htmlFor={controls} className={css.toggle + 'menu'}>
      <button className="button">
        <span className="bar" aria-hidden="true"></span>
        <span className="bar" aria-hidden="true"></span>
        <span className="bar" aria-hidden="true"></span>
        <span className="text">Menu Toggle</span>
      </button>
    </label>
  )
}

export default MenuButton
