# Panode

A NodeJS module to generate Google Streetview Panoramas for a given lat / lon, using Hugin.

## Panoramas

![Example 1](/pano_examples/01.jpg)
![Example 2](/pano_examples/02.jpg)
![Example 3](/pano_examples/03.jpg)

## Installation

We depend on the crossplatform [Hugin](http://hugin.sourceforge.net) command line software, which you can find [here](http://hugin.sourceforge.net).

Make sure you add the paths to your environment, so node can find it. On my Mac I had to add the following to my environment variables:

```
export PATH=$PATH:/Applications/Hugin/HuginTools
export PATH=$PATH:/Applications/Hugin/Hugin.app/Contents/MacOS
```

Next, simply install the NPM module:

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