import React, { Component } from 'react'
import styles from './LocalConfig.module.sass'

import WorkSheetSelector from '../../../Components/WorkSheetSelector/WorkSheetSelector'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

class LocalConfig extends Component {

    state = {
        worksheets: []
    }

    componentDidMount() {
        tableau.extensions.initializeAsync()
            .then(() => {
                const tableauWorksheets = tableau.extensions.dashboardContent.dashboard.worksheets
                const tableauWorksheetNames = tableauWorksheets.map( eaWorksheet => eaWorksheet.name )
                return tableauWorksheetNames
            })
            .then((worksheetNames)=> {
                this.setState({worksheets: worksheetNames})
            })
    }

    render() {
        return (
            <div className={styles.LocalConfigContainer}>
                <h4>Worksheet Selector</h4>
                <WorkSheetSelector worksheets={this.state.worksheets}/>
            </div>
        )
    }
}

export default LocalConfig