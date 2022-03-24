import Moment from "moment";

function useOpenHours(item) {
    let ans
    let date = new Date();
    let hours = Moment(date, "HH:mm").format("HH:mm");
    item?.opening_hours &&
        Object.keys(item.opening_hours).forEach(key => {
            if ((date.getDay() + 1).toString() === key) {
                let h2 = Moment(item.opening_hours[key].end, " HH:mm").format("HH:mm");
                let h1 = Moment(item.opening_hours[key].start, " HH:mm").format("HH:mm");
                ans = hours >= h1 && hours <= h2 ? "open now" : "close now"
            }
        });
    return ans || ''
}

export default useOpenHours;