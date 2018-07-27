import React, { Component } from 'react';
import { connect } from 'react-redux';

import { concatDataByCountry } from './utils';
// import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import apiCall from './api';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import staticData from './static.js';

class StatsForm extends Component {

    constructor(props) {
        super(props);
        this.defaultKpiValues = staticData.defaultKpiValues;
        this.MonetizationAggregate = staticData.MonetizationAggregates;
        this.MonetizationDimensions = staticData.MonetizationDimensionsion;
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
            const cleanedData = concatDataByCountry(response.data.data);
            this.props.dispatch({type: 'SET_ACQUISITION_DATA', data: cleanedData});
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
     
        apiCall(staticData.MonetizationURL, data, true)
        .then((response) => {
            const cleanedData = response.data.data;//concatDataByCountry(response.data.data);
            console.log(cleanedData);
            this.props.dispatch({type: 'SET_MONETIZATION_DATA', data: cleanedData})
            this.props.dispatch({ type: 'LOADING_FALSE' });
            this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        }).catch((error) => {
            this.props.dispatch({ type: 'LOADING_FALSE' });
            this.props.dispatch({ type: 'ERROR_RECEIVED' }, error.message);
        });  
    }

    getData = (e) => {
        e.preventDefault();
        this.getAcquisitionData(e);
        this.getMonetizationData(e);
    }

    createTable = (data) => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 5; j++) {
            children.push(<td key={`${i}${j}`}>{`Column ${j + 1}`}</td>)
            }
            //Create the parent and add the children
            table.push(<tr key={i}>{children}</tr>)
        }

        return table
    }

    render() {
        // const kpiValue = this.props.stats.kpi;
        const startDate = moment(this.props.stats.startDate);
        const endDate = moment(this.props.stats.endDate);
        // const defaultKpiValues = this.defaultKpiValues;
        const stat = this.props.statsData;

        const sub = ({ prop, index }) => (
            Object.keys(prop).map((el,index) => {
                return (
                    <tr key={index}>
                        <td>{el}</td>
                    </tr>
                );
            })
          );
        
        return (
            
            <div className="container">
                <div className="post-container">
                <form onSubmit={this.getData}>
                    <label>Start Date:</label>
                    <DatePicker
                        className="Select"
                        selected={startDate}
                        onChange={this.handleChangeStartDate}
                        maxDate={endDate}
                    />
                    <br />
                    <label>End Date:</label>
                    <DatePicker
                        className="Select"
                        selected={endDate}
                        onChange={this.handleChangeEndDate}
                        minDate={startDate}
                    />
                    <br />
                    {/*<label>Kpi:</label>
                     <Select
                        name="form-field-name"
                        value={kpiValue}
                        clearable
                        multi
                        onChange={this.handleChangeKpi}
                        options={defaultKpiValues}
                    /> */}
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
                    <div className="table">

                   
                        <table>                 
                            
                            <tbody>
                            {this.createTable()}
                                
                                    {
                                        Object.keys(stat).map((el,index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{el}</td>
                                                </tr>
                                            );
                                        })
                                     }
                               
                                
                                {/* {Object.keys(stat).map((data,i) => (
                                    <tr key={i}>
                                        {Object.keys(data).map((key, index) => (
                                            <td key={key}>{data[key]}</td>
                                        ))}
                                    </tr>
                                ))} */}
                            </tbody>
                        </table> 
                        {/* <table>                 
                            <tbody>
                                <tr>
                                    {stat.length > 0 ?  Object.keys(stat[0]).map((key, index) => (
                                            <td key={index}>{key}</td>
                                        )) : null }
                                </tr>
                                {stat.map((data,i) => (
                                    <tr key={i}>
                                        {Object.keys(data).map((key, index) => (
                                            <td key={key}>{data[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>    */}
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