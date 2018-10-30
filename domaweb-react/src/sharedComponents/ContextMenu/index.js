import React from 'react';
import { ContextMenu as ContextMenuLib, Item as ItemLib, ContextMenuProvider as ContextMenuProviderLib } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import styles from './ContextMenu-styles.scss';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export const Item = props => <ItemLib {...props} />;

export const ContextMenu = ({ children, id }) => <ContextMenuLib id={id}>{children}</ContextMenuLib>;

export const ContextMenuProvider = ({ children, ...rest }) => {
  const id = `context_menu_${uuidv4()}`;
  return (<React.Fragment>
    <ContextMenuProviderLib id={id}>
      <div {...rest}>
        {
          React.Children.map(children, (child) => {
            if (child && child.type !== ContextMenu) {
              return child;
            }
            return undefined;
          })
        }
      </div>
    </ContextMenuProviderLib>
    {
      React.Children.map(children, (child) => {
        if (child && child.type === ContextMenu) {
          return React.cloneElement(child, { id });
        }
        return undefined;
      })
    }
  </React.Fragment>);
  };
