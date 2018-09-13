import 'jquery';

import './homepage';
import './grid';

// Import scss for webpack compilation
import './styles/index.scss';

// Import all images
require.context('./images', true);
