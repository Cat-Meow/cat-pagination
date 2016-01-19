import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../src/pagination.js';
import '../assets/index.less';

class Example extends Component {
  state = {
    offset: 0
  }

  _updatePage(offset) {
    console.log(`收到 ${offset}`);
    this.setState({
      offset: offset
    });
  }

  render() {
    let { offset } = this.state;
    return (
      <div>
        <Pagination offset={ offset } update={this._updatePage.bind(this)} totalPage={16}
          mySize="small"
        />

        <hr />

        <Pagination offset={ offset } update={this._updatePage.bind(this)} totalPage={16}/>

        <hr />

        <Pagination offset={ offset } update={this._updatePage.bind(this)} totalPage={16}
          mySize="large"
        />
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('component-example-simple-size'));
