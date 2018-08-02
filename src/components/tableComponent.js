import React, { Component } from 'react';
import _ from 'lodash';

class TableComponent extends Component {
       
    dynamiqueTable = () => {

        if( this.props.dataAcq.length === 0) return(<div>no data</div>);
        

        let arrayOfKey = ['application', 'country', 'platform', ];
        let arrayOfKeyM = ['game', 'country', 'os', ];
        
        if(this.props.dataAcq[0].hasOwnProperty('country')){
          arrayOfKey = ['country', 'platform', 'application', ];
          arrayOfKeyM = ['country', 'os', 'game', ];
        } else if(this.props.dataAcq[0].hasOwnProperty('platform')){
          arrayOfKey = ['platform', 'application', 'country', ];
          arrayOfKeyM = ['os', 'game', 'country', ];
        } else if(this.props.dataAcq[0].hasOwnProperty('application')){
          arrayOfKey = ['application', 'country', 'platform', ];
          arrayOfKeyM = ['game', 'country', 'os', ];
        }


        const data = this.props.dataAcq;
        const dataM = this.props.dataMo;
        console.log(data);
        console.log(dataM);
        console.log(arrayOfKey);
        console.log(arrayOfKeyM);
        let table = []
        let total = 0;
        let totalRevenue = 0;
        for (let a in data) {
            let totalSub1 = 0;
            for (let b in data[a][arrayOfKey[0]]) {
                let totalSub2 = 0;
                for (let c in data[a][arrayOfKey[0]][b][arrayOfKey[1]]) {
                    let totalTotalSub3 = 0;
                    const objAcq = {
                        impressions: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'impressions'),
                        clicks: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'clicks'),
                        cost: _.sumBy(data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].kpi, 'cost'),
                    }
                 
                    // console.log(arrayOfKeyM);
                    // console.log(dataM[a][arrayOfKeyM[0]][b][arrayOfKeyM[1]][c].kpi);
                    // const objMo = {
                    //     revenue: _.sumBy(dataM[a][arrayOfKeyM[0]][b][arrayOfKeyM[1]][c].kpi, 'revenue'),
                    //     views: _.sumBy(dataM[a][arrayOfKeyM[0]][b][arrayOfKeyM[1]][c].kpi, 'views'),
                    // };

                    total += objAcq.cost;
                    totalSub1 += objAcq.cost;
                    totalSub2 += objAcq.cost;
                    totalTotalSub3 += objAcq.cost;

                    // totalRevenue += objMo.revenue;

                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}imp`} ><td colspan="2" className="sub4"> Impressions: {`${objAcq.impressions.toFixed(2)}`}</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}click`} ><td colspan="2" className="sub4"> Clicks: {`${objAcq.clicks.toFixed(2)}`}</td><td>...</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].open && <tr key={`${a}${b}${c}cost`} ><td colspan="2" className="sub4"> CTR: {`${(objAcq.impressions/objAcq.clicks).toFixed(2)}`}</td><td>...</td><td>...</td></tr>);
                    table.unshift(data[a].open && data[a][arrayOfKey[0]][b].open && <tr className="over" key={`${a}${b}${c}`} onClick={() => this.props.onClick([a,b,c])}><td className="sub3"> {`${data[a][arrayOfKey[0]][b][arrayOfKey[1]][c].name}`}</td><td className="total">{`${-totalTotalSub3.toFixed(2)}`}</td><td>...</td><td>...</td></tr>);  
                }
                table.unshift(data[a].open && <tr className="over" key={`${a}${b}`} onClick={() => this.props.onClick([a,b])} ><td className="sub2"> {`${data[a][arrayOfKey[0]][b].name}`}</td><td className="total">{-totalSub2.toFixed(2)}</td><td>...</td><td>...</td></tr>);
             }
             table.unshift(<tr className="over" key={`${a}`} onClick={() => this.props.onClick([a])}><td className="sub"> {`${data[a].name}`}</td><td className="total">{-totalSub1.toFixed(2)}</td><td>...</td><td>...</td></tr>);
        }
        table.unshift(<tr className="thead2" key={`total`}><td>Total</td><td className="total">{`${-total.toFixed(2)}`}</td><td>{totalRevenue.toFixed(2)}</td><td>{(totalRevenue-total).toFixed(2)}</td></tr>);
        table.unshift(<tr className="thead" key={`thead`} ><td>Tree view</td><td>Total acquisition cost</td><td>Total monetization cost</td><td>Benefit</td></tr>);

        return table

    }
    
    render() {
        return this.props.dataAcq.length === 0 ? <div>no data</div> : (<table><tbody>{this.dynamiqueTable()}</tbody></table>);
    }
}

export default TableComponent;