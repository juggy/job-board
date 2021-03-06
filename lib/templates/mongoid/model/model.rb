class <%= class_name %><%= " < #{options[:parent].classify}" if options[:parent] %>
  
  ### Includes
<% unless options[:parent] -%>
  include Mongoid::Document
  include ScopeByAccount
<% end -%>
<% if options[:timestamps] -%>
  include Mongoid::Timestamps
<% end -%>
<%= 'include Mongoid::Versioning' if options[:versioning] -%>
  
  ### Plugins magic

  
  ### Fields declaration 
<% attributes.reject{|attr| attr.reference?}.each do |attribute| -%>
  field :<%= attribute.name %>, :type => <%= attribute.type_class %>
<% end -%>
  
  
  ### Relationships
<% attributes.select{|attr| attr.reference? }.each do |attribute| -%>
  embedded_in :<%= attribute.name%>, :inverse_of => :<%= class_name.tableize %>
<% end -%>
  
  
  ### Validations
  
  
  ### Callbacks
  
  
  ### Scopes
  
  
  ###########
  # Other
  
  
  
end
