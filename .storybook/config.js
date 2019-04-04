import { configure } from '@storybook/react';
// babel macro to ensure require.context runs in Jest
import requireContext from 'require-context.macro';

import '../src/index.css';

const req = requireContext('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);


// we made changes to the config to notice the .stories.js files
// and uses our CSS file.  

// By default storybook looks for stories in a /stories directory
// tut uses a naming scheme that is similar to the .test.js scheme 
// favored by CRA for automated tests