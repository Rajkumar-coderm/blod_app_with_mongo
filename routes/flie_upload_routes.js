const { fileUpload ,getAllFiles} = require("../controller/file_upload_controller");
const router = require("express").Router();

router.post("/upload", fileUpload);
router.get("/getAllFiles", getAllFiles);


module.exports = router;
