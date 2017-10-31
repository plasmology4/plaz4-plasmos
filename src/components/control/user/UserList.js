import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const UserList = props => {

  return (
    <section className="">
      <div className="grid-x grid-padding-x">
        <div className="small-12 medium-12 large-12 cell">
          <ReactTable
            data={props.users}
            columns={[
              {
                Header: "User Info",
                columns: [
                  {
                    Header: "First Name",
                    accessor: "firstname"
                  },
                  {
                    Header: "Last Name",
                    accessor: "lastname"
                  },
                  {
                    Header: "User ID",
                    accessor: "id"
                  },
                  {
                    Header: "Org ID",
                    accessor: "orgId"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "",
                    accessor: "_id",  
                    Cell: row => (
                      <div style={{ width: '100%', height: '100%', }}>
                        <a className="button tiny p4-grid-button right" onClick={() => props.deleteUser(row.original)}><i className="material-icons p4-grid-button-icon">delete</i></a>
                        <a className="button tiny p4-grid-button right" onClick={() => props.editUser(row.original)}><i className="material-icons p4-grid-button-icon">edit</i></a>
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;