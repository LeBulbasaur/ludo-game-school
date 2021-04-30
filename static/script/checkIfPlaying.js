function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
let sessionCookie = document.cookie;
if (sessionCookie != "") {
    const ingame = getCookie("ingame")
    if (ingame == "true") {
        const session = getCookie("session")
        // window.location.href = `/lobby/?valid="${session}"`;
    }
} else {
    document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}`
}