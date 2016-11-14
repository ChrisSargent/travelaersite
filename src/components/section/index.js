import React from 'react';
import Article from '../article';
import Row from '../row';
import css from '../../lib/css';

require('./_section.sass');

function Section(props) {
  var sectionClass, sectionStyle, colClass = {};
  var {slug} = props;
  const {title, content, subSections, position, modifier, image} = props;

  sectionClass = "normal-section";
  (!slug && title) && (slug = title.replace(/\s+/g, '-').toLowerCase());
  sectionClass += ' -' + slug;

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
    sectionClass += css.hasbg;
  }

  colClass = "column";
  position && (colClass += ' -' + position);

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="row-block">
        <div className={colClass}>
          <Article title={title} content={content} modifier={modifier} divOnly />
        </div>
      </div>
      <Row columns={subSections} />
      { image && <img src={image} alt="" className="_replaceimg"/> }
    </section>
  );
}

export default Section;
