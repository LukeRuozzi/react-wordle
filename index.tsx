import React, { Component } from 'react';
import { render } from 'react-dom';
import { Wordle } from './components/Wordle';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <h1>Wordle</h1>
        <Wordle />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
