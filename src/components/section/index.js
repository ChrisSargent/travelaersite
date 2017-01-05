import React from 'react';
import css from '../../lib/css';
import RespImageCover from '../resp-image-cover';

import './_section.sass';

function Section(props) {
  var sectionModifier = '',
    skewClass = '',
    skewCorrectionClass;
    
  const {
    compName,
    image,
    wait,
    respSizes,
    skew,
    overlaps,
    children
  } = props;

  if (skew) {
    sectionModifier = ' -skew' + skew;
    skewClass = ' _skew';
    skewCorrectionClass = '_skewcorrect';
  } else {
    sectionModifier = ' -skewnone';
  }

  if (overlaps) {
    skewClass += ' -ol' + overlaps[0].position;
    skewClass += ' -ol' + overlaps[0].type;
    skewClass += ' -ol' + overlaps[0].colour;
  }

  return (
    <section className={css.section + compName + sectionModifier}>
      {children && <div className={css.container}>{children}</div>}
      <div className={'_sectionbg' + skewClass}>
        <div className={skewCorrectionClass}>
          <RespImageCover image={image} wait={wait} respSizes={respSizes}/>
        </div>
      </div>
    </section>
  );
}

export default Section;
