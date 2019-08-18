import React from "react";
{
	/*import rigoImage from "../../img/rigo-baby.jpg"; */
}

import { Container, Row, Col } from "reactstrap";

import GoogleMap from "../component/map";
import LoginForm from "../component/signInForm";
import BookForm from "../component/createBookForm";

export class Home extends React.Component {
	render() {
		return (
			<>
				<Container>
					<Row>
						<Col sm="12">
							<h1>Hello Rigo!</h1>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm="12" style={{ height: "500px" }}>
							<GoogleMap />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm="12">
							<LoginForm />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<BookForm />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
