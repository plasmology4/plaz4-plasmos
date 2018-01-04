
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getNewsData } from '../../../actions/news';
import { applyFilter } from '../../../actions/admin';
import Image from '../../util/Image';

class NewsList extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isBusy: false, hasErrored: false, message: '', news:[] };
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.props));
    this.props.getNews(); 
  }

  render() {

    const listArticles = this.props.news.map((article, i) =>
      <div className="callout" key={i}>
        
        <div className="row">
          <div className="grid-x grid-padding-x grid-margin-x">
              <div className="small-12 medium-8 large-8 cell">
                <div className="callout-title">{ article.title }</div>
                <p className="small-summary">{ article.summary }</p>
              </div>

              <div className="small-12 medium-4 large-4 cell">
                <a href={ article.url } target="_new" className="float-right"><i className="material-icons">link</i></a>
                <p className="small-summary">{ article.date }&nbsp;&nbsp;&nbsp; </p>
                <Image src={ article.img } width={150} height={120} mode='fit' /> 
              </div>
          </div>
        </div>

      </div>
    );

    return (
      <div>
        <div className="main-heading-inv">Cold Plasma in the News</div>
        {listArticles}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
    news: state.news
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
    getNews: () => dispatch(getNewsData()), 
    filter: (filter) => dispatch(applyFilter())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);

