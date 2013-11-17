var pano = require('./panode');

var myPano = pano.generate({
	lat: '-37.850493',
	lng: '144.970284',
	outputLocation: __dirname + '/output.jpg'
}, function() {
	console.log("Panorama saved, do something else");
});
