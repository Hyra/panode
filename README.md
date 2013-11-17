# Panode

Generates Google Streetview Panoramas for a given lat / lon

## Installation

```
npm install panode
```

## Example usage

Let's say you geocoded an address to a lat / lon coordinate. To generate a streetview panorama for it, simply do:

```
var pano = require('./panode');

var myPano = pano.generate({
	lat: '52.347358',
	lng: '4.847041',
	outputLocation: __dirname + '/panorama.jpg'
}, function() {
	console.log("Panorama saved, do something else");
});
```

## Options

If you don't specifiy the `outputLocation` it will save per default to `panorama.jpg'

If you want to use a Google API Key (and you do, if you plan to use the streetview api extensively), you can pass it to the generate function as well:

```
var pano = require('./panode');

var myPano = pano.generate({
	lat: '52.347358',
	lng: '4.847041',
	apiKey: 'yOuR_UnIqUe_kEy' // Like so
}, function() {
	console.log("Panorama saved, do something else");
});
```