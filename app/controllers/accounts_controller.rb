class AccountsController < ApplicationController
  skip_before_filter :load_current_account, :except=>:edit
  skip_before_filter :authenticate_user!, :except=>:edit
  
  def new
    @account = Account.new
    @account.owner = User.new
  end
  
  def create
    @account = Account.new(params[:account])
    if @account.save
      redirect_to(account_complete_url(@account.subdomain) + edit_account_path(@account))
    else
      render :action => "new"
    end
  end
  
  def edit
    @account = Account.current_account
  end
  
end