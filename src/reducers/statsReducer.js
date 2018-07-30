
const statsReducer = (state = {key: 'application', kpi:[{value:'day',label:'Day'},{value:'impressions',label:'Impressions'}], startDate:'2017-08-05', endDate:'2017-08-11', columns:[]}, action) => {
    switch (action.type) {
        case 'SET_KPI':
            return {...state,kpi: action.kpiValue};
        case 'SET_STARTDATE':
            return {...state,startDate: action.startDate};
        case 'SET_ENDDATE':
            return {...state,endDate: action.endDate};
        case 'SET_KEY':
            return { ...state, key: action.key.value}
        case 'SET_ORIGINAL_DATA':
            return { ...state, originalData: action.data}
        default:
            return state
    }
}

export default statsReducer;