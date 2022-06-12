import { Component } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import s from '../styles.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
class ImageGallery extends Component {
  state = {
    status: 'idle',
    page: 1,
    images: [],
  };
  async getImages() {
    const querry = this.props.request;
    const { page } = this.state;
    const searchRequest = `https://pixabay.com/api/?q=${querry}&page=${page}&key=25937561-4be56ebc67dabae3f5d5abc9c&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(searchRequest);
      return response.data;
    } catch (error) {
      return error.toJSON();
    }
  }
  componentDidCatch() {
    this.setState({ status: 'rejected' });
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    if (prevPage !== nextPage || prevRequest !== nextRequest) {
      this.setState({ status: 'pending' });
      this.getImages().then(responce => {
        let images = [];
        responce.hits.forEach(image => {
          const { id, webformatURL, largeImageURL } = image;
          const img = { id, webformatURL, largeImageURL };
          images.push(img);
        });
        let newState = [];
        if (prevRequest !== nextRequest) {
          newState = [...images];
        } else {
          newState = [...prevState.images, ...images];
        }

        this.setState({ images: newState, status: 'resolved' });
      });
    }
  }
  onOladMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({
        link: e.target.attributes.data.nodeValue,
        status: 'modal',
      });
    }
  };
  closeModal = () => {
    this.setState({
      status: 'resolved',
    });
  };

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <p>Введите запрос</p>;
    }
    if (status === 'pending') {
      return (
        <MutatingDots
          height="100"
          width="100"
          color="grey"
          ariaLabel="loading"
        />
      );
    }
    if (status === 'rejected') {
      return <p>Что-то пошло не так...</p>;
    }
    if (status === 'resolved') {
      return (
        <div onClick={this.onImageClick}>
          <ul className={s.ImageGallery}>
            {this.state.images.map(img => {
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
          {this.state.images.length > 0 && (
            <button onClick={this.onOladMore} className={s.Button}>
              Load more
            </button>
          )}
        </div>
      );
    }
    if (status === 'modal') {
      const { link } = this.state;
      return <Modal img={link} closeModal={this.closeModal} />;
    }
  }
}
ImageGallery.propTypes = {
  request: PropTypes.string,
};
export default ImageGallery;
