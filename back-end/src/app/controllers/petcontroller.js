const router = require("express").Router();
const cloudinary = require("../../utils/cloudinary");
const Pet = require("../models/pet");
const ProductPKModel = require("../models/ProductPKModel");

const GetAllPets = async (req, res) => {
  try {
    let pet = await Pet.find();
    res.json(pet);
  } catch (err) {
    console.log(err);
  }
};

const PostPet = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let pet = new Pet({
      image: result.secure_url,
      category: req.body.category,
      title: req.body.title,
      price: req.body.price,
      cloudinary_id: result.public_id,
      type: req.body.type,
    });
    // Save user
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.log(err);
  }
};

const UpdateOnlyPet = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const results = await Pet.findById(req.params.id);
    if (results.petId === req.body.petId) {
      await results.updateOne({
        $set: {
          image: result.secure_url,
          category: req.body.category,
          title: req.body.title,
          price: req.body.price,
          // cloudinary_id: result.public_id,
          type: req.body.type,
        },
      });
      res.json({ success: true, message: "Update successfully" });
    } else {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "There're something wrong!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const DeleteOnlyPet = async (req, res) => {
  try {
    const results = await Pet.findById(req.params.id);
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

// L???y T???t C??? Nh???ng Ch?? Ch??

const GetAllDogs = async (req, res) => {
  try {
    let results = await Pet.find().where("type").equals("dog");
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

// L???y T???t C??? Nh???ng Ch?? M??o

const GetAllCats = async (req, res) => {
  try {
    let results = await Pet.find().where("type").equals("cat");
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

// L???y T???t C??? Nh???ng Lo???i Th???c Ph???m

const GetAllFoods = async (req, res) => {
  try {
    let results = await Pet.find().where("type").equals("food");
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

const GetProductByID = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(500).json({
        errCode: 1,
        errMessage: "missing require parameter",
        data: {},
      });
    }
    const productDetail = await Pet.findById(id);
    return res
      .status(200)
      .json({ success: "get product detail ok", productDetail });
  } catch (e) {
    console.log("create error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// this is controler of Quang
const postProductPK = async (req, res) => {
  const { imgPK, namePK, descriptionPK, pricePK, vote } = req.body;

  if (!namePK)
    return res
      .status(400)
      .json({ success: false, message: "Card must have name " });
  try {
    const newProductPK = new ProductPKModel({
      namePK,
      imgPK,
      descriptionPK,
      pricePK,
      vote,
    });
    await newProductPK.save();
    res.json({ success: true, message: "post th??nh c??ng", post: newProductPK }); // post: CardProduct s??? d???ng b??n g???i b??n front
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "l???i server" });
  }
};

const getAllProductPK = async (req, res) => {
  try {
    const productPKs = await ProductPKModel.find();
    res.status(200).json(productPKs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "l???i server" });
  }
};

module.exports = {
  PostPet,
  GetAllPets,
  UpdateOnlyPet,
  DeleteOnlyPet,
  GetAllDogs,
  GetAllCats,
  GetAllFoods,
  GetProductByID,
  postProductPK,
  getAllProductPK,
};
