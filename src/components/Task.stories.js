// below we build out Task's three test states in the story file:

import React from 'react';
// to initiate storybook, we first call the storiesOf() function to register the component
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Task from './Task';

export const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

// action allows us to create a callback that appears in the
// actions panel of the Storybook UI when clicked.
// So when we build a pin button, we'll be able to determine
// in the test UI if a button click is successful
// mocked callbacks that a Task component expects
export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

// Two levels of organization in Storybook.  Component and its child stories
// each story is a permutation of a component

// To defint our stories, we call add() once for each of our test states to
// generate a story.  The action story is a function that returns
// a rendered element (a component class with a set of props) in a given state
// exactly like a React Stateless Functional Component
storiesOf('Task', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Task task={object('task', { ...task })} {...actions} />;
  })
  .add('pinned', () => <Task task={{ ...task, state: 'TASK_PINNED' }} {...actions} />)
  .add('archived', () => <Task task={{ ...task, state: 'TASK_ARCHIVED' }} {...actions} />);

// as we need to pass the same set of actions to all permutations
// of our component, it is convenient to bundle them up into a single
// actions variable and use React's {...actions} props expansion to pass them
// all at once.  <Task {...actions} /> is equivalent to
// <Task onPinTask={actions.onPinTask} onArchiveTask={actions.onArchiveTask} />

// Snapshot testing referes to the practice of recording the 'known good' output
// of a component for a given input and then flagging the component whenever the output changes in
// the future.  This complements Storybook, because it's a quick way
// to view the new version of a component aand check out the changes
