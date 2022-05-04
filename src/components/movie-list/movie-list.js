import React, { Component } from 'react';
import './movie-list.css';
import { Spin, Alert, Pagination } from 'antd';

import NavigatorOnline from 'react-navigator-online';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import MovieService from '../../services/movie-service';

const pageSize = 5;

export default class MovieList extends Component {
  movieApi = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
    message_online: 'now! you have an internet connection.',
    message_ofline: 'now! you have no internet connection.',
    totalPage: 0,
    currentPage: 1,
  };

  debounceTest = debounce((page) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.searchFilm(page);
  }, 1000);

  componentDidMount() {
    this.searchFilm();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.name !== prevProps.name) {
      this.searchFilm();
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onSearchPage = debounce((page) => {
    this.setState({
      currentPage: page,
    });
    this.debounceTest(page);
  }, 1000);

  searchFilm() {
    // eslint-disable-next-line react/destructuring-assignment
    const value = this.props.name;

    this.movieApi
      // eslint-disable-next-line react/destructuring-assignment
      .getMovie(value, this.state.currentPage)
      .then((movie) => {
        this.setState({
          movies: movie.results,
          totalPage: movie.total_pages,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  showMessage(status) {
    if (status) {
      // eslint-disable-next-line react/destructuring-assignment
      toast.success(this.state.message_online);
    } else {
      // eslint-disable-next-line react/destructuring-assignment
      toast.error(this.state.message_ofline);
    }
  }

  render() {
    const { movies, loading, error, currentPage, totalPage } = this.state;
    console.log(currentPage);
    const errorSituation = error ? (
      <Alert message="We coudn`t find movie, please try again" type="error" style={{ color: 'pink' }} />
    ) : null;
    const antIcon = <LoadingOutlined style={{ fontSize: 48, color: 'blue' }} spin />;
    const spin = loading ? <Spin indicator={antIcon} /> : null;
    const content = !(loading || error) ? <MoviesView movies={movies} /> : null;
    const navigator = <NavigatorOnline onChange={(status) => this.showMessage(status)} />;
    const paginaion = (
      <Pagination
        onChange={this.onSearchPage}
        defaultCurrent={2}
        pageSize={pageSize}
        current={currentPage}
        total={totalPage}
        style={{ bottom: '0px' }}
      />
    );

    const toastStatus = (
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        onClose={() => alert('ok')}
      />
    );
    return (
      <div>
        {errorSituation}
        {spin}
        {content}
        {toastStatus}
        {navigator}
        {paginaion}
      </div>
    );
  }
}

function MoviesView({ movies }) {
  function truncate(text, maxLength) {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  }
  return (
    <>
      <h4 className="d-flex justify-content-center">Look what we found:</h4>
      <div className="flex wrap">
        <div className="list-group-item flex flex22">
          <div className="row ">
            {!movies.length && (
              <div className="d-flex justify-content-center">
                We did`n find anything. Please type something to search
              </div>
            )}
            {movies.length &&
              movies.map((movie) => (
                <div key={movie.id} className="card mb-3" style={{ width: '45%' }}>
                  <div className="row no-gutters flex">
                    <div className="col-md-4">
                      <img
                        src={
                          movie.poster_path === null
                            ? 'http://image.tmdb.org/t/p/w500//zsURBSQ6RnrTHm3v5L08wLiNHQj.jpg'
                            : `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        }
                        className="card-img"
                        style={{ margin: '25px 0 25px 10px' }}
                        alt="img"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">
                          <small className="text-muted">{movie.release_date}</small>
                        </p>
                        <p className="card-text">{truncate(movie.overview, 250)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
