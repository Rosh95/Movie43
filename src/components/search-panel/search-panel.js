import React, { Component } from 'react';
import { debounce } from 'lodash';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: '',
  };

  debounceTest = debounce((term) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onSearchChange(term);
  }, 1000);

  onSearchChange = (event) => {
    const term = event.target.value;
    this.setState({ term });
    this.debounceTest(term);
  };

  render() {
    const { term } = this.state;
    return (
      <input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        value={term}
        onChange={this.onSearchChange}
      />
    );
  }
}
