export function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export function concatDataByDate(data){   
    
    if (typeof data[0] !== 'undefined' && typeof data[0]['day'] !== 'undefined'){
        
        console.log("ok");

        const result = data.reduce((a, b, c ,d) => {
          
            // if(a.day == b.day){
            //     return { impressions: a.impressions }
            // }
            return null;
        });
        
        console.log(result);         
    }

    return data;
};
