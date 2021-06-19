const Asset = require('../asset')
const {v1} = require('uuid')
const storage = require('../storage/storageModel')
const stream = require('stream')
const ws = require('ws')
const User = require('../user')
const userModel = require('../user/userModel')

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

    const user = new User;
    user.deserialize(await userModel.getbyID(req.session.uid).then(a=>a[0]))

    user.addimage(asset.getid())

    userModel.changeUser(user)

    return asset.serialize()
    
}


module.exports = {handleUpload}