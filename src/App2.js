import React from 'react';
import axios from "axios";

const Card = props => {
  for (var i = 0; i<10; i++){
    return (
      <div style={{ margin: "1em" }}>
        <div>
          <a href={props.articles[i].url}>
            {props.articles[i].title}
          </a>
        </div>
      </div>
    );
  }
};

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  state = {
    news: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .get(`https://newsapi.org/v2/everything?sources=${this.state.news}&apiKey=35477fbe6cda44b0853c42734970825a`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({ news: "" });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.news}
          onChange={event => this.setState({ news: event.target.value })}
          placeholder="News goes here"
          required
        />
        <button type="submit">Get news</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = cardInfo => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;