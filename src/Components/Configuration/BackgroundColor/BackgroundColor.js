import React, { Component } from 'react'
import { connect } from 'react-redux'

import ColorPicker from './ColorPicker/ColorPicker'

import CellStyleOptionGroupBC from './CellStyleOptionGroupBC/CellStyleOptionGroupBC'

class BackgroundColor extends Component {

    hexValue = '#FFFFFF'

    flipHeadersToBC = (checkboxValues) => {
        const headersToBCState = this.modifyBCState(checkboxValues)
        this.props.onFlipHeadersToBC(headersToBCState)
    }

    flipColumnsToBC = (checkboxValues) => {
        const columnsToBCState = this.modifyBCState(checkboxValues)
        this.props.onFlipColumnsToBC(columnsToBCState)
    }

    flipTotalRowToBC = (checkboxValues) => {
        const totalRowToBCState = this.modifyBCState(checkboxValues)
        this.props.onFlipTotalRowToBC(totalRowToBCState)
    }

    modifyBCState = (checkboxValues) => {
        const originalCols = this.props.multiDataSet[0].columns
        return originalCols.map( (eaCol, index) => { // ! refactor this to be a lookup table instead?
            return ( checkboxValues.includes(eaCol) )
                ? {'id': index, 'value': true, 'name': eaCol, 'hex': this.hexValue}
                : {'id': index, 'value': false, 'name': eaCol, 'hex': this.hexValue}
        })
    }

    modifyHexValue = (hexValue) => {
        let modifiedHexForExcel = hexValue.hex.substring(1)
        modifiedHexForExcel = `FF${modifiedHexForExcel}`
        this.hexValue = modifiedHexForExcel
    }

    render() {
        return (
            <div>
                <ColorPicker onColorChangeComplete={this.modifyHexValue} />

                <CellStyleOptionGroupBC
                    dividerName="Headers Row"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBC={this.flipHeadersToBC} 
                />

                <CellStyleOptionGroupBC
                    dividerName="Data Column"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBC={this.flipColumnsToBC} 
                />

                <CellStyleOptionGroupBC
                    dividerName="Total Row"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBC={this.flipTotalRowToBC} 
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        multiDataSet: state.multiDataSet,
        userConfig: state.userConfig
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFlipHeadersToBC: (headersToBCState) => dispatch({type: 'SET_HEADERS_BC', value: headersToBCState}),
        onFlipColumnsToBC: (columnsToBCState) => dispatch({type: 'SET_COLUMNS_BC', value: columnsToBCState}),
        onFlipTotalRowToBC: (totalRowToBCState) => dispatch({type: 'SET_TOTALROW_BC', value: totalRowToBCState})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundColor)
