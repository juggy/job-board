class JobsController < ApplicationController

  def index
    respond_to do |f|
      f.html
      f.json { render :json=>current_user.jobs.to_json(:except=>[:created_at, :updated_at]) }
    end
  end
  
  def update
    @job = Job.find(params[:id])
    parsed_model = JSON.parse params[:model]
    parsed_model.delete("id")
    parsed_model.delete("_id")
    parsed_model.delete("user_id")
    if @job.update_attributes(parsed_model)
      render :json => @job
    else
      render :json => @job.errors, :status => 500
    end
  end
  
  def create
    parsed_model = JSON.parse params[:model];
    parsed_model.delete("id")
    parsed_model.delete("_id")
    parsed_model.delete("user_id")
    @job = current_user.jobs.build(parsed_model)
    if @job.save
      render :json => @job
    else
      render :json => @job.errors, :status => 500
    end
  end
  
  def public_index
    @jobs = Job.all
  end
  
end