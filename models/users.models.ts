import Joi from 'joi';
import mongoose from 'mongoose';
const userSchema = mongoose.Schema


const usersModel = new userSchema(
    {
        names : {
            firstName: { type : String, required : true },
            lastName: { type : String, required : true },
                },
        user_Id: {type: String, required: true, unique: true},
        email: { type: String, unique: true },
        password: { type: String, required: true, minlength: 8 },
        accountType: { type: String }, //student, Lecturer, Admin
        verified: {type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

export const Users = mongoose.models.Users_2 || mongoose.model('Users_2', usersModel);

const validate = (User: any) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    pasaword: Joi.string().min(8).max(255).required(),

  });
  return schema.validate(User);
};