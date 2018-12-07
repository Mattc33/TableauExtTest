import React from 'react'
import styles from './Layout.module.sass'
import { Collapse } from 'antd'

import Header from '../Header/Header'
import SelectWorksheet from './SelectWorksheet'
import SelectColumns from '../SelectColumns/SelectColumns'
import Configuration from '../Configuration/Configuration'
import Footer from '../Footer/Footer'

const Panel = Collapse.Panel

const Layout = () => (
    <div>
        <Header />
        <Collapse accordion className={styles.Accordion}>
            <Panel header="1. Select Worksheet & Data" key="1">
                <SelectWorksheet />
            </Panel>

            <Panel header="2. Select Columns" key="2">
                <SelectColumns />
            </Panel>

            <Panel header="3. Configuration" key="3">
                <Configuration />
            </Panel>

            <Panel header="4. Preview" key="4">

            </Panel>

            <Panel header="5. Export Data" key="5">
                <Footer />
            </Panel>

        </Collapse>

    </div>
)

export default Layout