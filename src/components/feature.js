import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentWillMount() {
		this.props.fetchMessage();
		console.log(this.props.message)
	}
	render() {
		return (
			<div>{this.props.message}</div>
		)
	}
}

function mapStateToProps(state) {
	return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);