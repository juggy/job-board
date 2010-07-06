class <%= controller_class_name %>Controller < ApplicationController
<% unless options[:singleton] -%>
  def index
    @<%= table_name %> = <%= orm_class.all(class_name) %>
  end
<% end -%>

  def show
    @<%= file_name %> = <%= orm_class.find(class_name, "params[:id]") %>
  end

  def new
    @<%= file_name %> = <%= orm_class.build(class_name) %>
  end

  def edit
    @<%= file_name %> = <%= orm_class.find(class_name, "params[:id]") %>
  end

  def create
    @<%= file_name %> = <%= orm_class.build(class_name, "params[:#{file_name}]") %>

    if @<%= orm_instance.save %>
      redirect_to(@<%= file_name %>, :notice => '<%= human_name %> was successfully created.')
    else
      render :action => "new"
    end
  end

  def update
    @<%= file_name %> = <%= orm_class.find(class_name, "params[:id]") %>

    if @<%= orm_instance.update_attributes("params[:#{file_name}]") %>
      redirect_to(@<%= file_name %>, :notice => '<%= human_name %> was successfully updated.')
    else
      render :action => "edit"
    end
  end

  def destroy
    @<%= file_name %> = <%= orm_class.find(class_name, "params[:id]") %>
    @<%= orm_instance.destroy %>

    redirect_to(<%= table_name %>_url)
  end
end
