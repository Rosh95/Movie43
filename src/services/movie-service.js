export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/';

  api_key = 'eb832f5734a97241bfeb418cf28d387b';

  async getResult(method, value, pageNumber = 1) {
    const res = await fetch(`${this._apiBase}${method}?api_key=${this.api_key}&query=${value}&page=${pageNumber}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${method}, recived ${res.status}`);
    }
    if (typeof res.status !== 'number') {
      throw new Error(`Could not fetch ${method}, recived ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  async getMovie(value, pageNumber = 1) {
    const res = await this.getResult(`search/movie/`, `${value}/`, pageNumber);
    console.log(res);
    return res;
  }
}
