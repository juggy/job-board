class User
  include Mongoid::Document

  devise  :authenticatable, :lockable, :rememberable, :registerable, :trackable

  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end