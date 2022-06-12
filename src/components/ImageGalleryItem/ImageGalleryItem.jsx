// import s from 'styles.module.css';
const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <li>
      <img src={webformatURL} alt="pic" data={largeImageURL} />
    </li>
  );
};

export default ImageGalleryItem;
