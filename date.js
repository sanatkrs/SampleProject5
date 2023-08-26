
exports.getDate = function() {
    const options = { weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' };

    let today = new Date();
    let day = today.toLocaleDateString("en-US", options)

    return day;
}

exports.getDay = function() {
    const options = { weekday: 'long', 
                day: 'numeric' };

    let today = new Date();
    let day = today.toLocaleDateString("en-US", options)

    return day;

}

