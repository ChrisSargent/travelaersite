import React from 'react';
import css from '../../lib/css';
import RespImageCover from '../resp-image-cover'
import SVG from '../svg';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {modifier, subtitle, icon, image} = props;
  var {title} = props,
    headClass;

  modifier
    ? headClass = css.header + modifier
    : headClass = css.header + css.default;

  image && (headClass += ' -bg');
  typeof title === 'object' && (title = title.rendered);

  return (
    <header className={headClass}>
      {icon && <SVG type={icon}/>}
      <div className={css.container}>
        {title && <h1 className={css.title} dangerouslySetInnerHTML={{__html: title}}></h1>}
        {subtitle && <span className={css.subtitle}>{subtitle}</span>}
      </div>
      <RespImageCover image={image} />
    </header>
  );
}

export default ArticleHeader;
