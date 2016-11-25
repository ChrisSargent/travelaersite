import React from 'react';

require('./_avatar.sass');

function Avatar(props) {
  const {avatar, modifier, alt} = props;
  var styles = {}, avaClass;

  avaClass = 'avatar';
  modifier && (avaClass += ' -' + modifier)
  avatar && (styles = {backgroundImage: 'url(' + avatar + ')'})

  return (
    <div className={avaClass} style={styles}>
      { avatar && <img src={avatar} alt={alt} className="_replaceimg"/> }
    </div>
  );
}

export default Avatar;
