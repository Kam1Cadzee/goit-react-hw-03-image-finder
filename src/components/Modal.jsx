import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleBackdropClick = e => {
    const { onClose } = this.props;

    if (e.target.tagName !== 'IMG') {
      onClose();
    }
  };

  handleKeyPress = e => {
    const { onClose } = this.props;
    if (e.code !== 'Escape') return;
    onClose();
  };

  render() {
    const { children } = this.props;

    return (
      <div
        onClick={this.handleBackdropClick}
        className={css.backdrop}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default Modal;
