class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise  :validatable, :database_authenticatable, :lockable, :rememberable, :registerable, :trackable
  references_many :jobs, :dependent => :destroy
  embeds_one :user_information
  after_initialize :create_information
  
  
  attr_accessible :email, :password, :password_confirmation#, :user_information_attributes
  accepts_nested_attributes_for :user_information
  
  delegate :name, :timezone, :locale, :company_name, :to=>:user_information
  
  protected
  
  def create_information
    self.user_information = UserInformation.new if self.user_information.nil?
  end
  
end