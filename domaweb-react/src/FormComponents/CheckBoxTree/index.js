import React from 'react';
import ReactCheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import _differenceWith from 'lodash/differenceWith';
import _isEqual from 'lodash/isEqual';
import _noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';

import CheckboxTree from '../../sharedComponents/CheckBoxTree';

const CheckboxTreeForm = ({ input: { value, onChange }, nodes, meta, onExpandNode }) => (<div>
  <CheckboxTree
    nodes={nodes}
    checked={value}
    onCheckChange={onChange}
    onExpandNode={onExpandNode}
  />
  {meta.error && meta.touched && <span className="error-text"><FormattedMessage {...meta.error} /></span>}
</div>);

CheckboxTree.defaultProps = {
};

export default CheckboxTreeForm;
