const express = require("express");
const {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
// middleware to validate using jwt
router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);
// routes that have controller functions
//inside to perform actions when route is accessed

// get all  contacts route
// router.route("/").get(getContact);

// // create contact route
// router.route("/").post(createContact);

// // get single contact route
// router.route("/:id").get(getContactById);

// // update contact route
// router.route("/:id").put(updateContact);

// // delete contact route
// router.route("/:id").delete(deleteContact);

module.exports = router;
