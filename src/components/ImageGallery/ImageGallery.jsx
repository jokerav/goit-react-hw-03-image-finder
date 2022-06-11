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
      // this.setState(prevState => (prevState.page += 1));
      return response.data;
    } catch (error) {
      console.log(error.toJSON());
      return error.toJSON();
    }
  }
  async componentDidUpdate(prevProps) {
    const prevReuest = prevProps.request;
    const nextRequst = this.props.request;
    if (prevReuest !== nextRequst && nextRequst !== '') {
      this.setState({ status: 'pending' });
      this.getImages().then(responce => {
        let images = [];
        responce.hits.map(image => {
          const { id, webformatURL, largeImageURL } = image;
          const img = { id, webformatURL, largeImageURL };
          images.push(img);
        });
        this.setState({ images, status: 'resolved' });
      });
    }
  }
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
        <ul className={s.ImageGallery}>
          {this.state.images.map(img => {
            <li>fgn</li>;
            // const { id, webformatURL, largeImageURL } = img;
            // <ImageGalleryItem
            //   key={id}
            //   id={id}
            //   webformatURL={webformatURL}
            //   largeImageURL={largeImageURL}
            // />;
          })}
        </ul>
      );
    }
  }
}
export default ImageGallery;
