import React from 'react';
import Icon from '../icons';

function MosaicTile(props) {
  var tileClass, mediaLink, liStyle = {};
  const {type} = props.acf;
  const tileWrapClass = 'tile__wrap'

  tileClass = 'tile--' + type;

  if(props.acf.colour) {
    tileClass += ' tile--' + props.acf.colour
  }

  switch (type) {
    case 'instagram':
      mediaLink = props.acf.link.split('?')[0] + 'media/?size=l';
      break;

    case 'quote':
      const {name, position, company} = props.acf;
      return (
        <li className={tileClass}>
          <div className={tileWrapClass}>
            <blockquote>
              <Icon type={type} title={type}/>
              <span className="tile__content">{props.acf.content}</span>
              <footer>
                <cite>
                  { name ? <span className="quote__fn">{name}</span> : false }
                  { position ? <span className="quote__pos">{position}</span> : false }
                  { company ? <span className="quote__co">{company}</span> : false }
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
        <Icon type={type} title={type}/>
        <span className="tile__content">{props.acf.content}</span>
        { mediaLink ? <img src={mediaLink} alt="" className="_replaceimg"/> : false }
      </a>
    </li>
  );
}

export default MosaicTile;
