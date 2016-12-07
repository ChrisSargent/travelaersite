import React from 'react';
import css from '../../lib/css';

import SVG from '../svg';

require('./_tile.sass');

function MosaicTile(props) {
  const {type, colour, size} = props.acf;
  const compName = 'tile';
  var tileClass,
    mediaLink,
    liStyle = {};

  tileClass = compName;
  type && (tileClass += ' -' + type);
  colour && (tileClass += ' -' + colour);
  size && (tileClass += ' -' + size);

  switch (type) {
    case 'instagram':
      mediaLink = props.acf.link.split('?')[0] + 'media?size=l';
      liStyle = {
        backgroundImage: 'url(' + mediaLink + ')'
      }
      break;

    case 'quote':
      const {name, job_title, company} = props.acf;
      return (
        <li className={css.block + tileClass}>
          <blockquote>
            <SVG type={type}/>
            <span className={css.content + compName}>{props.acf.content}</span>
            <footer>
              <cite className={css.block + 'cite'}>
                {name && <span className="fn">{name}</span>}
                {job_title && <span className="pos">{job_title}</span>}
                {company && <span className="co">{company}</span>}
              </cite>
            </footer>
          </blockquote>
        </li>
      );

    default:
      break;
  }

  return (
    <li className={css.block + tileClass} style={liStyle}>
      <a href={props.acf.link} target="_blank">
        <SVG type={type}/>
        <span className={css.content + compName}>{props.acf.content}</span>
        {mediaLink && <img src={mediaLink} alt="" className={css.replImg}/>}
      </a>
    </li>
  );
}

export default MosaicTile;
