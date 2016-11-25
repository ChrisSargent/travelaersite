import React, {Component} from 'react';
import css from '../../lib/css';
import Screenshots from '../screenshots';
import Wysiwyg from '../wysiwyg';

require('./_product-modules.sass');

function Controls(props) {
  const {controls, activeIndex, onClick} = props;

  const controlsMap = controls.map((control, index) => {
    var btnClass = 'prodmod-control';

    (index === activeIndex) && (btnClass += ' -active');

    return (
      <li key={index}>
        <button data-modtarget={index} className={btnClass}>{control.module_title}</button>
      </li>
    );
  });
  return (
    <ul onClick={onClick}>
      {controlsMap}
    </ul>
  )
}

function Modules(props) {
  const {modules, activeIndex} = props;

  const modulesMap = modules.map((module, index) => {
    var itemClass,
      itemStyle;
    const {module_title, module_content} = module;

    itemClass = 'prodmod-content';
    (index === activeIndex) && (itemClass += ' -active');

    // Effectily move each module on top of each other
    itemStyle = {
      left: -100 * (index - 1) + '%'
    }

    return (
      <li key={index} className={itemClass} style={itemStyle}>
        <span className={css.title}>{module_title}</span>
        <Wysiwyg content={module_content} modifier="prodmod"/>
      </li>
    );
  });

  return (
    <ul className="prodmod-list">
      {modulesMap}
    </ul>
  );
};

export default class ProductModules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModule: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    if (!ev.target.dataset.modtarget)
      return;

    ev.preventDefault();
    const activeMod = parseFloat(ev.target.dataset.modtarget);
    this.setState({activeModule: activeMod});
  }

  render() {
    // Return ASAP if no modules
    const {product_module, title} = this.props;
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
      <section className="prodmods-section">
        <div className="prodmods-content">
          <div className="prodmods-side">
            <h1 className={css.title}>{title}</h1>
            <Controls controls={product_module} activeIndex={this.state.activeModule} onClick={this.handleClick} />
          </div>
          <Screenshots screenshots={screenshots} activeIndex={this.state.activeModule} modifier="prodmod"/>
          <Modules modules={product_module} activeIndex={this.state.activeModule} />
        </div>
      </section>
    );
  }
}
