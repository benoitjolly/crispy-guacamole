
import {cloneDeep} from 'lodash';

const statsDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACQUISITION_DATA':
        const data = action.data;
            return data;
        case 'SET_VISIBILITY':
        let arrayOfKey = ['application', 'country', 'platform', ];
        if(state[0].hasOwnProperty('application')){
            arrayOfKey = ['application', 'country', 'platform', ];
        } else if(state[0].hasOwnProperty('country')){
            arrayOfKey = ['country', 'platform', 'application', ];
        } else if(state[0].hasOwnProperty('platform')){
            arrayOfKey = ['platform', 'application', 'country', ];
        }

        const node = action.data;
        if(node.length === 1){
            state[node[0]].open = !state[node[0]].open;
            state = cloneDeep(state);
            return state;
        } else if(node.length === 2){
            state[node[0]][arrayOfKey[0]][node[1]].open = !state[node[0]][arrayOfKey[0]][node[1]].open;
            state = cloneDeep(state);
            return state;
        }
        else if(node.length === 3){
            state[node[0]][arrayOfKey[0]][node[1]][arrayOfKey[1]][node[2]].open = !state[node[0]][arrayOfKey[0]][node[1]][arrayOfKey[1]][node[2]].open;
            state = cloneDeep(state);
            return state;
        }
        break;
        default:
            return state;
    }
}

export default statsDataReducer;