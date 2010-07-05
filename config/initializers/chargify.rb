require 'chargify_api_ares'

File.open(File.join(Rails.root, 'config/chargify.yml'), 'r') do |f|
  @settings = YAML.load(f)[Rails.env]
end

Chargify.configure do |c|
  c.subdomain = @settings['subdomain']
  c.api_key   = @settings['api_key']
end