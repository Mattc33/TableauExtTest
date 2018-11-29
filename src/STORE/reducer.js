const initialState = {
    multiDataSet: [],
    sheetName: '',
    userConfig: {
        userSelectedColumns: [],
        bold: 
            {
                // headers: [
                //     {'headerIndex': 0, 'value': false},
                //     {'headerIndex': 1, 'value': false}
                // ],
                // columns: [
                //     {'columnIndex': 0, 'value': false},
                //     {'columnIndex': 1, 'value': false}
                // ],
                // totalRow: false
            },
        backgroundColor: 
            {                
                // headers: [
                // {'headerIndex': 0, 'value': false, 'hex': '000000'},
                // {'headerIndex': 1, 'value': false, 'hex': '000000'}
                // ],
                // columns: [
                //     {'columnIndex': 0, 'value': false, 'hex': '000000'},
                //     {'columnIndex': 1, 'value': false, 'hex': '000000'}
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
                ...state,
                multiDataSet: state.multiDataSet.concat({
                    columns: action.colVals,
                    data: action.rowVals
                })
            }
        case 'SELECT_SHEET':
            return {
                ...state,
                sheetName: action.value
            }
        case 'SET_SELECTED_COLUMNS':
            return {
                ...state,
                userConfig: {
                    ...state.userConfig,
                    userSelectedColumns: action.value
                }
            }
        default :
            break
    }

    return newState
}

export default reducer
