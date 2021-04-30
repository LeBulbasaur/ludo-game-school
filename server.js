const express = require("express");
const Datastore = require("nedb");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

const app = express();

const coll = new Datastore({
    filename: path.join(__dirname, "collections/sessions.db"),
    autoload: true
});

const getNumber = (max) => {
    return Math.floor(Math.random() * max);
}
let colors = ["red", "green", "blue", "violet"];
let nicks = [];

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server starting in: ${PORT}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/login.html"));
})
app.get("/invalid-nick", (req, res) => {
    res.sendFile(path.join(__dirname, "static/login-error.html"));
})
app.get("/lobby", (req, res) => {
    res.sendFile(path.join(__dirname, "static/lobby.html"));
})
app.get("/sessions", (req, res) => {
    coll.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.send(JSON.stringify(docs));
        }
    })
})

app.post("/lobby", (req, res) => {
    const nick = req.body.username;
    const insert_time = new Date().getTime();
    const last_act = 0;
    let sessionsAmount = 0;
    let createNewBoard = false;
    let originalNick = true;
    let haramSign = false
    const splitted = nick.split("")
    splitted.forEach(letter => {
        if (letter == ";" || letter == "}") {
            haramSign = true
        }
    })
    nicks.forEach(item => {
        if (item == nick) {
            originalNick = false;
        }
    })
    if (nick.length > 7 || originalNick == false || haramSign == true) {
        res.redirect("/invalid-nick");
    } else {
        res.cookie("nick", nick, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
        coll.find({}, (err, docs) => {
            sessionsAmount = docs.length;
            if (sessionsAmount == 0) {
                const number = getNumber(4);
                const colorIndex = colors[number][0];
                const new_player = { nick: nick, insert_time: insert_time, last_act: last_act, status: 0, color: colors[number], pawns: { p0: `${colorIndex}h0`, p1: `${colorIndex}h1`, p2: `${colorIndex}h2`, p3: `${colorIndex}h3` } };
                const session = {
                    player_one: new_player,
                    started: false,
                    rolling: true,
                    move: "rolling"
                };
                coll.insert(session, (err, newDoc) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const urlID = encodeURIComponent(JSON.stringify(newDoc._id));
                        res.cookie("session", newDoc._id, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.redirect("/lobby/?valid=" + urlID);
                    }
                })
                res.cookie("color", new_player.color, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                coll.loadDatabase();
                colors.splice(number, 1);
                nicks.push(nick);
            } else {
                for (let i = 0; i < sessionsAmount; i++) {
                    const sessionObject = docs[i];
                    const sessionID = sessionObject._id;
                    if (sessionObject.player_two == undefined && sessionObject.started == false) {
                        const number = getNumber(3);
                        const colorIndex = colors[number][0];
                        const new_player = { nick: nick, insert_time: insert_time, last_act: last_act, status: 0, color: colors[number], pawns: { p0: `${colorIndex}h0`, p1: `${colorIndex}h1`, p2: `${colorIndex}h2`, p3: `${colorIndex}h3` } };
                        createNewBoard = false;
                        coll.update({ _id: sessionID }, { $set: { player_two: new_player } }, {}, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        coll.loadDatabase();
                        colors.splice(number, 1);
                        nicks.push(nick);
                        const urlID = encodeURIComponent(JSON.stringify(sessionID));
                        res.cookie("session", sessionID, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.cookie("color", new_player.color, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.redirect("/lobby/?valid=" + urlID);
                        break;
                    }
                    else if (sessionObject.player_three == undefined && sessionObject.started == false) {
                        const number = getNumber(2);
                        const colorIndex = colors[number][0];
                        const new_player = { nick: nick, insert_time: insert_time, last_act: last_act, status: 0, color: colors[number], pawns: { p0: `${colorIndex}h0`, p1: `${colorIndex}h1`, p2: `${colorIndex}h2`, p3: `${colorIndex}h3` } };
                        createNewBoard = false;
                        coll.update({ _id: sessionID }, { $set: { player_three: new_player } }, {}, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        coll.loadDatabase();
                        colors.splice(number, 1);
                        nicks.push(nick);
                        const urlID = encodeURIComponent(JSON.stringify(sessionID));
                        res.cookie("session", sessionID, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.cookie("color", new_player.color, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.redirect("/lobby/?valid=" + urlID);
                        break;
                    }
                    else if (sessionObject.player_four == undefined && sessionObject.started == false) {
                        const number = getNumber(1);
                        const colorIndex = colors[number][0];
                        const new_player = { nick: nick, insert_time: insert_time, last_act: last_act, status: 0, color: colors[number], pawns: { p0: `${colorIndex}h0`, p1: `${colorIndex}h1`, p2: `${colorIndex}h2`, p3: `${colorIndex}h3` } };
                        createNewBoard = false;
                        coll.update({ _id: sessionID }, { $set: { player_four: new_player } }, {}, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        coll.loadDatabase();
                        colors.splice(number, 1);
                        nicks.push(nick);
                        const urlID = encodeURIComponent(JSON.stringify(sessionID));
                        res.cookie("session", sessionID, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.cookie("color", new_player.color, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                        res.redirect("/lobby/?valid=" + urlID);
                        break;
                    }
                    else {
                        createNewBoard = true;
                    }
                }
                if (createNewBoard == true) {
                    colors = ["red", "green", "blue", "violet"];
                    nicks = [];
                    const number = getNumber(4);
                    const colorIndex = colors[number][0];
                    const new_player = { nick: nick, insert_time: insert_time, last_act: last_act, status: 0, color: colors[number], pawns: { p0: `${colorIndex}h0`, p1: `${colorIndex}h1`, p2: `${colorIndex}h2`, p3: `${colorIndex}h3` } };
                    const session = {
                        player_one: new_player,
                        started: false,
                        rolling: true,
                        move: "rolling"
                    };
                    coll.insert(session, (err, newDoc) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const urlID = encodeURIComponent(JSON.stringify(newDoc._id));
                            res.cookie("session", newDoc._id, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                            res.redirect("/lobby/?valid=" + urlID);
                        }
                    })
                    res.cookie("color", new_player.color, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: false });
                    coll.loadDatabase();
                    colors.splice(number, 1);
                    nicks.push(nick);
                }
            }
        });
    }
})

app.post("/status", (req, res) => {
    const data = req.body.status;
    const playerNick = req.cookies.nick
    const sessionID = req.cookies.session
    coll.find({ _id: sessionID }, (err, result) => {
        if (result[0].player_one.nick == playerNick) {
            let player = result[0].player_one
            player.status = data;
            coll.update({ _id: sessionID }, { $set: { player_one: player } }, {}, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            coll.loadDatabase();
        }
        else if (result[0].player_two.nick == playerNick) {
            let player = result[0].player_two
            player.status = data;
            coll.update({ _id: sessionID }, { $set: { player_two: player } }, {}, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            coll.loadDatabase();
        }
        else if (result[0].player_three.nick == playerNick) {
            let player = result[0].player_three
            player.status = data;
            coll.update({ _id: sessionID }, { $set: { player_three: player } }, {}, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            coll.loadDatabase();
        }
        else if (result[0].player_four.nick == playerNick) {
            let player = result[0].player_four
            player.status = data;
            coll.update({ _id: sessionID }, { $set: { player_four: player } }, {}, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            coll.loadDatabase();
        }
    })
    res.end("status changed");
})

app.post("/changemove", (req, res) => {
    const data = req.body.nextColor;
    const sessionID = req.cookies.session
    coll.update({ _id: sessionID }, { $set: { move: data } }, {}, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
    coll.loadDatabase();
    res.end("status changed");
})

app.post("/cancelrolling", (req, res) => {
    const data = req.body.color;
    const sessionID = req.cookies.session
    coll.update({ _id: sessionID }, { $set: { move: data } }, {}, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
    coll.loadDatabase();
    res.end("status changed");
})

app.post("/start", (req, res) => {
    const sessionID = req.cookies.session
    coll.update({ _id: sessionID }, { $set: { started: true } }, {}, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
    coll.loadDatabase();
    res.end("status changed");
})

app.post("/movepawn", (req, res) => {
    const sessionID = req.cookies.session
    const playerNick = req.cookies.nick
    const dataPawn = req.body.pawn;
    const dataField = req.body.field;
    const pawnColor = req.body.color;
    coll.find({ _id: sessionID }, (err, result) => {
        const player = result[0]
        if (player.player_one.color == pawnColor) {
            const playerOne = result[0].player_one
            playerOne.pawns[dataPawn] = dataField
            coll.update({ _id: sessionID }, { $set: { player_one: playerOne } }, {}, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
            coll.loadDatabase();
        }
        else if (player.player_two.color == pawnColor) {
            const playerTwo = result[0].player_two
            playerTwo.pawns[dataPawn] = dataField
            coll.update({ _id: sessionID }, { $set: { player_two: playerTwo } }, {}, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
            coll.loadDatabase();
        }
        else if (player.player_three.color == pawnColor) {
            const playerThree = result[0].player_three
            playerThree.pawns[dataPawn] = dataField
            coll.update({ _id: sessionID }, { $set: { player_three: playerThree } }, {}, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
            coll.loadDatabase();
        }
        else if (player.player_four.color == pawnColor) {
            const playerFour = result[0].player_four
            playerFour.pawns[dataPawn] = dataField
            coll.update({ _id: sessionID }, { $set: { player_four: playerFour } }, {}, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
            coll.loadDatabase();
        }
    })
    res.end("status changed");
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "static/not-found.html"));
});