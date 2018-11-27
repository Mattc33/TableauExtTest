import React, { Component } from 'react'
import styles from './Header.module.sass'

// Declare this so our linter knows that tableau is a global object
/* global tableau */

class Header extends Component {

    state = {
        dashboardName: ''
    }

    componentWillMount() {
        tableau.extensions.initializeAsync().then(() => {
            const tableauDashboardName = tableau.extensions.dashboardContent.dashboard.name
            this.setState({dashboardName: tableauDashboardName})
        })
    }

    openRequestedPopup() {
        window.open('h', '_blank')
    }

    render() {
        return (
            <div className={styles.HeaderContainer}>
                <h2>Tableau Exporter POC</h2>
                <button onClick={this.openRequestedPopup}></button>
                <h4>Dashboard: {this.state.dashboardName}</h4>
            </div>
        )
    }
}
export default Header