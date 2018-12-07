import React, { Component } from 'react'
import { ChromePicker } from 'react-color'

class ColorPicker extends Component {

    shouldComponentUpdate() {
        return false
    }
    
    render() {
        return (
            <ChromePicker 
                onChangeComplete={this.props.onColorChangeComplete}
            />
        )
    }
}


export default ColorPicker