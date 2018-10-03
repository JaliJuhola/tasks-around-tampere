import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';

class TestMiniGame extends Component {
  constructor(props) {
    super(props);
      this.state = {
        updated_at: "",
        count: 0
      }
      this.patchClick = this.patchClick.bind(this);
      this.postClick = this.postClick.bind(this);
      this.patchClick = this.patchClick.bind(this);
      this.get_data = this.get_data.bind(this);
      setInterval(() => this.get_data(), 5000)
  }
  get_data = () => {
    const self = this
    setInterval(() =>
    axios.get("http://localhost:8000/test")
    .then(function (response) {
        self.setState({updated_at: response.data.updated_at, count: response.data.count})
      }), 5000
    );
  }
  patchClick = (e) => {
    const self = this
    e.preventDefault();
    axios.patch("http://localhost:8000/test", {
    })
    .then((response) => {
    self.setState({updated_at: response.data.updated_at, count: response.data.count})
    });
  }
  postClick = (e) => {
    const self = this
    e.preventDefault();
    axios.post("http://localhost:8000/test", {
    })
    .then((response) => {
    self.setState({updated_at: response.data.updated_at, count: response.data.count})
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button onClick={this.patchClick}>PATCH</button>
        <button onClick={this.postClick}>POST</button>
        <p>
          Count: {this.state.count}
        </p>
        <p>
           Last updated: {this.state.updated_at}
        </p>
        </header>
      </div>
    );
  }
}

export default TestMiniGame;
