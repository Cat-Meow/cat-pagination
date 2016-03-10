import React, { Component } from 'react';
import { setClass } from 'rs-util';

class Pager extends Component {
  static propTypes = {
    content: React.PropTypes.string, // 显示内容
    offset: React.PropTypes.number, // 当前显示的offset
    target: React.PropTypes.number, // 点击的目标跳转
    totalPage: React.PropTypes.number // 总页码
  }

  static defaultProps = {
    content: '',
    offset: 0,
    target: -1,
    totalPage: 0
  }

  state = {
    disabled: this._getDis(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: this._getDis(nextProps)
    });
  }

  _getDis(props) {
    return props.target < 0 || (props.totalPage !== -1 && props.target >= props.totalPage);
  }

  _handleClick(event) {
    event.preventDefault();
    if (!this.state.disabled) {
      this.props.handleClick(this.props.target);
    }
  }

  render() {
    let classes = setClass({
      disabled: this.state.disabled,
      active: this.props.target === this.props.offset
    });

    return (
      <li className={classes}>
        <a href="#" onClick={this._handleClick.bind(this)}>
          {this.props.content}
        </a>
      </li>
    );
  }
}

export default Pager;
