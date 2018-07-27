
const statsMonetizationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONETIZATION_DATA':
        const data = action.data;
            return data;
        default:
            return state;
    }
}

export default statsMonetizationReducer;