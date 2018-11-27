import React from 'react'
import styles from './Layout.module.sass'

import Header from './Header/Header'
import LocalConfig from './LocalConfig/LocalConfig'
import Footer from './Footer/Footer'

const Layout = () => (
    <div className={styles.LayoutContainer}>
        <Header />
        <LocalConfig />
        <Footer />
    </div>
)

export default Layout