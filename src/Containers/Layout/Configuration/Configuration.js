import React, { Component } from 'react'
import styles from './Configuration.module.sass'
import { Tabs, Radio } from 'antd'
import { connect } from 'react-redux'

import Bold from '../../../Components/Configuration/Bold/Bold'

const TabPane = Tabs.TabPane

class Configuration extends Component {

    // componentDidUpdate() {
    //     console.log('Configuration', this.props.userConfig)
    // }

    render() {
        return this.props.multiDataSet.length > 0
        ?
            (
                <div className={styles.ConfigurationContainer}>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition="left"
                        style={{ height: 'auto' }}
                    >
                        {/* If this gets any larger, use an obj with map */}
                        <TabPane tab="Bold" key="1">
                            <Bold tabTitle="Bold" />
                        </TabPane>
                        <TabPane tab="Background Color" key="2">
                            <Bold tabTitle="Background Color" />
                        </TabPane>
                    </Tabs>
                </div>
            )
        :
            <div>Please select atleast one column</div>
    }
}

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig,
        multiDataSet: state.multiDataSet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration)