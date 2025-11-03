module.exports = (req, res, next) => {
    const { name, price } = req.body;
    const errors = [];

    if (!name) {
        errors.push({ field: 'name', message: 'Name is required' });
    }
    if (price == null) { // '==' null akan menangkap 'null' dan 'undefined'
        errors.push({ field: 'price', message: 'Price is required' });
    }

    if (errors.length > 0) {
        // Jika ada error, kirim respons 400 dan jangan lanjutkan
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors
        });
    }

    // Jika tidak ada error, lanjut ke fungsi route berikutnya
    next();
};
