const InforModel = require('../models/Information');

//POST
const PostInfor = async (req, res) => {
  
    const Inforname = req.body.Inforname
    const Inforphone = req.body.Inforphone
    const Inforemail = req.body.Inforemail
    const Inforcomment = req.body.Inforcomment
  
    const infor = new InforModel({Inforname: Inforname, Inforphone: Inforphone, Inforemail: Inforemail, Inforcomment: Inforcomment });
  
    try{
        await infor.save();
        res.send("insert data");
    } catch(err) {
        console.log(err)
    }
  }
//  GET
// const GetTnfro = async (req, res) =>{
//     InforModel.find({}, (err, result) => {
//       if (err) { 
//         res.send(err);
//       }
//         res.send(result);
//     });
  
//   };

const GetTnfro = async (req, res) => {
  try {
    let pet = await InforModel.find();
    res.json(pet);
  } catch (err) {
    console.log(err);
  }
};
//DELETE

const DeleteInfor = async (req, res) => {
  try {
    const results = await InforModel.findById(req.params.id);
    await results.deleteOne();
    res.json({
      success: true,
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Server" });
  }
};

  module.exports= {
    GetTnfro,
    PostInfor,
    DeleteInfor
  }
  
  