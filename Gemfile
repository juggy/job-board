source 'http://rubygems.org'

gem 'rails', '3.0.0.beta4'

# Mongo Adapter
#git "git://github.com/mongodb/mongo-ruby-driver.git"
#gem "mongo", "=1.0.1"
gem "bson_ext"
gem "mongoid", :git => "git://github.com/durran/mongoid.git"
gem 'database_cleaner'

#Authentification
gem 'devise', :git => 'git://github.com/plataformatec/devise.git', :tag => 'v1.1.rc2'
gem 'mongo_session_store', :git => 'git://github.com/nmerouze/mongo_session_store.git'

#Layout
gem "haml"
gem "formtastic", :git=>"git://github.com/justinfrench/formtastic.git", :branch=>"rails3"
gem 'rails3-generators', :group => :development


#Chargify
gem "chargify_api_ares"

group :test do
  # bundler requires these gems while running tests
  gem 'webrat'
  gem 'rspec', '>=2.0.0.beta.1'
  gem 'rspec-rails', '>=2.0.0.beta.1'
  gem 'autotest'
  gem 'autotest-rails'
  gem 'autotest-growl'
  gem 'autotest-fsevent', '0.1.1', :require => false
  gem 'spork'
  gem 'machinist_mongo', "2.0.0.pre"
  gem 'forgery'
end