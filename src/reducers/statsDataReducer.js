
import {cloneDeep} from 'lodash';

const statsDataReducer = (state = {acquisition : [], monetization: []}, action) => {
    switch (action.type) {
        case 'SET_DATA':
        const data = cloneDeep(action.data);
            return data;
        case 'SET_VISIBILITY':
        let arrayOfKey = ['application', 'country', 'platform', ];
        if(state.acquisition[0].hasOwnProperty('application')){
            arrayOfKey = ['application', 'country', 'platform', ];
        } else if(state.acquisition[0].hasOwnProperty('country')){
            arrayOfKey = ['country', 'platform', 'application', ];
        } else if(state.acquisition[0].hasOwnProperty('platform')){
            arrayOfKey = ['platform', 'application', 'country', ];
        }

        const node = action.data;
        if(node.length === 1){
            state.acquisition[node[0]].open = !state.acquisition[node[0]].open;
            state = cloneDeep(state);
            return state;
        } else if(node.length === 2){
            state.acquisition[node[0]][arrayOfKey[0]][node[1]].open = !state.acquisition[node[0]][arrayOfKey[0]][node[1]].open;
            state = cloneDeep(state);
            return state;
        }
        else if(node.length === 3){
            state.acquisition[node[0]][arrayOfKey[0]][node[1]][arrayOfKey[1]][node[2]].open = !state.acquisition[node[0]][arrayOfKey[0]][node[1]][arrayOfKey[1]][node[2]].open;
            state = cloneDeep(state);
            return state;
        }
        break;
        default:
            return state;
    }
}

export default statsDataReducer;