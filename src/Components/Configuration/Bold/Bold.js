import React, { Component } from 'react'
import styles from './Bold.module.sass'
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

    flipTotalRowToBold = () => {

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
            
            <div className={styles.BoldContainer}>

                <CellStyleOptionGroup
                    dividerName="Column Headers"
                    userSelectedColumns={this.props.userConfig.userSelectedColumns}
                    flipToBold={this.flipHeadersToBold} 
                />

                <CellStyleOptionGroup
                    dividerName="Data Column"
                    userSelectedColumns={this.props.userConfig.userSelectedColumns}
                    flipToBold={this.flipColumnsToBold} 
                />

                {/* 
                <Divider orientation="left">Final Row</Divider>
                <div>
                    <Checkbox
                        onChange={this.onCheckAllChange}
                    >
                     Final Row
                    </Checkbox>
                </div> */}

                {/* options={[1,2,3,4]} value={this.state.checkedList} onChange={this.onChange} */}
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
        onFlipColumnsToBold: (columnsToBoldState) => dispatch({type: 'SET_COLUMNS_BOLD', value: columnsToBoldState})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bold)