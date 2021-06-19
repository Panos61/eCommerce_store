import React from 'react';
//import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  onClick: () => void;
  username: string | undefined;
};

const LogoutBtn: React.FC<Props> = ({ onClick, username }) => {
  return (
    <div>
      <Dropdown text={`Hi, ${username}`} pointing='top' className='logout-btn'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <span style={{ color: 'teal' }}>My account</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onClick}>
            <span style={{ color: 'red' }}>Sign out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LogoutBtn;
