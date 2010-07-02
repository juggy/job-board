class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable
  
  embedded_in :account, :inverse_of=>:users
  validates_presence_of   :username

  field :name
  field :username
  
  def self.find(*args)
    options = args.extract_options!
    user_options = Hash[*(options[:conditions] || {}).map { |k, v| [ :"users.#{k == :id ? :_id : k}", v ] }.flatten]
    if account = Account.find(*(args + [options.merge(:conditions => user_options)]))
      account.users.detect do |u|
        options[:conditions].all? { |k, v| u.send(k) == v }
      end
    else
      super
    end
  end

  def self.find_for_authentication(conditions={})
    if Account.current_account
      Account.current_account.users.detect { |u| u.username == conditions[:username] }
    else
      nil
    end
  end
    
end