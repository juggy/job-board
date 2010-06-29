class AccountsController < ApplicationController
  skip_before_filter :load_current_account, :except=>:merci
  skip_before_filter :authenticate_user!, :except=>:merci
  
  def new
    @account = Account.new
    @account.owner = User.new
  end
  
  def create
    @account = Account.new(params[:account])
    if @account.save
      render :action => "merci"
    else
      render :action => "new"
    end
  end
  
  def merci
  end
  
end