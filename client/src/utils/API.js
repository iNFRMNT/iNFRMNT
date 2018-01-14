import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    //console.log(id);
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },



  getBills: function() {
    return axios.get("/api/bills");
  },
  // Gets the bill with the given id
  getBill: function(id) {
    return axios.get("/api/bills/" + id);
  },
  // Deletes the bill with the given id
  deleteBill: function(id) {
    return axios.delete("/api/bills/" + id);
  },
  // Saves a bill to the database
  saveBill: function(billData) {
    return axios.post("/api/bills", billData);
  }

//   getComments: function() {
//     return axios.get("/api/comments");
//   },
//   // Gets the comment with the given id
//   getComment: function(id) {
//     return axios.get("/api/comments/" + id);
//   },
//   // Deletes the comment with the given id
//   deleteComment: function(id) {
//     return axios.delete("/api/comments/" + id);
//   },
//   // Saves a comment to the database
//   saveComment: function(commentData) {
//     return axios.post("/api/comments", commentData);
//   }
};
