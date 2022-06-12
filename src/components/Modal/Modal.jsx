import { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../styles.module.css';
class Modal extends Component {
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      const { closeModal } = this.props;
      closeModal();
    }
  };
  handleClick = event => {
    if (event.target.nodeName !== 'IMG') {
      const { closeModal } = this.props;
      closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClick);
  }
  render() {
    const { img } = this.props;
    return (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src={img} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
