const axios = require('axios');
const config = require('../config.js');

let getGameIDs = (search) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `http://boardgamegeek.com/xmlapi/`,
    params: {
      'search': search,
    }
  };

  axios.request(options)
    .then(function(response) {
      console.log('response.data: ', response.data[0].name);
      callback(null, response.data);
    })
    .catch(function(error) {
      throw error;
    })

}

module.exports = {
  getGameIDs,

}