const usersModel = require('../models/user.model');

const listAllUsers = async (req,res)=>{
    try{
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    }catch(error){
        console.log("Error fetching users:",error);
        res.status(500).json({error:"Failed to fetch data"});

    }
};

module.exports = {
    listAllUsers
}