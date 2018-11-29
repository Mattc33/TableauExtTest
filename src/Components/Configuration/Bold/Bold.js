import React, { Component } from 'react'
import styles from './Bold.module.sass'
import { Checkbox, Divider } from 'antd'
import { connect } from 'react-redux'

const CheckboxGroup = Checkbox.Group

// class App extends React.Component {
//   state = {
//     checkedList: defaultCheckedList,
//     indeterminate: true,
//     checkAll: false,
//   };

//   render() {
//     return (
//       <div>
//         <div style={{ borderBottom: '1px solid #E9E9E9' }}>
//           <Checkbox
//             indeterminate={this.state.indeterminate}
//             onChange={this.onCheckAllChange}
//             checked={this.state.checkAll}
//           >
//             Check all
//           </Checkbox>
//         </div>
//         <br />
//         <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
//       </div>
//     );
//   }

//   onChange = (checkedList) => {
//     this.setState({
//       checkedList,
//       indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
//       checkAll: checkedList.length === plainOptions.length,
//     });
//   }

//   onCheckAllChange = (e) => {
//     this.setState({
//       checkedList: e.target.checked ? plainOptions : [],
//       indeterminate: false,
//       checkAll: e.target.checked,
//     });
//   }
// }


class Bold extends Component {

    state = {
        // checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false
    }

    onChange = (checkedList) => {
        console.log(checkedList)
        // this.setState({
        //   checkedList,
        //   indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        //   checkAll: checkedList.length === plainOptions.length,
        // });
      }

    render() {
        console.log(this.props.userConfig)
        return (
            
            <div className={styles.BoldContainer}>
                <Divider orientation="left">Column Headers</Divider>
                <div>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                    Check all
                    </Checkbox>
                    <Divider type="vertical" />
                    <CheckboxGroup options={this.props.userConfig.userSelectedColumns}/>
                </div>
                
                <Divider orientation="left">Whole Column</Divider>
                <div>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                    Check all
                    </Checkbox>
                    <Divider type="vertical" />
                    <CheckboxGroup options={this.props.userConfig.userSelectedColumns}/>
                </div>
                
                <Divider orientation="left">Final Row</Divider>
                <div>
                    <Checkbox
                        onChange={this.onCheckAllChange}
                    >
                     Final Row
                    </Checkbox>
                </div>

                {/* options={[1,2,3,4]} value={this.state.checkedList} onChange={this.onChange} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetSelectedColumns: (columnsArr) => dispatch({type: 'SET_SELECTED_COLUMNS', value: columnsArr})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bold)