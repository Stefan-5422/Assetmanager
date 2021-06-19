const mongoose = require("mongoose")

class Session {
    #session
    #user
    deserialize(json) {
        this.#session = json.session
        this.#user = json.user
    }
    getsession() {
        return this.#session;
    }
    getuser() {
        return this.#user
    }
    serialize() {
        return {
            "session":  this.#sesion,
            "user":     this.#user,
        }
    }
}

const sessionShema = new mongoose.Schema({
    session: String,
    user: String,
})

module.exports = Session
module.exports.shema = sessionShema