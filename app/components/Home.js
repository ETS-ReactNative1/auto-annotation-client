// // @flow
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Home.css';

// export default class Home extends Component {
//   render() {
//     return (
//       <div>
//         <div className={styles.container} data-tid="container">
//           <h2>Home</h2>
//           <Link to="/counter">to Counter</Link>
//         </div>
//       </div>
//     );
//   }
// }
/* eslint-disable import/no-unresolved */

// component ui framework
import React from 'react';
import { Grid } from 'semantic-ui-react';
// internal component

import ImageDisplay from '../features/imageDisplay/imageDisplay';
import ImageOperation from '../features/imageOperations/ImageOperation';
import ImageHistory from '../features/imageHistory/imageHistory';


export default function imageHome() {
  return (
    <Grid columns={3} divided>
      <Grid.Column >
        <div className=".app-info-panel" data-tid="appinfo">
          <ImageDisplay />
        </div>
      </Grid.Column>
      <Grid.Column>
        <ImageOperation />
      </Grid.Column>
      <Grid.Column >
        <ImageHistory />
      </Grid.Column>
    </Grid>
  );
}
