const initialState = {
    multiDataSet: [],
    sheetName: '',
    userConfig: {
        userSelectedColumns: [],
        bold: 
            {
                headers: [],
                columns: [],
                totalRow: false
            },
        backgroundColor: 
            {                
                // headers: [
                // {'id': 0, 'value': false, 'hex': '000000'},
                // {'id': 1, 'value': false, 'hex': '000000'}
                // ],
                // columns: [
                //     {'id': 0, 'value': false, 'hex': '000000'},
                //     {'id': 1, 'value': false, 'hex': '000000'}
                // ],
                // totalRow: {'value': false, 'hex': '000000'}
            }
    }
}

const reducer = (state = initialState, action) => {
    const newState = {...state}

    switch(action.type) {
        case 'UPDATE_DATA_SET':
            return {
                ...newState,
                multiDataSet: newState.multiDataSet.concat({
                    columns: action.colVals,
                    data: action.rowVals
                })
            }
        case 'SELECT_SHEET':
            return {
                ...newState,
                sheetName: action.value
            }
        case 'SET_SELECTED_COLUMNS':
            return {
                ...newState,
                userConfig: {
                    ...newState.userConfig,
                    userSelectedColumns: action.value
                }
            }
        case 'SET_HEADERS_BOLD':
            return {
                ...newState,
                userConfig: {
                    ...newState.userConfig,
                    bold: {
                        ...newState.userConfig.bold,
                        headers: action.value
                    }
                }
            }
        case 'SET_COLUMNS_BOLD':
            return {
                ...newState,
                userConfig: {
                    ...newState.userConfig,
                    bold: {
                        ...newState.userConfig.bold,
                        columns: action.value
                    }
                }
            }
        default :
            break
    }

    return newState
}

export default reducer
