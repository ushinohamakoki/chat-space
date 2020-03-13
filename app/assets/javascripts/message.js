$(function(){
  var buildHTML = function(message){
  if ( message.content && message.image ) {
      var html =
      `<div class="main__message-list" data-message-id= ${message.id}>
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
    } else if (message.content) {
      var html =
      `<div class="main__message-list" data-message-id= ${message.id}>
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
    } else if (message.image) {
      var html =
      `<div class="main__message-list" data-message-id= ${message.id}>
        <div class="main__message-list__upper">
          <div class="main__message-list__upper__talker">
            ${message.user_name}
          </div>
          <div class="main__message-list__upper__date">
            ${message.created_at}
          </div>
        </div>
        <img src=${message.image} >
      </div>`
    };
    return html;
  } 

  $('#new_message').on('submit', function(e){
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

  var reloadMessages = function() {
    var last_message_id = $('.main__message-list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main__message-lists').append(insertHTML);
          $('.main__message-lists').animate({ scrollTop: $('.main__message-lists')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});