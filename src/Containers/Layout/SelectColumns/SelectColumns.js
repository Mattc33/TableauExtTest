import React, { Component } from 'react'
import styles from './SelectColumns.module.sass'
import { connect } from 'react-redux'
import { Icon, Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group
class SelectColumns extends Component {
    
    componentDidMount() {
        if ( this.props.multiDataSet.length > 0 ) {
            this.props.onSetSelectedColumns(this.props.multiDataSet[0].columns)
        }
    }

    componentDidUpdate() {
        console.log('SelectColumns', this.props.userConfig)
    }

    onChange = (currentCheckedState) => {
        this.props.onSetSelectedColumns(currentCheckedState)
    }

    render() {
        return this.props.multiDataSet.length > 0
        ?   
            (
                <div className={styles.SelectColumnsContainer}>
                    <div><Icon type="area-chart" /> {this.props.sheetName}</div>
                    <CheckboxGroup
                        className={styles.CheckboxGroup}
                        defaultValue={this.props.multiDataSet[0].columns}
                        onChange={this.onChange} 
                    >
                        { 
                            this.props.multiDataSet[0].columns.map( eaCol => 
                                <div key={eaCol}><Checkbox value={eaCol}>{eaCol} <Icon type="bar-chart" /> </Checkbox></div>
                            ) 
                        }
                    </CheckboxGroup>
                </div>
            )
        :
            <div>Please select a sheet</div>
    }
}

const mapStateToProps = (state) => {
    return {
        sheetName: state.sheetName,
        multiDataSet: state.multiDataSet,
        userConfig: state.userConfig
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetSelectedColumns: (columnsArr) => dispatch({type: 'SET_SELECTED_COLUMNS', value: columnsArr})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectColumns)