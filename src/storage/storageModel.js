const mongoose = require("mongoose")
const Asset = require('../asset')


const assetModel = mongoose.model('Asset',Asset.shema)


const insert = async (asset) => {
    const doc = new assetModel(asset.serialize())
    doc.save()
}

const getbyID = async (id) => {
    const res = await assetModel.find({id: id},(err,result) => result)
    return res
}

const getbyChecksum = async (checksum) => {
    const res = await assetModel.find({checksum: checksum},(err,result) => result)
    return res
}

const getAll = async () => {
    const res = assetModel.find((err,result) => result)
    return res
}

const removebyID = async (id) => {
    const res = await assetModel.deleteOne({id:id})
    return res.deletedCount;
}

module.exports = {insert,getbyID,getbyChecksum,getAll,removebyID}