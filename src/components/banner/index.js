import React from 'react';
import Icon from '../icons';

function Banner(props) {
  const {acf_fc_layout, logos, title} = props;
  var sectionClass = acf_fc_layout;

  const logoMap = logos.map((logo, index) => {
    return (
      <li key={index}>
        <Icon type={logo.iconType} title={logo.iconTitle}/>
      </li>
    );
  });

  return (
    <section className={sectionClass}>
      <div className="cont--l">
        <h1>{title}</h1>
        <ul>
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
