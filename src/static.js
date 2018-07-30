const staticData = {
    AcquisitionAPIKey: '31I4HHdML8AH30OQCqbuRswzFcvhigvs3f15UQqc6VuOnTNzKYJosB43I5vE2o2SmwNYhh7oCS5X1XUJjhDzlnX9RugHJ',
    MonetizationAPIKey: 'Bearer mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE',
    // AcquisitionURL: 'http://localhost:5000/acquisition',
    AcquisitionURL: 'http://mock-api.voodoo.io/acquisition',
    // MonetizationURL: 'http://localhost:5000/monetization',
    MonetizationURL:'http://mock-api.voodoo.io/monetization',
    kpiValue: [{value:'day',label:'Day'},{value:'impressions',label:'Impressions'},{value:'clicks',label:'Clicks'},{value:'ctr',label:'Ctr'},{value:'cost',label:'Cost'},{value:'country',label:'Country'},{value:'ad_type',label:'Ad type'},{value:'platform',label:'Platform'},{value:'application',label:'Application'},{value:'package_name',label:'Package name'}],
    defaultKpiValues: [{value:'impressions',label:'Impressions'},{value:'clicks',label:'Clicks'},{value:'ctr',label:'Ctr'},{value:'cost',label:'Cost'},{value:'country',label:'Country'},{value:'application',label:'Application'},{value:'platform',label:'Platform'}],
    MonetizationDimensionsion: [
        {value:'date',label:'Date'},
        {value:'country',label:'Country'},
        {value:'format',label:'Format'},
        {value:'game',label:'Game'},
        {value:'placement',label:'Placement'},
    ],
    MonetizationAggregates: [
        {value:'views',label:'Views'},
        {value:'conversions',label:'Conversions'},
        {value:'revenue',label:'Revenue'},
    ],
    keyArray: [{value: 'application', label: 'Application'},{value: 'platform', label: 'Platform'},{value: 'country', label: 'Country'}, ],
}

export default staticData;