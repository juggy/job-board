require "mongoid/criteria"
module ScopeByAccount
  extend ActiveSupport::Concern
  included do
    belongs_to_related :account
    validates_presence_of :account_id

    before_validation :set_account_id
  end
  module ClassMethods
    def criteria
      account_id = Account.current_account_id
      raise MissingAccountError if account_id.nil?
    
      Mongoid::Criteria.new(self).where(:account_id => account_id)
    end
  end
  
  module InstanceMethods
    def set_account_id
      return if( self.persisted?)
        
      account_id = Account.current_account_id
      raise MissingAccountError if account_id.nil?

      self.account_id = account_id
    end
  end

  class MissingAccountError < StandardError
  end
end