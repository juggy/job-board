class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include AccountLocation
  
  layout 'application'
  
  before_filter :load_current_account
  before_filter :authenticate_user!
  
  protected
  def load_current_account
    Account.current_account = nil # clear previous
    p account_subdomain
    @current_account ||= Account.first(:conditions=>{:subdomain=>account_subdomain})
    p @current_account
    unless @current_account
      unless @no_account_redirect
        p "redirected"
        redirect_to sign_up_path
      else
        raise ScopedByAccount::MissingAccountError
      end
    end
       
    Account.current_account = @current_account
  end
end
