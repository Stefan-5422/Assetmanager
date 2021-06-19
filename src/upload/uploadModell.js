const Asset = require('../asset')
const {v1} = require('uuid')
const storage = require('../storage/storageModel')
const stream = require('stream')


//FIXME: THIS WORKS SOMETIMES TRY TO FIX IT IF YOU FIGURE OUT WHAT IS BORKED
const handleUpload = async (req) => {
    let file = req.files.file
    let asset = new Asset()
    const uuid = v1()

    const filestream = await new stream.Readable({read(){}})
    filestream.push(file.data)
    filestream.push(null)

    const hash = await Asset.hash(filestream)

    asset.deserialize( {
        name: file.name,
        id: uuid,
        location: "./storage/"+uuid+"."+file.name.split('\.').pop(),
        checksum: hash,
    })

    if(  await storage.getbyChecksum(hash).then(a=>a.length) > 0){
        await asset.deserialize(await storage.getbyChecksum(hash).then(a=>a[0]))
    }else {
        await file.mv(asset.getlocation())
        await storage.insert(asset)
    }
    return asset.serialize()
    
}

module.exports = {handleUpload}