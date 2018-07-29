import axios from 'axios';
import staticData from './static';


const myApi = axios.create();

const apiCall = (route, data, Bearer) => {
    if(Bearer){
        
        //  let params = {
        //     startDate: data.startDate,
        //     endDate: data.endDate,
        //     dimensions: data.dimensions,
        //     aggregates: data.aggregates,
        // };

        // axios.defaults.headers.common['Authorization'] = `Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE`;
        // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        
        // axios.interceptors.request.use((request) => {
        //   if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        //       request.data = JSON.stringify(request.data);
        //   }
        //   return request;
        // });
        
        const proxyOptions = {
            // headers: {
                // Accept: 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Access-Control-Max-Age': 100000000,
                // 'Accept': 'text/plain',
                // 'Content-Type': 'text/plain',
                // Authorization:`Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE`,
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
            // },
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'},
            params : {
              startDate: data.startDate,
              endDate: data.endDate,
              dimensions: data.dimensions,
              aggregates: data.aggregates,
          },
           };
        //    console.log(params);
        return myApi.get(route, proxyOptions || {});
        // {
        //     headers: {
        //         Authorization:`Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE`,
        //         'Content-Type':'application/x-www-form-urlencoded',
        //     },
        //     params: {
        //         startDate: data.startDate,
        //         endDate: data.endDate,
        //         dimensions: data.dimensions,
        //         aggregates: data.aggregates,
        //     },
        // }
    // );
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