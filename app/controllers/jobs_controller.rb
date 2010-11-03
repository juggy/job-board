class JobsController < ApplicationController

  def index
    respond_to do |f|
      f.html
      f.json { render :json=>current_user.jobs.to_json(:except=>[:created_at, :updated_at, :user_id]) }
    end
  end
  
  def update
    @job = Job.find(params[:id])
    parsed_model = JSON.parse params[:model]
    parsed_model.delete("id")
    parsed_model.delete("_id")
    @job.update_attributes!(parsed_model)
    render :json => @job
  end
  
  def create
    parsed_model = JSON.parse params[:model];
    parsed_model.delete("id")
    parsed_model.delete("_id")
    @job = Job.create!(parsed_model)
    render :json => @job
  end
  
  def public_index
    @jobs = Job.all
  end
  
end