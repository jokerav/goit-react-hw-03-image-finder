import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
export class App extends Component {
  state = {
    request: '',
  };
  getInput = input => {
    this.setState({ request: input });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.getInput} />
        <ImageGallery request={this.state.request} />
      </div>
    );
  }
}
