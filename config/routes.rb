Rails.application.routes.draw do
  resources :pages, only: [:index, :show]

  root 'pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
