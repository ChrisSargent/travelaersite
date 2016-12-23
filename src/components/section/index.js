import React from 'react';
import css from '../../lib/css';
import RespImageCover from '../resp-image-cover';

require('./_section.sass');

function Section(props) {
  var modifier1 = ' -skewnone',
    modifier2 = '',
    modifier3 = '_bg';
  const {
    compName,
    image,
    wait,
    respSizes,
    skew,
    children
  } = props;
  if (skew) {
    modifier1 = ' -skew' + skew;
    modifier2 = '_skew';
    modifier3 += ' _unskew';
  }
  skew && (modifier1 = ' -skew' + skew);

  return (
    <section className={css.section + compName + modifier1}>
      {children && <div className={css.container}>{children}</div>}
      <div className={modifier2}>
        <div className={modifier3}>
          <RespImageCover image={image} wait={wait} respSizes={respSizes}/>
        </div>
      </div>
    </section>
  );
}

export default Section;
