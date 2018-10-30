import React, {  Component } from 'react';
import {  connect } from 'react-redux';
import { fetchFilms } from '../../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';

class FilmList extends Component {

  componentDidMount() {
    this.props.fetchFilms();
  }

  renderFilms() {
    return _.map(this.props.films, film => {
      return (
          <li className="list-group-item" key={ film._id }>
            <Link to={ `films/${ film._id }` }>
              { film.title }
            </Link>
          </li>
      )
     })
  }

  render() {
    return (
        <div>
          <div className="text-xs-right">
            <Link className="btn btn-primary" to="films/new">
              Add a film
            </Link>
          </div>
          <h3>Films</h3>
          <ul className="list-group">
            { this.renderFilms() }
          </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { films: state.films }
}

export default connect(mapStateToProps, { fetchFilms })(FilmList);

