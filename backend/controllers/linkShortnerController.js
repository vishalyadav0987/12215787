const LinkShortnerSchema = require('../models/LinkShotnerSchema')
const { Log } = require('../../loging-middleware/logginMiddelware')
const generateUniqueShortCode = require('../utils/helper')

const createLinkShortner = async (req, res) => {
    try {
        const { originalUrl, time, shortCode } = req.body

        if (!originalUrl) {
            await Log("backend", "warn", "linkShortner", "Missing originalUrl in request");
            return res.status(400).json({
                success: false,
                message: "originalUrl is required"
            });
        }

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(originalUrl)) {
            await Log("backend", "warn", "linkShortner", `Invalid URL format: ${originalUrl}`);
            return res.status(400).json({ error: "Invalid URL format" });
        }

        let endShortCode = shortCode;

        if (shortCode) {
            const existingLink = await LinkShortnerSchema.findOne({ shortCode });
            if (existingLink) {
                await Log("backend", "warn", "linkShortner", `Short code already exists: ${shortCode}`);
                return res.status(409).json({
                    success: false,
                    message: "Short code already exists"
                });
            }
        } else {
            endShortCode = await generateUniqueShortCode();
        }

        const expiryDate = new Date(Date.now() + (time || 30) * 24 * 60 * 60 * 1000);

        const createLink = new LinkShortnerSchema({
            originalUrl,
            shortCode: endShortCode,
            validity: {
                time: time || 30
            },
            shortUrl: `${req.protocol}://${req.get('host')}/${endShortCode}`,
            expiryDate
        });

        await createLink.save();

        await Log("backend", "info", "linkShortner", `Successfully created short link: ${endShortCode} for ${originalUrl}`);

        res.status(201).json({
            success: true,
            data: {
                expires: time || 30,
                shortUrl: `${req.protocol}://${req.get('host')}/${createLink.shortCode}`,
            }
        });

    } catch (error) {
        await Log("backend", "error", "linkShortner", `Error creating link shortener: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Something went wrong in create controller"
        });
    }
}

const getAllLinks=async(req,res)=>{
    try {
        const links = await LinkShortnerSchema.find()
        res.status(200).json({
            success: true,
            data: links
            });
    } catch (error) {
        await Log("backend", "error", "linkShortner", `Error getting all links:
            ${error.message}`);
            res.status(500).json({
                success: false,
                message: "Something went wrong in get all controller"
                });
    }
}



module.exports = { createLinkShortner ,getAllLinks};