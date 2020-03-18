class UsersController < ApplicationController


  def index
    return nil if params[:keyword] == ""
    # params[:user_ids] << current_user.id if params[:user_ids]
    # @users = User.where(['name LIKE ? and id not in ?', "%#{params[:keyword]}%", params[:user_ids]]).limit(10)
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"]).where.not(id: params[:user_ids]).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:mane, :email)
  end

end