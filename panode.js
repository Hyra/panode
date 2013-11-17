var _config = {
  amount_of_pics : 12,
  outputLocation: 'panorama.jpg',
  apiKey: ''
};

amount_downloaded = 0;

var p = require('path');
var fs = require('fs-extra');
var request = require('request');

function mergeConfig(config) {
  for(var attr in config) {
    _config[attr] = config[attr];
  }
}

exports.generate = function(args, cb) {
  mergeConfig(args);
  _config.cb = cb;
  console.log('Generating panorama for ' + _config.lat + ' / ' + _config.lng);
  fs.mkdirsSync(p.normalize(__dirname + '/_tmp'));
  for(var i=0; i<_config.amount_of_pics; i++) {
    var heading = 360 / _config.amount_of_pics * i;
    var targetFile = 'http://maps.googleapis.com/maps/api/streetview?size=640x640&location='+args.lat+','+args.lng+'&fov=80&heading=' + heading + '&pitch=0&sensor=false';
    if(_config.apiKey !== '') {
      targetFile += '&key=' + _config.apiKey;
    }
    download(
      targetFile,
      p.normalize(__dirname + '/_tmp/view-'+i+'.jpg')
    );
  }
};

function startPano() {
  if(++amount_downloaded == _config.amount_of_pics) {
    var ExecPlan = require('exec-plan').ExecPlan;
    var execPlan = new ExecPlan({
      autoPrintOut: false
    });

    process.chdir(__dirname + '/_tmp/');

    execPlan.add('pto_gen -o project.pto *.jpg');
    execPlan.add('cpfind -o project.pto --multirow --celeste project.pto');
    execPlan.add('cpclean -o project.pto project.pto');
    execPlan.add('linefind -o project.pto project.pto');
    execPlan.add('autooptimiser -a -m -l -s -o project.pto project.pto');
    execPlan.add('pano_modify --canvas=2600x450 -s -o project.pto project.pto');
    execPlan.add('pto2mk -o project.mk -p output project.pto');
    execPlan.add('make -f project.mk all');

    execPlan.execute();

    execPlan.on('data', function (stdout) {
    });

    execPlan.on('complete', function (stdout) {
      console.log('Panorama generated!');
      // Remove temporary files
      fs.rename(p.normalize(__dirname + '/_tmp/output.tif'), _config.outputLocation, function(err) {
        amount_downloaded = 0;
        fs.removeSync(p.normalize(__dirname + '/_tmp'));
        _config.cb();
      });
    });
  }
}

function download(src, dst) {
  var file = fs.createWriteStream(dst);
  request(src).pipe(file);
  file.on('finish', function() {
    file.close();
    startPano();
  });
}
