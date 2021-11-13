/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Dropdown, Modal, Button } from 'semantic-ui-react';
import log from 'electron-log';

// internal component
import AddAnnotation from './AddAnnotation';
import DeleteAnnotaion from './DeleteAnnotation';
import UpdateAnnotation from './UpdateAnnotation';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';
import OptionConfirmation from './OptionConfirmation';

type MyDropdown = {
  key: number,
  text: string,
  value: number
};

export default function ImageOperation(props: { Annotations: AnnotationItem[], canEdit: boolean}) {
  const { Annotations, canEdit } = props;
  const [option, setOption] = useState(-1);  // specify options on annotation: add, delete or update
  const [open, setOpen] = useState(false);  // modal window control
  const [candidate, setCandidate] = useState(new AnnotationItem('', [], -1));
  // -----------component data here --------------
  const objectOptions: MyDropdown[] = [
    { key: 0, value: 0, text: 'add' },
    { key: 1, value: 1, text: 'remove' },
    { key: 2, value: 2, text: 'update' }
  ];
  // -----------listening port here --------------
  // listen change on dropdown for selecting bounding box
  const OnObjectChange = (e, selection) => {
    setOption(selection.value);
  };
  // listen change on selection for options on annotation
  const AnnotationOptionComponent = () => {
    // add annotaion
    if (option === 0) {
      return (
        <AddAnnotation
          candidate={candidate}
          setCandidate={setCandidate}
        />
      );
    }
    // remove annotation
    if (option === 1) {
      return (
        <DeleteAnnotaion
          candidate={candidate}
          setCandidate={setCandidate}
          annotations={Annotations}
        />
      );
    }
    // update annotation
    if (option === 2) {
      return (
        <UpdateAnnotation
          candidate={candidate}
          setCandidate={setCandidate}
          annotations={Annotations}
        />
      );
    }
    return (
      <h1>Please specify an option</h1>
    );
  };

    // handle changes on annotation
  const addAnnoation = () => {
    if (candidate.confidence !== -1) {
      log.info('add new annotation: ', candidate);
      Annotations.push(candidate);
    }
  };

  // handle changes on delete annotation
  const deleteAnnotation = () => {
    if (candidate.confidence !== -1) {
      log.info('delete existed annotation: ', candidate);
      const index = Annotations.indexOf(candidate);
      if (index !== -1) {
        Annotations.splice(index, 1);
      }
    }
  };

  // handle changes on update annotation
  const updateAnnotation = () => {
    if (candidate.confidence !== -1) {
      log.info('update existed annotation: ', candidate);
      const index = Annotations.indexOf(candidate);
      if (index !== -1) {
        Annotations[index] = candidate;
      }
    }
  };

  // handle confirm change: switch based on option(0, 1, 2)
  const handleOptionConfirm = () => {
    if (option === 0) addAnnoation();
    else if (option === 1) deleteAnnotation();
    else if (option === 2) updateAnnotation();
    setOpen(false);  // close modal
  };
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1>Annotation Options</h1>
        <Dropdown
          selectOnBlur={false}
          scrolling
          search
          selection
          placeholder="Select an option"
          onChange={OnObjectChange}
          disabled={!canEdit}
          options={objectOptions}
          clearable
        />
      </Grid.Row>
      <Grid.Row>
        <AnnotationOptionComponent />
      </Grid.Row>
      <Grid.Row>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Update Annotation</Button>}
        >
          <OptionConfirmation
            option={option}
            candidate={candidate}
          />
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Yes"
              labelPosition="right"
              icon="checkmark"
              onClick={() => handleOptionConfirm()}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Grid.Row>
    </Grid>
  );
}
