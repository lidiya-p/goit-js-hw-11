const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #params = {
    params: {
      key: '3733092-5e99e8a1976a1d42ca056b425',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 20,
    },
  };

  async getPhotos() {
    const { data } = await axios.get(
      `/?q=${this.#query}&page=${this.#page}`,
      this.#params
    );
    return data;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    const perPage = this.#params.params.per_page;
    this.#totalPages = Math.ceil(total / perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
