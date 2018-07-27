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
      // dataMerged = _.groupBy(data, 'country').pairs().map(function (currentItem) {
      //     return _.object(_.zip(["country", "OS"], currentItem));
      // }).value();

      dataMerged =  _(data)
            .groupBy(x => x.country)
            .map((value, key) => ({name: key, platform: value, open:false}))
            .value();

      dataMerged.forEach((element) => {
        element.platform =  _(element.platform)
        .groupBy(x => x.platform)
        .map((value, key) => ({name: key, application: value, open: false}))
        .value();  
      });

      console.log(dataMerged);


      dataMerged.forEach((element) => {
        element.platform.forEach((child) => {
          child.application =  _(child.application)
          .groupBy(x => x.application)
          .map((value, key) => ({name: key, kpi: value}))
          .value();  
        });
      });


      console.log(dataMerged);
     
      // Object.keys(dataMerged).forEach((element, index) => {
      //   dataMerged[element] =  _.groupBy(dataMerged[element], 'platform');
      // });

      // Object.keys(dataMerged).forEach((parent, index) => {
      //   Object.keys(dataMerged[parent]).forEach((enfant, index) => {
      //     dataMerged[parent][enfant] =  _.groupBy(dataMerged[parent][enfant], 'application');
      //   });
      // });

      // Object.keys(dataMerged).forEach((parent, index) => {
      //   Object.keys(dataMerged[parent]).forEach((enfant, index) => {
      //     Object.keys(dataMerged[parent][enfant]).forEach((sousEnfant, index) => {
      //       const obj = {impressions: 0, clicks:0, ctr:0, cost:0,};
      //       console.log(Object.assign({},dataMerged));
      //       dataMerged[parent][enfant][sousEnfant.replace(/\s/g, '_')] = dataMerged[parent][enfant][sousEnfant].reduce(function(a,b){
      //         obj.impressions += b.impressions;
      //         obj.clicks += b.clicks;
      //         obj.cost += b.cost;
      //         return obj;
      //       });
      //       console.log(dataMerged);
      //       delete dataMerged[parent][enfant][sousEnfant];
      //       console.log(dataMerged);

      //       dataMerged[parent][enfant][sousEnfant].ctr = dataMerged[parent][enfant][sousEnfant].impressions / dataMerged[parent][enfant][sousEnfant].clicks;
      //     });
      //   });
      // });
      console.log(dataMerged);
      return dataMerged;    
    }

    return data;
};
