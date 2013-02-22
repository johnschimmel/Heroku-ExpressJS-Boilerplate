
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

/*
	GET /
*/

exports.index = function(req, res){
	console.log("index page requested");

	var templateData = { pageTitle: 'Introduction to Templates' };

  	res.render('index', templateData);
};

/*
	GET /astronauts/:astro_id
*/
exports.listing = function(req, res) {
	
	console.log("listings page requested");

	var templateData = {
		astros : astronauts,
		pageTitle : astronauts.length + " NASA Astronauts"
	}

	res.render('listing.html', templateData);
}

/*
	GET /astronauts/:astro_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.astro_id);

	//get the requested astronaut by the param on the url :astro_id
	var astro_id = req.params.astro_id;
	var currentAstronaut = getAstronautById(astro_id);

	if (!currentAstronaut) {
		res.status(404).render('404.html');
	}

	var templateData = {
		astro : currentAstronaut,
		astros : astronauts,
		pageTitle : currentAstronaut.name
	}

	res.render('detail.html', templateData);
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

	// accept form post data
	var newAstro = {
		name : req.body.name,
		birthdate : req.body.birthdate,
		skills : req.body.skills,
		photo : req.body.photoUrl,
		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	}

	// push newAstro object into the 'astronauts' array.
	// this new astronaut will remain for as long as you 
	astronauts.push(newAstro)


	res.redirect('/astronauts/'+newAstro.slug)

}



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
	slug : 'john_young',
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


