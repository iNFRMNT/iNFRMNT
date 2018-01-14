import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";



class Bills extends Component {
  state = {
    bills: []
  };

  componentDidMount() {
    this.loadBills();
  };

  loadBills = () => {
    API.getBills()
      .then(res =>
        this.setState({bills: res.data})
      )
      .catch(err => console.log(err));
  };
  deleteBill = id => {
    API.deleteBill(id)
      .then(res => this.loadBills())
      .catch(err => console.log(err));
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
      API.saveBill({
        author: this.state.author,
        title: this.state.title,
        body: this.state.body,
        date: this.state.date
      })
        .then(res => this.loadBills())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <h1>Bills</h1>
            {this.state.bills.length ? (
              <List>
                {this.state.bills.map(bill => (
                  <ListItem key={bill._id}>
                    <Link to={"/bills/" + bill._id}>
                      <strong>
                        {bill.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBill(bill._id)} />
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

export default Bills;