import React from "react";
import { Context } from "../store/appContext.js";
import { Button, Form, FormGroup, Label, Input, FormText, Collapse, Col } from "reactstrap";

export default class BookForm extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			collapse: false
		};
		this.author = React.createRef();
		this.category = React.createRef();
		this.description = React.createRef();
		this.title = React.createRef();
		this.yearPublished = React.createRef();
	}

	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	render() {
		return (
			<div>
				<Button outline color="primary" onClick={this.toggle} className="book__btn">
					Add Item
				</Button>
				<Collapse isOpen={this.state.collapse}>
					<Context.Consumer>
						{({ store, actions }) => {
							return (
								<div className="container mb-4">
									<Form>
										<FormGroup row>
											<Label for="title" sm={2}>
												Book Title
											</Label>
											<Col sm={10}>
												<Input
													type="text"
													name="title"
													ref={this.category}
													onChange={e =>
														this.setState({
															title: e.target.value
														})
													}
													placeholder="Book Title"
												/>
											</Col>
										</FormGroup>
										<FormGroup row>
											<Label for="author" sm={2}>
												Title
											</Label>
											<Col sm={10}>
												<Input
													type="text"
													name="author"
													ref={this.author}
													onChange={e =>
														this.setState({
															author: e.target.value
														})
													}
													placeholder="Book Author"
												/>
											</Col>
										</FormGroup>

										<FormGroup row>
											<Label for="yearPublished" sm={2}>
												Year Published
											</Label>
											<Col sm={10}>
												<Input
													type="number"
													name="yearPublished"
													ref={this.yearPublish}
													onChange={e =>
														this.setState({
															yearPublished: e.target.value
														})
													}
													placeholder="Year Published"
												/>
											</Col>
										</FormGroup>

										<FormGroup row>
											<Label for="category" sm={2}>
												Select a Genre
											</Label>
											<Col sm={10}>
												<Input
													type="select"
													name="category"
													ref={this.category}
													onChange={e =>
														this.setState({
															category: e.target.value
														})
													}>
													<option>Fiction</option>
													<option>Scifi</option>
													<option>Historical</option>
													<option>Adventure</option>
												</Input>
											</Col>
										</FormGroup>

										<FormGroup row>
											<Label for="description" sm={2}>
												Describe your Item
											</Label>
											<Col sm={10}>
												<Input
													type="textarea"
													name="description"
													ref={this.description}
													onChange={e =>
														this.setState({
															description: e.target.value
														})
													}
												/>
											</Col>
										</FormGroup>

										<Button
											outline
											color="primary"
											className="product__btn1"
											onClick={() => {
												actions.createBook(
													this.state.title,
													this.state.author,
													this.state.yearPublish,
													this.state.category,
													this.state.description
												);
											}}>
											Submit
										</Button>
									</Form>
								</div>
							);
						}}
					</Context.Consumer>
				</Collapse>
			</div>
		);
	}
}
