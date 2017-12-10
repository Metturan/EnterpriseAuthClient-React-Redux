import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
	renderField(field) {
		const className="form-group";
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input}/>
			</div>
		)
	}
	handleFormSubmit({email, password}) {
		this.props.signinUser({email, password});
		// console.log(email, password);
	} 
	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			)
		}
	}
	render() {
		const { handleSubmit, fields: {email, password}} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field 
					label="email"
					name="email"
					type="text"
					component={this.renderField}
				/>
				<Field 
					label="password"
					name="password"
					type="password"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error}; 
}

export default reduxForm({
	form: 'signin', fields: ['email', 'password']
})(connect(mapStateToProps, actions)(Signin));

