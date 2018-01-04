import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";


const poHeaders = (props) => [
    {
      Header: "Account Data",
      columns: [
        {
          Header: "Account Number",
          accessor: "acct"
        },
        {
          Header: "Orig Account",
          accessor: "fullAcct"
        },
        {
          Header: "Account Name",
          accessor: "acctDesc"
        },
        {
          Header: "Major Type",
          accessor: "majorType"
        },
        {
          Header: "Sub Type",
          accessor: "subType"
        },
        {
          Header: "GL Acct ID",
          accessor: "glaId"
        },
        {
          Header: "Sub Acct ID",
          accessor: "gsaId"
        },
        {
          Header: "Parent Sub Acct ID",
          accessor: "gsaParentId"
        },
        {
          Header: "",
          accessor: "_id",  
          Cell: row => (
            <div style={{ width: '100%', height: '100%', }}>
              <a className="button tiny p4-grid-button right" onClick={() => props.syncData(row.original)}><i className="material-icons p4-grid-button-icon">cloud_upload</i></a>
              <a className="button tiny p4-grid-button right" onClick={() => props.showSyncStatus(row.original)}><i className="material-icons p4-grid-button-icon">info</i></a>
            </div>
          )
        }
      ]
    }
  ];

const vendorHeaders = (props) => [
    {
      Header: "Account Type Data",
      columns: [
        {
          Header: "Descrip",
          accessor: "descrip"
        },
        {
          Header: "ID",
          accessor: "id"
        },
        {
          Header: "Parent ID",
          accessor: "parentId"
        },
        {
          Header: "",
          accessor: "_id",  
          Cell: row => (
            <div style={{ width: '100%', height: '100%', }}>
              <a className="button tiny p4-grid-button right" onClick={() => props.syncData(row.original)}><i className="material-icons p4-grid-button-icon">cloud_upload</i></a>
              <a className="button tiny p4-grid-button right" onClick={() => props.showSyncStatus(row.original)}><i className="material-icons p4-grid-button-icon">info</i></a>
            </div>
          )
        }
      ]
    }
  ];

const DataList = (props) => {

  var headers = null;
  if (props.dataType === 'coa') {
    headers = poHeaders(props);
  } else if (props.dataType === 'account-types') {
    headers = vendorHeaders(props);
  } else {
    headers = poHeaders(props);
  }

  return (
    <section className="">
      <div className="grid-x grid-padding-x">
        <div className="small-12 medium-12 large-12 cell data-table">
          <ReactTable
            data={props.items}
            columns={headers}
            defaultPageSize={100}
            className="-striped -highlight"
          />
        </div>
      </div>
    </section>
  );
};

export default DataList;