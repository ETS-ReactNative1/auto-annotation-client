/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import log from 'electron-log';
import AnnotationItem from '../../dataStructure/AnnotationItem';

type MyDropdown = {
  key: number,
  text: string,
  value: AnnotationItem
};

export default function DeleteAnnotaion(props: {
  annotations: AnnotationItem[],
  setCandidate: () => void
}) {
  const { annotations, setCandidate } = props;
  const myDropdown: MyDropdown[] = [
    {
      key: 0,
      text: '',
      value: new AnnotationItem('', [], -1),
    },
  ];
  const [objectOptions, setObjectOptions] = useState(myDropdown);
  const annotationsOptions = annotations.map((annotation: AnnotationItem, index: number) => ({
    key: index,
    text: `${annotation.category} | ${annotation.bbox}`,
    value: annotation,
  }));
  // -----------hooks here--------------
  // listening on annotations change from above to update dropdown options
  // useEffect(() => {
  //   setObjectOptions(annotations.map((annotation: AnnotationItem, index: number) => ({
  //     key: index,
  //     text: `${annotation.category} | ${annotation.bbox}`,
  //     value: annotation,
  //   })));
  // }, []);
  // -----------listening port here --------------
  // listen change on dropdown for selecting bounding box
  const OnObjectChange = (e, { value }) => {
    log.info('select annotation to delete:', value);
    setCandidate(value);
  };
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1>Delete annotation</h1>
        <Dropdown
          selectOnBlur={false}
          scrolling
          search
          selection
          placeholder="Select an object to delete"
          onChange={OnObjectChange}
          options={annotationsOptions}
          clearable
        />
      </Grid.Row>
    </Grid>
  );
}
