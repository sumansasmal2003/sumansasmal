import mongoose, { Schema, models } from "mongoose";

const visitorSchema = new Schema({
  // We use a static identifier so we only ever have ONE document in this collection
  identifier: { type: String, default: "global", unique: true },
  count: { type: Number, default: 0 }
});

const Visitor = models.Visitor || mongoose.model("Visitor", visitorSchema);

export default Visitor;
