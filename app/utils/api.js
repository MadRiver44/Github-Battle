// module for utility functions and api requests

import axios from 'axios';

module.exports = {
  fetchPopularRepos: language => {
    // encodeURI transforms hunman readable text into a utf-8 escaped string
    let encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`,
    );

    return axios.get(encodedURI).then(res => res.data.items);
  },
};
