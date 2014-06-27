#Use this file to set/override Jasmine configuration options
#You can remove it if you don't need it.
#This file is loaded *after* jasmine.yml is interpreted.
#
#Example: using a different boot file.
#Jasmine.configure do |config|
#   config.boot_dir = '/absolute/path/to/boot_dir'
#   config.boot_files = lambda { ['/absolute/path/to/boot_dir/file.js'] }
#end
#
#Example: prevent PhantomJS auto install, uses PhantomJS already on your path.
#Jasmine.configure do |config|
#   config.prevent_phantomjs_auto_install = true
#end

require 'fileutils'

class JqueryLoaderApp

  def initialize(app)
    @app = app
  end

  def fetch(url)
    FileUtils.mkdir_p('cache')
    file = "cache/#{File.basename(url)}"
    IO.write(file, `curl '#{url}'`) if !File.exist?(file)
    IO.read(file)
  end

  def call(env)
    path = env['PATH_INFO']
    if path == '/jquery_cdn.js'
      [200, {}, fetch('https://code.jquery.com/jquery-2.1.1.min.js')]
    elsif path == '/jquery_ui_cdn.js'
      [200, {}, fetch('https://code.jquery.com/ui/1.10.4/jquery-ui.min.js')]
    else
      @app.call(env)
    end
  end

end

Jasmine.configure do |config|
  config.add_rack_app JqueryLoaderApp
end
