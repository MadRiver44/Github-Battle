import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

const RepoGrid = props => {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for  ${repo.owner.login}`}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

// extract a stateless component out of Popular
const SelectLanguage = props => {
  let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {' '}
            {lang}
          </li>
        );
      })}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
  // add state
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang });

    api.fetchPopularRepos(lang).then(repos =>
      this.setState({
        repos,
      }),
    );
  }

  // ajax requests
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? <p>Loading </p> : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}
export default Popular;
