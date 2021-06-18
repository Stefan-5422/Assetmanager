const crypto = require('cryptojs'), fs = require('fs')

/**
 * @class yes
 */
class Asset {
    #id
    #location
    #checksum

    /**
     * 
     * @param {json} json 
     */
    deserialize(json)  {
        this.#id = json.id
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
    /**
     * @throws -10 file error
     */
    async updatechecksum() {
        const hash = crypto.createHash('md5')
        hash = async () => {
            const input = fs.createReadStream(this.#location)

            input.on("error", () => {throw -10})

            input.on("data", (chunk) => {
                hash.update(chunk)
            })

            return input.on("close", () => (hash.digest("hex")))
        }
        return await hash()
    }
    serialize() {
        return {
            "id": this.#id,
            "location": this.#location,
            "checksum": this.#checksum,
        }
    }
}

module.exports = Asset