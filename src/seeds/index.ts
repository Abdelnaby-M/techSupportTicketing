import config from '../config';
import adminModel from '../models/admin/admin.model';
import adminServices from '../services/adminServices';


export default class Seed {

    public static async run() {

        await this.saveAdmin();
    }
    
    private static async saveAdmin() {

        const { email } =  config.superAdmin;
        const currentAdmin = await adminModel.findOne({
            filter: { email }
        });
        if (!currentAdmin) {
            await adminServices.create(config.superAdmin);
        }
    }
}
