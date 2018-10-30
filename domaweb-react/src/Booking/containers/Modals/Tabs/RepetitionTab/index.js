import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Button } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { circleRight } from 'react-icons-kit/icomoon/circleRight';
import { circleDown } from 'react-icons-kit/icomoon/circleDown';
import { trash } from 'react-icons-kit/iconic/trash';
import moment from 'moment';
import _ from 'lodash';

import Repetiton from './Repetition';
import styles from '../ModalTabs-styles.scss';

export default class RepetitionsTab extends PureComponent {
  constructor(props) {
    super(props);
    let newRepetitions = [];
    if (props.taskdetails && props.taskdetails.taskTemplateId && props.templaterepetitions) {
      newRepetitions = props.templaterepetitions;
    }
    this.state = {
      repetitions: newRepetitions,
    };
  }

  changeRepetitonsType = (id, newRepetition) => {
    const repetition = _.cloneDeep(newRepetition);
    repetition.active = true;
    repetition.id = id;

    const repetitions = _.cloneDeep(this.state.repetitions);
    const foundIndex = repetitions.findIndex(newRep => newRep.id === id);

    if (foundIndex !== -1) {
      repetitions[foundIndex] = repetition;
    }

    this.setState({ repetitions });
  }

  showRepetition = (repetition) => {
    const newRepetitions = _.cloneDeep(this.state.repetitions);
    const foundIndex = newRepetitions.findIndex(newRep => newRep.id === repetition.id);

    if (foundIndex !== -1) {
      newRepetitions[foundIndex].active = !newRepetitions[foundIndex].active;
    }

    this.setState({ repetitions: newRepetitions });
  }

  addNewRepetition = () => {
    const newRepetitions = _.cloneDeep(this.state.repetitions);
    const notActiveRepetitions = newRepetitions.map((newRepetition) => {
      const editedRepetition = _.cloneDeep(newRepetition);
      editedRepetition.active = false;
      return editedRepetition;
    });

    notActiveRepetitions.push({
      id: this.state.repetitions.length - 1,
      active: true,
      repetitionType: 'EVERY_DAY',
      startDate: moment(this.props.formvalues.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
      endDate: moment(this.props.formvalues.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss'),
      option: 'ALLOW_SPECIAL_HOLIDAY',
      comment: 'First Repetitive End Point',
      supressNotifications: false,
      manuallyAdded: true,
    });

    this.setState({ repetitions: notActiveRepetitions });
  }

  deleteRepetition = (e, repetition) => {
    e.stopPropagation();
    if (repetition.manuallyAdded) {
      const repetitions = _.cloneDeep(this.state.repetitions);
      const foundIndex = repetitions.findIndex(foundRepetition => foundRepetition.id === repetition.id);

      if (foundIndex !== -1) {
        repetitions.splice(foundIndex, 1);
      } else {
        console.log('Index not found');
      }
      this.setState({ repetitions });
    }
  }

  render() {
    const { repetitions } = this.state;
    return (
      <div className={styles.modal_tab_repetition_wrapper}>
        <Row style={{ marginBottom: '12px' }}>
          <Button className={styles.repetition__add_button} onClick={this.addNewRepetition}>
            Add New Repetition
          </Button>
        </Row>
        {repetitions.map((repetition, index) =>
          <div key={index}>
            <Row className={styles.repetition__row_tab} onClick={() => this.showRepetition(repetition)}>
              <div className={styles.repetition__row_icon_and_label}>
                <span>{ repetition.active ? <Icon icon={circleDown} /> : <Icon icon={circleRight} /> }
                  &nbsp;&nbsp;Repetition {index + 1}
                </span>
                <span
                  onClick={e => this.deleteRepetition(e, repetition)}
                  className={
                    repetition.manuallyAdded ?
                    `${styles.repetition__deleteicon}` :
                    `${styles.repetition__deleteicon} ${styles.repetition__deleteicon_disabled}`
                  }
                >
                  <Icon icon={trash} />
                </span>
              </div>
            </Row>
            <Row className={styles.repetition__row_rep} style={{ display: repetition.active ? 'block' : 'none' }}>
              <Repetiton
                key={repetition.id}
                id={repetition.id}
                type={repetition.repetitonType}
                repetition={repetition}
                changeRepetitonsType={this.changeRepetitonsType}
                specialholidays={this.props.specialholidays}
                {...this.props}
              />
            </Row>
          </div>,
        )}
      </div>
    );
  }
}

RepetitionsTab.propTypes = {
  taskdetails: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  templaterepetitions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  specialholidays: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  formvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};
