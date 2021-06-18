const Asset = require('../asset')
const {v1} = require('uuid')
const storage = require('../storage/storageModel')

const handleUpload = async (req) => {
    let file = req.files.file
    let asset = new Asset()
    const uuid = v1()
    asset.deserialize( {
        name: file.name,
        id: uuid,
        location: "./storage/"+uuid,
    })
    if(  await storage.getbyChecksum(await Asset.hash(file + null)).then(a=>a.length) != 0){
        console.log(await storage.getbyChecksum(await Asset.hash(file + null)).then(a=>a[0]))
        asset.deserialize(await storage.getbyChecksum(await Asset.hash(file + null)).then(a=>a[0]))
    }else {
        await file.mv('./storage/'+uuid)
        await asset.updatechecksum()
        await storage.insert(asset)
    }
    return asset.serialize()

}

module.exports = {handleUpload}