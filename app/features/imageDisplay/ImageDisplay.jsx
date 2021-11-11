
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

// constants
import * as imgSrc from '../../constants/img.json';


export default function AppIcon(props: any) {
  const [imgUrl, setImgUrl] = useState('');
  const [imgCategory, setCategory] = useState('');
  const [imgFrame, setFrame] = useState([]);
  const [imgUpdated, setImgUpdated] = useState(new ImgItem('', '', [], 0));

  // useEffect(() => {
  //   props.imgData.push(imgUpdated);
  // }, imgUpdated);

  const onUploadClick = () => {
    log.info('submit pic');
    log.info(imgUrl);
    setImgUpdated(new ImgItem(imgUrl, imgCategory, imgFrame, 0));
  };
  const onInputChange = (e) => {
    setImgUrl(e.target.value);
  };
  return (
    <div>
      <h1> Image Category </h1>
      <Grid columns={2} divided>
        <Grid.Column>
          <Item>
            <Item.Image size="large" src={imgUpdated.url === '' ? imgSrc.hold : imgUpdated.url} />
            <Item.Content verticalAlign="middle">
              <Item.Header>Category: Cat</Item.Header>
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
            setFrame={setFrame}

          />
        </Grid.Column>
      </Grid>

    </div>
  );
}
