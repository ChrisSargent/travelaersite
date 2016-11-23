import React, {Component} from 'react';
import css from '../../lib/css';
import Screenshots from '../screenshots';
import Wysiwyg from '../wysiwyg';

require('./_product-modules.sass');

export default class ProductModules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModule: 0
    };
    this.handleControlClick = this.handleControlClick.bind(this);
  }

  handleControlClick(ev) {
    const activeMod = parseFloat(ev.target.dataset.index);
    this.setState({activeModule: activeMod});
  }

  render() {
    var productModulesMap,
      productModulesControlsMap,
      screenshots = [];
    const {product_module, title} = this.props;

    if (!product_module) {
      return false;
    }

    productModulesControlsMap = product_module.map((product, index) => {
      var btnClass;
      btnClass = 'prodmod-control';
      (index === this.state.activeModule) && (btnClass += ' -active');

      return (
        <li key={index}>
          <button data-index={index} className={btnClass}>{product.module_title}</button>
        </li>
      );
    });

    productModulesMap = product_module.map((product, index) => {
      var itemClass,
        itemStyle;
      const {module_title, module_content} = product;

      itemClass = 'prodmod-content';
      (index === this.state.activeModule) && (itemClass += ' -active');

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
    var images = [];

    for (var i = 0; i < product_module.length; i++) {
      images[i] = product_module[i].module_screenshot;
    }
    screenshots[0] = {images}

    return (
      <section className="prodmods-section">
        <div className="prodmods-block">
          <h1 className={css.title}>{title}</h1>
          <div className="prodmods-content">
            <ul className="prodmodcontol-list" onClick={this.handleControlClick}>
              {productModulesControlsMap}
            </ul>
            <Screenshots screenshots={screenshots} targetIndex={this.state.activeModule} modifier="prodmod"/>
            <ul className="prodmod-list">
              {productModulesMap}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
