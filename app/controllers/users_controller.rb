class UsersController < ApplicationController
  skip_before_filter :authenticate_user!, :except=>:edit
end