import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageSize: this.props.pageSizes ? this.props.defaultPageSize : '5',
      page: 1
    }
  }


  onChangePageSize = (pageSize) => {
    this.setState({
      pageSize: pageSize
    }, () => this.props.onPageChanged(this.state.pageSize, this.state.page));
  }

  onChangePageValue = (evt) => {
    this.setState({ page: parseInt(evt.target.value)})
  }

  onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      if (isNaN(this.state.page)) {
        this.setState({
          page: 1
        })
      } else {
        this.props.onPageChanged(this.state.pageSize, this.state.page);
      }
    }
  }

  onBlur = (evt) => {
    if (isNaN(this.state.page)) {
      this.setState({
        page: 1
      })
    } else {
      this.props.onPageChanged(this.state.pageSize, this.state.page);
    }
  }

  onClickNext = (evt) => {
    this.setState( prevState => ({
        page: prevState.page  + 1
      }), () => this.props.onPageChanged(this.state.pageSize, this.state.page));
  }

  onClickPrevious = (evt) => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }), () => this.props.onPageChanged(this.state.pageSize, this.state.page));
  }

  render() {
    var pageSizes;
    if (this.props.pageSizes) {
      pageSizes = this.props.pageSizes;
    } else {
      pageSizes = [5, 10, 15, 20];
    }
    return (
      <div className="pagination-wrapper">
        <div className="pageSize-select-wrapper">
          <select className="pagesize-select" onChange={evt => this.onChangePageSize(evt.target.value)} value={this.props.defaultPageSize}>
            {
              pageSizes.map((pageSize, index) => (
                <option key={index} value={pageSize}>{pageSize}</option>
              ))
            }
          </select>
          per Page
        </div>
        <div className="pagenum-input-wrapper">
          <input
            type="number"
            min="1"
            onBlur={evt=> this.onBlur(evt)}
            onKeyDown={evt => this.onKeyDown(evt)}
            onChange={evt => this.onChangePageValue(evt)}
            value={this.state.page}/>
        </div>
        <div className="page-button-wrapper">
          <button id="previous" onClick={this.onClickPrevious} disabled={this.state.page === 1 ? true: false}>&lt;</button>
          <button id="next" onClick={this.onClickNext} disabled={this.props.enableNext ? false : true}>&gt;</button>
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  onPageChanged: PropTypes.func,
  pageSizes: PropTypes.array
};

export default Pagination;