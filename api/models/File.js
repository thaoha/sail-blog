/**
 * Created by ThaoHa on 11/3/2014.
 */

module.exports = {
    attributes: {
        path: {
            type: 'string',
            required: true
        },
        user: {
            model: 'user'
        }
    }
};