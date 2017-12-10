import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
	renderField(field) {
		const className="form-group";
		const { meta: { touched, error } } = field;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input} />
				{touched ? error : null}
			</div>
		)
	}
	handleFormSubmit(formProps) {
		// call action creator to sign up the user
		this.props.signupUser(formProps);
	}
	renderAlert() {
		if (this.props.errorMessage) {
			<div className="alert alert-danger">
				<strong>Oops!</strong> {this.props.errorMessage}
			</div>
		}
	}
	render() {
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field 
					label="Email:"
					name="email"
					type="text"
					component={this.renderField}
				/>
				<Field 
					label="Password:"
					name="password"
					type="password"
					component={this.renderField}
				/>
				<Field 
					label="Confirm Password:"
					name="passwordConfirm"
					type="password"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign up!</button>
			</form>
		)
	}
}

function validate(values) {

	const errors = {};

	if (values.password !== values.passwordConfirm) {
		errors.password = 'Passwords must match.';
	}
	if (!values.email) {
		errors.email = "Please enter a email";
	}
	if (!values.password) {
		errors.password = "Please enter a password";
	}
	if (!values.passwordConfirm) {
		errors.passwordConfirm = "Please enter password confirmation";
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error
	};
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate
})(connect(mapStateToProps, actions)(Signup));
