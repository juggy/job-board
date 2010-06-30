class Account
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :company_name
  field :admin_email
  field :admin_name
  field :street
  field :city
  field :state
  field :zip
  field :country, :default  => "Canada"
  
  field :timezone
  field :locale, :default => "fr"
  
  field :subdomain

  has_many_related :users 
  embeds_one :owner, :class_name => "User"
  accepts_nested_attributes_for :owner, :allow_destroy => true
  
  ReservedSubdomains = 
       %w[admin blog dev ftp mail mailing email pop pop3 imap smtp stage staging stats status www help support aide image images stylesheet stylesheets assets assets0 assets1 assets2 assets3 assets4 assets5 assets6 assets7 assets8 assets9]

  validates_presence_of :subdomain
  validates_uniqueness_of :subdomain
  validates_length_of :subdomain, :within => 6..20
  validates_exclusion_of :subdomain, :in => ReservedSubdomains
  validates_format_of :subdomain, :with => /^[a-z0-9-]+$/

  before_validation :downcase_subdomain
  
  before_create :relate_owner

  def self.current_account
    Thread.current[:current_account]
  end
  
  def self.current_account=(account)
    Thread.current[:current_account] = account
    Thread.current[:current_account_id] = account ? account.id : nil
  end
  
  def self.current_account_id
    Thread.current[:current_account_id]
  end

  protected

  def downcase_subdomain
   self.subdomain.downcase!
  end
  
  def relate_owner
    self.users << self.owner
  end
  
  
end
