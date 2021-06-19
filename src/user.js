const mongoose = require("mongoose")

class User {
    #id
    #password
    #name
    #images
    deserialize(json) {
        this.#id = json.id
        this.#name = json.name
        this.#password = json.password
        this.#images = json.images
    }
    getid() {
        return this.#id;
    }
    getpassword() {
        return this.#password
    }
    getimages() {
        return this.#images
    }
    getname() {
        return this.#name
    }
    serialize() {
        return {
            "id":       this.#id,
            "password": this.#password,
            "images":   this.#images,
            "name":     this.#name,
        }
    }
    addimage(id) {
        if(this.#images.includes(id)) return;
        this.#images.push(id)
    }
}


const userShema = new mongoose.Schema({
    id: String,
    password: String,
    name: String,
    images: Array,
})

module.exports = User
module.exports.shema = userShema