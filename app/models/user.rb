class User
  include Mongoid::Document
  include Mongoid::Timestamps
  
  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable

  belongs_to_related :account
  accepts_nested_attributes_for :account
  
  validates_presence_of   :username

  field :name
  field :username
  
end