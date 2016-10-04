import React from 'react';

function Banner(props) {
  const {acf_fc_layout, logos, title} = props;
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
      <div className="cont--l">
        <h1>{title}</h1>
        <ul className="cont--l">
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
