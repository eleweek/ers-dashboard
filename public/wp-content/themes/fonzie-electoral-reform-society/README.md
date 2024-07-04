Electoral Reform Society
===============

Requirements
------------

* Node
* gulp (`npm install -g gulp`)
* Sass (`gem install sass`)

Getting started
---------------

Run `npm install`, once dependent packages have been installed run `gulp` to begin watching the `src` directory for changes.

Usage
-----

By default, there are two tasks that can be run in your `gulpfile`:

* `gulp` watches for changes in the following folders:
	* `src/sass ➔ css`  : watches `.scss` files; compiles and minifies files to `css`
		- linting is handled via **[stylelint](https://github.com/stylelint/stylelint)**
		- minification is handled by **[cssnano](https://www.npmjs.com/package/cssnano)**
		- vendor prefixes are handled automatically via **[Autoprefixer](https://www.npmjs.com/package/autoprefixer)**
		- pixels are automatically converted to rems via **[postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)**
	* `src/js ➔ js` : watches `.js` files and lints on save; concatenates all files to `js/scripts.js`, and minifies to `js/min/scripts.min.js`
		- linting is handled via **[gulp-eslint](https://github.com/adametry/gulp-eslint)**
		- ES6 transpiling is handled via **[gulp-babel](https://www.npmjs.com/package/gulp-babel)**
		- concatenation is handled via **[gulp-concat](https://www.npmjs.com/package/gulp-concat)**
		- minification is handled via **[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)**
	* `src/images ➔ images` watches `.jp(e)g`, `.png` & `.svg` files; optimises files to `images`
		- minification is handled via **[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)**
* `gulp compile` runs a build of all `js`, `sass` and `image` assets, including clean of destination `images` folder

**Important:** To ensure the child theme functions correctly, do not modify or delete the `style.css` file in the base of theme; instead load the style(s) compiled to the `css` directory.

Adding additional tasks
-----------------------

Want to add more tasks or processes? Check out the [gulp plugin registry](http://gulpjs.com/plugins/).
