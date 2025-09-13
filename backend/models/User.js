const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  age: { type: Number },
  place: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  aadhar: { type: String, unique: true },
  emergencyNumbers: [{ type: String }],
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
