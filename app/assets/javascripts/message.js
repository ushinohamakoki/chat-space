$(function(){
  function buildHTML(message){

    if ( message.image ) {
      var html =
      `<div class="main__message-list>
          <div class="main__message-list__upper">
            <div class="main__message-list__upper__talker">
              ${message.user_name}
            </div>
            <div class="main__message-list__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower__message">
            <p class="main__message-list__text">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
      </div>`
    } else {
      var html =
      `<div class="main__message-list">
        <div class="main__message-list__upper">
          <div class="main__message-list__upper__talker">
            ${message.user_name}
          </div>
          <div class="main__message-list__upper__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower__message">
          <p class="main__message-list__text">
            ${message.content}
          </p>
        </div>
      </div>`
    };
    return html;
  } 

  $('#new_message').on('submit', function(e){
    console.log('ok')
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(this)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__message-lists').append(html);      
      $('form')[0].reset();
      $('.main__message-lists').animate({ scrollTop: $('.main__message-lists')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});