import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  state = {
    query: '',
  };

  onChange = e => this.setState({ query: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { query } = this.state;
    onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="search-form">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search images..."
            value={query}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SearchForm;
