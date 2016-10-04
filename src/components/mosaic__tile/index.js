import React from 'react';

function BlockQuote(props) {
  const {name, position, company} = props.acf;
  return (
    <blockquote>
      {props.acf.content}
      <footer>
        <cite>
          { name ? <span className="quote__fn">{name}</span> : false }
          { position ? <span className="quote__pos">{position}</span> : false }
          { company ? <span className="quote__co">{company}</span> : false }
        </cite>
      </footer>
    </blockquote>
  )
}

function MosaicTile(props) {
  var tileClassList, mediaLink, content, liStyle = {};
  const {type} = props.acf;
  const iconClassList = 'i--' + type;

  tileClassList = 'tile--' + type;
  content = <span>{props.acf.content}</span>

  if(props.acf.colour) {
    tileClassList = tileClassList + ' tile--' + props.acf.colour
  }

  switch (type) {
    case 'instagram':
      mediaLink = props.acf.link.split('?')[0] + 'media/?size=l';
      break;

    case 'quote':
      content = BlockQuote(props);
      break;

    default:
  }

  if(mediaLink) {
    liStyle = {
      backgroundImage: 'url(' + mediaLink + ')',
    }
  }

  return (
    <li className={tileClassList} style={liStyle}>
      <a href={props.acf.link} target="_blank">
        <i className={iconClassList} aria-hidden="true"></i>
        {content}
        { mediaLink ? <img src={mediaLink} alt=""/> : false }
      </a>
    </li>
  );
}

export default MosaicTile;
