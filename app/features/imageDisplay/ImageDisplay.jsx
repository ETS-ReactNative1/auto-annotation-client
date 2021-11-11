import React from 'react';
import { Item, Button, Icon, Placeholder } from 'semantic-ui-react';
// // internal component
// import uploadButton from './uploadButton';
export default function AppIcon(props: any) {
  const { appIconSrc } = props;

  return (
    <div>
      <h1> Image annotation </h1>
      <Item>
        <Item.Image size="large" src="/Users/joanna/Desktop/CU/Courses/6893_big_data_analytics/project/auto-annotation-client/app/example/mockImage/cat.jpg" />
        <Item.Content verticalAlign="middle">
          <Item.Header>Annotation: Cat</Item.Header>
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
            <Button positive floated="right">
              <Icon name="arrow alternate circle up" />
              Upload
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>

    </div>
  );
}
