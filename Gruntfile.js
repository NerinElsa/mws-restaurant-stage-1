/*
 After you have changed any settings for the responsive_images task,
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            name: 'large',  
            width: 1600,
            suffix: '_2x',
            quality: 60
          },{
            name: 'small',
            width: 400,
            suffix: '_0.50x',
            quality: 20
          },{
            name: 'medium',
            width: 640,
            suffix: '_0.80x',
            quality: 30
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'responsiveimages/'
        }]
      }
    },

    
    /* Clear out the images directory if it exists 
    clean: {
      dev: {
        src: ['images'],
      },
    },
    */

    /* Generate the images directory if it is missing 
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },
    */

    /* Copy the "fixed" images that don't go through processing into the images/directory 
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['img/fixed/*.{gif,jpg,png}'],
          dest: 'images/',
          flatten: true,
        }]
      },
    },
   */
  });
  

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);
  //grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-mkdir');
  //grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
