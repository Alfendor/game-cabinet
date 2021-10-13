import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: '',
      players: 4,
      age: 20,
      time: 60,
      cooperative: undefined,
      keywords: []
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('search submitted: ', this.state.theme, this.state.players, this.state.age, this.state.time);
  }

  render() {
    return(
      <div>
        <div>My Game Cabinet</div>
        {/* <SearchBgg />
        <Wishlist /> */}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            What are your interests?
            <input type="text" name="theme" value={this.state.theme} onChange={this.handleChange.bind(this)} />
          </label>
          <label>
            How many players will you have?
            <input type="number" name="players" value={this.state.players} min="1" onChange={this.handleChange.bind(this)} />
          </label>
          <label>
            About what age is the youngest player?
            <input type="number" name="age" max="100" value={this.state.age} onChange={this.handleChange.bind(this)} />
          </label>
          <label>
            How much time do you have?
            <input type="number" name="time" step="5" value={this.state.time} onChange={this.handleChange.bind(this)} />
            minutes
          </label>
          <label>
            Do you want to...
            <select name="cooperative" value={this.state.cooperative} onChange={this.handleChange.bind(this)}>
              <option value="true">work together?</option>
              <option value="false">compete?</option>
            </select>
          </label>
          <label>
            What else do you like in a game?
            <input type="text" name="keywords" value={this.state.keywords} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Find Me a Game!" />
        </form>
      </div>
    )
  }
};

export default App;