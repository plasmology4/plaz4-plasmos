import React, { Component } from 'react'
//import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { setUser, editUser, getUserApi, saveUserApi, deleteUserApi  } from '../../actions/admin'

class EditUser extends Component {
  
  constructor(props) {
    console.log("EditUser.constructor: "+ JSON.stringify(props));
    super(props);

    this.state =  { user: {} } 

    this.saveUserClicked = this.saveUserClicked.bind(this);
    this.backToListClicked = this.backToListClicked.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    //this.getUserData = this.getUserData.bind(this);
    console.log("constructor state: "+JSON.stringify(props));
    console.log("constructor props: "+JSON.stringify(this.state));
    console.log("props.match.params.id: "+JSON.stringify(props.match.params.id));
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.state));
    console.log("componentDidMount props: "+JSON.stringify(this.props));
    this.props.getUser(this.props.session, this.props.match.params.id);
  }

  deleteUserClicked(event) {
    console.log("deleteUserClicked: "+JSON.stringify(this.props.user));
    this.props.deleteUser(this.props.session, this.props.user)
    event.preventDefault()
  }

  saveUserClicked(event) {
    console.log("saveUserClicked: "+JSON.stringify(this.props.user));
    this.props.saveUser(this.props.session, this.props.user)
    event.preventDefault()
  }

  backToListClicked(event) {
    console.log('backToListClicked');
    this.props.history.push('/admin/users');
    this.props.setUser({});
    event.preventDefault();
  }

  handleUserChange(event) {
    console.log('event id: '+JSON.stringify(event.target.id));
    console.log('event value: '+JSON.stringify(event.target.value));
    this.props.editUser(event.target.id, event.target.value);
    //this.setState({ user[event.target.id]: event.target.value} );
    event.preventDefault();
  }
  
  

  render() {

    return (
      
      <div>

        <div className="row align-center">
          <h1 className="main-heading">User Administration</h1>
        </div>
         
        <div className="row">

          <div className="small-12 medium-3 large-2 columns">
            <button type="button" className="button" onClick={this.saveUserClicked}>Save User</button>
            <br/>
            <button type="button" className="button" onClick={this.deleteUserClicked}>Delete</button>
            <br/>
            <button type="button" className="button" onClick={this.backToListClicked}>Back</button>
          </div>

          <div className="small-12 medium-6 large-6 columns">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="small-6 columns">
                  <label htmlFor="firstname" className="text-right middle">Firstname</label>
                </div>
                <div className="small-6 columns">
                  <input type="text" id="firstname" placeholder="Firstname" value={this.props.user.firstname} onChange={this.handleUserChange}/>
                </div>
              </div>
              <div className="row">
                <div className="small-6 columns">
                  <label htmlFor="lastname" className="text-right middle">Lastname</label>
                </div>
                <div className="small-6 columns">
                  <input type="text" id="lastname" placeholder="Lastname" value={this.props.user.lastname} onChange={this.handleUserChange}/>
                </div>
              </div>
              <div className="row">
                <div className="small-6 columns">
                  <label htmlFor="id" className="text-right middle">UserID</label>
                </div>
                <div className="small-6 columns">
                  <input type="text" id="id" placeholder="UserID" value={this.props.user.id} onChange={this.handleUserChange}/>
                </div>
              </div>
              <div className="row">
                <div className="small-6 columns">
                  <label htmlFor="email" className="text-right middle">Email</label>
                </div>
                <div className="small-6 columns">
                  <input type="text" id="email" placeholder="Email" value={this.props.user.email} onChange={this.handleUserChange}/>
                </div>
              </div>
            </form>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("EditUser.mapStateToProps state: "+JSON.stringify(state)); // state
  console.log("EditUser.mapStateToProps ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
    user: state.user,
    session: state.session,
    editingUserId: state.editingUserId,
    hasErrored: state.hasErrored,
    isBusy: state.isBusy
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("EditUser.mapDispatchToProps"); // state
  return {
    setUser: (user) => dispatch(setUser(user)), 
    editUser: (id, value) => dispatch(editUser(id, value)),
    getUser: (session, userId) => dispatch(getUserApi(session, userId)), 
    saveUser: (session, user) => dispatch(saveUserApi(session, user)), 
    deleteUser: (session, user) => dispatch(deleteUserApi(session, user))
    //filter: (filter) => dispatch(applyFilter())
  };
};

// EditUser.propTypes = {
//   editingUser: PropTypes.object.isRequired,
//   saveUserClicked: PropTypes.func.isRequired,
//   handleUserChange: PropTypes.func.isRequired
// }

// EditUser.defaultProps = [{
//   editingUser: {userId: '', firstname: '', lastname: '', email: ''} 
// }];


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
