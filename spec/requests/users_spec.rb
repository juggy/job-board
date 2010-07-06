require 'spec_helper'

describe "Users" do
  
  before(:each) do
    Account.make!
  end
  
  describe "GET /users/sign_in" do
    it "should sign in the user for a specific account" do
      Account.current_account = Account.first
      Account.current_account.users.size.should == 1
      visit new_user_session_path
    end
  end
end
