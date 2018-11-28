const initialState = {
    multiDataSet: []
}

const reducer = (state = initialState, action) => {
    const newState = {...state}

    if (action.type === 'UPDATE_DATA_SET') {
        return {
            ...state,
            multiDataSet: state.multiDataSet.concat({
                columns: action.colVals,
                data: action.rowVals
            })
        }
    }

    return newState
}

export default reducer

/*

const multiDataSet = [
    {
        columns: ["Name", "Salary", "Sex"],
        data: [
            ["Johnson", 30000, "Male"],
            ["Monika", 355000, "Female"],
            ["Konstantina", 20000, "Female"],
            ["John", 250000, "Male"],
            ["Josef", 450500, "Male"],
        ]
    },
    {
        xSteps: 1, // Will start putting cell with 1 empty cell on left most
        ySteps: 5, //will put space of 5 rows,
        columns: ["Name", "Department"],
        data: [
            ["Johnson", "Finance"],
            ["Monika", "IT"],
            ["Konstantina", "IT Billing"],
            ["John", "HR"],
            ["Josef", "Testing"],
        ]
    }
];

*/