import React from 'react';

const FinancialPeriod = (props) => {

  return (
    <div className='plaz4-tool-select'>
          
      <select className='plaz4-period-comp' id='year' name="year" value={props.financialPeriod.year} onChange={(e) => props.periodChange(e) }>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
      </select>
       <select className='plaz4-period-comp' id='period' name="period" value={props.financialPeriod.period} onChange={(e) => props.periodChange(e) }>
        <option value="1">Jan</option>
        <option value="2">Feb</option>
        <option value="3">Mar</option>
        <option value="4">Apr</option>
        <option value="5">May</option>
        <option value="6">Jun</option>
        <option value="7">Jul</option>
        <option value="8">Aug</option>
        <option value="9">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>

    </div>

  );

}

export default FinancialPeriod;