import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../../components/resp-image-cover'
import './_section.sass'

const Section = ({compName, image, respSizes, skew, overlaps, children, background, contSize}) => {
  var sectionModifier = '',
    contModifier = '',
    skewClass = '',
    skewCorrectionClass

  if (skew) {
    sectionModifier = ' -skew' + skew
    skewClass = ' _skew'
    skewCorrectionClass = ' _skewcorrect'
  } else {
    sectionModifier = ' -skewnone'
  }

  if (overlaps) {
    skewClass += ' -ol' + overlaps[0].position
    skewClass += ' -ol' + overlaps[0].type
    skewClass += ' -ol' + overlaps[0].colour
  }

  if (background) {
    sectionModifier += ' -' + background
  }

  if (contSize) {
    contModifier += ' -' + contSize
  }

  return (
    <section className={css.section + compName + sectionModifier}>
      {children && <div className={css.container + contModifier}>{children}</div>}
      <div className={'section-background' + skewClass}>
        <div className={'_bgcol' + skewCorrectionClass}>
          <RespImageCover image={image} respSizes={respSizes}/>
        </div>
      </div>
    </section>
  )
}

export default Section
