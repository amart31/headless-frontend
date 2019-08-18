import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, NavLink, Alert } from "reactstrap";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			pass: ""
		};
		this.user = React.createRef();
		this.pass = React.createRef();
	}
	validateForm() {
		return this.state.user.length > 0 && this.state.pass.length > 0;
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	render() {
		const style = {
			width: "50%",
			height: "300px",
			display: "block",
			marginLeft: "auto",
			marginRight: "auto"
		};
		return (
			<Container style={style}>
				<Context.Consumer>
					{({ store, actions }) => {
						if (store.session.isLoggedIn === true) {
							return <Alert color="primary">{"Welcome " + store.session.user_nicename}</Alert>;
						} else {
							return (
								<Container>
									<h2 className="mt-4 pt-3">Log In</h2>
									<Form onSubmit={actions.handleFormSubmit}>
										<FormGroup>
											<Label htmlFor="username">Username:</Label>
											<Input
												className="login__input"
												type="text"
												name="username"
												ref={this.user}
												placeholder="username"
												onChange={e =>
													this.setState({
														user: e.target.value
													})
												}
											/>
										</FormGroup>

										<FormGroup>
											<Label htmlFor="userPass">Password:</Label>
											<Input
												className="login__input"
												type="password"
												name="userPass"
												ref={this.pass}
												placeholder="password"
												onChange={e =>
													this.setState({
														pass: e.target.value
													})
												}
											/>
										</FormGroup>
										<Row>
											<Link to="/rent">
												<Button
													color="primary"
													disabled={!this.validateForm()}
													onClick={() => {
														this.setState({
															session: actions.login(this.state.user, this.state.pass)
														});
													}}>
													Log In
												</Button>
											</Link>
										</Row>
									</Form>
									<Row>
										<NavLink href="/#">Not a Member? Signup</NavLink>
									</Row>
								</Container>
							);
						}
					}}
				</Context.Consumer>
			</Container>
		);
	}
}
