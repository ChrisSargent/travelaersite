import React, {Component} from 'react';
import css from '../../lib/css';
import Screenshots from '../../components/screenshots';
import Wysiwyg from '../../components/wysiwyg';

import './_product-modules.sass';

function Controls(props) {
  const {controls, activeIndex, onClick} = props;
  const compName = 'ctrls';
  var slideStyles = {
    transform: 'translate3d(' + activeIndex * -100 + '%, 0, 0)'
  }

  // activeIndex * -100

  const controlsMap = controls.map((control, index) => {
    var titleClass = css.control + ' -text';

    (index === activeIndex) && (titleClass += css.active);

    return (
      <li key={index} className={css.item}>
        <button data-modtarget={index} className={titleClass}>{control.module_title}</button>
      </li>
    );
  });
  return (
    <div onClick={onClick} className={css.main + compName}>
      <button data-modtarget="dec" className={css.control + ' -dec'}>
        <span>Prev</span>
      </button>
      <div className={css.container}>
        <ul className={css.list + compName} style={slideStyles}>
          {controlsMap}
        </ul>
      </div>
      <button data-modtarget="inc" className={css.control + ' -inc'}>
        <span>Next</span>
      </button>
    </div>
  )
}

function Modules(props) {
  const {modules, activeIndex} = props;
  const compName = 'prodmod';

  const modulesMap = modules.map((module, index) => {
    var itemClass,
      itemStyle;
    const {module_title, module_content} = module;

    itemClass = css.item;
    (index === activeIndex) && (itemClass += css.active);

    // Effectily move each module on top of each other
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
    );
  });

  return (
    <ul className={css.list + compName}>
      {modulesMap}
    </ul>
  );
};

export default class ProductModules extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModule: 0,
      totalModules: props.product_module.length
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextActiveIndex = this.nextActiveIndex.bind(this);
  }

  handleClick(ev) {
    var {activeModule} = this.state,
      nextActive;

    if (!ev.target.dataset.modtarget)
      return;

    ev.preventDefault();
    switch (ev.target.dataset.modtarget) {
      case 'inc':
        nextActive = activeModule + 1;
        break;
      case 'dec':
        nextActive = activeModule - 1;
        break;
      default:
        nextActive = parseFloat(ev.target.dataset.modtarget);
    }
    this.nextActiveIndex(nextActive);
  }

  nextActiveIndex(nextActive) {
    const {totalModules} = this.state;
    if (nextActive < 0)
      nextActive = totalModules - 1;

    if (nextActive > totalModules - 1)
      nextActive = 0;

    this.setState({activeModule: nextActive});
  }

  render() {
    const {product_module, title, compName} = this.props;
    const {activeModule} = this.state;

    if (!product_module)
      return false;

    var screenshots = [],
      images = [];

    // Create an array of screenshots to pass to the Screenshots module
    for (var i = 0; i < product_module.length; i++) {
      images[i] = product_module[i].module_screenshot;
    }
    screenshots[0] = {
      images
    }

    return (
      <div className={css.main + compName}>
        <div className={'side-' + compName}>
          <h1 className={css.title}>{title}</h1>
          <Controls controls={product_module} activeIndex={activeModule} onClick={this.handleClick} modifier={compName}/>
        </div>
        <Screenshots screenshots={screenshots} activeIndex={activeModule}/>
        <Modules modules={product_module} activeIndex={activeModule}/>
      </div>
    );
  }
}
