import React from 'react';
import axios from 'axios';
// import RecommendForm from './RecommendForm.jsx';
import RecommendedGame from './RecommendedGame.jsx';
import AddGame from './AddGame.jsx';
// import bootstrap from 'bootstrap';
// import Cabinet from './Cabinet.jsx';
import SearchBgg from './SearchBgg.jsx';
// import Wishlist from './SearchBgg.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: 0,
      age: 0,
      time: 0,
      cooperative: '',
      mechanics: '',
      theme: '',
      equipment: '',
      mechanicsOptions: [],
      themeOptions: [],
      equipmentOptions: [],
      recommendations: [],
      randomIndex: 0,
      search: '',
      searchResults: [],
      newTitleEntry: '',
      newMinPlayersEntry: 0,
      newMaxPlayersEntry: 100,
      newMinAgeEntry: 0,
      newTimeEntry: 60,
      newCooperativeEntry: '',
      newThemeEntry: [],
      newMechanicsEntry: [],
      newEquipmentEntry: []
    };

    this.generateRandomIndex = this.generateRandomIndex.bind(this);
    this.getMechanicsOptions = this.getMechanicsOptions.bind(this);
    this.getThemeOptions = this.getThemeOptions.bind(this);
    this.getEquipmentOptions = this.getEquipmentOptions.bind(this);
    this.generateRandomIndex = this.generateRandomIndex.bind(this);
    this.handleShowDiffClick = this.handleShowDiffClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddGameSubmit = this.handleAddGameSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  getMechanicsOptions() {
    axios.get('/cabinet/mechanics')
      .then((res) => {
        this.setState({
          mechanicsOptions: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getThemeOptions() {
    axios.get('/cabinet/themes')
      .then((res) => {
        this.setState({
          themeOptions: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getEquipmentOptions() {
    axios.get('/cabinet/equipment')
      .then((res) => {
        this.setState({
          equipmentOptions: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
    console.log('db search submitted: ', this.state.theme, this.state.players, this.state.age, this.state.time);
    var params = {
      players: this.state.players,
      age: this.state.age,
      time: this.state.time,
      cooperative: this.state.cooperative,
      theme: this.state.theme,
      mechanics: this.state.mechanics,
      equipment: this.state.equipment
    }

    axios.get('/cabinet', { params: params })
      .then((res) => {
        this.setState({
          recommendations: res.data
        });
        // this.generateRandomIndex(res.data.length)
      })
      .catch((err) => {
        console.error(err);
      });

    this.generateRandomIndex();
  }

  handleAddGameSubmit(event) {
    event.preventDefault();
    console.log('new game submitted!');
    var params = {
      title: this.state.newTitleEntry,
      minplayers: this.state.newMinPlayersEntry,
      maxplayers: this.state.newMaxPlayersEntry,
      minage: this.state.newMinAgeEntry,
      time: this.state.newTimeEntry,
      cooperative: this.state.newCooperativeEntry,
      themes: this.state.newThemeEntry,
      equipment: this.state.newEquipmentEntry,
      mechanics: this.state.newMechanicsEntry
    }

    axios.post('/cabinet', { params: params })
      .then((res) => {
        console.log('Game added to cabinet!', res);
      })
      .catch((err) => {
        console.error(err);
      });

    this.generateRandomIndex();
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    var params = { search: this.state.search };
    console.log('BGG search submitted:', this.state.search);

    axios.get('/bgg', {params: params})
      .then((res) => {
        console.log('BGG search results:', res.data);
        this.setState({
          searchResults: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  generateRandomIndex() {
    var index = Math.floor(Math.random() * (this.state.recommendations.length));
    this.setState({
      randomIndex: index
    });
  }

  handleShowDiffClick(event) {
    event.preventDefault();

    this.generateRandomIndex();
  }

  componentDidMount() {
    this.getEquipmentOptions();
    this.getMechanicsOptions();
    this.getThemeOptions();
  }


  render() {
    return(
      <div>
        <div className="title"><h1>My Game Cabinet</h1></div>
        {/* <Wishlist /> */}
        <div className="subhead"><h3>Find a recommendation:</h3></div>
        <form className="game-form" onSubmit={this.handleSubmit.bind(this)}>
          <label>
            There are
            <input className="number-input" type="number" name="players" value={this.state.players} onChange={this.handleChange} />
            of us.
          </label>
          <label>
            Our youngest player is
            <input className="number-input" type="number" name="age" max="100" value={this.state.age} onChange={this.handleChange.bind(this)} />
            years old.
          </label>
          <label>
            We have
            <input className="number-input" type="number" name="time" step="5" value={this.state.time} onChange={this.handleChange.bind(this)} />
            minutes to play.
          </label>
          <label>
            We want to
            <select name="cooperative" value={this.state.cooperative} onChange={this.handleChange.bind(this)}>
              <option value="">(no preference)</option>
              <option value="true">work together!</option>
              <option value="false">compete!</option>
            </select>
          </label>
          <label>
            We are into
            <select name="theme" value={this.state.theme} onChange={this.handleChange.bind(this)}>
              <option value="">any theme</option>
              {this.state.themeOptions.map((theme) => (
                <option key={theme.id} value={theme.name}>{theme.name}</option>
                ))}
            </select>
            .
          </label>
          <label>
            We enjoy games based around
            <select name="mechanics" value={this.state.mechanics} onChange={this.handleChange.bind(this)}>
              <option value="">any mechanic</option>
              {this.state.mechanicsOptions.map((mech) => (
                <option key={mech.id} value={mech.name}>{mech.name}</option>
                ))}
            </select>
            .
          </label>
          <label>
            We like to use
            <select name="equipment" value={this.state.equipment} onChange={this.handleChange.bind(this)}>
              <option value="">any device</option>
              {this.state.equipmentOptions.map((equip) => (
                <option key={equip.id} value={equip.name}>{equip.name}</option>
                ))}
            </select>
            .
          </label>
          <input className="submit btn" type="submit" value="Find Me a Game!" />
        </form>
        <div className="recommendation-box">
          {this.state.recommendations.length
            ? <RecommendedGame game={this.state.recommendations[this.state.randomIndex]} handleShowDiffClick={this.handleShowDiffClick} />
            : <span><em>No recommendations to display. Try a new search!</em></span>}
        </div>
        <SearchBgg search={this.state.search} handleChange={this.handleChange} handleSearchSubmit={this.handleSearchSubmit} />
        <div className="subhead"><h3>Add a New Game:</h3></div>
        <AddGame
          handleChange={this.handleChange}
          handleAddGameSubmit={this.handleAddGameSubmit}
          newTitleEntry={this.state.newTitleEntry}
          newMinPlayersEntry={this.state.newMinPlayersEntry}
          newMaxPlayersEntry={this.state.newMaxPlayersEntry}
          newMinAgeEntry={this.state.newMinAgeEntry}
          newTimeEntry={this.state.newTimeEntry}
          newCooperativeEntry={this.state.newCooperativeEntry}
          newThemeEntry={this.state.newThemeEntry}
          newMechanicsEntry={this.state.newMechanicsEntry}
          newEquipmentEntry={this.state.newEquipmentEntry}
          themeOptions={this.state.themeOptions}
          mechanicsOptions={this.state.mechanicsOptions}
          equipmentOptions={this.state.equipmentOptions}
        />
      </div>
    )
  }
};

export default App;