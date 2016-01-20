import React, { Component } from 'react';
import Pager from './pager';
import { createFragment } from 'cat-util';

const SIZES = {
  large: 'lg',
  normal: '',
  small: 'sm'
}

class Pagination extends Component {
  static propTypes = {
    offset: React.PropTypes.number, // 当前页
    totalPage: React.PropTypes.number,  // 总页数
    mySize: React.PropTypes.string, // 样式大小
    myStyle: React.PropTypes.string,  // 样式风格
    maxSize: React.PropTypes.number,  // 显示长度限制
    className: React.PropTypes.string, // 自定义类名
    update: React.PropTypes.func,
    prefixName: React.PropTypes.string  // 前缀
  }

  static defaultProps = {
    offset: 0,
    totalPage: -1,
    mySize: 'normal',    //large, normal, smal
    myStyle: 'omitted',     //fullsize, omitted, compressed
    maxSize: 10,
    className: '',
    prefixName: 'cat'
  }

  state = {
    jump: ''
  }

  // 点击事件
  _handleClick = (newPage) => {
    this.props.update(newPage);
  }

  // 输入数字
  _enter(e) {
    let value = e.target.value;
    if (value === '' || /\d$/.test(value)) {
      this.setState({
        jump: value
      });
    }
  }

  // 跳转
  _jump(e) {
    e.preventDefault();
    let { totalPage } = this.props,
      { jump } = this.state;
    if (jump !== '' && (totalPage === -1 || jump <= totalPage)) {
      this._handleClick(jump - 1);
      this.setState({
        jump: ''
      });
    }
  }

  // 生成列表数据
  _getList() {
    let { myStyle, offset, totalPage, maxSize } = this.props,
      list = [],
      i = 0,
      start = 0,
      end = 1;

    if (totalPage === -1 || myStyle === 'compressed') {
    // 压缩版
      list.push({
        content: `${(offset + 1).toString()}${totalPage !== -1 ? '/' + totalPage : ''}`,
        target: offset
      });
    } else if (myStyle === 'fullsize' || totalPage <= maxSize) {
    // 全尺寸
      while(i < totalPage) {
        list.push({
          content: (i + 1).toString(),
          target: i
        });
        i ++;
      }
    } else {
    // 智能版
      start = offset - maxSize/2;
      start = start > totalPage - maxSize - 2 ? totalPage - maxSize - 2 : start;
      start = start < 0 ? 0 : start;

      while (i < maxSize && start < totalPage - 3) {
        list.push({
          content: (start + 1).toString(),
          target: start
        });
        start ++;
        i ++;
      }
      if (i === maxSize) {
        list.push({
          content: '···',
          target: -1
        });
      } else {
      list.push({
          content: (totalPage - 2).toString(),
          target: totalPage -3
        }, {
          content: (totalPage - 1).toString(),
          target: totalPage -2
        });
      }
      list.push({
        content: totalPage.toString(),
        target: totalPage - 1
      });
    }
    list.unshift({
      content: '〈 上一页',
      target: offset - 1
    });
    list.push({
      content: '下一页 〉',
      target: offset + 1
    });
    return list;
  }

  renderJump() {
    let { totalPage, maxSize, myStyle } = this.props,
      { jump } = this.state;

    if ((totalPage !== -1 && totalPage <= maxSize) || myStyle === "fullsize") {
      return null;
    }

    let self = this;
    
    return createFragment({
      jumpText: <li key="jumpText" className="text-container">
                  <span>到第<input type="text" value={ jump } onChange={self._enter.bind(self)}/>页</span>
                </li>,
      jumpButton: <li key="jumpButton">
                    <a onClick={self._jump.bind(self)} className="jump-button" href="#">确定</a>
                </li>
    });
  }

    render() {
        let { prefixName, mySize, myStyle, className, totalPage, offset, maxSize} = this.props,
            classes = `${prefixName}-pagination ${prefixName}-pagination-${SIZES[mySize]} ${className}`,
            self = this,
            list = this._getList();

        return (
            <ul className={classes}>
                {
                    list.map((item) => {
                        return (
                            <Pager
                                key={ item.content }
                                content={ item.content }
                                target={ item.target }
                                offset={ offset }
                                totalPage={ totalPage }
                                handleClick={ self._handleClick }
                            />
                        );
                    })
                }
                { this.renderJump() }
            </ul>
        );
    }
};

export default Pagination;
