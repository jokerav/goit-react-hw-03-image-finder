import { Component } from 'react';
import axios from 'axios';
import { MutatingDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import s from './styles.module.css';
export class App extends Component {
  state = {
    request: '',
    isLoading: false,
    page: 1,
    images: [],
    isModalOpen: false,
  };
  getInput = input => {
    this.setState({ request: input });
  };
  async getImages() {
    const { request, page } = this.state;
    const searchRequest = `https://pixabay.com/api/?q=${request}&page=${page}&key=25937561-4be56ebc67dabae3f5d5abc9c&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(searchRequest);
      return response.data;
    } catch (error) {
      return error.toJSON();
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    if (prevPage !== nextPage || prevRequest !== nextRequest) {
      this.setState({ isLoading: true });
      if (nextRequest !== '') {
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

          this.setState({ images: newState, isLoading: false });
        });
      }
    }
  }
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({
        link: e.target.attributes.data.nodeValue,
        isModalOpen: true,
      });
    }
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  render() {
    const { images, isModalOpen, isLoading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getInput} />
        {!images.length > 0 || (
          <ImageGallery
            images={this.state.images}
            onLoadMore={this.onLoadMore}
            onImageClick={this.onImageClick}
          />
        )}
        {!isLoading || (
          <MutatingDots
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
          />
        )}
        {!isModalOpen || (
          <Modal img={this.state.link} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
