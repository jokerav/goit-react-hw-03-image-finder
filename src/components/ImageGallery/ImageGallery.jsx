import { Component } from 'react';
import s from '../styles.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { onImageClick, images, onLoadMore } = this.props;
    return (
      <div onClick={e => onImageClick(e)}>
        <ul className={s.ImageGallery}>
          {images.map(img => {
            const { id, webformatURL, largeImageURL } = img;
            return (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </ul>
        {images.length > 0 && (
          <button onClick={() => onLoadMore()} className={s.Button}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onLoadMore: PropTypes.func.isRequired,
};
export default ImageGallery;
