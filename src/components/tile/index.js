import React from 'react';
import Icon from '../icons';

require('./_tile.sass');

function MosaicTile(props) {
  const {type, colour, size} = props.acf;
  const tileWrapClass = 'tile__wrap'
  var tileClass, mediaLink, liStyle = {};

  tileClass = 'tile -' + type;
  colour && (tileClass += ' -' + colour);
  size && (tileClass += ' -' + size);

  switch (type) {
    case 'instagram':
      mediaLink = props.acf.link.split('?')[0] + 'media/?size=l';
      break;

    case 'quote':
      const {name, job_title, company} = props.acf;
      return (
        <li className={tileClass}>
          <div className={tileWrapClass}>
            <blockquote>
              <Icon type={type} />
              <span className="tile__content">{props.acf.content}</span>
              <footer>
                <cite>
                  { name && <span className="quote__fn">{name}</span> }
                  { job_title && <span className="quote__pos">{job_title}</span> }
                  { company && <span className="quote__co">{company}</span> }
                </cite>
              </footer>
            </blockquote>
          </div>
        </li>
      );

    default:
      break;
  }

  if(mediaLink) {
    liStyle = {
      backgroundImage: 'url(' + mediaLink + ')',
    }
  }

  return (
    <li className={tileClass} style={liStyle}>
      <a href={props.acf.link} target="_blank" className={tileWrapClass}>
        <Icon type={type} />
        <span className="tile__content">{props.acf.content}</span>
        { mediaLink && <img src={mediaLink} alt="" className="_replaceimg"/> }
      </a>
    </li>
  );
}

export default MosaicTile;
