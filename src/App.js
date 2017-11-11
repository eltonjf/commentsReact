import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {

  constructor(){
    super();
    this.state={
      posts: []
    }
  }

  newPost(){
      let posts = this.state.posts;
      const newPost = prompt('Digite seu comentário');
      posts.push(newPost);
      this.setState({posts: posts});
      this.saveInStorage();
  }

  componentDidMount(){
    let state = localStorage.getItem('appState');
    state = JSON.parse(state);
    this.setState(state);
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem('appState', actualState);
  }


render() {
 
  return (
      <MuiThemeProvider>

        <FlatButton label=  {'Novo Post'} 
          onClick={this.newPost.bind(this)}/>

          <div style={{padding: 20, backgroundColor: '#DDDDDD'}}>
              {this.state.posts.map((text, index) => {
                    return (<Post key={index} text={text} />);
                })}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
