const statusConstants = require('../constants/status');

class Request {

    static success(data, msg) {
        return {
            status: statusConstants.SUCCESS,
            data: data,
            msg: msg,
            timestamp: new Date(),
        };
    }

    static error(result, msg) {
        return {
            status: statusConstants.ERROR,
            result: result,
            msg: msg,
            timestamp: new Date(),
        }
    }

}

module.exports = Request;
