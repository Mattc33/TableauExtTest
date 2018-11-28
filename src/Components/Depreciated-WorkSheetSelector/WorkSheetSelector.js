import React, { Component } from 'react'
import styles from './WorkSheetSelector.module.sass'
import { Radio, Button } from 'antd'
import { connect } from 'react-redux'

import Auxx from '../../HOC/Auxx'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

const RadioGroup = Radio.Group
class WorkSheetSelector extends Component {

    state = {
        currentWorksheet: ''
    }

    onChange = (e) => {
        this.setState({ currentWorksheet: e.target.value })
    }

    loadSelectedData = () => {
        const currentWorksheet = this.getSelectedSheet(this.state.currentWorksheet)

        currentWorksheet.getSelectedMarksAsync()
            .then( (marks) => {
                return marks
            })
            .then( (marks) => {
                const worksheetData = marks.data[0]
                const colData = worksheetData._columns.map( eaCol => eaCol.fieldName)
                const rowData = worksheetData._data.map( eaRow => {
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

    getSelectedSheet = (worksheetName) => {
        return tableau.extensions.dashboardContent.dashboard.worksheets
            .find( sheet => 
                sheet.name === worksheetName
            )
    }

    renderRadios = () => {
        return this.props.worksheets.map( (eaWorksheet, index) => 
            <Radio className={styles.radio} value={eaWorksheet} key={index}> {eaWorksheet}</Radio>
        )
    }

    render() {
        return (
            <Auxx>
                <RadioGroup onChange={this.onChange}>
                    {this.renderRadios()}
                </RadioGroup>

                <Button onClick={this.loadSelectedData}>Load Selected Data</Button>

            </Auxx>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        multiDataSet: state.multiDataSet
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


export default connect(mapStateToProps, mapDispatchToProps)(WorkSheetSelector)