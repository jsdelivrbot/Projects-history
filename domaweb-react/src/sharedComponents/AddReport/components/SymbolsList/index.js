import React from 'react';
import PropTypes from 'prop-types';
import  {Row, Col} from 'react-bootstrap';

import Symbol from '../Symbol';
import FirstLevelModal from '../FirstLevelModal';
import Spinner from '../../../../sharedComponents/Spinner';

import styles from './symbol-list-styles.scss';

class SymbolList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  // Model handler for smaller screens
  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }
  // Take the symbol and render it., If the screen is smaller, open the first level in model
  render() {
    if (this.props.symbols) {
      return (
        <Row>
          <Col sm={12} xs={12} className={styles.symbolList}>
            <Row>
              {
                this.props.symbols.children.map((symbol) => {
                  return (
                    <Col xs={12} sm={12} key={symbol.id}>
                      <Symbol
                      symbol={symbol.icon}
                      alt={symbol.icon}
                      displayName={symbol.displayName}
                      selectSymbol={this.props.selectSymbol}
                      id={symbol.id}
                      selectedSymbol={this.props.selectedSymbol}
                      openModel={this.handleShow}
                      summaryUpto={this.props.summaryUpto}
                    />
                  </Col>
                  );
                }
              )}
            </Row>
          </Col>
          <FirstLevelModal
            show={this.state.showModal}
            handleClose={this.handleClose}
            selectedSymbolList={this.props.selectedSymbolList}
            summaryUpto={this.props.summaryUpto}
            summary={this.props.summary}
            selectedSymbol={this.props.selectedSymbol}
            checkedSymbols={this.props.checkedSymbols}
          />
        </Row>
      );
    }
    return (<Spinner />);
  }
}

export default SymbolList;
