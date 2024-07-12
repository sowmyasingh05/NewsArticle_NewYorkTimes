import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from "axios";
import "./App.css";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      selectedArticle: null,
      loading: true,
      error: null,
    };
  }
  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    const API_KEY = "DRWDH7DKOTrFbrMGK0wUCnSh6DWKFS6t"; // API key generated 
    const API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      this.setState({ articles: response.data.results, loading: false });
    } catch (error) {
      console.error("Error fetching data: ", error);
      this.setState({ error: error.message, loading: false });
    }
  };

  handleArticleClick = (article) => {
    this.setState({
      selectedArticle: article //mapping the user selected article 
    })
    // You can perform additional actions here, like fetching more details or updating state
  };

  render() {
    const { articles, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    // display the template based on the user selection and conditional rendering 
    if (this.state.selectedArticle) {
      return (

        <div className="article-list">
          <button onClick={() => this.setState({ selectedArticle: null })}>Back to Articles</button>
          <h2>{this.state.selectedArticle.title}</h2>
          <p>{this.state.selectedArticle.abstract}</p>
          <p>Published Date: {this.state.selectedArticle.published_date}</p>
          {this.state.selectedArticle.media.length > 0 && this.state.selectedArticle.media[0]['media-metadata'].length > 0 && (
            <div className="article-image">
              <img
                src={this.state.selectedArticle.media[0]['media-metadata'][2].url}  // Access the first image directly
                alt="Media content"
              />
            </div>
          )}
          <a href={this.state.selectedArticle.url} target="_blank" rel="reference">
            Read Full Article
          </a>
        </div>
      );
    }
    return (

      <div className="container">
        <h1>NY Times Most Popular Articles</h1>
        <ul className="article-list">
          {articles.map((article, index) => (
            <li key={index} onClick={() => this.handleArticleClick(article)}>{article.title}</li> // Adjust this based on your article structure
          ))}
        </ul>
      </div>
    );
  }

}


render(<App />, document.getElementById('root'));
