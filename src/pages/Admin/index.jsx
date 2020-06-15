import React, { Component } from "react";
import Visits from './components/Visits'
import Sales from './components/Sales'
import SearchRight from './components/SearchRight'
export default class Admin extends Component {
  render() {
    return (
      <div>
       <Visits />
       <Sales />
       <SearchRight />
      </div>
    );
  }
}
