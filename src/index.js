import 'jquery';
import 'bootstrap';

import './homepage';
import './screensaver';
import './grid';
import './read-more';
import './screensaver';

// Import scss for webpack compilation
import './styles/index.scss';

// Import all images
// Would prefer to get rid of this and import only the files we need.
require.context('./images', true);
