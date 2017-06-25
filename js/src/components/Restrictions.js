import React, { Component } from 'react';

export default class Restrictions extends Component {
	state = {
		name: [],
	}

	updateRestrictions(e) {
		this.setState({
			name: e.target.value,
		})
	}


	render() {
		return (

		<form> 
		<h3>Restrictions:</h3>
		<input type="checkbox" 
			   name="shrimp" 
			   value="shrimp" 
			   id="shrimp" 
			   onClick={(e) => this.updateRestrictions(e)}/>
		<label for="shrimp"> Shrimp</label> 
		<br />
		<input type="checkbox" 
			   name="pork" 
			   value="pork" 
			   id="pork" 
   			   onClick={(e) => this.updateRestrictions(e)}/>
		<label for="pork"> Pork</label> 
		<div>
			<button className="ui button primary" 
					onClick={(e) => this.submit(e)}>Submit</button>
		</div>
		</form>


			)

	}
}