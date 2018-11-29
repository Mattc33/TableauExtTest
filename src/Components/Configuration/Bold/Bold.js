import React, { Component } from 'react'
import styles from './Bold.module.sass'
import { Checkbox } from 'antd'
import { Connect } from 'react-redux'

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
        checkAll: false,
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
        return (
            <div className={styles.BoldContainer}>
                {this.props.tabTitle}
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                Check all
                </Checkbox>
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
            </div>
        )
    }
}

export default Bold