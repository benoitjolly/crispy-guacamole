export function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export function concatDataByDate(data){   
    
    if (typeof data[0] !== 'undefined' && typeof data[0]['day'] !== 'undefined'){
        
        console.log("ok");
        let curr = {};
        let dataMdrged = [];
        data.forEach(element => {
            if(curr.day === element.day){
                curr.impressions = curr.impressions + element.impressions;
                // Object.keys(curr).forEach(function(key,index) {
                //     if(key !== 'day' && typeof curr[key] === 'Number'){
                //         curr[key] = curr[key] + element[key];
                //     }
                //     // key: the name of the object key
                //     // index: the ordinal position of the key within the object 
                // });
            }else{
                curr = element;
                dataMdrged.push(curr);
            }
        });
        
        console.log(dataMdrged);     
        return dataMdrged;    
    }

    return data;
};
