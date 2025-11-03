module.exports = (err, req, res, next) => {
    // Mencatat error ke console untuk debugging
    console.error(err.stack); 

    // Mengirim respons error yang rapi ke client
    res.status(500).json({ success: false, message: 'Server error' });
};