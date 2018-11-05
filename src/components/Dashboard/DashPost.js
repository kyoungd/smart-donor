import React, { Component } from "react"
import DashPostCard from './DashPostCard';

export default class index extends Component {
  render() {
    const { data } = this.props;

    return (
        <div> 
            { data.map(item => (
                <DashPostCard data={item} />
            )) }
        </div>
    )
  }
}
