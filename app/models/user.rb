class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable
  
  validates_presence_of   :name, :company_name

  field :name
  field :timezone, :default =>"est"
  field :locale, :default => "fr"
  field :company_name
  
  references_many :jobs, :dependent => :destroy
  
  attr_accessible :email, :password, :password_confirmation, :name, :timezone, :locale, :company_name
  
end