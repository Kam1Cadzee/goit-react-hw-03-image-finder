import React from 'react';
import * as axios from 'axios';
import { Loader } from 'semantic-ui-react';
import SearchForm from './SearchForm/SearchForm';

import Gallery from './Gallery/Gallery';

const KEY = '12509636-53caf59f5bb94c5e817c60f6e';

function getUrl(query, page = 1) {
  return `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=20&key=${KEY}`;
}
function mapDataToNorm(data) {
  return data.map(item => ({
    id: item.id,
    thumb: item.webformatURL,
    largeImage: item.largeImageURL,
    likes: item.likes,
    views: item.views,
    comments: item.comments,
    downloads: item.downloads,
  }));
}
class App extends React.Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { items, page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      const url = getUrl(query, page);
      if (page === 1) {
        this.fetchData(url, []);
      } else {
        this.fetchData(url, items).then(() => {
          const { offsetHeight, scrollHeight } = document.body;
          const scrollY = scrollHeight - offsetHeight;

          window.scrollBy({ top: scrollY, behavior: 'smooth' });
        });
      }
    }
  }

  onSubmit = query => {
    this.setState({
      page: 1,
      query,
    });
  };

  fetchData = (url, items) => {
    this.setState({ isLoading: true });
    return axios
      .get(url)
      .then(data => {
        this.setState({ items: [...items, ...mapDataToNorm(data.data.hits)] });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = e => {
    e.preventDefault();
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { items, error, isLoading } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.onSubmit} />
        <Loader active={isLoading} inline="centered" />
        <Gallery items={items} />
        {items.length > 0 && (
          <button
            type="button"
            onClick={this.loadMore}
            className="button"
            disabled={error !== null}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}

export default App;
