var bcrypt = require('bcryptjs');

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 20
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            email: true
        },
        password: {
            type: 'string',
            required: true
        },
        active: {
            type: 'boolean',
            defaultsTo: true
        },
        blogs: {
            collection: 'blog',
            via: 'members',
            dominant: true
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        },

        //Override toJSON method to remove password from API
        toJSON: function() {
            var obj = this.toObject();
            // Remove the password object value
            delete obj.password;
            // return the new object without password
            return obj;
        }
    },

    beforeCreate: function(user, next) {
        // check exist email
        User.findOne({email: user.email}, function(err, data) {
            if (err) return next(err);
            if (data) return next(new Error('Email was already exist'));

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        next(err);
                    } else {
                        user.password = hash;
                        next(null, user);
                    }
                });
            });
        });
    }
};
