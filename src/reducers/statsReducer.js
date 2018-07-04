
const statsReducer = (state = {kpi:[{value:'day',label:'Day'},{value:'impressions',label:'Impressions'}], startDate:'2017-08-01', endDate:'2017-08-02', columns:[]}, action) => {
    switch (action.type) {
        case 'SET_KPI':
            return {...state,kpi: action.kpiValue};
        case 'SET_STARTDATE':
            return {...state,startDate: action.startDate};
        case 'SET_ENDDATE':
            return {...state,endDate: action.endDate};
        default:
            return state
    }
}

export default statsReducer;