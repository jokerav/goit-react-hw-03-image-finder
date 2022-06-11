// import s from 'styles.module.css';
const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  return (
    <li>
      <img src={webformatURL} alt="dgh" />
    </li>
  );
};

export default ImageGalleryItem;
