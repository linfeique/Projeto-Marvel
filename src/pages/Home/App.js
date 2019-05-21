import React, { Component } from 'react';
import './App.css';
import imgLogo from '../../assets/images/marvel.svg'
import axios from 'axios';

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      listaPersonagens: [],
      search: ""
    }
  }

  buscaPersonagens(){
    axios.get('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=579c74a6155ffa4c45cd4aff02390097&hash=d1831f683ce2a05213c1e5ee4833599d', {
      data: {
        limit: 100
      }
    })
    .then(response => {
      this.setState({ listaPersonagens: response.data.data.results })
      console.log(this.state.listaPersonagens)
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    this.buscaPersonagens();
  }

  atualizaEstadoPesquisa(event){
    this.setState({search: event.target.value}, () => {
      this.filtraOsBaguio();
    });
  }

  filtraOsBaguio(){
    let listaFiltrada = this.state.listaPersonagens;

    if (this.state.search !== null && this.state.search !== "") {
      listaFiltrada = listaFiltrada.filter(
        x =>
          x.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
      this.setState({ listaPersonagens: listaFiltrada });
    } else{
      this.buscaPersonagens();
    }
  }

  render(){
    return (
      <div className="App">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
        <div className="app__header">
          <img src={imgLogo} width="80px" height="80px"/>
          <div className="app__search">
            <input 
              type="text" 
              className="search-txt" 
              placeholder="Type to search" 
              value={this.state.search}
              onChange={this.atualizaEstadoPesquisa.bind(this)} 
            />
            <a className="search-btn" href="#">
              <i className="fas fa-search"></i>
            </a>
          </div>
        </div>
        <div className="app__main">
          {
            this.state.listaPersonagens.map((item) => {
              return(
                <div className="card" key={item.id}>
                  <div className="card-header">
                    <img src={item.thumbnail.path + '.jpg'} width="100%" height="100%"/>
                    <div className="cover"></div>
                    <div className="name">
                      <span className="first">{item.name}</span>
                    </div>
                  </div>

                  <div className="container">
                    <div className="left-section">
                      <h3>About</h3>
                      {
                        (item.description == "") 
                        ? <p>Não possui descrição</p> 
                        :
                          <p>{item.description}</p>
                      }
                      <a href="#" className="followBtn">Saiba Mais</a>
                    </div>
                    <div className="right-section">
                      <div className="item">
                        <span className="num">{item.comics.available}</span>
                        <span className="word">HQ's</span>
                      </div>

                      <div className="item">
                        <span className="num">{item.series.available}</span>
                        <span className="word">Series</span>
                      </div>

                      <div className="item">
                        <span className="num">{item.stories.available}</span>
                        <span className="word">Stories</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;