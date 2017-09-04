import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// todo: add uniqueness and email validation to email field
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamp: true },
);

schema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.generateJWT = function() {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET,
  );
};

schema.methods.toAuthJSON = function() {
  return {
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model('User', schema);
