import React from 'react'
import styles from './HexColorSquare.module.sass'

const HexColorSquare = (props) => <div 
        className={styles.HexColorSquare}
        styles={{backgroundColor: `${props.backgroundColorHex}` }}
    >
    </div>
export default HexColorSquare