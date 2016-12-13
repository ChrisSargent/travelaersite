import React from 'react';
import css from '../../lib/css';
import Wysiwyg from '../wysiwyg';

import SVG from '../svg';

require('./_tile.sass');

function MosaicTile(props) {
  var {content} = props.acf
  const {type, colour, size, link} = props.acf;
  const alt = content;
  const compName = 'tile';
  var tileClass = '',
    mediaLink,
    liStyle = {},
    TagName = 'a',
    footer = null;

  type && (tileClass += ' -' + type);
  colour && (tileClass += ' -' + colour);
  size && (tileClass += ' -' + size);

  switch (type) {
    case 'instagram':
      mediaLink = link.split('?')[0] + 'media?size=l';
      liStyle = {
        backgroundImage: 'url(' + mediaLink + ')'
      }
      content = null;
      break;

    case 'quote':
      const {name, job_title, company} = props.acf;
      TagName = 'blockquote';
      footer = (
        <footer className={css.footer + compName}>
          <cite>
            {name && <span className="fn">{name}</span>}
            {job_title && <span className="pos">{job_title}</span>}
            {company && <span className="co">{company}</span>}
          </cite>
        </footer>
      )
      break;

    default:
      break;
  }

  return (
    <li className={css.item + tileClass} style={liStyle}>
      <TagName href={link} target="_blank" className={css.content + compName}>
        <SVG type={type}/>
        <Wysiwyg content={content}/>
        {footer}
        {mediaLink && <img src={mediaLink} alt={alt} className={css.replImg}/>}
      </TagName>
    </li>
  );
}

export default MosaicTile;
