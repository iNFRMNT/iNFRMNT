$(document).ready(function() {
  // Getting references to the name inout and user container, as well as the table body
  let userNameInput = $("#user-name");
  let passwordInput = $("#password");
  let zipcodeInput = $("#zipcode");
  let emailInput = $("#email");
  let userList = $("tbody");
  let userContainer = $(".user-container");

  // Adding event listeners to the form to create a new object, and the button to delete
  // an User
  $(document).on("submit", "#user-form", handleUserFormSubmit);
  $(document).on("click", ".delete-user", handleDeleteButtonPress);

  // Getting the intiial list of Users
  getUsers();

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!userNameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertUser function and passing in the value of the name input
    upsertUser({
      userName: userNameInput
        .val()
        .trim(),
      password: passwordInput
        .val()
        .trim(),
      zipcode: zipcodeInput
        .val()
        .trim(),
      email: emailInput
        .val()
        .trim(),
    });
  }

  // A function for creating a new user. Calls getUsers upon completion
  function upsertUser(userData) {
    $.post("/api/users", userData)
      .then(getUsers);
  }

  // Function for creating a new list row for users
  function createUserRow(userData) {
    console.log(userData);
    let newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.userName + "</td>");
    //newTr.append("<td> " + userData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?user_id=" + userData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?user_id=" + userData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a href='/bill?user_id=" + userData.id + "'>Go to Bills</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
    return newTr;
  }

  // Function for retrieving users and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/users", function(data) {
      let rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      userNameInput.val("");
      passwordInput.val("");
      zipcodeInput.val("");
      emailInput.val("");
    });
  }

  // A function for rendering the list of users to the page
  function renderUserList(rows) {
    userList.children().not(":last").remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no users
  function renderEmpty() {
    let alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an User before you can create a Post.");
    userContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    let listItemData = $(this).parent("td").parent("tr").data("user");
    let id = listItemData.id;
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    })
    .done(getUsers);
  }
});
