import React from 'react';

function Banner(props) {
  const {acf_fc_layout, logos} = props;
  const logoMap = logos.map((logo, index) => {
    const classList = 'i--' + logo.iconClass;

    return (
      <li key={index}>
        <i className={classList} aria-hidden="true"></i>
        <span className="i__text">{logo.iconText}</span>
      </li>
    );
  });

  return (
    <section className={acf_fc_layout}>
      <ul>
        {logoMap}
      </ul>
    </section>
  );
}

export default Banner;
