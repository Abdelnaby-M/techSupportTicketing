import { Document, Model, Types } from 'mongoose';

export enum IAdminRole {
    ADMIN = 'admin',
}

export interface IAdminProps {
    _id?: Types.ObjectId;
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    password: string,
    role: string,
    active?: boolean,
}

export interface IAdminDocument extends IAdminProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IAdminModel extends Model<IAdminDocument> { }
