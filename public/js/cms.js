$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and user select
  let bodyInput = $("#body");
  let titleInput = $("#title");
  let cmsForm = $("#cms");
  let userSelect = $("#user");
  let billSelect = $("#bill");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  let url = window.location.search;
  let postId;
  let userId;
  // Sets a flag for whether or not we're updating a post to be false initially
  let updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?postID=1', postId is 1
  if (url.indexOf("?postId=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an userId in our url, preset the user select box to be our User
  else if (url.indexOf("?userId=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their posts
  getUsers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or user
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    let newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      UserId: userSelect.val(),
      //billId: billselect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an user's existing posts
  function getPostData(id, type) {
    let queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        userId = data.UserId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get("/api/users", renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    let rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    let listOption = $("<option>");
    listOption.attr("value", userId);
    listOption.text(user.userName);
    return listOption;
  }

  function renderBillList(data) {
    // if (!data.length) {
    //   window.location.href = "/users";
    // }
    $(".hidden").removeClass("hidden");
    let rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createBillRow(data[i]));
    }
    billSelect.empty();
    console.log(rowsToAdd);
    console.log(billSelect);
    billSelect.append(rowsToAdd);
    billSelect.val(billId);
  }

  function createBillRow(user) {
    let listOption = $("<option>");
    listOption.attr("value", bill.id);
    listOption.text(bill.title);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }
});
