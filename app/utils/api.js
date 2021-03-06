// module for utility functions and api requests

import axios from 'axios';

// in case of rate limiting when hitting the github api
const id = 'YOUR CLIENT ID';
const sec = 'YOUR SECRET ID';
const params = '?clent_id=' + id + '&client_secret=' + sec;

// formatting data before we pass it on
const getProfile = username => {
  return axios.get('https://api.github.com/users/' + username + params).then(user => {
    return user.data;
  });
};

const getRepos = username => {
  return axios.get(
    'https://api.github.com/users/' + username + '/repos' + params + '&per_page=100',
  );
};

const getStarCount = repos => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
};

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
};

const handleError = error => {
  console.warn(error);
  return null;
};

// composition of functions, pass in array of functions, when results come back
// we process data, each will return an object(net result is an array of objects)
const getUserData = player => {
  return axios.all([getProfile(player), getRepos(player)]).then(data => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos),
    };
  });
};

const sortPlayers = players => {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
};

module.exports = {
  battle: players => {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: language => {
    var encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`,
    );

    return axios.get(encodedURI).then(res => res.data.items);
  },
};
