if ENV['MONGOHQ_URL']
  settings = URI.parse(ENV['MONGOHQ_URL'])
  database_name = settings.path.gsub(/^\//, '')

  Mongoid.configure do |config|
    config.master = Mongo::Connection.new(settings.host, settings.port).db(database_name)
    config.master.authenticate(settings.user, settings.password) if settings.user
  end
  
else
  File.open(File.join(Rails.root, 'config/mongo.yml'), 'r') do |f|
    @settings = YAML.load(f)[Rails.env]
  end

  Mongoid.configure do |config|
    name = @settings["database"]
    host = @settings["host"]
    port = @settings["port"]
    logger = "irb" == $0 ? Logger.new($stdout) : Rails.logger
    config.master = Mongo::Connection.new(host, port, :logger => "irb" == $0 ? Logger.new($stdout) : Rails.logger).db(name)
  end
end