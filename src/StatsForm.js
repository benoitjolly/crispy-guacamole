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
        this.staticData = staticData.data;
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
        // this.getMonetizationData(e);
    }

    onClick = (a,b,c) => {
      console.log("ok");
      // this.props.dispatch({type: 'SET_VISIBILITY', data: data})
      if(a){
        this.props.statsData[a].platform[b].open = !this.props.statsData[a].platform[b].open;
      }

    }

    createTable = (data) => {
        let table = []
      
        for (let a in data) {

          for (let b in data[a].platform) {

            for (let c in data[a].platform[b].application) {
              if(data[a].platform[b].open){
                table.unshift(<tr key={`${a}${b}${c}`}><td className="sub"> {`${data[a].platform[b].application[c].name}`}</td><td className="total">{`Total ${b}`}</td></tr>);
              }
  
            }
            table.unshift((<tr key={`${a}${b}`} onClick={this.onClick(a,b)} ><td className="sub"> {`${data[a].platform[b].name}`}</td><td className="total">{`Total ${b}`}</td></tr>));

          }
          table.unshift(<tr key={`${a}`}><td className="sub"> {`${data[a].name}`}</td><td className="total">{`Total ${a}`}</td></tr>);

            // const b = Object.keys(data[a[i]]);
            // console.log(b);
            
            // for (let j = 0; j < b.length; j++) {

            //   const c = Object.keys(data[a[i]][b[j]]);
            //   console.log(c);

            //   for (let k = 0; k < c.length; j++) {
            //     const app = c[k].toString();
            //     console.log(app);
            //     const d = Object.keys(data[a[i]][b[j]].app);
            //     console.log(c);
            //     // for (let j = 0; j < c.length; j++) {
            //     // children.push(<tr><td>{`${a[i]}`}</td><td key={`${i}${j}`}>{`Column ${j + 1}`}</td></tr>)
            //     // }
            //     table.unshift(<tr key={`${i}${j}${k}`}><td  className="sub3">{`${c[k]}`}</td><td className="total" >{`Total ${j}`}</td></tr>);
            //   }
            //   table.unshift(<tr key={`${i}${j}`}><td  className="sub2">{`${b[j]}`}</td><td className="total" >{`Total ${j}`}</td></tr>);
            // }
            // table.unshift(<tr key={`${i}`}><td className="sub"> {`${a[i]}`}</td><td className="total">{`Total ${i}`}</td></tr>);
        }

        return table
    }

    render() {
        // const kpiValue = this.props.stats.kpi;
        const startDate = moment(this.props.stats.startDate);
        const endDate = moment(this.props.stats.endDate);
        // const defaultKpiValues = this.defaultKpiValues;
        const stat = /*this.staticData*/this.props.statsData;
        console.log(stat);
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
                                {this.createTable(stat)}
                                                              
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