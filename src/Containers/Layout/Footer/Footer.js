import React from 'react'
import styles from './Footer.module.sass'
import ReactExport from 'react-export-excel'
import { connect } from 'react-redux'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

// const multiDataSet = [
//     {
//         columns: ["Name", "Salary", "Sex"],
//         data: [
//             ["Johnson", 30000, "Male"],
//             ["Monika", 355000, "Female"],
//             ["Konstantina", 20000, "Female"],
//             ["John", 250000, "Male"],
//             ["Josef", 450500, "Male"],
//         ]
//     },
//     {
//         xSteps: 1, // Will start putting cell with 1 empty cell on left most
//         ySteps: 5, //will put space of 5 rows,
//         columns: ["Name", "Department"],
//         data: [
//             ["Johnson", "Finance"],
//             ["Monika", "IT"],
//             ["Konstantina", "IT Billing"],
//             ["John", "HR"],
//             ["Josef", "Testing"],
//         ]
//     }
// ];

const Footer = (props) => (
    <ExcelFile>
        <ExcelSheet dataSet={props.multiDataSet} name="Organization"/>
    </ExcelFile>
)

const mapStateToProps = (state) => {
    return {
        multiDataSet: state.multiDataSet
    }
}

export default connect(mapStateToProps)(Footer)

// const multiDataSet = [
//     {
//         columns: ["Name", "Salary", "Sex"],
//         data: [
//             ["Johnson", 30000, "Male"],
//             ["Monika", 355000, "Female"],
//             ["Konstantina", 20000, "Female"],
//             ["John", 250000, "Male"],
//             ["Josef", 450500, "Male"],
//         ]
//     },
//     {
//         xSteps: 1, // Will start putting cell with 1 empty cell on left most
//         ySteps: 5, //will put space of 5 rows,
//         columns: ["Name", "Department"],
//         data: [
//             ["Johnson", "Finance"],
//             ["Monika", "IT"],
//             ["Konstantina", "IT Billing"],
//             ["John", "HR"],
//             ["Josef", "Testing"],
//         ]
//     }
// ];