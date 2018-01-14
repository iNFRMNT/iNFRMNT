import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
//import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";

class BillDetail extends Component {
  state = {
    bill: {}
  };
  // When this component mounts, grab the bill with the _id of this.props.match.params.id
  // e.g. localhost:3000/bills/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBill(this.props.match.params.id)
      
      .then(res => this.setState({ bill: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1>
                {this.state.bill.title}
              </h1>
              by
              <h2>
                {this.state.bill.author}
              </h2>
              <h3>
                {this.state.bill.date}   party: {this.state.bill.partySponsor}
              </h3>

              <p>
                {this.state.bill.body}
              </p>
              <h2>
                Comments
              </h2>

          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>

              
              
            ) : (
              <h3>No Results to Display</h3>
            )}
          
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BillDetail;