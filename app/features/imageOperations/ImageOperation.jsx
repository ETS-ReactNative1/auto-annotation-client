/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import log from 'electron-log';

export default function TagCategoryPage(props: any) {
  const { img } = props;
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1> Change annotation </h1>
        <br />
        <Input
          icon={<Icon name="check" inverted circular link />}
          placeholder="Change annotation to..."
        />
      </Grid.Row>
      <Grid.Row>
        <h1> Change frame </h1>
        <br />
        <Input
          icon={<Icon name="check" inverted circular link />}
          placeholder="Change frame to..."
        />
      </Grid.Row>
    </Grid>
  );
}
