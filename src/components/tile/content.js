import React from 'react'
import Link from 'react-router/lib/Link'
import css from '../../lib/css'
import {stripDomain} from '../../lib/utils'
import Cite from '../../components/cite'
import RespImageCover from '../resp-image-cover'
import Wysiwyg from '../wysiwyg'
import SVG from '../svg'
import './_tile.sass'

const ContentTile = ({
  content,
  image,
  type,
  tile_colour,
  tile_size,
  link,
  name,
  job_title,
  company
}) => {
  const alt = content;
  const compName = 'tile';
  var tileClass = '',
    TagType = 'a',
    target = null,
    linkTo = null;

  tile_colour && (tileClass += ' -' + tile_colour)
  tile_size && (tileClass += ' -' + tile_size)

  switch (type) {
    case 'instagram':
      image = link.split('?')[0] + 'media?size=l'
      content = null
      target = '_blank'
      break

    case 'quote':
      TagType = 'blockquote'
      break

    case 'post':
      TagType = Link
      linkTo = stripDomain(link)
      break

    default:
      break
  }

  return (
    <li className={css.item + tileClass}>
      <TagType to={linkTo} href={link} target={target} className={css.main + compName}>
        <SVG type={type}/>
        <Wysiwyg content={content}/>
        <Cite name={name} jobTitle={job_title} company={company} />
        <RespImageCover image={image} alt={alt} srcVersion="medium_large" respSizes="(min-width: 840px) 600px, 50vw"/>
      </TagType>
    </li>
  )
}

export default ContentTile
