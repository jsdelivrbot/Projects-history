import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import {ContextMenuProvider, ContextMenu, Item } from './';


const stories = storiesOf('ContextMenu', module);
stories.addDecorator(withKnobs);

stories.add('ContextMenu', withInfo('Context menu')(() => <ContextMenuProvider>
    <h1 style={{background: 'red', height: 100,}}> Context menu body </h1>
    <ContextMenu>
        <Item><div style={{background: 'green'}}>I am context menu</div></Item>
    </ContextMenu>
</ContextMenuProvider>));
