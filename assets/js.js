$(document).ready(function(){

// Search for news by news outlet buttons
  $('[name="news"]').click(function(){
    $.ajax({
      url: "https://newsapi.org/v2/everything?sources=" + this.id + "&apiKey=35477fbe6cda44b0853c42734970825a",
      type: "GET",
      dataType: 'json',
    }).done(function(data){
      console.log(data);

      $("#news-stories").empty();

      for (var i = 0; i < 10; i++) {
        $('#news-stories').append(
        "<a target='_blank' href='" + data.articles[i].url + "'><b>" + data.articles[i].title + "</b></a><div class='space'></div>");
      }
    });
  });

// Most recent button
  $('[name="recent-active"]').click(function() {

    $('#the_subject').empty();

    $('#the_subject').append("most recent");

    $.ajax({
      url: "https://api.propublica.org/congress/v1/115/both/bills/active.json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#subjects").empty();

      for (var i = 0; i < data.results[0].bills.length; i++) {

        var title;
          if (data.results[0].bills[i].short_title === null) {
            title = data.results[0].bills[i].title
            }
          else {
            title = data.results[0].bills[i].short_title
            }

        $('#subjects').append(
        "<div class='row'><div class='col-md-10'>" + data.results[0].bills[i].bill_id.toUpperCase() + ": " + title + ", Sponsor: " + data.results[0].bills[i].sponsor_name + "; " + data.results[0].bills[i].sponsor_party + ", " + data.results[0].bills[i].sponsor_state + " </div><div class='col-md-2'><a target='_blank' class='btn btn-success' href='" + data.results[0].bills[i].congressdotgov_url + "'>Read the Bill</a></div></div><div class='space'></div>");
      }
    });
  });

// Searching for bills by subject
  $("#submit").on("click", function(e) {

    e.preventDefault();

    var x = document.getElementById("search");

    console.log(x.value);

    $('#the_subject').empty();

    $('#the_subject').append("about " + x.value);

    $.ajax({
      url: "https://api.propublica.org/congress/v1/bills/subjects/" + x.value + ".json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#subjects").empty();

      if (data.status === "ERROR") {
        $('#subjects').append("No bills of that subject. Try again.") 
        }
      else {
        for (var i = 0; i < data.results.length; i++) {

        var title;
          if (data.results[i].short_title === null) {
            title = data.results[i].title
            }
          else {
            title = data.results[i].short_title
            }

          $('#subjects').append(
          "<div class='row'><div class='col-md-10'>" + data.results[i].bill_id.toUpperCase() + ": " + title + ", Sponsor: " + data.results[i].sponsor_name + " (" + data.results[i].sponsor_party + ") </div><div class='col-md-2'><a target='_blank' class='btn btn-success' href='" + data.results[i].congressdotgov_url + "'>Read the Bill</a></div></div><div class='space'></div>");
        }
      }
    });
});

// Find senators by state 
  $('[name="state"]').click(function() {

    $(".state").empty();
    $(".state").append(this.id);

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
        "<p><span name='senator' id ='" + data.results[i].id + "'>" + data.results[i].name + "</span>: " + data.results[i].party + " " + "<a target='_blank' href='http://twitter.com/" + data.results[i].twitter_id + "'><img src='assets/twitter.png' class='social_media'></a> <a target='_blank' href='http://youtube.com/" + data.results[i].youtube_id + "'><img src='assets/youtube.png' class='social_media'></a> <a target='_blank' href='http://facebook.com/" + data.results[i].facebook_account + "'><img src='assets/facebook.png' class='social_media'></a></p>");
      }
    });
  });

// Find recent bills by specfic senator
  $('body').on("click", '[name="senator"]', function(){

    console.log(this.id);

    $('#the_subject').empty();

    $.ajax({
      url: "https://api.propublica.org/congress/v1/members/" + this.id + "/bills/introduced.json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#subjects").empty();

      $('#the_subject').append("from " + data.results[0].bills[0].sponsor_name);

      for (var i = 0; i < data.results[0].bills.length; i++) {
        var title;
          if (data.results[0].bills[i].short_title === null) {
            title = data.results[0].bills[i].title
            }
          else {
            title = data.results[0].bills[i].short_title
            }

        $('#subjects').append(
        "<div class='row'><div class='col-md-10'>" + data.results[0].bills[i].bill_id.toUpperCase() + ": " + title + " </div><div class='col-md-2'><a target='_blank' class='btn btn-success' href='" + data.results[0].bills[i].congressdotgov_url + "'>Read the Bill</a></div></div><div class='space'></div>");
      }

    });
  });

// Find house members by state
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
        "<p>" + data.results[i].name + ": " + data.results[i].party + " " + "<a target='_blank' href='http://twitter.com/" + data.results[i].twitter_id + "'><img src='assets/twitter.png' class='social_media'></a><a target='_blank' href='http://youtube.com/" + data.results[i].youtube_id + "'><img src='assets/youtube.png' class='social_media'></a> <a target='_blank' href='http://facebook.com/" + data.results[i].facebook_account + "'><img src='assets/facebook.png' class='social_media'></a></p>");
      }
    });
  });

// Find bills by subject buttons
  $('[name="subject"]').click(function() {

    $('#the_subject').empty();

    $('#the_subject').append("about " + this.id);

    $.ajax({
      url: "https://api.propublica.org/congress/v1/bills/subjects/" + this.id + ".json",
      type: "GET",
      dataType: 'json',
      headers: {'X-API-Key': 's8AjyH0RbbFg55MB7zNhpaBG7oSrnG2zoj9Rijcb'}
    }).done(function(data) {

      console.log(data);

      $("#subjects").empty();

      for (var i = 0; i < data.results.length; i++) {

        var title;
          if (data.results[i].short_title === null) {
            title = data.results[i].title
            }
          else {
            title = data.results[i].short_title
            }

        $('#subjects').append(
        "<div class='row'><div class='col-md-10'>" + data.results[i].bill_id.toUpperCase() + ": " + title + ", Sponsor: " + data.results[i].sponsor_name + " (" + data.results[i].sponsor_party + ") </div><div class='col-md-2'><a target='_blank' class='btn btn-success' href='" + data.results[i].congressdotgov_url + "'>Read the Bill</a></div></div><div class='space'></div>");
      }
    });
  });
});
