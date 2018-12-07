import React, { Component } from 'react'
import { Checkbox, Divider } from 'antd'
import styles from './CellStyleOptionGroupBC.module.sass'
import Auxx from '../../../../HOC/Auxx'

import HexColorSquare from './HexColorSquare/HexColorSquare'

const CheckboxGroup = Checkbox.Group

class CellStyleOptionGroupBC extends Component {

    plainOptions = this.props.userSelectedColumns
    defaultCheckedList = []

    state = {
        checkedList: this.defaultCheckedList,
        indeterminate: true,
        checkAll: false
    }

    onChange = (checkedList) => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && (checkedList.length < this.plainOptions.length),
          checkAll: checkedList.length === this.plainOptions.length,
        })

        this.props.flipToBC(checkedList)
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        },() => {this.props.flipToBC(this.state.checkedList)}) // ? use this cb to get latest state
    }

    render() {
        return (
            <Auxx>
                <Divider orientation="left">{this.props.dividerName}</Divider>
                <div className={styles.OptionsContainer}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                    <Divider type="vertical" />
                    <CheckboxGroup 
                        value={this.state.checkedList} 
                        onChange={this.onChange}
                        options={this.props.userSelectedColumns}
                    />
                </div>
            </Auxx>
        )
    }
}

export default CellStyleOptionGroupBC