import {isBusy} from './admin'

export function docsList(docs) {
  return {
    type: 'DOCS_LIST',
    docsList: docs
  };
}

export function getDocsData(matchTags) {
  
  const data = [
    { 
      title: "Connecting to the VPN from Mac", 
      summary: "This documents the steps required to connect to the Plasmology4 VPN from a Mac computer", 
      date:"July 2017", 
      url:"http://www.foodsafetymagazine.com/magazine-archive1/junejuly-2017/targeting-biofilms-with-cold-plasma-new-approaches-to-a-persistent-problem/", 
      author:"IT", 
      tags: ["vpn","it"] 
    }, {
      title: "Connecting to the VPN from Windows", 
      summary: "This documents the steps required to connect to the Plasmology4 VPN from a Windows computer", 
      date:"July 2017", 
      url:"http://www.foodsafetymagazine.com/magazine-archive1/junejuly-2017/targeting-biofilms-with-cold-plasma-new-approaches-to-a-persistent-problem/", 
      author:"IT", 
      tags: ["vpn","it"] 
    }, {
      title: "SOP Information Technology", 
      summary: "This documents the steps required to connect to the Plasmology4 VPN from a Windows computer", 
      date:"July 2017", 
      url:"http://www.foodsafetymagazine.com/magazine-archive1/junejuly-2017/targeting-biofilms-with-cold-plasma-new-approaches-to-a-persistent-problem/", 
      author:"IT", 
      tags: ["vpn","it"] 
    }, {
      title: "Employee Handbook", 
      summary: "The Plasmology4 Employee Handbook", 
      date:"July 2017", 
      url:"http://www.foodsafetymagazine.com/magazine-archive1/junejuly-2017/targeting-biofilms-with-cold-plasma-new-approaches-to-a-persistent-problem/", 
      author:"HR", 
      tags: ["hr"] 
    }, {
      title: "SOP 0001 Document Control", 
      summary: "This procedure defines how Plasmology4 controls their internal and external documents.", 
      date:"June 20, 2013", 
      url:"https://plasmology4.box.com/s/sx54xnkjmquwwz98d5svybhss7bkkiyb", 
      author:"Quality", 
      tags: ["quality"] 
    }, 
  ];

  return (dispatch) => {

    console.log("Checking for:"+matchTags)
    // Filter by the tags
    // THIS IS NOT COMPLETELY CORRECT - WILL NOT WORK FOR MULTIPLE TAGS - NEED TO FIX AT SOME POINT
    var filteredDocs = [];
    var tagArray = matchTags.split(",");

    data.forEach(doc => {
      tagArray.some(tag => {
        if (doc.tags.includes(tag)) {
          filteredDocs.push(doc);
        } else {
          console.log("failed to match tag");
        }
        return filteredDocs;
      });
    });

    console.log("Returning docs:"+filteredDocs)

    dispatch(isBusy(true))
    dispatch(docsList(filteredDocs))
    dispatch(isBusy(false))
  };

}