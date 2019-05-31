import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this._handleActiveItem = this._handleActiveItem.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        onActiveItemChange={this._handleActiveItem}
        setActiveOnLoad={this.__handleActiveItem}
      />;
    }

    _handleActiveItem(activeItem) {
      this.setState({activeItem});
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
