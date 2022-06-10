import { Component } from 'react';
// import s from 'styles.module.css';
import axios from 'axios';
class ImageGallery extends Component {
  state = {
    status: 'idle',
    page: 1,
  };
  async getImages() {
    const querry = this.props.request;
    const { page } = this.state;
    const searchRequest = `https://pixabay.com/api/?q=${querry}&page=${page}&key=25937561-4be56ebc67dabae3f5d5abc9c&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(searchRequest);
      this.setState(prevState => (prevState.page += 1));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.toJSON());
      return error.toJSON();
    }
  }
  async componentDidUpdate(prevProps) {
    const prevReuest = prevProps.request;
    const nextRequst = this.props.request;
    if (prevReuest !== nextRequst) {
      this.setState({ status: 'pending' });
      this.getImages().then(responce => {
        this.setState({ status: 'resolved' });
        let images = [];
        responce.hits.map(image => {
          const { id, webformatURL, largeImageURL } = image;
          const img = { id, webformatURL, largeImageURL };
          images.push(img);
        });
        console.log(images);
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
      return <p>Тут будут картинки</p>;
    }
    // return <ul className={s.ImageGallery}></ul>;
  }
}
export default ImageGallery;
