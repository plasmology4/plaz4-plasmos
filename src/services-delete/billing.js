import axios from 'axios';
import {BASE_URL} from './config';

function getBillingData() {
  console.log("BASE_URL: "+BASE_URL);
  const url = `${BASE_URL}/iqms/inventory/0000020050/vmi-snapshot`;
  return axios.get(url).then(response => response.data);
}

function getCelebrityData() {

  const url = `${BASE_URL}/api/jokes/celebrity`;
  return axios.get(url).then(response => response.data);
}

export {getBillingData, getCelebrityData};