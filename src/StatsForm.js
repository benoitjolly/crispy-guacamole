import React, { Component } from 'react';
import { connect } from 'react-redux';

import { concatDataByKey } from './utils';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import apiCall from './api';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import staticData from './static.js';
import TableComponent from './components/tableComponent';

class StatsForm extends Component {

    constructor(props) {
        super(props);
        this.defaultKpiValues = staticData.defaultKpiValues;
        this.MonetizationAggregate = staticData.MonetizationAggregates;
        this.MonetizationDimensions = staticData.MonetizationDimensionsion;
        this.staticData = staticData.data;
        this.keyArray = staticData.keyArray;

    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'LOADING_FALSE' });
        var event = new Event('auto');
        this.getData(event);
    }

    handleChangeKpi = (kpiValue) => {
        this.props.dispatch({ type: 'SET_KPI', kpiValue});
    }
    handleChangeStartDate = (startDateValue) => {
        const startDate = moment(startDateValue).format('YYYY-MM-DD');
        this.props.dispatch({type: 'SET_STARTDATE', startDate});
    }
    handleChangeEndDate = (endDateValue) => {
        const endDate = moment(endDateValue).format('YYYY-MM-DD');
        this.props.dispatch({type: 'SET_ENDDATE', endDate});
    }

    handleChangeKey = (key) => {
        this.props.dispatch({type: 'SET_KEY', key});
        setTimeout(() => {
            const acquisition = concatDataByKey(this.props.stats.originalData, this.props.stats.key);
            const monetization = concatDataByKey(staticData.apiMonetization.data, this.props.stats.key);
            const newData = {
              acquisition : acquisition,
              monetization : monetization,
            };
            this.props.dispatch({type: 'SET_DATA', data: newData});
        },0)
    }

    getAcquisitionData = (e) => {
        e.preventDefault();

        const columns = this.defaultKpiValues.map((kpi) => {
            return kpi.value;
        }).toString();
        const data = {
            startDate: this.props.stats.startDate,
            endDate: this.props.stats.endDate,
            columns,
        }
        this.props.dispatch({ type: 'LOADING_TRUE' });
    
        apiCall(staticData.AcquisitionURL, data, false)
        .then((response) => {
            this.props.dispatch({ type: 'SET_ORIGINAL_DATA' , data: response.data.data});
            const monetization = concatDataByKey(staticData.apiMonetization.data, this.props.stats.key);
            const acquisition = concatDataByKey(response.data.data, this.props.stats.key);

            const newData = {
              acquisition : acquisition,
              monetization : monetization,
            };
            this.props.dispatch({type: 'SET_DATA', data: newData});
            this.props.dispatch({ type: 'LOADING_FALSE' });
            this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        }).catch((error) => {
            this.props.dispatch({ type: 'LOADING_FALSE' });
            this.props.dispatch({ type: 'ERROR_RECEIVED' }, error.message);
        });  
    }

    getMonetizationData = (e) => {
        e.preventDefault();

        const aggregates = this.MonetizationAggregate.map((kpi) => {
            return kpi.value;
        }).toString();
        const dimensions = this.MonetizationDimensions.map((kpi) => {
            return kpi.value;
        }).toString();
        const data = {
            startDate: this.props.stats.startDate,
            endDate: this.props.stats.endDate,
            dimensions: dimensions,
            aggregates: aggregates,
        }
        this.props.dispatch({ type: 'LOADING_TRUE' });
     
        // apiCall(staticData.MonetizationURL, data, true)
        // .then((response) => {
            const cleanedData = concatDataByKey(staticData.apiMonetization.data,'application');
            // console.log(cleanedData);
            // this.props.dispatch({type: 'SET_MONETIZATION_DATA', data: cleanedData})
            // this.props.dispatch({ type: 'LOADING_FALSE' });
            // this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        // }).catch((error) => {
        //     this.props.dispatch({ type: 'LOADING_FALSE' });
        //     this.props.dispatch({ type: 'ERROR_RECEIVED' }, error.message);
        // });  
    }

    getData = (e) => {
        e.preventDefault();
        this.getAcquisitionData(e);
        // this.getMonetizationData(e);
    }

    setVisibility = (node) => {
        this.props.dispatch({type: 'SET_VISIBILITY', data: node})
    }

    render() {
        const startDate = moment(this.props.stats.startDate);
        const endDate = moment(this.props.stats.endDate);
        return (
            
            <div className="container">
                <div className="post-container">
                <form onSubmit={this.getData}>
                    <div>
                    <label>Start Date:</label>
                    <DatePicker
                        className="Select"
                        selected={startDate}
                        onChange={this.handleChangeStartDate}
                        maxDate={endDate}
                    />
                    </div>
                    <div>
                    <label>End Date:</label>
                    <DatePicker
                        className="Select"
                        selected={endDate}
                        onChange={this.handleChangeEndDate}
                        minDate={startDate}
                    />
                    </div>
                     
                    <button>GO!</button>
                </form>
              </div>
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : <div className="post-container">
                    <Select
                        name="form-field-key"
                        value={this.props.stats.key}
                        onChange={this.handleChangeKey}
                        options={this.keyArray}
                        isSearchable={true}
                        isClearable={true}
                        label="Select Sorting:"
                    />
                    <div className="table">
                        <TableComponent dataAcq={this.props.statsData.acquisition} dataMo={this.props.statsData.monetization} onClick={this.setVisibility}/>
                    </div>             
                </div>}
            
            {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    stats: state.stats,
    errors: state.errors,
    loading: state.loading,
    statsData: state.statsData,
    statsMonetizationData: state.statsMonetizationData,
})

export default connect(mapStateToProps)(StatsForm);