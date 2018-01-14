import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class SignUp extends Component {
  state = {
    users: [],
    userName: "",
    password: "",
    email: "",
    zipcode: ""
  };

  componentDidMount() {
    this.loadUsers();
  };

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({users: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUsers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    if (this.state.userName && this.state.password) {
      console.log(this.state);
      API.saveUser({
        userName: this.state.userName,
        author: this.state.author,
        email: this.state.email,
        zipcode: this.state.zipcode
      })
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    }
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <h1>New User</h1>
            <form>
              <Input
                value={this.state.userName}
                onChange={this.handleInputChange}
                name="userName"
                placeholder="user name (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password (required)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email"
              />
              <Input
                value={this.state.zipcode}
                onChange={this.handleInputChange}
                name="zipcode"
                placeholder="zipcode"
              />
              <FormBtn
                disabled={!(this.state.userName && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Submit User
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <h1>Users</h1>
            {this.state.users.length ? (
              <List>
                {this.state.users.map(user => (
                  <ListItem key={user._id}>
                    <Link to={"/users/" + user._id}>
                      <strong>
                        {user.userName}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUser(user._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default SignUp;