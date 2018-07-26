import staticData from './static.js';
import _ from 'lodash';
export function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export function concatDataByApplication(data){
    if (typeof data[0] !== 'undefined'){

    }
}

export function concatDataByCountry(data){   
    
    if (typeof data[0] !== 'undefined'){
      let curr = {};
      let dataMerged;
      dataMerged = _.groupBy(data, 'country');
     
      Object.keys(dataMerged).forEach((element, index) => {
        dataMerged[element] =  _.groupBy(dataMerged[element], 'platform');
      });

      Object.keys(dataMerged).forEach((parent, index) => {
        Object.keys(dataMerged[parent]).forEach((enfant, index) => {
          dataMerged[parent][enfant] =  _.groupBy(dataMerged[parent][enfant], 'application');
        });
      });

      Object.keys(dataMerged).forEach((parent, index) => {
        Object.keys(dataMerged[parent]).forEach((enfant, index) => {
          Object.keys(dataMerged[parent][enfant]).forEach((sousEnfant, index) => {
            const obj = {impressions: 0, clicks:0, ctr:0, cost:0,};
            dataMerged[parent][enfant][sousEnfant] = dataMerged[parent][enfant][sousEnfant].reduce(function(a,b){
              obj.impressions += b.impressions;
              obj.clicks += b.clicks;
              obj.cost += b.cost;
              return obj;
            });
            dataMerged[parent][enfant][sousEnfant].ctr = dataMerged[parent][enfant][sousEnfant].impressions / dataMerged[parent][enfant][sousEnfant].clicks;
          });
        });
      });
      console.log(dataMerged);
      return dataMerged;    
    }

    return data;
};
