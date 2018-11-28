import React from 'react'
import styles from './Layout.module.sass'
import { Collapse } from 'antd'

import Header from './Header/Header'
import SelectWorksheet from './SelectWorksheet/SelectWorksheet'
import Footer from './Footer/Footer'

const Panel = Collapse.Panel

const Layout = () => (
    <div>
        <Header />
        <Collapse accordion className={styles.Accordion}>
            <Panel header="1. Select Worksheet" key="1">
                <SelectWorksheet />
            </Panel>

            <Panel header="2. Select Columns" key="2">
            </Panel>

            <Panel header="3. Export Data" key="3">
                <Footer />
            </Panel>

        </Collapse>

    </div>
)

export default Layout