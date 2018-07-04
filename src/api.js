import axios from 'axios';
import staticData from './static';

const myApi = axios.create();


const apiCall = (route, data) => {
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