import React, { Component } from 'react'
import { connect } from 'react-redux'

import CellStyleOptionGroup from '../../CellStyleOptionGroup/CellStyleOptionGroup'
class Bold extends Component {

    flipHeadersToBold = (checkboxValues) => {
        const headersToBoldState = this.modifyBoldedState(checkboxValues)
        this.props.onFlipHeadersToBold(headersToBoldState)
    }

    flipColumnsToBold = (checkboxValues) => {
        const columnsToBoldState = this.modifyBoldedState(checkboxValues)
        this.props.onFlipColumnsToBold(columnsToBoldState)
    }

    flipTotalRowToBold = (checkboxValues) => {
        const totalRowToBoldState = this.modifyBoldedState(checkboxValues)
        this.props.onFlipTotalRowToBold(totalRowToBoldState)
    }

    modifyBoldedState = (checkboxValues) => {
        const originalCols = this.props.multiDataSet[0].columns
        return originalCols.map( (eaCol, index) => { // ! refactor this to be a lookup table instead?
            return ( checkboxValues.includes(eaCol) )
                ? {'id': index, 'value': true, 'name': eaCol}
                : {'id': index, 'value': false, 'name': eaCol}
        })
    }

    render() {
        return (
            <div>
                <CellStyleOptionGroup
                    dividerName="Headers Row"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBold={this.flipHeadersToBold} 
                />

                <CellStyleOptionGroup
                    dividerName="Data Column"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBold={this.flipColumnsToBold} 
                />

                <CellStyleOptionGroup
                    dividerName="Total Row"
                    userSelectedColumns={this.props.multiDataSet[0].columns}
                    flipToBold={this.flipTotalRowToBold} 
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
        onFlipHeadersToBold: (headersToBoldState) => dispatch({type: 'SET_HEADERS_BOLD', value: headersToBoldState}),
        onFlipColumnsToBold: (columnsToBoldState) => dispatch({type: 'SET_COLUMNS_BOLD', value: columnsToBoldState}),
        onFlipTotalRowToBold: (totalRowToBoldState) => dispatch({type: 'SET_TOTALROW_BOLD', value: totalRowToBoldState})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bold)