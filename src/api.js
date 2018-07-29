import axios from 'axios';
import staticData from './static';

const myApi = axios.create();

const myApi2 = axios.create({
    // headers: {
    //     'Authorization': 'Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE'
    // },
});

const apiCall = (route, data, Bearer) => {
    if(Bearer){
        
         let params = {
            startDate: data.startDate,
            endDate: data.endDate,
            dimensions: data.dimensions,
            aggregates: data.aggregates,
        };

              
        const proxyOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:`Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE`,
                
            },
    
            params : {
              startDate: data.startDate,
              endDate: data.endDate,
              dimensions: data.dimensions,
              aggregates: data.aggregates,
          },
        };
      
        return myApi2.get(route, params).then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    // delete axios.defaults.headers.common['Content-Type'];
    
    return myApi.get(route, {
    params: {
        api_key: staticData.AcquisitionAPIKey,
        start: data.startDate,
        end: data.endDate,
        format: 'json',
        columns: data.columns,
    },
    });
}

export default apiCall;