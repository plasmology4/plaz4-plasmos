import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsersApi, deleteUserApi, addingUser, applyFilter } from '../../actions/admin'

class AdminUsers extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isBusy: false, hasErrored: false, message: '', users:[] };
    this.newUserClicked = this.newUserClicked.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.props));
    this.props.getUsers(this.props.session); 
  }

  newUserClicked(event) {
    console.log('Add User: ' + this.state);
    this.props.history.push('/admin/users/new');
    event.preventDefault();
  }

  deleteUserClicked(event) {
    console.log("deleteUserClicked: "+JSON.stringify(this.props.user));
    this.props.deleteUser(this.props.session, this.props.user)
    event.preventDefault()
  }

  render() {

    const listUsers = this.props.users.map((user, i) =>
      <tr key={i}>
        <td >{user.id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.orgId}</td>
        <td>{user.status}</td>
        <td>{user.status}</td>
        <td>
          <Link to={`/admin/users/${user._id}`}><i className="material-icons">mode_edit</i></Link>
          <button type="button" className="link-style-button" onClick={this.deleteUserClicked}><i className="material-icons">delete</i></button></td>
      </tr>
    );

    return (
      
      <div>

        <div className="row align-center">
          <h1 className="main-heading">User Administration</h1>
        </div>
        
        
        
        <div className="row">

          <div className="small-12 medium-3 large-2 columns">
            <button type="button" className="button" onClick={this.newUserClicked}>New User</button>
          </div>
          <div className="small-12 medium-6 large-7 columns">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th width="200">User ID</th>
                    <th>Firstname</th>
                    <th width="150">Lastname</th>
                    <th width="150">Company</th>
                    <th width="50">Admin</th>
                    <th width="50">Active</th>
                    <th width="50">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
    users: state.users,
    addingUser: state.addingUser,
    editingUser: state.editingUser,
    hasErrored: state.hasErrored,
    isBusy: state.isBusy
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
    addUser: () => dispatch(addingUser()), 
    deleteUser: (session, id) => dispatch(deleteUserApi(session, id)), 
    getUsers: (session) => dispatch(getUsersApi(session)), 
    filter: (filter) => dispatch(applyFilter())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
