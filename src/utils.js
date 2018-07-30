// import staticData from './static.js';
import _ from 'lodash';
export function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export function concatDataByApplication(data){
    if (typeof data[0] !== 'undefined'){

    }
}

export function concatDataByKey(data, key){   
    
    let arrayOfKey = ['application', 'country', 'platform', ];

    if(key === 'application'){
        arrayOfKey = ['application', 'country', 'platform', ];
    } else  if(key === 'country'){
        arrayOfKey = ['country', 'platform', 'application', ];
    } else  if(key === 'platform'){
        arrayOfKey = ['platform', 'application', 'country', ];
    }

    if (typeof data[0] !== 'undefined'){
      let dataMerged;

      dataMerged =  _(data)
            .groupBy(x => x[arrayOfKey[0]])
            .map((value, key) => ({name: key, [arrayOfKey[1]]: _(value)
                .groupBy(x => x[arrayOfKey[1]])
                .map((value, key) => ({name: key, [arrayOfKey[2]]: _(value)
                    .groupBy(x => x[arrayOfKey[2]])
                    .map((value, key) => ({name: key, kpi: value, open: false}))
                    .value(), open: false}))
                .value(), open:false}))
            .value();

      console.log(dataMerged);
      return dataMerged;    
    }

    return data;
};
