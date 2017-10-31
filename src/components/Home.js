import React, { Component } from 'react';
//import FullSystemImg from '../assets/img/p4-full-system.jpg'
import NewsList from './news/NewsList'
// import SystemImg from '../assets/img/p4-system-closeup.jpg'
// import CannisterImg from '../assets/img/cannisters-1.png'
// import HospitalImg from '../assets/img/hi-tech-hospital.jpg'
import MedicalImg1 from '../assets/img/medical/chuttersnap-233105.jpg'
import MedicalImg2 from '../assets/img/medical/hush-naidoo-382152.jpg'
import MedicalImg3 from '../assets/img/medical/jesse-orrico-60373.jpg'
import MedicalImg4 from '../assets/img/medical/nino-liverani-382539.jpg'
import MedicalImg5 from '../assets/img/medical/piron-guillaume-361682.jpg'
import MedicalImg6 from '../assets/img/medical/samuel-zeller-158996.jpg'
import MedicalImg7 from '../assets/img/medical/chuttersnap-233105.jpg'
import MedicalImg8 from '../assets/img/medical/hush-naidoo-382152.jpg'
import MedicalImg9 from '../assets/img/medical/jesse-orrico-60373.jpg'
import MedicalImg10 from '../assets/img/medical/nino-liverani-382539.jpg'
import MedicalImg11 from '../assets/img/medical/piron-guillaume-361682.jpg'
import MedicalImg12 from '../assets/img/medical/samuel-zeller-158996.jpg'


class Home extends Component {
  render() {




    return (

      <div>
        <div className="p4-menu-centered">
            <ul className="menu">
              <li><p>Quality Management in the Cloud for Life Sciences</p></li>
          </ul>
        </div>
<br/>
        <div className="grid-container fluid">
          <div className="grid-x grid-padding-x grid-padding-y">
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg1} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg2} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg9} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg10} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg11} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg12} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg3} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg4} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg5} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg6} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg7} alt={"img1"}/></div>
            <div className="small-4 medium-2 large-2 cell"><img className="home-img-tile" src={MedicalImg8} alt={"img1"}/></div>
             

            <div className="small-12 medium-6 large-8 cell">
              <div className="grid-x grid-padding-x grid-margin-x">
                <div className="small-8 medium-8 large-8 cell">
                  <NewsList/>
                </div>
                <div className="small-4 cell">
                  <a href="https://www.accuweather.com/en/us/scottsdale-az/85251/current-weather/331798" className="aw-widget-legal"></a>
                  <div id="awtd1499446338115" className="aw-widget-36hour"  data-locationkey="" data-unit="f" data-language="en-us" data-useip="true" data-uid="awtd1499446338115" data-editlocation="true"></div>
                  <script type="text/javascript" src="https://oap.accuweather.com/launch.js"></script>
                </div>        
              </div>
            </div>


          </div>
        </div>
 
      </div>

    );
  }
}

export default Home;
