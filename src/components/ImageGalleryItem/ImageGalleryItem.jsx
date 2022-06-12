import s from '../styles.module.css';
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

export default ImageGalleryItem;
