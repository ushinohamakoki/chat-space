$(function() {
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users){
        console.log("OK");
      })
      .fail(function(){
        console.log("NO");
      });
  });
});