import React from 'react';
import PropTypes from 'prop-types';
import ReactCheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import _differenceWith from 'lodash/differenceWith';
import _isEqual from 'lodash/isEqual';
import _noop from 'lodash/noop';
import './CheckboxTree-styles.scss';

class CheckboxTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['all'],
    };
  }

  onExpand = (expanded) => {
    const { onExpandNode } = this.props;
    const diff = _differenceWith(expanded, this.state.expanded, _isEqual);
    if (diff.length > 0) {
      onExpandNode(diff[0]);
    }
    this.setState({ expanded });
  };


  render() {
    const { checked, onCheckChange, nodes } = this.props;
    return (<div className="checkbox-tree">
      <ReactCheckboxTree
        nodes={[{ label: 'All', value: 'all', children: nodes }]}
        checked={checked}
        expanded={this.state.expanded}
        onCheck={onCheckChange}
        onExpand={this.onExpand}
      />
    </div>
    );
  }
}

CheckboxTree.defaultProps = {
  onCheckChange: _noop,
  nodes: [],
  checked: [],
  onExpandNode: _noop,
};

const nodeShape = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape));

CheckboxTree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  checked: PropTypes.arrayOf(PropTypes.string),
  onCheckChange: PropTypes.func,
  onExpandNode: PropTypes.func,
};

export default CheckboxTree;
