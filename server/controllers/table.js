const tableModel = require('../models/tableModel')


// create
const createTable = async (req, res) =>{
        const {fname, sname} = req.body;

        console.log(fname, sname);
        try{
          
            const table = new tableModel({fname, sname});
            const result = await table.save();
            if(result){
              res.send('Data sent successfully');
            } else{
              res.send("data not save");
            }
          
        } catch(err){
          res.status(400).send(err);
        }
}


// read
const readTable = async (req, res)=>{
    try{
      const data = await tableModel.find();
      if(data){
        res.send(data);
      }else{
        res.send('No data found');
      }
    } catch(err){
      res.status(400).send(err);
    }
  }


// update
const updateTable = async (req, res)=>{
    const {id} = req.params;
    const {fname, sname} = req.body;
    try{
      const result = await tableModel.findByIdAndUpdate( id, {fname: fname, sname: sname})
      if(result){
        res.send('Data updated successfully');
      }else{
        res.send('No data found')
      }
    }catch(err){
      res.status(400).send(err)
    }
  }


// delete
const deleteTable = async (req, res)=>{
    const {id} = req.params;
    try{
      const result = await tableModel.findByIdAndDelete(id);
      if(result){
        res.send("Data Deleted");
      } else{
        res.status(404).send('data not found');
      }
    } catch(err){
        res.status(400).send(err);
    }
  }



module.exports = {
    createTable, 
    readTable, 
    updateTable, 
    deleteTable
};