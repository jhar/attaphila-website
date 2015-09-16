var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UsersSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	joined: {
		type: Date,
		default: Date.now
	},
	salt: String,
	provider: {
		type: String,
		required: true
	},
	providerId: String,
	providerData: {}
});

UsersSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UsersSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UsersSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
}

UsersSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('Users', UsersSchema);