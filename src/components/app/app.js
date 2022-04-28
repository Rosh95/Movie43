import React, { Component } from 'react';
import { Spin } from 'antd';
import MovieList from '../movie-list';
import Header from '../header';
import SearchPanel from '../search-panel';

export default class App extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    term: '',
  };

  onSearchChange = (term) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ term });
  };

  render() {
    const { term } = this.state;

    return (
      <div>
        <Header />
        <SearchPanel onSearchChange={this.onSearchChange} />
        <MovieList name={term} />
        <Spin />

        <div className="row mb2">
          <div className="col-md-6" />
          <div className="col-md-6" />
        </div>
      </div>
    );
  }
}