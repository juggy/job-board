class JobsController < ApplicationController

  def index
    respond_to do |f|
      f.html
      f.json { render :json=>current_user.jobs }
    end
  end
  
  def public_index
    @jobs = Job.all
  end
  
end