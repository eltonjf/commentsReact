import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Post extends Component {
constructor(){
  super();
  this.state={
    name: 'Elton',
    likes: 0,
    isFavorite: false,
    comments: ['Olá']
  }
}

componentDidMount(){
  let state = localStorage.getItem(this.props.storageKey);
  state = JSON.parse(state);
  this.setState(state);
}

giveLike(){
  let numLikes = this.state.likes;
  numLikes = numLikes +1;
  const newState = {
    name:'Elton com Likes',
    likes: numLikes
  }
  console.log('GiVELIKES');
  this.setState(newState);
  this.saveInStorage();
}

setFavorite(){
  let favorite = this.state.isFavorite;
  favorite = !favorite;
  this.setState({isFavorite: favorite});
  this.saveInStorage();
}

newComment(){
  // PEGAR O ESTADO ATUAL
  let comments = this.state.comments;
  //MUDAR ELE
  const newCommentText = prompt('Digite seu comentário');
  comments.push(newCommentText);
  // SETAR NO ESTADO
  this.setState({comments: comments});
  this.saveInStorage();
}

saveInStorage(){
  let actualState = this.state;
  actualState = JSON.stringify(actualState);
  localStorage.setItem(this.props.storageKey, actualState);
}

render() {
  console.log('RENDER DO APP - ', this.state);

  let favoriteText;

  if(this.state.isFavorite){
    favoriteText = 'REMOVER DOS FAVORITOS';
  }else{
    favoriteText = 'FAVORITO';
  }

  return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title={<h2>{this.props.text} </h2>}/>
          <CardText>
            
            <h3>{this.props.name}</h3>
            <h4>{'likes: ' + this.state.likes}</h4>

            <FlatButton 
                label={'Like'}
                onClick={this.giveLike.bind(this)}/>
            <FlatButton 
                label=  {favoriteText}  
                onClick={this.setFavorite.bind(this)}/>
            <FlatButton 
                label=  {'COMENTAR'}  
                onClick={this.newComment.bind(this)}/>
            
        <List>
            <ListItem primaryText=
                {this.state.comments.map((text, index) => {
                    return (<h4 key={index}> {text}</h4>);
                })}>
            </ListItem>
        </List>
        </CardText>

        
      </Card>
    );
  }
}

export default Post;
