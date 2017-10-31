import axios from 'axios';
import { Observable } from 'rx-lite';
import { BASE_URL } from './config';

export function getNewsData() {
  console.log("BASE_URL: "+BASE_URL);
  const url = `${BASE_URL}/iqms/inventory/0000020050/vmi-snapshot`;

  const data = [
    { title: "Cold plasma: Get started with the Disc Jet", summary: "Interactive report that allows the user to view customer data, including inventory levels, orders, and consumption data.", source:"Science Daily", url:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", tags: ["ops", "inventory", "cust-svc"] },
    { title: "VMI Inventory", summary: "View On-hand inventory at VMI locations.", source:"", url:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", tags: ["ops", "inventory", "cust-svc"] },
    { title: "Customers Near Par", summary: "Report that highlights customers that are approaching restocking levels of consigned inventory.", source:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", url:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", tags: ["ops", "inventory", "cust-svc"] },
    { title: "Customer Sales by State", summary: "Report showing how sales are distributed in US states.", source:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", url:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", tags: ["sales"] },
    { title: "Network Status", summary: "Network Status", tags: ["it"] },
  ];

  return (dispatch) => {
    dispatch(isBusy(true))
    dispatch(newsList(data))
    dispatch(isBusy(false))
  };


  //return Observable.fromArray(data);
  //return axios.get(url).then(response => response.data);
}

export function getNewsApi(session) {
    
  console.debug("getNews: ");
  //const url = `${BASE_URL}/users`;

  //const body = { user: user};
  var config = { headers: contentHeaders };

  return (dispatch) => {
    dispatch(isBusy(true))
    axios.get(url, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        
        dispatch(userList(response.data))
        dispatch(isBusy(false))

        return response;
      })
      // .then((status) => {
      //   console.log("status: "+JSON.stringify(status));

      // })
      .catch(() => dispatch(hasErrored(true)));
  };
}