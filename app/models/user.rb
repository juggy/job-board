class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ScopeByAccount
  
  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable

  accepts_nested_attributes_for :account
  
  validates_presence_of   :username

  field :name
  field :username
  
end