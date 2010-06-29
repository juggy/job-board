class User
  include Mongoid::Document

  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable

  belongs_to_related :account
  
  validates_presence_of   :username

  field :username, :type => String
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
  
end