import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../resp-image-cover'
import Wysiwyg from '../wysiwyg'
import SVG from '../svg'
import './_tile.sass'

const MosaicTile = ({content, image, type, colour, size, link, name, job_title, company}) => {
  const alt = content
  const compName = 'tile'
  var tileClass = '',
    TagType = 'a',
    footer = null

  type && (tileClass += ' -' + type)
  colour && (tileClass += ' -' + colour)
  size && (tileClass += ' -' + size)

  switch (type) {
    case 'instagram':
      image = link.split('?')[0] + 'media?size=l'
      content = null
      break

    case 'quote':
      TagType = 'blockquote'
      footer = (
        <footer className={css.footer + compName}>
          <cite>
            {name && <span className="fn">{name}</span>}
            {job_title && <span className="pos">{job_title}</span>}
            {company && <span className="co">{company}</span>}
          </cite>
        </footer>
      )
      break

    default:
      break
  }

  return (
    <li className={css.item + tileClass}>
      <TagType href={link} target="_blank" className={css.main + compName}>
        <SVG type={type}/>
        <Wysiwyg content={content}/>
        {footer}
        <RespImageCover image={image} alt={alt}/>
      </TagType>
    </li>
  )
}

export default MosaicTile
