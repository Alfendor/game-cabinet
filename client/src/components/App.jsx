import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "STATE TEST SUCCESS"
    }
  }

  render() {
    return(
      <div>
        <div>My Game Cabinet</div>
        <SearchBgg />
        <Wishlist />
      </div>
    )
  }
};

//hey there
export default App;