

// debug console output
import log from 'electron-log';
// react and semantic ui framework
import React, { useState, useEffect } from 'react';
import { Item, Button, Icon, Input, Placeholder, Grid } from 'semantic-ui-react';
// TODO: internal component
import ImageOperation from '../imageOperations/ImageOperation';
// import uploadButton from './uploadButton';

// data structure
import AppData from '../../dataStructure/AppData';
import ImgItem from '../../dataStructure/ImgItem';

import axios from 'axios';
// constants
import * as imgSrc from '../../constants/img.json';


export default function AppIcon(props: any) {
  // connection between front end and back end
  const { imgData } = props;
  const [imgUrl, setImgUrl] = useState('');
  const [imgCategory, setCategory] = useState('');
  const [imgBoundingBox, setBoundingBox] = useState([]);
  const [imgUpdated, setImgUpdated] = useState(new ImgItem(imgUrl, imgCategory, imgBoundingBox, -1));

  useEffect(() => {
    setImgUpdated(new ImgItem(imgUrl, imgCategory, imgBoundingBox, -1));
  }, [imgUrl, imgCategory, imgBoundingBox]);

  const onUploadClick = () => {
    log.info('submit pic');
    log.info(imgUrl);
    setImgUpdated(new ImgItem(imgUrl, imgCategory, imgBoundingBox, -1));
    // const response = axios.get('http://localhost:3000', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // if (response.ok) {
    //   console.log('it worked');
    // }
    // axios.get('http://localhost:3001/test')
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  const onInputChange = (e) => {
    setImgUrl(e.target.value);
  };
  const onSubmitChange = () => {
    log.info('change img', imgUpdated);
    log.info('origin img', imgData);
    imgData.imgItems.push(imgUpdated);
  };
  return (
    <div>
      <h1> Image Category </h1>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Item>
              <Item.Image size="large" src={imgUpdated.url === '' ? imgSrc.hold : imgUpdated.url} />
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Grid.Column>
                    Category: {imgUpdated.category}
                  </Grid.Column>
                  <Grid.Column>
                    Confidence: {imgUpdated.confidence}
                  </Grid.Column>
                </Item.Header>
                <Item.Description>
                  <Placeholder>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Item.Description>
                <Item.Extra>
                  <Input type="text" onChange={onInputChange} />
                  <Button
                    positive
                    floated="right"
                    onClick={() => onUploadClick()}
                  >
                    <Icon name="arrow alternate circle up" />
                    Upload
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column>
            <ImageOperation
              setCategory={setCategory}
              setBoundingBox={setBoundingBox}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button positive onClick={onSubmitChange}>
            Submit Annotation Changes
          </Button>
        </Grid.Row>
      </Grid>

    </div>
  );
}
