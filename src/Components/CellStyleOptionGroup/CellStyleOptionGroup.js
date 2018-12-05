import React, { Component } from 'react'
import { Checkbox, Divider } from 'antd'
import Auxx from '../../HOC/Auxx'

const CheckboxGroup = Checkbox.Group

class CellStyleOptionGroup extends Component {

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

        this.props.flipToBold(checkedList)
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        }, () => {this.props.flipToBold(this.state.checkedList)}) // ? use this cb to get latest state
    }

    render() {
        return (
            <Auxx>
                <Divider orientation="left">{this.props.dividerName}</Divider>
                <div>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                    <Divider type="vertical" />
                    <CheckboxGroup 
                        options={this.props.userSelectedColumns}
                        value={this.state.checkedList} 
                        onChange={this.onChange}
                    />
                </div>
            </Auxx>
        )
    }
}

export default CellStyleOptionGroup
