const common = {};

common.validateEmail = (email) => {
    const regexEmail = new RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/);
    return regexEmail.test(email);
};

common.validatePassword = (password) => {
    const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    return regexPassword.test(password);
};

common.successResponse = (res, data, payload) => {
    res.status(200).json({
        success: true,
        data,
        ...payload
    });
};

common.errorCommonResponse = (res, error = 'Something Error') => {
    res.status(400).json({
        success: false,
        error: error && error.toString()
    });
};

common.notFoundResponse = (res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found'
    });
};


module.exports = common;