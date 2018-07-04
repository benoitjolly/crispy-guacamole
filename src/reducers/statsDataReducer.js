
const statsDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACQUISITION_DATA':
        const data = action.data;
            return data;
        default:
            return state;
    }
}

export default statsDataReducer;