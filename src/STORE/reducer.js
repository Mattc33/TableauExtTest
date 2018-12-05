const initialState = {
    multiDataSet: [],
    sheetName: '',
    userConfig: {
        userSelectedColumns: [],
        bold: 
            {
                headers: [],
                columns: [],
                totalRow: []
            },
        backgroundColor: 
            // {'id': 1, 'value': false, 'hex': '000000'}
            {                
                headers: [],
                columns: [],
                totalRow: []
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
        case 'SET_TOTALROW_BOLD':
            return {
                ...newState,
                userConfig: {
                    ...newState.userConfig,
                    bold: {
                        ...newState.userConfig.bold,
                        totalRow: action.value
                    }
                }
            }
        default :
            break
    }

    return newState
}

export default reducer
