import s from '../styles.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt="pic"
        data={largeImageURL}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
