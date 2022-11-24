const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  PostPet,
  GetAllPets,
  UpdateOnlyPet,
  DeleteOnlyPet,
  GetAllDogs,
  GetAllCats,
  GetAllFoods,
  GetProductByID,
  getAllProductPK,
  postProductPK

} = require("../app/controllers/petcontroller");

router.post("/", upload.single("image"), PostPet);
router.get("/", GetAllPets);
router.put("/:id", upload.single("image"), UpdateOnlyPet);
router.delete("/:id", DeleteOnlyPet);
router.get("/dogs", GetAllDogs);
router.get("/cats", GetAllCats);
router.get("/foods", GetAllFoods);
router.get("/cart-product/products_by_id", GetProductByID);


// this is routes of Quang 
router.post('/product-Phu-Kien', postProductPK);
router.get('/product-Phu-Kien', getAllProductPK);

module.exports = router;
