import React, { Component } from "react"
import DashApprovalCard from "./DashApprovalCard"
import CampaignAddButon from "./CampaignAddButton" 

const pageData = [
  {
    id: 1,
    title: "Positive 2016 Congressional Race", 
    description: "Positive Ads highlighting the best of the Republican candidates",
    amount: 4000000,
    total: 8,
    approved: 8,
    waiting: 0,
    rejected: 0,
    status: "complete"
  }, {
    id : 2,
    title: "Positive and humorous ads for 2018 Gubernatorial Race", 
    description: "Positive and humourous ads highlighting the best of the candidates.  There is too much emphasis on the negativity and I do not want to add to it.",
    amount: 3000000,
    total: 9,
    approved: 5,
    waiting: 3,
    rejected: 0,
    status: "processing"
  }, {
    id : 3,
    title: "Facts only 2018 Senate Race", 
    description: "Factual ads that bring sharp focus on the negative decisions made by the opposing candidate.  In this days of fake news, a lot of good information is lost due to the noise.  Let's cut through all that and stick to the facts.",
    amount: 5000000,
    total: 9,
    approved: 7,
    waiting: 1,
    rejected: 1,
    status: "processing"
  }
];

export default class index extends Component {
  render() {
    const { data } = this.props;

    return (
        <div> 
            { data.map(item => (
                <DashApprovalCard data={item} />
            )) }
        </div>
    )
  }
}
