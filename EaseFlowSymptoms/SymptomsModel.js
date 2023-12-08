
// import mongoose from 'mongoose';

// const SubSymptomSchema = new mongoose.Schema({
//   subSymptom: {
//     type: String,
//   },
// });

// const SymptomCategorySchema = new mongoose.Schema({
//   category: {
//     type: String,
//     required: true,
//   },
//   selectedSubSymptoms: [SubSymptomSchema],
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
    unique: true, // Make sure 'user_id' is unique
  },
  username: {
    type: String,
    required: true,
  },
  symptomsdate: {
    type: Date,
    required: true,
    // unique: true, // Remove unique index on 'symptomsdate' to allow duplicates
  },
  symptoms: [SymptomCategorySchema],
}, { timestamps: true });

export default mongoose.model('symptoms', SymptomsSchema);
