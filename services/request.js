const statusConstants = require('../constants/status');

class Request {

    static success(data, msg) {
        return {
            status: statusConstants.SUCCESS,
            data: data,
            msg: msg,
        };
    }

    static error(result, msg) {
        return {
            status: statusConstants.ERROR,
            result: result,
            msg: msg,
        }
    }

}

module.exports = Request;
