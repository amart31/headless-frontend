import React, { Component } from "react";

import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

import PropTypes from "prop-types";

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		};
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	};

	onMapClick = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};
	render() {
		const style = {
			width: "100%",
			height: "100%",
			display: "block",
			marginLeft: "auto",
			marginRight: "auto"
		};
		return (
			<Map
				style={style}
				google={this.props.google}
				onClick={this.onMapClick}
				zoom={10}
				initialCenter={{ lat: 25.7617, lng: -80.1918 }}>
				<Marker
					onClick={this.onMarkerClick}
					title={"About Me"}
					position={{ lat: 25.7617, lng: -80.1918 }}
					name={"CAbout Me"}
				/>
				<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
					<div>
						<h3>Example</h3>
						<address>
							9330 Sw 7th Lane
							<br />
							Miami, FL 33174
							<br />
							786-470-7570
						</address>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

GoogleMap.propTypes = {
	google: PropTypes.object
};

export default GoogleApiWrapper({
	apiKey: process.env.GOOGLE_MAPS_API_KEY
})(GoogleMap);
