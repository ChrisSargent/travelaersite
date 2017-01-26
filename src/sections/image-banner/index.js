import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../../components/resp-image-cover'
import Wysiwyg from '../../components/wysiwyg'
import './_image-banner.sass'

const Strip = ({title, content}) => {
  const compName = 'strip'

  return (
    <div className={css.main + compName}>
      <div className={css.article + compName}>
        <h1 className={css.title}>{title}</h1>
        <Wysiwyg content={content}/>
      </div>
    </div>
  )
}

const ImageBanner = (props) => {
  const {compName, image_fixed} = props

  return (
    <div className={css.main + compName}>
      <RespImageCover image={image_fixed} />
      <Strip {...props}/>
      <RespImageCover image={image_fixed} />
    </div>
  )
}

export default ImageBanner
