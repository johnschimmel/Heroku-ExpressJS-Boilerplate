
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};