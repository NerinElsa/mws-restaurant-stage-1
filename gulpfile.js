const gulp = require("gulp");
const workboxBuild = require('workbox-build');

gulp.task('generate-service-worker', () => {
    return workboxBuild.injectManifest({
        globDirectory: 'src',
        globPatterns: [
            '**/*.{html,css,js,webp,icon,gif,jpg}'
        ],
        swDest: 'src/sw.js',
        swSrc: 'src-sw.js',
    }).then(({warnings}) => {
        // In case there are any warnings from workbox-build, log them.
        for (const warning of warnings) {
          console.warn(warning);
        }
        console.info('Service worker generation completed.');
      }).catch((error) => {
        console.warn('Service worker generation failed:', error);
      });
});