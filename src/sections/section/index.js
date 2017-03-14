import React, {PureComponent} from 'react'
import css from '../../lib/css'
import RespImageCover from '../../components/resp-image-cover'
import './_section.sass'

class Section extends PureComponent {
  constructor(props) {
    super(props)
    this.section = this.setupSection()
  }

  setupSection() {
    var sectionModifier = ' -skewnone',
      skewClass = '',
      skewCorrectionClass = ''
    const {skew, overlaps, background, fullscreen} = this.props

    if (skew) {
      sectionModifier = ' -skew' + skew
      skewClass = ' _skew'
      skewCorrectionClass = ' _skewcorrect'
    }

    if (overlaps) {
      skewClass += ' -ol' + overlaps[0].position
      skewClass += ' -ol' + overlaps[0].type
      skewClass += ' -ol' + overlaps[0].colour
      sectionModifier += ' -ol' + overlaps[0].position
    }

    background && (sectionModifier += ' -' + background)
    fullscreen && (sectionModifier += ' -fullscreen')

    const section = {
      sectionModifier,
      skewClass,
      skewCorrectionClass
    }

    return section
  }
  render() {
    const {compName, image, respSizes, allowFullsize, children} = this.props
    const {sectionModifier, skewClass, skewCorrectionClass} = this.section

    return (
      <section className={css.section + compName + sectionModifier}>
        {children && <div className={css.container}>{children}</div>}
        <div className={'section-background' + skewClass}>
          <div className={'_bgcol' + skewCorrectionClass}>
            <RespImageCover image={image} respSizes={respSizes} allowFullsize={allowFullsize}/>
          </div>
        </div>
      </section>
    )
  }
}

export default Section
