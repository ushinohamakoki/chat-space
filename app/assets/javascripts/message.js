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

  $('#new_message').on('submit',function(e){
  // $('.main-form__new-message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      // 記述がないと自動的に "application/x-www-form-urlencoded" 形式になる
      contentType: false,
      // サーバにデータを送信する際に用いるcontent-typeヘッダの値です。<b>初期値は"application/x-www-form-urlencoded"</b>で、殆どの場合はこの設定のままで問題ないはずです。
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.main__message-lists').append(html);
      $('form')[0].reset();
      $('.main__message-lists').animate({ scrollTop: $('.main__message-lists')[0].scrollHeight});
    })
    .fail(function(){
      alert('送信できないよーーーーーーーーーーーーー！！！！');
    });
    return false;
  });


  var reloadMessages= function() {
    var last_message_id =$('.main__message-list:last').data("message-id");
    console.log(last_message_id)
    // 自動更新失敗する場合は上記のlast_message_idがundefinedとなる

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(messages) {
        console.log(messages)
        if (messages.length !== 0) {
          var insertHTML = '';
          // var insertHTML = [];この表記でも問題なし！eachで展開できるものであればOK！
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main__message-lists').append(insertHTML);
          $('.main__message-lists').animate({ scrollTop: $('.main__message-lists')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('おーーーーーーーーーーーーーーーーーーーーーーーい！！');
      });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});