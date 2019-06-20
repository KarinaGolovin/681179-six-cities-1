import React, {PureComponent} from 'react';

export const withRootClassNames = (Component, classNames = []) => {
  const rootElement = document.querySelector(`#root`);

  class WithBodyClassNames extends PureComponent {
    componentDidMount() {
      if (!rootElement) {
        return;
      }

      classNames.forEach((it) => {
        rootElement.classList.add(it);
      });
    }

    componentWillUnmount() {
      if (!rootElement) {
        return;
      }

      classNames.forEach((it) => {
        rootElement.classList.remove(it);
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return WithBodyClassNames;
};
