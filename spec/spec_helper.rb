require 'spork'

Spork.prefork do
  # Loading more in this block will cause your tests to run faster. However, 
  # if you change any configuration or code from libraries loaded here, you'll
  # need to restart spork for it take effect.
  # 
  
  # This file is copied to ~/spec when you run 'ruby script/generate rspec'
  # from the project root directory.
  ENV["RAILS_ENV"] ||= 'test'
  require File.expand_path("../../config/environment", __FILE__)
  require 'rspec/autorun'
  require 'rspec/rails'
  require "webrat"
  require 'machinist/mongoid'
  require 'forgery'
  require 'database_cleaner'
end

Spork.each_run do
  # Requires supporting files with custom matchers and macros, etc,
  # in ./support/ and its subdirectories.
  Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}
  require File.expand_path(File.dirname(__FILE__) + "/blueprints.rb")
  
  DatabaseCleaner.strategy = :truncation
  
  Webrat.configure do |config|
    config.mode = :rails
  end
  
  RSpec.configure do |config|
    # == Mock Framework
    config.mock_with :rspec
    config.before(:each)    { DatabaseCleaner.clean }
    # config.before(:each)    { Sham.reset(:before_each) }
    # config.before(:all)     { Sham.reset(:before_all)  }
  end
end

