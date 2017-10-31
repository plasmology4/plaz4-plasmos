//import axios from 'axios';
//import { Observable } from 'rx-lite';
//import { BASE_URL } from './config';
import {isBusy} from './admin'

export function newsList(news) {
  return {
    type: 'NEWS_LIST',
    newsList: news
  };
}

export function getNewsData() {
  
  const data = [
    { 
      title: "Targeting Biofilms with Cold Plasma: New Approaches to a Persistent Problem", 
      summary: "When developing and maintaining an effective sanitation program for a food handling environment, you face a lot of challenges. These include the design of processing equipment for proper access to all surfaces for cleaning, selection of sanitizers and cleaning tools matched to the needs of each processing line, training for shift workers and cleaning crews, and the monitoring and verification of sanitation efficacy. ", 
      source:"Food Safety Magazine", 
      date:"June/July 2017", 
      url:"http://www.foodsafetymagazine.com/magazine-archive1/junejuly-2017/targeting-biofilms-with-cold-plasma-new-approaches-to-a-persistent-problem/", 
      img:"/assets/img/plasma/biofilm.png", 
      tags: ["cold-plasma"] 
    }, { 
      title: "Cold plasma: Get started with the Disc Jet", 
      summary: "Plasmas have long been used in industry to clean surfaces or to process them such that materials like paints or glues adhere to them more effectively. The advantage: Chemical pre-treatment with solvents or other substances can be dispensed with. This saves money and is environmentally friendly.", 
      source:"Science Daily", 
      date:"April 12, 2017", 
      url:"https://www.sciencedaily.com/releases/2017/04/170412091357.htm", 
      img:"/assets/img/plasma/disc-jet.png", 
      tags: ["cold-plasma"] 
    }, { 
      title: "Chemically different non-thermal plasmas target distinct cell death pathways", 
      summary: "A rigorous biochemical analysis of interactions between non-thermal plasmas (NTPs) and living cells has become an important research topic, due to recent developments in biomedical applications of non-thermal plasmas.", 
      source:"Nature.com", 
      date:"April 04, 2017", 
      url:"https://www.nature.com/articles/s41598-017-00689-5", 
      img:"/assets/img/plasma/report.png", 
      tags: ["cold-plasma"] 
    }, { 
      title: "The fourth state of matter, plasma: A technology to improve bone healing?", 
      summary: "Cold plasma looks like the glow from the 'Star Wars' blue light saber but this beam of energy, made of electrons that change polarity at micro-second or nanosecond speeds, could help bones heal faster, according to a study.", 
      source:"Thomas Jefferson University", 
      date:"August 11, 2016", 
      url:"https://www.sciencedaily.com/releases/2016/08/160811085633.htm", 
      img:"/assets/img/plasma/bone-heal.png", 
      tags: ["cold-plasma"] 
    }, { 
      title: "Global Cold Plasma Market: 2017-2022 - Research and Markets", 
      summary: "The global cold plasma market was valued at US$ 1,286.4 million in 2016 and is projected to witness an impressive double digit CAGR (Compound annual growth rate) of 12.2% over the next five years to reach US$ 2,536.4 million in 2022", 
      source:"Business Wire", 
      date:"June 02, 2016", 
      url:"http://www.businesswire.com/news/home/20170602005366/en/Global-Cold-Plasma-Market-2017-2022---Research", 
      img:"/assets/img/plasma/report.png", 
      tags: ["cold-plasma"] 
    }
  ];

  return (dispatch) => {
    dispatch(isBusy(true))
    dispatch(newsList(data))
    dispatch(isBusy(false))
  };

}
