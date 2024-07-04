Fonzie
===============

Requirements
------------

* Node
* gulp (`npm install -g gulp`)
* Sass & Compass (`gem install sass compass`)

Getting started
---------------

Run `npm install`, once dependent packages have been installed run `gulp` to begin watching the `src` directory for changes.

Usage
-----

By default, there are two tasks that can be run in your `gulpfile`:

* `gulp` watches for changes in the following folders:
	* `src/sass ➔ css`  : watches `.scss` files; compiles and minifies files to `css`
	* `src/js ➔ js` : watches `.js` files and lints on save; concatenates all files to `js/scripts.js`, and minifies to `js/min/scripts.min.js`
	* `src/images ➔ images` watches `.jp(e)g`, `.png` & `.svg` files; optimises files to `images`
* `gulp compile` runs a build of all `js`, `sass` and `image` assets, including clean of destination `images` folder

**Important:** To ensure the child theme functions correctly, do not modify or delete the `style.css` file in the base of theme; instead load the style(s) compiled to the `css` directory.

Adding additional tasks
-----------------------

Want to add more tasks or processes? Check out the [gulp plugin registry](http://gulpjs.com/plugins/).


FED Style Guide
---------------

### Browser Support
* Latest 2 Versions and IE 9 up

### Project Structure
* Templates located in `templates` folder

### HTML
* [BEM Implementation](https://en.bem.info/method/naming-convention/)

### Assets
* Assets included into `src/images/type/`
* FontAwesome Icon Set
	* [FontAwesome Cheatsheet](https://fortawesome.github.io/Font-Awesome/cheatsheet/)


### SCSS
* Bootstrap V4 SCSS
	* [Official v4 branch](https://github.com/twbs/bootstrap/tree/v4-dev)
	* Version 4.0.0-alpha
* New line for each element
* Pixels will be converted to em via `postcss/pxtorem`
* Use `image-url()` to include assets
* Compass Mixins can be used
* Split `scss` into `sass/base`, `sass/components`, `sass/global` and `sass/layout` and include those partials into `sass/style.scss` as a new line

```
.block-name{

    &__element-name{
        @include mixin-name();
        padding: 20px;
        margin: 10px 0;
        color: $font-color;
        background: {
            image: image-url('svg/caret-down.svg');
            size: 20px 20px;
            repeat: no-repeat;
            position: center right 1.25rem;
        }

        &_modifier-colour{
            color: $font-color--blue;
        }

        &_modifier-background{
            background: {
                image: image-url('svg/caret-up.svg');
            }
        }

    }

}
```



