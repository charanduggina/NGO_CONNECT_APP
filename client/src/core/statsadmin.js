
import Layout from './Layout';

/* App.js */

import { LineChart, Line } from 'recharts';
var React = require('react');
 

const statsadmin = ({ history }) => {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];
   
   
    return (
        <Layout>
           <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
        </Layout>
    );
};

export default statsadmin;