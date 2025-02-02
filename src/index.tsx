import { Component } from 'react';
import { render } from 'react-dom';
import { Wordle } from './components/Wordle.tsx';
import "./style.css";

interface AppProps {}

class App extends Component<AppProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Wordle</h1>
        <Wordle />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
