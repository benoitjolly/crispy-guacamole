import React, { Component } from 'react';
import _ from 'lodash';

class TableComponent extends Component {
       
    dynamiqueTable = () => {

        if( this.props.data.length === 0) return(<div>no data</div>);
        

        let arrayOfKey = ['application', 'country', 'platform', ];
        
        if(this.props.data[0].hasOwnProperty('country')){
            arrayOfKey = ['country', 'platform', 'application', ];
        } else if(this.props.data[0].hasOwnProperty('platform')){
            arrayOfKey = ['platform', 'application', 'country', ];
        } else if(this.props.data[0].hasOwnProperty('application')){
            arrayOfKey = ['application', 'country', 'platform', ];
        }


        const data = this.props.data;
        let table = []
        let total = 0;
        for (let a in data) {
            let totalSub1 = 0;
            for (let b in data[a][arrayOfKey[0]]) {
                let totalSub2 = 0;
                for (let c in data[a][arrayOfKey[0]][b][arrayOfKey[1]]) {
                    let totalTotalSub3 = 0;
                    const obj = {
                        impressions: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'impressions'),
                        clicks: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'clicks'),
                        cost: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'cost'),
                    }
                    total += obj.cost;
                    totalSub1 += obj.cost;
                    totalSub2 += obj.cost;
                    totalTotalSub3 += obj.cost;

                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}imp`} ><td colspan="2" className="sub4"> Impressions: {`${obj.impressions.toFixed(2)}`}</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}click`} ><td colspan="2" className="sub4"> Clicks: {`${obj.clicks.toFixed(2)}`}</td><td>...</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}cost`} ><td colspan="2" className="sub4"> CTR: {`${(obj.impressions/obj.clicks).toFixed(2)}`}</td><td>...</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && <tr className="over" key={`${a}${b}${c}`} onClick={() => this.props.onClick([a,b,c])}><td className="sub3"> {`${data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].name}`}</td><td className="total">{`${-totalTotalSub3.toFixed(2)}`}</td><td>...</td><td>...</td></tr>);  
                }
                table.unshift(data[a].open && <tr className="over" key={`${a}${b}`} onClick={() => this.props.onClick([a,b])} ><td className="sub2"> {`${data[a][arrayOfKey[0]][b].name}`}</td><td className="total">{-totalSub2.toFixed(2)}</td><td>...</td><td>...</td></tr>);
             }
             table.unshift(<tr className="over" key={`${a}`} onClick={() => this.props.onClick([a])}><td className="sub"> {`${data[a].name}`}</td><td className="total">{-totalSub1.toFixed(2)}</td><td>...</td><td>...</td></tr>);
        }
        table.unshift(<tr className="thead2" key={`totalCost`} ><td>Total</td><td className="total">{`${-total.toFixed(2)}`}</td><td>...</td><td>...</td></tr>);
        table.unshift(<tr className="thead" key={`thead`} ><td>Tree view</td><td>Total acquisition cost</td><td>Total monetization cost</td><td>Benefit</td></tr>);

        return table

    }
    
    render() {
        return this.props.data.length === 0 ? <div>no data</div> : (<table><tbody>{this.dynamiqueTable()}</tbody></table>);
    }
}

export default TableComponent;