import React, { Component } from 'react';
import { Spin } from 'antd';
import MovieList from '../movie-list';
import Header from '../header';
import SearchPanel from '../search-panel';

export default class App extends Component {
  state = {
    term: '',
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  render() {
    const { term } = this.state;

    return (
      <div className="app">
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
