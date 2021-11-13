/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Grid, Input, Icon, Button, Dropdown } from 'semantic-ui-react';
import log from 'electron-log';
import AnnotationItem from '../../dataStructure/AnnotationItem';

type MyDropdown = {
  key: number,
  text: string,
  value: AnnotationItem
};

export default function UpdateAnnotation(props: {
  annotations: AnnotationItem[],
  candidate: AnnotationItem,
  setCandidate: () => void
}) {
  const { annotations, candidate, setCandidate } = props;
  const myDropdown: MyDropdown[] = [
    {
      key: 0,
      text: '',
      value: new AnnotationItem('', [], -1),
    },
  ];
  const [BBox, setBBox] = useState([]);
  const [category, setCategory] = useState('');
  const [inputUpperX, setInputUpperX] = useState(0);
  const [inputUpperY, setInputUpperY] = useState(0);
  const [inputLowerY, setInputLowerY] = useState(0);
  const [inputLowerX, setInputLowerX] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  const [objectOptions, setObjectOptions] = useState(myDropdown);
  const annotationsOptions = annotations.map((annotation: AnnotationItem, index: number) => ({
    key: index,
    text: `${annotation.category} | ${annotation.bbox}`,
    value: annotation,
  }));
  //setCandidate(new AnnotationItem(category, BBox, candidate.confidence));
  // -----------hooks here--------------
  // listening on annotations change from above to update dropdown options
  // useEffect(() => {
  //   setObjectOptions();
  // }, [annotations]);
  // // listening on bbox and category change to update candidate
  // useEffect(() => {
  //   setCandidate(new AnnotationItem(category, BBox, candidate.confidence));
  // }, []);
  // -----------listening port here --------------
  // listen change on dropdown for selecting bounding box
  const OnObjectChange = (e, {value}) => {
    log.info('select annotation:', value);
    setCandidate(value);
  };
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
        <h1>Change annotation</h1>
        <Dropdown
          selectOnBlur={false}
          scrolling
          search
          selection
          placeholder="Select an object"
          onChange={OnObjectChange}
          options={annotationsOptions}
          clearable
        />
      </Grid.Row>
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
        <h1> Change bounding box </h1>
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
