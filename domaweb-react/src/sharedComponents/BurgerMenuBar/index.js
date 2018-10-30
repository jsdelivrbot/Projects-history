import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'react-bootstrap';

import styles from './burgermenubar-styles.scss';


class BurgerMenuBar extends React.Component {


render() {

  	//console.log(window.location.hash)

     return (

      	         <div className={styles.burger_menu}>

                 <h2 className={styles.burger_menu_heading}> {this.props.currentComponent.replace("/","").replace(/\b[a-z]/g,function(f){return f.toUpperCase();})} </h2>
                 {/* It will remove the / from the state name and convert the first letter to capital*/}

	        	</div>



    );

  }
}


export default BurgerMenuBar;
