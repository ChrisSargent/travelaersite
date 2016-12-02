import React from 'react';

require('./_avatar.sass');

function Avatar(props) {
  const {avatar, modifier, alt} = props;
  var avaStyles = {}, avaClass;
  
  avaClass = 'avatar';
  modifier && (avaClass += ' -' + modifier)
  avatar && (avaStyles = {backgroundImage: 'url(' + avatar + ')'})

  return (
    <div className={avaClass} style={avaStyles}>
      { avatar && <img src={avatar} alt={alt} className="_replaceimg"/> }
    </div>
  );
}

export default Avatar;
