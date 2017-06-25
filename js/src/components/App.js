import React, { Component } from 'react';
import Logo from './Logo';
import Restrictions from './Restrictions';

export default class App extends Component {
    render() {
        return (<div>
            <Logo {...this.props} />    
	        <Restrictions {...this.props} />
        </div>);
    }
}
