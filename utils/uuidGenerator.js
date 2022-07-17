const { v4: uuidv4 } = require('uuid');

const generate = () =>{
    try{
        return uuidv4()
    }catch (err){
        console.log(err);
    }
}

module.exports={generate};