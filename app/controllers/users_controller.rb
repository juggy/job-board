class UsersController < ApplicationController
  skip_before_filter :authenticate_user!, :except=>:edit
  
  def show
    render :json=>current_user.to_json(:only=>[:company_name, :email, :name])
  end
end