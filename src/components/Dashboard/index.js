import React, { Component } from 'react';
import CampaignCard from './CampaignCard';
import CampaignAddButon from './CampaignAddButton';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    overflowX: 'auto',
  },
});

const pageData = [
  {
    id: 1,
    title: 'Positive 2016 Congressional Race',
    description: 'Positive Ads highlighting the best of the Republican candidates',
    amount: 4000000,
    total: 8,
    approved: 8,
    waiting: 0,
    rejected: 0,
    status: 'complete',
  },
  {
    id: 2,
    title: 'Positive and humorous ads for 2018 Gubernatorial Race',
    description: 'Positive and humourous ads highlighting the best of the candidates.  There is too much emphasis on the negativity and I do not want to add to it.',
    amount: 3000000,
    total: 9,
    approved: 5,
    waiting: 3,
    rejected: 0,
    status: 'processing',
  },
  {
    id: 3,
    title: 'Facts only 2018 Senate Race',
    description: 'Factual ads that bring sharp focus on the negative decisions made by the opposing candidate.  In this days of fake news, a lot of good information is lost due to the noise.  Lets cut through all that and stick to the facts.',
    amount: 5000000,
    total: 9,
    approved: 7,
    waiting: 1,
    rejected: 1,
    status: 'processing',
  }
];

const testData = [
    {
      "key": "Donorapi__Donation__daa67187-b9c2-96d7-34cf-5b18349cf845",
      "id": "Donorapi__Donation__daa67187-b9c2-96d7-34cf-5b18349cf845",
      "title": "second-donation",
      "description": "Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf…",
      "amount": 5000000,
      "total": 4,
      "approved": 2,
      "waiting": 2,
      "rejected": 0,
      "status": "ACTIVE"
    },
    {
      "key": "Donorapi__Donation__498ae66d-4a23-58f0-35c0-7eb255786073",
      "id": "Donorapi__Donation__498ae66d-4a23-58f0-35c0-7eb255786073",
      "title": "first-donation",
      "description": "Heading 1 Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern…",
      "amount": 5000000,
      "total": 4,
      "approved": 4,
      "waiting": 0,
      "rejected": 0,
      "status": "COMPLETE"
    }
  ]

class index extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <CampaignAddButon />
        {data.map(item => (
            <CampaignCard data={item} />
        ))}
      </div>
    );
  }
}

index.propTypes = {
  data: PropTypes.array.isRequired,
};
  
export default withStyles(styles)(index);
