var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AstronautSchema = new Schema({
    slug : { type: String, lowercase: true, unique: true },
	name : String,
	birthdate : Date,
	missions : [String],
	photo : String,
	source : {
		name : String,
		url : String
	},
	skills : [String],
	walkedOnMoon : Boolean,
	
    lastupdated : { type: Date, default: Date.now }
});


module.exports = mongoose.model('Astronaut',AstronautSchema);