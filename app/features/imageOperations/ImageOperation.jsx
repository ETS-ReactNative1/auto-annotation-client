/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Input, Icon, Button } from 'semantic-ui-react';
import log from 'electron-log';

export default function TagCategoryPage(props: any) {
  const { setCategory, setBoundingBox } = props;
  const [inputUpperX, setInputUpperX] = useState(0);
  const [inputUpperY, setInputUpperY] = useState(0);
  const [inputLowerY, setInputLowerY] = useState(0);
  const [inputLowerX, setInputLowerX] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  // listen change on input for category
  const onChangeCategory = (e) => {
    setInputCategory(e.target.value);
  };
  const onSubmitCategory = () => {
    log.info('change category');
    log.info(inputCategory);
    setCategory(inputCategory);
  }
  // listen change on input for bounding box
  const onChangeUpperX = (e) => {
    setInputUpperX(e.target.value);
  };
  const onChangeUpperY = (e) => {
    setInputUpperY(e.target.value);
  };
  const onChangeLowerX = (e) => {
    setInputLowerX(e.target.value);
  };
  const onChangeLowerY = (e) => {
    setInputLowerY(e.target.value);
  };
  const onConfirm = () => {
    setBoundingBox([inputUpperX, inputUpperY, inputLowerX, inputLowerY]);
    log.info('set new frames...');
    log.info([inputUpperX, inputUpperY, inputLowerX, inputLowerY]);
  };
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1> Change category </h1>
        <br />
        <Input
          onChange={onChangeCategory}
          icon={<Icon name="check" inverted circular link onClick={onSubmitCategory} />}
          placeholder="Change annotation to..."
        />
      </Grid.Row>
      <Grid.Row>
        <h1> Change frame </h1>
        <br />
        <Input
          onChange={onChangeUpperX}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input upper x"
        />
        <Input
          onChange={onChangeUpperY}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input upper y"
        />
        <Input
          onChange={onChangeLowerX}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input lower x"
        />
        <Input
          onChange={onChangeLowerY}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input lower y"
        />
        <Button positive onClick={onConfirm}>
          Confirm bounding box
        </Button>
      </Grid.Row>
    </Grid>
  );
}
