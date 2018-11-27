import React, { Component } from 'react'
import styles from './App.module.sass'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

class App extends Component {

    state = {
        dashboardName: ''
    }

    componentWillMount() {
        tableau.extensions.initializeAsync().then(() => {
            const dashboardName = tableau.extensions.dashboardContent.dashboard.name
            this.setState({dashboardName: dashboardName})
        })
    }

    render() {
        return (
            <div className={styles.App}>
                {this.state.dashboardName}
            </div>
        )
    }
}

export default App
