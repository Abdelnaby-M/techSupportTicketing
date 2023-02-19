import { Schema, model } from 'mongoose';


export interface adminInterface {

    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string,
    active: boolean,
}


var validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const adminSchema = new Schema<adminInterface>({
    uid: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String,  unique: true, required: true, minlength: 6,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber: {type: String, unique: true},
    password: { type: String, required: true, select: false },
    role: {type: String, required: true},
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
});


const adminModel = model<adminInterface>('Admin', adminSchema);

export default adminModel;