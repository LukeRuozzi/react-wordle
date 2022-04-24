import React, { Component } from 'react';
import { render } from 'react-dom';
import { Wordle } from './components/Wordle';
import './style.css';
import { faker } from '@faker-js/faker';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    faker.locale = 'it';

    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Wordle</h1>
        <Wordle solution={faker.name.firstName('male')} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
