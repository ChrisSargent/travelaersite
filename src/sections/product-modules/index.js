import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getActiveIndex} from '../../reducers/sliders'
import css from '../../lib/css'
import Screenshots from '../../components/screenshots'
import Slider from '../../components/slider'
import Wysiwyg from '../../components/wysiwyg'
import './_product-modules.sass'

const Modules = ({modules, activeIndex}) => {
  const compName = 'prodmod'
  const modulesMap = modules.map((module, index) => {
    var itemClass,
      itemStyle

    const {module_title, module_content} = module
    itemClass = css.item
    index === activeIndex && (itemClass += css.active)

    // Effectively move each module on top of each other
    itemStyle = {
      left: -100 * (index - 1) + '%'
    }

    return (
      <li key={index} className={itemClass} style={itemStyle}>
        <article className={css.main + compName}>
          <span className={css.title}>{module_title}</span>
          <Wysiwyg content={module_content} modifier={compName}/>
        </article>
      </li>
    )
  })

  return (
    <ul className={css.list + compName}>
      {modulesMap}
    </ul>
  )
}

class ProductModules extends PureComponent {
  constructor(props) {
    super(props)
    this.screenshots = []
    this.createScreenshotArray()
  }

  createScreenshotArray() {
    // Create an array of screenshots to pass to the Screenshots module
    const {product_module} = this.props

    const images = product_module.map((modules) => {
      return modules.module_screenshot;
    })

    this.screenshots[0] = {
      images
    }
  }

  render() {
    const {product_module, title, compName, activeSlide} = this.props

    if (!product_module)
      return null

    const titlesMap = product_module.map((mod, index) => {
      return (
        <button key={index} data-slideind={index} className={css.control + ' -text'}>{mod.module_title}</button>
      )
    })

    return (
      <div className={css.main + compName}>
        <div className={'side-' + compName}>
          <h1 className={css.title}>{title}</h1>
          <Slider slides={titlesMap} id={compName} />
        </div>
        <Screenshots screenshots={this.screenshots} activeIndex={activeSlide} />
        <Modules modules={product_module} activeIndex={activeSlide} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeSlide: getActiveIndex(state, ownProps.compName)
})

export default connect(mapStateToProps)(ProductModules)
