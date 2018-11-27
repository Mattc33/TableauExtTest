import React, { Component } from 'react'
// import styles from './Footer.module.sass'
import ReactExport from "react-export-excel"

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

/* global tableau */

let dataSet1 = [
    {
        name: "Johson"
    },
    {
        name: "Monika"
    },
    {
        name: "John"
    },
    {
        name: "Josef"
    }
]

class Footer extends Component {

    render() {
        return (
            <ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={dataSet1} name="Employees">
                    <ExcelColumn label="Name" value="name"/>
                </ExcelSheet>
            </ExcelFile>
        )
    }
}

export default Footer