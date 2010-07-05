require 'spec_helper'


describe "Accounts" do
  describe "/sign_up" do
  
    it "should create a valid account and user if provided all mandatory info" do
      visit sign_up_path
      fill_in "account[subdomain]", :with => "test123"
      fill_in "account[users_attributes][0][email]", :with => "john@test.com"
      fill_in "account[users_attributes][0][username]", :with => "john"
      fill_in "account[users_attributes][0][password]", :with => "123456"
      fill_in "account[users_attributes][0][password_confirmation]", :with => "123456"
      submit_form "new_account"

      #should be on signin form
      response.should have_selector("form", :id=>"user_new", :action=>"/users/sign_in")
    end
  
    it "should validate the user" do
      visit sign_up_path
      fill_in "account[subdomain]", :with => "test123"
      fill_in "account[users_attributes][0][email]", :with => "john@test.com"
      fill_in "account[users_attributes][0][username]", :with => "john"
      #no password is an invalid user
      submit_form "new_account"
    
      response.should have_selector("li", :id=>"account_users_attributes_0_password_input", :class=>"password required error")
    end
  end
end