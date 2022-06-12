// import s from 'styles.module.css';
const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <li>
      <img src={webformatURL} alt="image" data={largeImageURL} />
    </li>
  );
};

export default ImageGalleryItem;
