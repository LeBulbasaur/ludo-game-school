function fetchStatus(data) {
    fetch("/status", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .catch(err => console.log(err));
}
function fetchMove(data) {
    fetch("/changemove", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .catch(err => console.log(err));
}
function fetchCancel(data) {
    fetch("/cancelrolling", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .catch(err => console.log(err));
}
function fetchMovePawn(data) {
    fetch("/movepawn", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .catch(err => console.log(err));
}
function fetchEnd() {
    fetch("/", {
        method: "GET",
        mode: 'no-cors',
        headers: { "Content-type": "text/html; charset=UTF-8" }
    })
        .catch(err => console.log(err));
}
export { fetchStatus, fetchMove, fetchCancel, fetchMovePawn, fetchEnd };