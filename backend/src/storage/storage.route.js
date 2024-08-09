import { upload } from "../common/middlewares/upload.js";
import { StorageController } from "./storage.controller.js";

export class StorageRoute {
    constructor() {
        this.storageController = new StorageController()
    }

    bindRoutes(router) {
        router.post('/uploads', upload.single('file'), (req, res, next) => this.storageController.uploadFile(req, res, next))
    }
}