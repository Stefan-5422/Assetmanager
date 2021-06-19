const crypto = require('crypto-js')
const mongoose = require("mongoose")

class Asset {
    #id
    #location
    #checksum
    #name
    deserialize(json) {
        this.#id = json.id
        this.#name = json.name
        this.#location = json.location
        this.#checksum = json.checksum
    }
    getid() {
        return this.#id;
    }
    getlocation() {
        return this.#location
    }
    getchecksum() {
        return this.#checksum
    }
    getname() {
        return this.#name
    }
    serialize() {
        return {
            "id":       this.#id,
            "location": this.#location,
            "checksum": this.#checksum,
            "name":     this.#name,
        }
    }
}

const hashfile = async (file) => {
    let SHA256 = crypto.algo.SHA256.create()
    let hash = new Promise((resolve, reject) => {

        file.on("error", (err) => { console.log(err); reject() })

        file.on("data", (chunk) => {
            SHA256.update(chunk.toString())
        })

        file.on("close", () => { resolve(SHA256.finalize().toString()) })
    })
    try {
        let res = await hash;
        return res
    } catch (err) {
        console.log("Error generating image hash: " + err)
    }
}

const assetShema = new mongoose.Schema({
    id: String,
    location: String,
    checksum: String,
    name: String,
})

module.exports = Asset
module.exports.shema = assetShema
module.exports.hash = hashfile