import React, { Component } from 'react'
import styles from './App.module.sass'

class App extends Component {

    title: string = "CRA Template : TypeScript | CSS Modules | Sass"

    returnTitle(): string {
        return this.title
    }

    render() {
        return (
            <div className={styles.App}>
                {this.returnTitle()}
            </div>
        )
    }
}

export default App
