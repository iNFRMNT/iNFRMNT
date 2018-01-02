$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our posts
  let blogContainer = $("#blog-container");
  let postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  let posts;

  // The code below handles the case where we want to get blog posts for a specific user
  // Looks for a query param in the url for userId
  let url = window.location.search;
  let userId;
  if (url.indexOf("?userId=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }


  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?userId=" + userId;
    }
    $.get("/api/posts" + userId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .done(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    let postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    console.log(post);
    let formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    let newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    let newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    let deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    let editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    let newPostTitle = $("<h2>");
    let newPostDate = $("<small>");
    let newPostUser = $("<h5>");
    newPostUser.text("Written by: " + post.UserId);
    newPostUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    let newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    let newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostPanelHeading.append(deleteBtn);
    newPostPanelHeading.append(editBtn);
    newPostPanelHeading.append(newPostTitle);
    newPostPanelHeading.append(newPostUser);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    let currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    console.log(currentPost);
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    let currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?postId=" + currentPost.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    let query = window.location.search;
    let partial = "";
    if (id) {
      partial = " for User # " + id;
    }
    blogContainer.empty();
    let messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageh2);
  }

});
