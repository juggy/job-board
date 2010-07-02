File.open(File.join(Rails.root, 'config/mongo.yml'), 'r') do |f|
  @settings = YAML.load(f)[RAILS_ENV]
end

Mongoid.configure do |config|
  name = @settings["database"]
  host = @settings["host"]
  port = @settings["port"]
  logger = "irb" == $0 ? Logger.new($stdout) : Rails.logger
  config.master = Mongo::Connection.new(host, port, :logger => "irb" == $0 ? Logger.new($stdout) : Rails.logger).db(name)
end