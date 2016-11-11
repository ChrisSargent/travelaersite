import React from 'react';
import SectionSub from '../section--sub';
import css from '../../lib/css';

require('./_section.sass');

function Section(props) {
  var subSectionMap, postClass, sectionClass, slug, sectionStyle = {};
  const {acf_fc_layout, title, content, subSections, type, image} = props;

  postClass = css.post + ' ' + type;

  if (title) {
    slug = title.replace(/\s+/g, '-').toLowerCase();
    sectionClass = acf_fc_layout + ' ' + slug;
  }

  if (subSections) {
    subSectionMap = subSections.map((subSection, index) => {
      return <SectionSub key={index} {...subSection}/>;
    });
  }

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
    sectionClass += css.hasbg;
  }

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="cont--xl">
        <div className={postClass}>
          <h1>{title}</h1>
          <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
        { subSectionMap ? <div className="section--sub__wrap">{subSectionMap}</div> : false }
      </div>
      { image ? <img src={image} alt="" className="_replaceimg"/> : false }
    </section>
  );
}

export default Section;
