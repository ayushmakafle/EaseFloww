
// // import { Timestamp } from 'mongodb';
// // import mongoose, { Schema, model } from 'mongoose';
// // const SymptomsSchema = new mongoose.Schema({
// //   user_id: {
// //       type: String,
// //       required: true,
// //       unique: true
// //   },
// //   username: {
// //       type: String,
// //       required: true,
// //       unique: true
// //   },
// //   symptoms: [
// //       {
// //           category: String,
// //           selectedSubSymptoms: [String]
// //       }
// //   ],
// // }, { timestamps: true });

// // export default mongoose.model("symptoms", SymptomsSchema);

// import mongoose from 'mongoose';

// const SymptomCategorySchema = new mongoose.Schema({
//   category: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   selectedSubSymptoms: [{
//     type: String,
//   }],
// });

// const SymptomsSchema = new mongoose.Schema({
//   user_id: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   symptomsdate: {
//     type: Date,
//     required: true,
//   },
//   symptoms: [SymptomCategorySchema],
// }, { timestamps: true });

// export default mongoose.model('symptoms', SymptomsSchema);
import mongoose from 'mongoose';

const SubSymptomSchema = new mongoose.Schema({
  subSymptom: {
    type: String,
  },
});

const SymptomCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  selectedSubSymptoms: [SubSymptomSchema],
});

const SymptomsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  symptomsdate: {
    type: Date,
    required: true,
  },
  symptoms: [SymptomCategorySchema],
}, { timestamps: true });

export default mongoose.model('symptoms', SymptomsSchema);
