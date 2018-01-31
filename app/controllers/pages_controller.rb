class PagesController < ApplicationController
  def index
  end

  def show
    begin
      render layout: "layouts/templates/#{params[:id]}"
    rescue ActionView::MissingTemplate
      raise ActionController::RoutingError, "Unknown template"
    end
  end
end
