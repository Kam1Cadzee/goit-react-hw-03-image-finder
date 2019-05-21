import React from 'react';
import PropTypes from 'prop-types';

class Togglable extends React.Component {
  state = {
    isToggle: false,
  };

  handleToggle = () => this.setState(state => ({ isToggle: !state.isToggle }));

  render() {
    const { children } = this.props;
    const { isToggle } = this.state;
    return children({
      isToggle,
      handleToggle: this.handleToggle,
    });
  }
}
Togglable.propTypes = {
  children: PropTypes.func.isRequired,
};
export default Togglable;
