
import {Express} from 'express'
import * as Notification from "../../modules/Notification/server"
import * as User from "../../modules/User/server"
const dynamicModule = (app: Express) => {
        if((Notification as any).router){
            app.use("/notification", (Notification as any).router)
        }
        
        if((User as any).router){
            app.use("/user", (User as any).router)
        }
        }
export default dynamicModule
    