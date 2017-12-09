$(document).ready(function(){

  $(document).ready(function(){
    $.ajax({
      url: "https://newsapi.org/v2/everything?sources=breitbart-news&apiKey=35477fbe6cda44b0853c42734970825a",
      type: "GET",
      dataType: 'json',
    }).done(function(data){
      console.log(data);

      for (var i = 0; i < 10; i++) {
        $('#news-stories').append(
        "<a target='_blank' href='" + data.articles[i].url + "'><b>" + data.articles[i].title + "</b></a><div class='space'></div>");
      }
    });
  });

  $(document).ready(function(){
    $.ajax({
      url: "https://newsapi.org/v2/everything?sources=abc-news&apiKey=35477fbe6cda44b0853c42734970825a",
      type: "GET",
      dataType: 'json',
    }).done(function(data){
      console.log(data);

      for (var i = 0; i < 10; i++) {
        $('#news').append(
        "<a target='_blank' href='" + data.articles[i].url + "'><b>" + data.articles[i].title + "</b></a><div class='space'></div>");
      }
    });
  });

  $('[name="state"]').click(function() {
    $.ajax({
      url: "https://api.propublica.org/congress/v1/members/senate/" + this.id + "/current.json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#senators").empty();

      for (var i = 0; i < data.results.length; i++) {
        $('#senators').append(
        "<p>" + data.results[i].name + ": " + data.results[i].party + " " + "<a target='_blank' href='http://twitter.com/" + data.results[i].twitter_id + "'><img src='assets/twitter.png' class='twitter'></a></p>");
      }
    });
  });

  $('[name="state"]').click(function() {
    $.ajax({
      url: "https://api.propublica.org/congress/v1/members/house/" + this.id + "/current.json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#house").empty();

      for (var i = 0; i < data.results.length; i++) {
        $('#house').append(
        "<p>" + data.results[i].name + ": " + data.results[i].party + " " + "<a target='_blank' href='http://twitter.com/" + data.results[i].twitter_id + "'><img src='assets/twitter.png' class='twitter'></a></p>");
      }
    });
  });

  $('[name="subject"]').click(function() {

    $('#the_subject').empty();

    $('#the_subject').append(this.id);

    $.ajax({
      url: "https://api.propublica.org/congress/v1/bills/subjects/" + this.id + ".json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#subjects").empty();

      for (var i = 0; i < data.results.length; i++) {
        $('#subjects').append(
        data.results[i].bill_id + ": " + data.results[i].title + " " + "<a target='_blank' class='btn btn-success' href='" + data.results[i].congressdotgov_url + "'>Read the Bill</a><div class='space'></div>");
      }
    });
  });

});
