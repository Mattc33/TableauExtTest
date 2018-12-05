import React, { Component } from 'react'
import styles from './Footer.module.sass'
import ReactExport from 'react-export-excel'
import { connect } from 'react-redux'
import { Button } from 'antd'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
class Footer extends Component {
    
    state = {
        multiDataSet: [],
        multiDataSetString: ''
    }

    createExcelSheet = () => { // ? initialization function

        // ? Step 0. Reset State, create a copy of multiData to maintain immutability
        this.setState({multiDataSet: [], multiDataSetString: ''})
        // const multiDataCopy = [...this.props.multiDataSet]
        const multiDataCopy = JSON.parse(JSON.stringify(this.props.multiDataSet)) // ! make a deep clone of the redux store dataset
        let colDataCopy = [...multiDataCopy[0].columns]
        console.log('original multiDataCopy', multiDataCopy)
        
        // ? Step 1. Create a custom column setup
        multiDataCopy[0].columns = multiDataCopy[0].columns.map( (eaCol, index) => {
            return index !== 0
                ? ''
                : 'Insert Logo Here' 
        })
        console.log('apply custom column', multiDataCopy)
        
        // ? Step 2. Append new obj as Total Rows & apply styles if applicable
        const totalRow = this.processTotals(colDataCopy, multiDataCopy[0].data)
        const multiDataWithTotal = [
            ...multiDataCopy, 
            {
                columns: multiDataCopy[0].columns.map( eaCol => ''),
                data: [totalRow]
            }
        ]
        console.log('multiDataWithTotal', multiDataWithTotal)

        // ? Step 3. Apply Row Total Styling if applicable
        if ( this.props.userConfig.bold.totalRow.length > 0) {
            console.log(multiDataWithTotal[1].data[0])
            multiDataWithTotal[1].data = [this.processRowTotalStyles(multiDataWithTotal[1].data[0])]
        }

        // ? Step 4. Apply styling to Data Columns if applicable
        if ( this.props.userConfig.bold.columns.length > 0 ) {
            multiDataWithTotal[0].data = this.processDataColumnStyle(multiDataWithTotal[0].data)
        }

        // ? Step 5. Create a column copy into data arr, apply any styling if applicable
        if (this.props.userConfig.bold.headers.length > 0 ) {
            colDataCopy = this.processRowHeaderStyles(colDataCopy)
        }
        multiDataWithTotal[0].data.unshift(colDataCopy)

        this.setState(
            {
                multiDataSet: multiDataWithTotal,
                multiDataSetString: JSON.stringify(multiDataWithTotal)
            },
            () => {console.log(this.state.multiDataSet, this.state.multiDataSetString)}
        )
    }

    // processStyle = (rowData, type) => {

    // }

    processRowHeaderStyles = (rowData) => {
        return rowData.map( (eaCol, index) => {
            return {'value': eaCol, style: {font: {bold: this.props.userConfig.bold.headers[index].value}}}
        })
    }

    processDataColumnStyle = (rowData) => { // ? process Columns Last
        return rowData.map( (eaRow) => {
            return eaRow.map( (eaValue, index) => {
                return {value: eaValue, style: {font: {bold: this.props.userConfig.bold.columns[index].value}}}
            })
        })
    }

    processRowTotalStyles = (rowData) => {
        return rowData.map( (eaValue, index) => {
            return {value: `${eaValue}`, style: {font: {bold: this.props.userConfig.bold.totalRow[index].value}}}
        })
    }

    processTotals = (colData, rowData) => { // ? process total Rows Second to Last
        const totalArr = []
        for ( let i = 0; i < colData.length; i++) {
            const totalValue = rowData.reduce( (total, value) => {
                if(isNaN(parseFloat(value[i]))) {
                    return ''
                } else {
                    return total + parseFloat(value[i])
                }
            }, 0)
            totalArr.push(totalValue)
        }
        return totalArr
    }

    copyToClipboard = () => {
        document.getElementById('desktopTextArea').select()
        document.execCommand('copy')
    }

    launchWebApp = () => {
        window.open('https://cbs-tableau-poc-webapp.firebaseapp.com/', '_blank', '')
    }

    render() {
        return this.props.multiDataSet.length > 0
        ? 
            (
                <div>
                    <Button onClick={ this.createExcelSheet } className={styles.ApplySettings}> Apply Settings </Button>

                    {/* <button onClick={ () => console.log('test', this.props.userConfig) }>TEST</button>  */}
                
                    <div className={styles.DownloadContainer}>
                        <div>
                            <h4>Tableau Browser</h4>
                            <ExcelFile 
                                element={<Button className={styles.DownloadBrowser}>Download Data</Button>}
                            >
                                <ExcelSheet dataSet={this.state.multiDataSet} name="Organization"/>
                            </ExcelFile>
                        </div>
                        <div>
                            <h4>Tableau Desktop</h4>
                            <textarea id='desktopTextArea' rows="4" cols="50" readOnly
                                className={styles.desktopTextArea} 
                                value={this.state.multiDataSetString}
                            />
                            <Button onClick={this.copyToClipboard} className={styles.CopyBtn}>Copy</Button>
                            <Button onClick={this.launchWebApp} >Launch App</Button>
                        </div>
                    </div>  
                </div>
            )
        : 
            <div>Please select a sheet</div>
    }
}

const mapStateToProps = (state) => {
    return {
        multiDataSet: state.multiDataSet,
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps)(Footer)

