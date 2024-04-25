const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// below are the controller functions that get triggered when a route - is access -ed

// desc - Get all contacts
// route - GET /api/contacts
// access - private
const getContact = asyncHandler(async (req, res) => {
  console.log("req.user.id: getcontact ", req.user.id);
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
// desc - get contact by id
// route - GET /api/contacts/:id
// access - private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
// desc - create new contact
// route - POST /api/contacts
// access - private
const createContact = asyncHandler(async (req, res) => {
  console.log("req.user.id: createcontact ", req.user.id);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});
// desc - update contact by id
// route - PUT /api/contacts/:id
// access - private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.stattus(403);
    throw new Error(
      "Permission denied user cannot update another user's contact"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});
// desc - delete contact by id
// route - DELETE /api/contacts/:id
// access - private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.stattus(403);
    throw new Error(
      "Permission denied user cannot delete another user's contact"
    );
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
