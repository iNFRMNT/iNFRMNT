import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Login extends Component {
  state = {
    userName: "",
    password: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    event.preventDefault();
    console.log("hi");
      console.log(this.state);
      API.getUser({
        userName: this.state.userName,
        password: this.state.password,
      })
        .then(res => window.location.href = "localhost:3000/user")
        .catch(err => console.log(err));
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