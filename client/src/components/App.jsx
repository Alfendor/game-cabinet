import React from 'react';
import axios from 'axios';
import RecommendForm from './RecommendForm.jsx';
// import Cabinet from './Cabinet.jsx';
// import SearchBgg from './SearchBgg.jsx';
// import Wishlist from './SearchBgg.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: undefined,
      age: undefined,
      time: undefined,
      cooperative: undefined,
      mechanics: undefined,
      theme: undefined,
      equipment: undefined,
      recommendations: null,
      mechanicsOptions: [],
      themeOptions: [],
      equipmentOptions: []
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
    console.log('search submitted: ', this.state.theme, this.state.players, this.state.age, this.state.time);
    var params = {
      players: this.state.players,
      age: this.state.age,
      time: this.state.time,
      cooperative: this.state.cooperative,
      theme: this.state.theme,
      mechanics: this.state.mechanics,
      equipment: this.state.equipment
    }

    axios.get('/cabinet', params)
      .then((res) => {
        this.setState({
          recommendations: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return(
      <div>
        <div>My Game Cabinet</div>
        {/* <SearchBgg />
        <Wishlist /> */}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            We like
            <input type="text" name="theme" value={this.state.theme} onChange={this.handleChange.bind(this)} />
            .
          </label>
          <label>
            There are
            <input type="number" name="players" value={this.state.players} min="1" onChange={this.handleChange.bind(this)} />
            of us.
          </label>
          <label>
            Our youngest player is
            <input type="number" name="age" max="100" value={this.state.age} onChange={this.handleChange.bind(this)} />
            years old.
          </label>
          <label>
            We have
            <input type="number" name="time" step="5" value={this.state.time} onChange={this.handleChange.bind(this)} />
            minutes to play.
          </label>
          <label>
            We want to
            <select name="cooperative" value={this.state.cooperative} onChange={this.handleChange.bind(this)}>
              <option value="undefined">(no preference)</option>
              <option value="true">work together!</option>
              <option value="false">compete!</option>
            </select>
          </label>
          <label>
            We like games based around
            <input type="text" name="mechanics" value={this.state.mechanics} onChange={this.handleChange.bind(this)} />
            .
          </label>
          <label>
            We like to use
            <input type="text" name="equipment" value={this.state.equipment} onChange={this.handleChange.bind(this)} />
            .
          </label>
          <input type="submit" value="Find Me a Game!" />
        </form>
      </div>
    )
  }
};

export default App;