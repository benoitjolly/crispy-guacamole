import staticData from './static.js';

export function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export function concatDataByDate(data){   
    
    if (typeof data[0] !== 'undefined' && typeof data[0]['day'] !== 'undefined'){
        let curr = {};
        let dataMdrged = [];
        data.forEach(element => {
            if(curr.day === element.day){
                curr.impressions = curr.impressions + element.impressions;
                for (let i = 0; i < staticData.kpiValue.length; i++) {
                  if(typeof curr[staticData.kpiValue[i].value] !== 'undefined' && typeof curr[staticData.kpiValue[i].value] === 'string' && curr[staticData.kpiValue[i].value].indexOf(element[staticData.kpiValue[i].value]) === -1){
                        curr[staticData.kpiValue[i].value] = curr[staticData.kpiValue[i].value].concat([`,${element[staticData.kpiValue[i].value]}`]);
                      }
                    }
            }else{
                curr = element;
                dataMdrged.push(curr);
            }
        });
        
        return dataMdrged;    
    }

    return data;
};
