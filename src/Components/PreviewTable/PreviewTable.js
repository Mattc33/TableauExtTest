import React from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'

const PreviewTable = (props) => (
    <ReactTable
        data={props.data}
        columns={props.columns}
    />
)

export default PreviewTable
