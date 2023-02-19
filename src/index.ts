import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import routesIndex from "./routes/index";
import * as dotenv from 'dotenv';
import logger from "morgan";
import Seed from "./seeds";
import config from "./config";

dotenv.config();

class App{

    public app: express.Application = express();
    public port: number = config.port;
    private mongoUrl :string = config.mongoUrl;
    // private seed = new Seed();


    constructor() {

        this.app.use(cors());
        this.app.use(json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(logger("dev"));

        routesIndex('/api', this.app);

        this.mongoSetup();
        Seed.run()
        // this.seed.run()
        this.runServer(this.app);
    }

    private mongoSetup(): void {

        mongoose.connect(this.mongoUrl)
        .catch((err: Error) => console.error(err.message));

        const connection = mongoose.connection;
        connection.once("open", () => {
        console.log("MongoDB database connection established successfully");
        });
    }

    private runServer(app: express.Application){
        app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
            
        });
    }

}


export default new App().app;