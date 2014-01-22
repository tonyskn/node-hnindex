module.exports = function(grunt) {

  grunt.initConfig({
    env: {
      mock: {
        HTTP_MOCK: 1
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'example/*.js' ] 
    },
    mochacov: {
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          output: 'coverage/report.html'
        }
      },
      test: {
        options: {
          reporter: 'spec'
        }
      },
      options: {
        ui: 'exports',
        timeout: 4000,
        'no-colors': true,
        'files': 'test/test-*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-env');

  // Tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['env:mock', 'mochacov:test']);
  grunt.registerTask('test-nomocks', ['mochacov:test']);

  grunt.registerTask('default', ['lint', 'test']);
  grunt.registerTask('coverage',['default', 'mochacov:coverage']);
  grunt.registerTask('travis',  ['default', 'mochacov:coveralls']);
};

