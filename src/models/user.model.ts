import { Schema, model } from 'mongoose';


export interface userInterface {

    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    // balance: number,
    active: boolean,
}

var validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new Schema<userInterface>({
    uid: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String,  unique: true, minlength: 6,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber: {type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
});


const userModel = model<userInterface>('User', userSchema);

export default userModel;
