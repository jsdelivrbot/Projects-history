import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from '../../sidenav-styles.scss';


class Sidenavitem extends React.Component {

  render() {
  //console.log(window.location.pathname);
  //console.log(window.location.hash);

    const linkItem = this.props.detail;
    return (
      <li className={styles.item}>
        <Link
          to={linkItem.url}
          className={`${styles.item__link} ${styles[linkItem.state+"_background"]} ${window.location.hash.includes(linkItem.state) ? styles[linkItem.state +"_background_selected"] : ''}`}
          onClick={(window.matchMedia('(max-width: 960px)').matches ? this.props.handlerResponsive : () => 0)}
        >
          <span>{<FormattedMessage {...messages[linkItem.state]} />}</span>
        </Link>
      </li>
     );
  }
}

// li className={styles.item}   ref={(li) => { this.navItem = li }} onMouseOver={ ()=>this.changeHoverColor(linkItem.state,true)}  onMouseOut={()=>this.changeHoverColor(linkItem.state,false)}>

Sidenavitem.propTypes ={
  detail: PropTypes.object.isRequired
}

export default Sidenavitem;
