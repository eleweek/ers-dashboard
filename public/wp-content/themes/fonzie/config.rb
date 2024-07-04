require 'sass'
require 'sass-globbing'

# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass


module Sass::Script::Functions

     def inline_svg_image(path)
       real_path = File.join(Compass.configuration.images_path, path.value)
       svg = data(real_path)
       encoded_svg = URI::encode(svg)
       data_url = "url('data:image/svg+xml;utf8," + encoded_svg + "')"
       Sass::Script::String.new(data_url)
     end

   private

     def data(real_path)
       if File.readable?(real_path)
         File.open(real_path, "rb") {|io| io.read}
       else
         raise Compass::Error, "File not found or cannot be read: #{real_path}"
       end
     end

   end