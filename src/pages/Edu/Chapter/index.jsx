import React, { Component } from 'react'
import Search from './Search'
import List from './List'
export default class Chapter extends Component {
  render() {
    return (
      <div>
       <Search /> 
       <List />
      </div>
    )
  }
}
