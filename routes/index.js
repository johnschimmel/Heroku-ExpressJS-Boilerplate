
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var moment = require("moment"); // date manipulation library
var astronautModel = require("../models/astronaut.js"); //db model


/*
	GET /
*/
exports.index = function(req, res) {
	
	console.log("main page requested");

	// query for all astronauts
	// .find will accept 3 arguments
	// 1) an object for filtering {} (empty here)
	// 2) a string of properties to be return, 'name slug source' will return only the name, slug and source returned astronauts
	// 3) callback function with (err, results)
	//    err will include any error that occurred
	//	  allAstros is our resulting array of astronauts
	astronautModel.find({}, 'name slug source', function(err, allAstros){

		if (err) {
			res.send("Unable to query database for astronauts").status(500);
		};

		console.log("retrieved " + allAstros.length + " astronauts from database");

		var templateData = {
			astros : allAstros,
			pageTitle : "NASA Astronauts (" + allAstros.length + ")"
		}

		res.render('index.html', templateData);
	});

}

/*
	GET /astronauts/:astro_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.astro_id);

	//get the requested astronaut by the param on the url :astro_id
	var astro_id = req.params.astro_id;

	// query the database for astronaut
	astronautModel.findOne({slug:astro_id}, function(err, currentAstronaut){

		if (err) {
			return res.status(500).send("There was an error on the astronaut query");
		}

		if (currentAstronaut == null) {
			return res.status(404).render('404.html');
		}

		console.log("Found astro");
		console.log(currentAstronaut.name);

		// formattedBirthdate function for currentAstronaut
		currentAstronaut.formattedBirthdate = function() {
			// formatting a JS date with moment
			// http://momentjs.com/docs/#/displaying/format/
            return moment(this.birthdate).format("dddd, MMMM Do YYYY");
        };
		
		//query for all astronauts, return only name and slug
		astronautModel.find({}, 'name slug', function(err, allAstros){

			console.log("retrieved all astronauts : " + allAstros.length);

			//prepare template data for view
			var templateData = {
				astro : currentAstronaut,
				astros : allAstros,
				pageTitle : currentAstronaut.name
			}

			// render and return the template
			res.render('detail.html', templateData);


		}) // end of .find (all) query
		
	}); // end of .findOne query

}

/*
	GET /create
*/
exports.astroForm = function(req, res){

	var templateData = {
		page_title : 'Enlist a new astronaut'
	};

	res.render('create_form.html', templateData);
}

/*
	POST /create
*/
exports.createAstro = function(req, res) {
	
	console.log("received form submission");
	console.log(req.body);

	// accept form post data
	var newAstro = new astronautModel({
		name : req.body.name,
		photo : req.body.photoUrl,
		source : {
			name : req.body.source_name,
			url : req.body.source_url
		},
		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')

	});

	// you can also add properties with the . (dot) notation
	newAstro.birthdate = moment(req.body.birthdate);
	newAstro.skills = req.body.skills.split(",");

	// walked on moon checkbox
	if (req.body.walkedonmoon) {
		newAstro.walkedOnMoon = true;
	}
	
	// save the newAstro to the database
	newAstro.save(function(err){
		if (err) {
			console.error("Error on saving new astronaut");
			console.error("err");
			return res.send("There was an error when creating a new astronaut");

		} else {
			console.log("Created a new astronaut!");
			console.log(newAstro);
			
			// redirect to the astronaut's page
			res.redirect('/astronauts/'+ newAstro.slug)
		}

	});

	
	

}

exports.loadData = function(req, res) {

	// load initial astronauts into the database
	for(a in astronauts) {

		//get loop's current astronuat
		currAstro = astronauts[a];

		// prepare astronaut for database
		tmpAstro = new astronautModel();
		tmpAstro.slug = currAstro.slug;
		tmpAstro.name = currAstro.name;
		tmpAstro.missions = currAstro.missions;
		tmpAstro.photo = currAstro.photo;
		tmpAstro.source = currAstro.source;
		tmpAstro.walkedOnMoon = currAstro.walkedOnMoon;
		
		// convert currAstro's birthdate string into a native JS date with moment
		// http://momentjs.com/docs/#/parsing/string/
		tmpAstro.birthdate = moment(currAstro.birthdate); 

		// convert currAstro's string of skills into an array of strings
		tmpAstro.skills = currAstro.skills.split(",");

		// save tmpAstro to database
		tmpAstro.save(function(err){
			// if an error occurred on save.
			if (err) {
				console.error("error on save");
				console.error(err);
			} else {
				console.log("Astronaut loaded/saved in database");
			}
		});

	} //end of for-in loop

	// respond to browser
	return res.send("loaded astronauts");

} // end of loadData function



/*
	Astronaut Data
*/ 

var astronauts = [];
astronauts.push({
	slug : 'john_glenn',
	name : 'John Glenn',
	birthdate : 'July 18, 1921',
	missions : ['Mercury-Atlas 6','STS-95'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	skills : 'Test pilot',
	walkedOnMoon : false
});

astronauts.push({
	slug : 'john_watt_young',
	name : 'John Young',
	birthdate : 'September 24, 1930',
	missions : ['Gemini 3','Gemini 10','Apollo 10', 'Apollo 16','STS-1','STS-9'
],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/e/ef/Astronaut_John_Young_gemini_3.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Young_(astronaut)'
	},
	skills : 'Test pilot',
	walkedOnMoon : true
});

astronauts.push({
	slug : 'sunita_williams',
	name : 'Sunita Williams',
	birthdate : 'September 19, 1965',
	missions : ['STS-116', 'STS-117', 'Expedition 14', 'Expedition 15', 'Soyuz TMA-05M', 'Expedition 32'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sunita_Williams.jpg/480px-Sunita_Williams.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/Sunita_Williams'
	},
	skills : 'Test pilot',
	walkedOnMoon : false
});


// Look up an astronaut by id
// accepts an 'id' parameter
// loops through all astronauts, checks 'id' property
// returns found astronaut or returns false is not found
var getAstronautById = function(slug) {
	for(a in astronauts) {
		var currentAstro = astronauts[a];

		// does current astronaut's id match requested id?
		if (currentAstro.slug == slug) {
			return currentAstro;
		}
	}

	return false;
}


