import React, {PureComponent} from 'react';

export const withFormValidation = (formValidators = {}, rules = {}) => (Component) => {
  class WithFormValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isValid: false
      };

      this.handleFormValidation = this.handleFormValidation.bind(this);
    }

    handleFormValidation(formData = {}) {
      const isValid = Object.keys(formValidators).every((name) => {
        if (!formValidators[name]) {
          return true;
        }

        return formValidators[name](formData[name], rules);
      });

      if (this.state.isValid !== isValid) {
        this.setState({
          isValid
        });
      }
    }

    render() {
      return <Component
        {...this.props}
        rules={rules}
        isValid={this.state.isValid}
        validateForm={this.handleFormValidation}
      />;
    }
  }

  return WithFormValidation;
};
