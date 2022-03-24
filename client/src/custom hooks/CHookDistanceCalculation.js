import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDistance } from 'geolib';


//check
function useCHookDistanceCalculation(props) {
    const { lat, lng } = props;
    const [distance, setDistance] = useState()
    const currentUserLocation = useSelector(
        (state) => state.location.currentUserLocation
    );

    useEffect(() => {
        let cDistance = getDistance(currentUserLocation, {
            latitude: lat,
            longitude: lng,
        })
        setDistance(cDistance)
    }, [distance, lat, lng, currentUserLocation]);
    return (distance !== undefined && distance > 1000 ? (distance / 1000) + "Km" : distance + "m")
}

export default useCHookDistanceCalculation;
