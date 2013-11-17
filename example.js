var pano = require('./panode');

var myPano = pano.generate({
	lat: '52.347358',
	lng: '4.847041',
	outputLocation: require('path').normalize(__dirname + '/_panos/output.jpg')
}, function() {
	console.log("Panorama saved, do something else");
});
