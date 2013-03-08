var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ship's log schema
var shipLogSchema = new Schema({
	date : Date,
	content : String
})


// define astronaut schema
var AstronautSchema = new Schema({
    slug : { type: String, lowercase: true, required: true, unique: true },
	name : { type: String, required: true},
	birthdate : Date,
	missions : [String],
	photo : String,
	source : {
		name : String,
		url : String
	},
	skills : [String],
	walkedOnMoon : Boolean,
    lastupdated : { type: Date, default: Date.now },
    shiplogs : [shipLogSchema]
});


// export 'Astronaut' model
module.exports = mongoose.model('Astronaut',AstronautSchema);