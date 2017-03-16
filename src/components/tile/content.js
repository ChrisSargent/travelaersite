import React from 'react'
import Link from 'react-router/lib/Link'
import css from '../../lib/css'
import {stripDomain} from '../../lib/utils'
import Quote from '../../components/quote'
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
  var tileClass = '',
    TagType = 'a',
    target = null,
    linkTo = null,
    component = <Wysiwyg content={content}/>

  const alt = content;
  const compName = 'tile';
  tile_colour && (tileClass += ' -' + tile_colour)
  tile_size && (tileClass += ' -' + tile_size)

  switch (type) {
    case 'instagram':
      image = link.split('?')[0] + 'media?size=l'
      component = null
      target = '_blank'
      break

    case 'quote':
      linkTo = ''
      link = ''
      TagType = 'div'
      component = <Quote content={content} name={name} jobTitle={job_title} company={company} modifier={compName}/>
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
        {component}
        <RespImageCover image={image} alt={alt} srcVersion="medium_large" respSizes="(min-width: 840px) 600px, 50vw"/>
      </TagType>
    </li>
  )
}

export default ContentTile
