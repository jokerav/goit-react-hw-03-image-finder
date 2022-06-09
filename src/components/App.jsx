import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
export class App extends Component {
  getInput = input => {
    console.log(input);
  };
  render() {
    return (
      <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
      >
        <Searchbar onSubmit={this.getInput} />
      </div>
    );
  }
}
