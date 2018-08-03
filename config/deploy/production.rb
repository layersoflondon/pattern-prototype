# Server configuration. For a simple site this is just one entry.
role :app, %w{deployment@lol-web01.hosts.errorstudio.com}
role :web, %w{deployment@lol-web01.hosts.errorstudio.com}
role :db, %w{deployment@lol-web01.hosts.errorstudio.com}

# Git branch
set :branch, 'master'

#the base domain for this site - is appended to the primary domain for a prelaunch url
set :base_domain, "prelaunch.error.agency"

# the prelaunch domain
set :prelaunch_domain, ->{"#{fetch(:primary_domain)}.#{fetch(:base_domain)}"}

#domains which this site will answer to (i.e. not redirect)
set :site_domains, [fetch(:primary_domain)]
#redirects domains to the primary domain as a 301
set :domain_redirects, %w()

#rewrites in nginx format - useful for specifying hard-coded urls for redirection after launch
set :url_rewrites, {}

set :custom_nginx_rules, [

]

set :path_redirects, {

}

# set the deploy domain to the prelaunch domain
set :deploy_domain, fetch(:primary_domain)

set :passenger_port, 8002
set :passenger_max_pool_size, 20
set :passenger_min_instances, 15

#SSL settings
set :ssl_required, false

