class Job
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :company_name
  field :title
  field :short_description
  field :description
  field :city
  field :state
  field :country, :default  => "Canada"
  field :contact_email
  field :contact_phone
  field :published
  
  referenced_in :user
  
  validates_presence_of :company_name, :title, :description, :city, :state, :country
  validates_format_of :contact_email, :with => /\A([-a-z0-9!\#$%&'*+\/=?^_`{|}~]+\.)*[-a-z0-9!\#$%&'*+\/=?^_`{|}~]+@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

  
end
