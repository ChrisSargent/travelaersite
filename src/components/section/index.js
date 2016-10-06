import React from 'react';
import SectionSub from '../section--sub';
import css from '../../lib/css';

function Section(props) {
  var SectionSubMap, postClass, sectionClass, sectionStyle = {};
  const {acf_fc_layout, title, content, subSections, type, image} = props;

  postClass = css.post + ' ' + type;
  sectionClass = acf_fc_layout;

  if (subSections) {
    SectionSubMap = subSections.map((sectionSubProps, index) => {
      return <SectionSub key={index} {...sectionSubProps}/>;
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
        { SectionSubMap ? <div className="section--sub__wrap">{SectionSubMap}</div> : false }
      </div>
      { image ? <img src={image} alt="" className="img--replace"/> : false }
    </section>
  );
}

export default Section;
