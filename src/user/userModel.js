const mongoose = require("mongoose")
const User = require("../user")

const userModel = mongoose.model('User',User.shema)

const insert = async (user) => {
    const doc = new userModel(user.serialize())
    doc.save()
}
const getbyID = async (id) => {
    const res = await userModel.find({id: id},(err,result) => result)
    return res
}

const getbyName = async (name) => {
    const res = await userModel.find({name: name},(err,result) => result)
    return res
}

const getAll = async () => {
    const res = userModel.find((err,result) => result)
    return res
}

const removebyID = async (id) => {
    const res = await userModel.deleteOne({id:id})
    return res.deletedCount;
}

const changeUser = async (user) => {
    await userModel.updateOne({id: user.getid()}, user.serialize())
}

const authenthicate = async (name,password) => {
    const user = new User()
    user.deserialize(await getbyName(name).then(a=>a[0]))
    return (await user.getpassword() === password)
}

module.exports = {insert,getbyID,getbyName,getAll,removebyID,changeUser,authenthicate}