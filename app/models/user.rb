class User
  include Mongoid::Document

  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable

  belongs_to_related :account
  accepts_nested_attributes_for :account
  
  validates_presence_of   :username

  field :name
  field :username
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
  
end