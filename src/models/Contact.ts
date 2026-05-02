import mongoose, { Schema, models } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectDate: { type: String, required: true }, // NEW FIELD
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
