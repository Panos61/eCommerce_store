import React from 'react';
import { CartItemType } from '../types';
import { Button, Card, Icon } from 'semantic-ui-react';

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
          <Card.Header>
            <a
              href='/'
              style={{
                fontWeight: 'bolder',
                fontSize: '19px',
                color: '#433333',
              }}
            >
              {item.price}
              <Icon name='euro sign' />
            </a>
          </Card.Header>
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
              fontSize: '15px',
              color: 'chocolate',
            }}
          >
            <Icon name='cart' />
            Add to cart
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Item;
