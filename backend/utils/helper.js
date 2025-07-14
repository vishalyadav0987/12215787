const generateUniqueShortCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode;
    let isUnique = false;

    while (!isUnique) {
        shortCode = '';
        for (let i = 0; i < 6; i++) {
            shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const existingLink = await LinkShortnerSchema.findOne({ shortCode });
        if (!existingLink) {
            isUnique = true;
        }
    }

    return shortCode;
}

module.exports = generateUniqueShortCode;