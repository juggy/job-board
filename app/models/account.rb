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

  embeds_many :users 
  accepts_nested_attributes_for :users
  
  ReservedSubdomains = 
       %w[admin blog dev ftp mail mailing email pop pop3 imap smtp stage staging stats status www help support aide image images stylesheet stylesheets assets assets0 assets1 assets2 assets3 assets4 assets5 assets6 assets7 assets8 assets9]

  validates_presence_of :subdomain
  validates_uniqueness_of :subdomain
  validates_length_of :subdomain, :within => 6..20
  validates_exclusion_of :subdomain, :in => ReservedSubdomains
  validates_format_of :subdomain, :with => /^[a-z0-9-]+$/
  
  validates_each :users do |document, attribute, value|
    users = value.to_a
    unless users.any? && users.all?(&:valid?)
      document.errors.add(attribute, :invalid, :value => value)
    end
  end

  before_validation :downcase_subdomain
  
  #before_create :relate_owner
  after_create :make_current

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
  
  # def relate_owner
  #    self.users << self.owner if self.owner
  #  end
  
  def make_current
    Account.current_account = self
  end
  
  
end
