import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import s from './styles.module.css';
export class App extends Component {
  state = {
    request: '',
  };
  getInput = input => {
    this.setState({ request: input });
  };
  render() {
    return (
      <div className="s.App">
        <Searchbar onSubmit={this.getInput} />
        <ImageGallery request={this.state.request} />
      </div>
    );
  }
}
