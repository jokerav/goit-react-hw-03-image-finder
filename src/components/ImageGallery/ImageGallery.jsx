import { Component } from 'react';
import s from '../styles.module.css';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
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
      console.log(error.toJSON());
      return error.toJSON();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;

    console.log(prevPage, nextPage);
    console.log(prevRequest, nextRequest);

    if (prevPage !== nextPage || prevRequest !== nextRequest) {
      this.getImages().then(responce => {
        this.setState({ status: 'pending' });
        let images = [];
        responce.hits.forEach(image => {
          const { id, webformatURL, largeImageURL } = image;
          const img = { id, webformatURL, largeImageURL };
          images.push(img);
        });
        const newState = [...prevState.images, ...images];

        this.setState({ images: newState, status: 'resolved' });

        // this.setState(prevState => prevState.images.push(images));
      });
    }
  }
  onOladMore = e => {
    // e.preventDefault();
    this.setState(prevState => {
      prevState.page = prevState.page + 1;
    });
    console.log(this.state.page);
  };
  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <p>Введите запрос</p>;
    }
    if (status === 'pending') {
      return <p>Загружаем</p>;
    }
    if (status === 'rejected') {
      return <p>Что-то пошло не так...</p>;
    }
    if (status === 'resolved') {
      return (
        <div>
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
          {this.state.images !== [] && (
            <button onClick={this.onOladMore} className={s.Button}>
              Load more
            </button>
          )}
        </div>
      );
    }
  }
}
export default ImageGallery;
