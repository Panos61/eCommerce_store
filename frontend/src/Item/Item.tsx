import React from 'react';
import { CartItemType } from '../types';
import { Card, Icon } from 'semantic-ui-react';

type Props = {
  item: CartItemType;
  //handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <Card>
        <img src={item.image} height={350} alt='' />
        <Card.Content>
          <Card.Description>{item.title}</Card.Description>
          <Card.Meta>
            <span style={{ color: 'green' }}>Available</span>
          </Card.Meta>
          {/* <Card.Description>{item.description}</Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <a
            href='/'
            style={{
              fontWeight: 'bolder',
              fontSize: '20px',
              color: '#433333',
            }}
          >
            <Icon name='euro sign' />
            {item.price}
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Item;
