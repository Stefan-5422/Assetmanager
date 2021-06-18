const crypto = require('crypto-js'), fs = require('fs')
const path = require('path')
const mongoose = require("mongoose")
const  {Readable} = require("stream")
/**
 * @class yes
 */
class Asset {
    #id
    #location
    #checksum
    #name
    /**
     * 
     * @param {json} json 
     */
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

    async updatechecksum() {
        let hash = hashfile(fs.createReadStream(this.#location))
        try {
            let res = await hash;
            this.#checksum = res;
        } catch (err) {
            console.log("Error generating image hash: " + err)
        }
    }
    serialize() {
        return {
            "id": this.#id,
            "location": this.#location,
            "checksum": this.#checksum,
        }
    }
}

const hashfile = async (file) => {
    let hash = new Promise((resolve, reject) => {
        const sha256 = crypto.algo.SHA256.create()
        const input = new Readable()

        input.on("error", (err) => { console.log(err); reject() })

        input.on("data", (chunk) => {
            sha256.update(chunk.toString())
        })

        input.on("close", () => { resolve(sha256.finalize().toString()) })

        input.push(file.data)
        input.destroy();
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