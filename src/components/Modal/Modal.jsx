import s from '../styles.module.css';
const Modal = ({ img }) => {
  return (
    <div className={s.Overlay}>
      <div className={s.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};
export default Modal;
