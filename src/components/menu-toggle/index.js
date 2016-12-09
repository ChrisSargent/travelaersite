import React from 'react';
import css from '../../lib/css';

require('./_menu-toggle.sass');

function MenuButton(props) {
  const {controls} = props;

  return (
    <label htmlFor={controls} className={css.toggle + 'menu'}>
      <button className="button">
        <span className="bar" aria-hidden="true"></span>
        <span className="bar" aria-hidden="true"></span>
        <span className="bar" aria-hidden="true"></span>
        <span className="text">Menu Toggle</span>
      </button>
    </label>
  );
}

export default MenuButton;
