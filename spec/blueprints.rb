User.blueprint do 
  username { Forgery::Internet.user_name }
  email { Forgery::Internet.email_address }
  password {"test123"}
  password_confirmation {"test123"}
end

Account.blueprint do
  subdomain {Forgery::Basic.text}
  users(1)
end