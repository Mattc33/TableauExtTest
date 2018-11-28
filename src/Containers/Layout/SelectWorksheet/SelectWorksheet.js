import React, { Component } from 'react'
import styles from './SelectWorksheet.module.sass'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

const Option = Select.Option

class SelectWorksheet extends Component {

    state = {
        worksheets: []
    }

    componentDidMount() {
        tableau.extensions.initializeAsync()
            .then(() => {
                const tableauWorksheetNames = tableau.extensions.dashboardContent.dashboard.worksheets
                    .map( eaWorksheet => eaWorksheet.name )
                this.setState({worksheets: tableauWorksheetNames})
            })
    }

    inputChangeHandler = (sheetName) => {
        tableau.extensions.dashboardContent.dashboard.worksheets
            .find( sheet => sheet.name === sheetName )
            .getUnderlyingDataAsync()
                .then( (marks) => {
                    const colData = marks._columns.map( eaCol => eaCol.fieldName)
                    const rowData = marks._data.map( eaRow => {
                        return eaRow.map( eaVal => {
                            return eaVal.value
                        })
                    })

                    console.log(colData, rowData)
                    // load col and row data to store
                    this.props.onPassGridData(colData, rowData)
                    console.log(this.props.multiDataSet)
                })
    }

    render() {
        return (
            <div className={styles.LocalConfigContainer}>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select a Worksheet"
                    allowClear={true}
                    optionFilterProp="children"
                    onChange={ this.inputChangeHandler }
                    filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                >
                    { 
                        this.state.worksheets.map( eaSheet => 
                            <Option value={eaSheet} key={eaSheet} className={styles.Option}>
                                <Icon type="bar-chart" /><span> {eaSheet}</span>
                            </Option>) 
                    }
                </Select>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPassGridData: (colData, rowData) => 
            dispatch(
                {
                    type: 'UPDATE_DATA_SET', 
                    colVals: colData, 
                    rowVals: rowData
                }
            )
    }
}


export default connect(null, mapDispatchToProps)(SelectWorksheet)