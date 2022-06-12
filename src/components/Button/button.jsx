import s from '../styles.module.css';
import PropTypes from 'prop-types';
const Button = ({ onLoadMore }) => {
  return (
    <button onClick={() => onLoadMore()} className={s.Button}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
export default Button;
