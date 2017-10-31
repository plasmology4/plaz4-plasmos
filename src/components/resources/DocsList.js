
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getDocsData } from '../../actions/documents';
import { applyDocFilter } from '../../actions/documents';

class DocsList extends Component {
  
  constructor(props) {
    super(props);
    console.log("constructor props: "+JSON.stringify(props));
    this.state = { tags: props.tags, docs:[] };
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.props));
    console.log("tags: "+JSON.stringify(this.props.tags));
    this.props.getDocs(this.props.tags); 
  }

  render() {

    const listDocs = this.props.docs.map((doc, i) =>
      <div className="row" key={i}>
        <div className="grid-x grid-padding-x grid-margin-x">
          <div className="small-12 medium-8 large-8 cell">
            <div className="callout-title">{ doc.title }</div>
            <p><small>{ doc.summary }</small></p>
          </div>
        </div>

        <div className="small-12 medium-4 large-4 cell">
          <a href={ doc.url } target="_new" className="float-right"><i className="material-icons">link</i></a>
          <p><small>{ doc.date }</small>&nbsp;&nbsp;&nbsp; </p>
        </div>

      </div>
    );

    return (
      <div>
        <div className="main-heading-inv">Documents</div>
        <div className="callout">
          {listDocs}
        </div>  
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
    docs: state.docs,
    //tags: state.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
    getDocs: (tags) => dispatch(getDocsData(tags)), 
    filter: (filter) => dispatch(applyDocFilter())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsList);

