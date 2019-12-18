import React, {Component} from 'react';

import {FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import classNames from 'classnames';
import Pagination from '../../../../custom/pagination/Pagination';

class ZonesList extends Component {
    state = {
        selectedContactsMenu: null,
        key: '',
        pageSize: 20,
        page: 1,
        totalRecords: 50,
        boxWidth: 1882,
        enableNext: true
    };

    constructor(props) {
        super(props);

        this.updateBoxWidth = this.updateBoxWidth.bind(this);
    }
    updateBoxWidth () {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

            this.setState({
                boxWidth: width - 40
            });

    }
    componentWillMount () {
        this.updateBoxWidth();
    }
    componentDidMount () {
        window.addEventListener("resize", this.updateBoxWidth);
    }
    componentWillUnmount () {
        window.removeEventListener("resize", this.updateBoxWidth);
    }

    render()
    {
        // const { classes } = this.props;
        return (
            <FuseAnimate animation="transition.slideUpIn" delay={100}>
                <div>
                    <ReactTable
                        key={this.state.pageSize}
                        className={classNames("-striped -highlight border-0")}
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                className: "cursor-pointer",
                                onClick  : (e, handleOriginal) => {
                                    // if ( rowInfo )
                                    // {
                                    //     this.props.history.push(`/apps/user/${rowInfo.original.userId}`)
                                    // }
                                }
                            }
                        }}
                        // data={data}
                        columns={[
                            {
                                Header    : "Name",
                                accessor  : "name",
                                filterable: true,
                                className : "font-bold",
                                width: this.state.boxWidth * 0.25
                            },
                            {
                                Header    : "List Name2",
                                accessor  : "name2",
                                filterable: true,
                                className : "font-bold",
                                width: this.state.boxWidth * 0.25
                            },
                            {
                                Header    : "List Name3",
                                accessor  : "name3",
                                filterable: true,
                                width: this.state.boxWidth * 0.25
                            },
                            {
                                Header    : "List Name4",
                                accessor  : "name4",
                                filterable: true,
                                className : "font-bold",
                                width: this.state.boxWidth * 0.25
                            }

                        ]}
                        showPagination={false}
                        pageSize={ this.state.pageSize}
                        noDataText="No zones found"
                    />
                    {/* <div className={classes.row}> */}
                    <div className="row">
                        <Pagination
                            pageSizes={[10,20,30,40,50]}
                            defaultPageSize={this.state.pageSize}
                            enableNext = {this.state.enableNext}
                            onPageChanged={(pageSize, page) => this.onPageChange(page, pageSize)}
                        />
                    </div>
                </div>

            </FuseAnimate>
        );
    }
}

export default ZonesList;
