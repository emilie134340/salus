const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    unique: true, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  dashboard: {
    motivation: { type: String },
    goals: { type: String },
    challenges: { type: String },
    consequencesOfAccomplishing: { type: String },
    consequencesOfNotAccomplishing: { type: String },
    values: { type: String }
  },
  recoveryWheel: {
    occupational: [{ rating: { type: Number, min: 1, max: 4 } }],
    physical: [{ rating: { type: Number, min: 1, max: 4 } }],
    financial: [{ rating: { type: Number, min: 1, max: 4 } }],
    intellectual: [{ rating: { type: Number, min: 1, max: 4 } }],
    emotional: [{ rating: { type: Number, min: 1, max: 4 } }],
    social: [{ rating: { type: Number, min: 1, max: 4 } }],
    spiritual: [{ rating: { type: Number, min: 1, max: 4 } }],
    environmental: [{ rating: { type: Number, min: 1, max: 4 } }]
  },
  recoveryToolbox: {
    occupational: { type: String },
    physical: { type: String },
    financial: { type: String },
    intellectual: { type: String },
    emotional: { type: String },
    social: { type: String },
    spiritual: { type: String },
    environmental: { type: String }
  },
  hotSpots: {
    social: {
      triggers: [String],
      response: { type: String }
    },
    places: {
      triggers: [String],
      response: { type: String }
    },
    things: {
      triggers: [String],
      response: { type: String }
    },
    feelings: {
      triggers: [String],
      response: { type: String }
    },
    financial: {
      triggers: [String],
      response: { type: String }
    },
    spiritual: {
      triggers: [String],
      response: { type: String }
    },
    environmental: {
      triggers: [String],
      response: { type: String }
    },
    intellectualOccupational: {
      triggers: [String],
      response: { type: String }
    }
  }
}, { timestamps: true });

// await User.create({
//   _id: "auth0|672eaa0827f4220aa4a80156", // get from auth0??? how?
//   firstName: "GET FROM GMAIL????? has option given_name"
// });
const newUser = mongoose.model('newUser', userSchema);
module.exports = newUser;