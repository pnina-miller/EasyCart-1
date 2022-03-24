import React from "react";
import { geolocated } from "react-geolocated";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Geocode from "react-geocode";
import { actions } from '../redux/Action'

//check move to customhook
class userLocation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: this.props.match.params.keyword
        }
    }
    componentDidUpdate() {
        if (this.props.coords !== null) {
            Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
            Geocode.setLanguage("en");
            Geocode.fromLatLng(this.props.coords.latitude, this.props.coords.longitude).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    this.props.setCurrentAddress(address)
                }
            ).catch(error=>{
                console.error(error);
            })
            if (this.props.flagLocetionAuto) {
                this.props.flagLocetionAuto(false)
            }
            this.props.setUserLocation(this.props.coords)
        }
        else {
            if (!this.props.isGeolocationEnabled) {
                let location = {
                    "latitude": 32.0852999,
                    "longitude": 34.78176759999999
                }
                this.props.setUserLocation(location)
            }
        }
    }
    render() {
        return (<></>)
    }

}
function mapStateToProps(state) {
    return {
        selectedText: state.business.selectedText
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUserLocation: (location) => dispatch(actions.setCurrentUserLocation(location)),
        setCurrentAddress: (address) => dispatch(actions.setCurrentUserAddress(address))

    }
}
export default
    connect(
        mapStateToProps, mapDispatchToProps)
        (geolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        })(withRouter(userLocation)))