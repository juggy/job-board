class UserInformation
  include Mongoid::Document
  include Mongoid::Timestamps
  
  validates_presence_of   :name, :company_name
  
  field :name
  field :timezone, :default =>"est"
  field :locale, :default => "fr"
  field :company_name
  
  embedded_in :user, :inverse_of=>"user_information"
  
  attr_accessible :name, :timezone, :locale, :company_name
  
  delegate :email, :to=>:user
  
end