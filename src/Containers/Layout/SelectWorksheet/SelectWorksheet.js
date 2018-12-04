import React, { Component } from 'react'
import styles from './SelectWorksheet.module.sass'
import { Select, Icon, Divider, Button } from 'antd'
import { connect } from 'react-redux'
import ReactTable from "react-table"
import 'react-table/react-table.css'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

const Option = Select.Option

class SelectWorksheet extends Component {

    state = {
        worksheets: [],
        tableData: [],
        tableColumns: []
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
        this.props.onSetSelectedWorksheet(sheetName)
    }

    getSelectedData = () => {
        const sheetName = this.props.sheetName
        if ( sheetName !== '' ) {
            tableau.extensions.dashboardContent.dashboard.worksheets // ? find worksheet data based on name
                .find( sheet => sheet.name === sheetName )
                .getSelectedMarksAsync()
                    .then( (marks) => {
                        // console.log(marks.data[0])
                        const colData = marks.data[0]._columns.map( eaCol => eaCol.fieldName)
                        const rowData = marks.data[0]._data.map( eaRow => eaRow.map( eaVal => eaVal.value))
                        // ? pass col/row data off to redux store
                        this.props.onPassGridData(colData, rowData)
                        // console.log(JSON.stringify(this.props.multiDataSet))
                        return {
                            colData: colData,
                            rowData: rowData
                        }
                    })
                    .then( (data) => {
                        // ? parse data and load into preview table
                        console.log(data)
                        this.parseColToGrid(data.colData)
                        this.parseDataToGrid(data.rowData)
                    })
        }
    }

    parseColToGrid = (colData) => {
        const tableColumns = colData.map( (eaCol, index) => { 
            return {
                Header: eaCol,
                accessor: index.toString() // accessor must be a string to match rowData
            }
        })
        this.setState({tableColumns: tableColumns})
    }

    parseDataToGrid = (rowData) => {
        const tableData = rowData.map( eaRow => {
            let count = eaRow.length - 1
            let rowObj = {}
            while (count > -1) {
                rowObj = { ...rowObj, [count]: eaRow[count] }
                count--
            }
            return rowObj
        })
        this.setState({tableData: tableData})
    }

    render() {
        return (
            <div className={styles.SelectWorksheetContainer}>
                <div className={styles.SelectContainer}>
                    <div>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a Worksheet"
                            optionFilterProp="children"
                            onChange={ this.inputChangeHandler }
                            filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                        >
                            { 
                                this.state.worksheets.map( eaSheet => 
                                    <Option value={eaSheet} key={eaSheet} className={styles.Option}>
                                        <Icon type="area-chart" /><span> {eaSheet}</span>
                                    </Option>) 
                            }
                        </Select>
                    </div>
                    <div>
                        <Button onClick={this.getSelectedData}>
                            Load Data & Preview
                        </Button>
                    </div>
                </div>
                {
                    this.state.tableData.length > 0 
                    ?
                        <ReactTable
                            style={{marginTop: '10px'}}
                            pageSizeOptions={[3, 5, 10, 20, 25, 50, 100]}
                            defaultPageSize={3}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            filterable={false}
                            data={this.state.tableData}
                            columns={this.state.tableColumns}
                        />
                    : <div>Select Worksheet and Data in worksheet to Preview</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        multiDataSet: state.multiDataSet,
        sheetName: state.sheetName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPassGridData: (colData, rowData) => dispatch(
            {
                type: 'UPDATE_DATA_SET', 
                colVals: colData, 
                rowVals: rowData
            }
        ),
        onSetSelectedWorksheet: (sheetName) => dispatch({type: 'SELECT_SHEET', value: sheetName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorksheet)

// ! NOTES
/*
    worksheets.getSelectedMarksAsync() = get selected data from worksheet

    worksheets.getUnderlyingDataAsync() = get all data from worksheet requires .trex manifest to include
    </icon>...
    <permissions>
        <permission>full data</permission>
    </permissions>
    ...
*/
