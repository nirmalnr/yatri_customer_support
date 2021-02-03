import React, { Component } from 'react';
import { connect } from 'react-redux';
// import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import { columns } from './config';
import TableWrapper from '../Tables/antTables/antTable.style';
import IsoWidgetsWrapper from '../Widgets/widgets-wrapper';
import IsoWidgetBox from '../Widgets/widget-box';
import actions from '../../redux/orders/actions.js';

// const tableDataList = clone(dataList);
// tableDataList.size = 5;

const mapStateToProps = state => {
    return {
        dataList: state.Orders.fetchedOrders,
        tableLoader: state.tableLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewOrderDetails: orderId => dispatch(actions.viewOrder(orderId))
    }
}


class IsoWidgets extends Component {
    handleViewDetailsClick = () => {
        const { viewOrderDetails } = this.props;
        viewOrderDetails();
    };

    render() {
        const { rowStyle, colStyle } = basicStyle;
        const { dataList } = this.props;
        const widgetPageStyle = {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            padding: '15px',
            overflow: 'hidden'
        };

        return (
            <div style={widgetPageStyle}>
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox>
                                {/* TABLE */}
                                <TableWrapper
                                    pagination={false}
                                    columns={columns}
                                    dataSource={dataList}
                                    className="isoSimpleTable"
                                />
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IsoWidgets);
