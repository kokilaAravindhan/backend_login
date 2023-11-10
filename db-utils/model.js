import mongoose from "mongoose";


const appUserSchema = new mongoose.Schema({
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true
    },isVerified: {
      type: 'boolean',
      required: true
    }
  });
  
  const AppUserModel = mongoose.model('users-register', appUserSchema);
  
  export { AppUserModel  }