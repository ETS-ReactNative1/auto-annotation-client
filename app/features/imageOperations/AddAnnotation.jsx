/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Grid, Input, Icon, Button } from 'semantic-ui-react';
import log from 'electron-log';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

export default function AddAnnotation(props: {
  candidate: AnnotationItem,
  setCandidate: () => void
}) {
  const { setCandidate, candidate } = props;
  const [inputUpperX, setInputUpperX] = useState(0);
  const [inputUpperY, setInputUpperY] = useState(0);
  const [inputLowerY, setInputLowerY] = useState(0);
  const [inputLowerX, setInputLowerX] = useState(0);
  const [BBox, setBBox] = useState([]);
  const [category, setCategory] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  // -----------listening port here --------------
  // listen change on input for category
  const onChangeCategory = (e) => {
    setInputCategory(e.target.value);
  };
  const onSubmitCategory = () => {
    log.info('change category');
    log.info(inputCategory);
    setCategory(inputCategory);
    candidate.category = inputCategory;
    setCandidate(candidate);
  };
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
    setBBox([inputUpperX, inputUpperY, inputLowerX, inputLowerY]);
    log.info('set new bbox...');
    log.info([inputUpperX, inputUpperY, inputLowerX, inputLowerY]);
    candidate.bbox = [inputUpperX, inputUpperY, inputLowerX, inputLowerY];
    setCandidate(candidate);
  };
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1> Add category </h1>
        <br />
        <Input
          onChange={onChangeCategory}
          icon={<Icon name="check" inverted circular link onClick={onSubmitCategory} />}
          placeholder="Add annotation to..."
        />
      </Grid.Row>
      <Grid.Row>
        <h1> Add bounding box </h1>
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
