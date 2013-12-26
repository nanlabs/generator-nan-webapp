  'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NanWebappGenerator = module.exports = function NanWebappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NanWebappGenerator, yeoman.generators.Base);

NanWebappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What do you want to call your new project?'
    },
    {
      name: 'devPort',
      message: 'What dev port do you want to use?',
      default: 9000
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.devPort = props.devPort;

    cb();
  }.bind(this));
};

NanWebappGenerator.prototype.app = function app() {
  
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');

  // App files
  this.mkdir('app');
  this.mkdir('app/js');
  this.mkdir('app/templates');
  this.template('index.html', 'app/index.html');
  this.copy('js/app.js', 'app/js/app.js');
  this.copy('js/main-require.js', 'app/js/main-require.js');

  // Assets
  this.mkdir('app/assets');
  this.mkdir('app/assets/less');
  this.copy('less/index.less', 'app/assets/less/index.less');
  this.copy('less/commons.less', 'app/assets/less/commons.less');
  this.copy('less/variables.less', 'app/assets/less/variables.less');
  this.copy('less/general.less', 'app/assets/less/general.less');
};

NanWebappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
