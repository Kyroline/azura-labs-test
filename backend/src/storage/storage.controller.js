export class StorageController {
    constructor() { }

    async uploadFile(req, res, next) {
        try {
            res.json({ filename: req.file.filename });
        } catch (err) {
            res.sendStatus(400);
        }
    }
}