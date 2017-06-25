import React, { Component } from 'react';

export default class Logo extends Component {
    handleClick(e) {
        this.props.dispatch('UPDATE_IDX');
    }
    render() {
        const {index} = this.props;
        return (<div onClick={(e) => this.handleClick(e)}>
            <h1>Ready To Eat </h1>
            <h2>Find shit to eat</h2>
            <br />
        </div>);
    }
}
