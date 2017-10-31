import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addNewUser, executeGetUsersRequest, executeSaveUserRequest, executeDeleteUserRequest } from '../../../actions/user'

import UserToolbar from './UserToolbar'
import UserList from './UserList'
import UserEdit from './UserEdit'

class UserContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log("UserContainer.constructor");
    
    this.state = {
      editingUser: null,
      isEditing: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.editUser = this.editUser.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.displayList = this.displayList.bind(this);
  }

  componentDidMount() {
    console.log("UserContainer.componentDidMount");
    this.props.getUsers();
  }

  // Called when the edit button is clicked on the list object
  editUser(user) {
    console.log("editUser:"+JSON.stringify(user));
    this.setState({isEditing:true, editingUser: user})
  }

  cancelEdit() {
    console.log("cancelEdit");
    this.setState({isEditing:false});
  }

  displayList() {
    console.log("displayList()");
    this.setState({isEditing:false});
  }

  // Called by the edit component to update the object being editied
  updateUserState(event) {
    console.log("updateUserState");
    const field = event.target.name;
    const user = this.state.editingUser;
    user[field] = event.target.value;
    return this.setState({editingUser: user});
  }
  
  render() {

    if (this.state.isEditing) {
      return (
        <section>
          <UserEdit user={this.state.editingUser} 
                    orgs={this.props.orgs} 
                    saveUser={this.props.saveUser} 
                    deleteUser={this.props.deleteUser} 
                    cancelEdit={this.cancelEdit} 
                    userChange={this.updateUserState} 
                    />
        </section>
      );
    } 
    else {
      return (
        <section>
          <UserToolbar newUser={this.props.newUser} displayList={this.displayList} refreshList={this.props.getUsers}/>
          <UserList users={this.props.users} 
                    saveUser={this.props.saveUser} 
                    deleteUser={this.props.deleteUser} 
                    cancelEdit={this.cancelEdit} 
                    userChange={this.updateUserState}
                    editUser={this.editUser}/>
        </section>
      );
    } 
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log("UserContainer.mapStateToProps: "+JSON.stringify(state)); // state
  console.log("UserContainer.ownProps: "+JSON.stringify(ownProps)); // ownProps
  console.log("UserContainer.state.users: "+JSON.stringify(state.users));

  return {
    users: state.users,
    orgs: state.orgs,
    editingUser: state.editingUser
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("UserContainer.mapDispatchToProps"); // state
  return {
    getUsers: () => dispatch(executeGetUsersRequest()), 
    newUser: (user) => dispatch(addNewUser(user.userId)),
    saveUser: (user) => dispatch(executeSaveUserRequest(user)),
    deleteUser: (user) => dispatch(executeDeleteUserRequest(user))
  };
};

UserContainer.propTypes = {
  newUser: PropTypes.func,
  getUsers: PropTypes.func,
  saveUser: PropTypes.func,
  deleteUser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
