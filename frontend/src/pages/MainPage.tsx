import React from 'react';
import '../App.css';
import { useQuery } from 'react-query';
import { CartItemType } from '../types';
import Item from '../Item/Item';
import { Loader } from 'semantic-ui-react';

const getAllProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://fakestoreapi.com/products')).json();

const MainPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getAllProducts
  );
  if (isLoading) return <Loader inverted size='large' content='Loading' />;
  if (error) return <h2>Error loading data..</h2>;
  console.log(data);

  return (
    <div className='main_page'>
      {data?.map((item) => (
        <div key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

export default MainPage;
