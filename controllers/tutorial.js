const Tutorial = require('../models/Tutorial.js')
const path = require('path')


module.exports.index = async (req,res)=>{
    try {
        var data = await Tutorial.find({});
   
        res.send(data);

    }
    catch(e){
        console.log(e)
    }
}

module.exports.find = async (req,res)=>{
    var data = await Tutorial.findById(req.params.id);

    res.send(data)
}


module.exports.store = (req, res)=>{
    
    Tutorial.create(req.body, (error, data) => {
        if(error){
         console.log(error)   
        res.send(error)
       }
       res.send(data)
    
    })
}


module.exports.update = (req, res) =>{
    Tutorial.findByIdAndUpdate(req.params.id, req.body, (error, data) =>{
        if(error) {
            console.log(error)
            res.send(error)
        }
        res.send(data)
    })
} 


module.exports.delete = (req, res) =>{
    Tutorial.findByIdAndDelete(req.params.id, (error, data) =>{
        if(error) {
            console.log(error)
            res.send(error)
        }
        res.send(data)
        
    })
} 