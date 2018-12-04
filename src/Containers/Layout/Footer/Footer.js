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

        // ? Step 0. Reset State
        this.setState({multiDataSet: [], multiDataSetString: ''})

        const multiData = [...this.props.multiDataSet]
        const rowData = multiData[0].data
        let colDataCopy = [...this.props.multiDataSet[0].columns] // ? Create a column mimic in data object in array location [0]
        
        // ? Step 1. Create a custom column setup
        multiData[0].columns = multiData[0].columns.map( (eaCol, index) => {
            return index !== 0
                ? ''
                : 'Insert Logo Here' 
        })

        // ? Step 2. Append total rows
        let multiDataWithTotal = [
            ...multiData, 
            {
                columns: multiData[0].columns.map( eaCol => ''),
                data: [this.processTotals(rowData)]
            }
        ]

        // ? Step 3. Apply column styling to Data Columns
        multiDataWithTotal[0].data = this.processColumnStyles(multiDataWithTotal[0].data)

        // ? Step 4. Create a column copy into data arr, apply any styling
        colDataCopy = this.processColumnHeadersStyle(colDataCopy)
        multiDataWithTotal[0].data.unshift(colDataCopy)
        
        this.setState(
            {
                multiDataSet: multiDataWithTotal,
                multiDataSetString: JSON.stringify(multiDataWithTotal)
            }
        )
    }

    processColumnStyles = (rowData) => {
        return rowData.map( (eaRow) => {
            return eaRow.map( (eaValue, index) => {
                const shouldStyle = this.props.userConfig.bold.columns[index].value
                return {value: eaValue, style: {font: {bold: shouldStyle}}}
            })
        })
    }

    processTotals = (rowData) => { // ? process total Rows Second to Last
        const numOfRowValues = rowData[0].length
        const totalArr = []
        for ( let i = 0; i < numOfRowValues; i++) {
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

    processColumnHeadersStyle = (rowData) => { // ? process Columns Last
        return rowData.map( (eaCol, index) => {
            return {'value': eaCol, style: {font: {bold: this.props.userConfig.bold.headers[index].value}}}
        })
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

                    <button onClick={ () => console.log('test', this.props.userConfig) }>TEST</button> 
                
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

