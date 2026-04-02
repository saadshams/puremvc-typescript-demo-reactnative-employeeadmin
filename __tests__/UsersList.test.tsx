import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UsersList from '../src/view/components/UserList';

const route = {
  key: 'UserList-key',
  name: 'UserList',
  params: {},
} as any;

const mockUsers = [
  { username: 'u1', first: 'John', last: 'Doe', email: '', password: '', confirm: '', department: {} },
  { username: 'u2', first: 'Jane', last: 'Smith', email: '', password: '', confirm: '', department: {} },
];

describe('UsersList', () => {
  let navigation: any;

  beforeEach(() => {
    const rn = require('react-native');

    jest.spyOn(rn, 'NativeEventEmitter').mockImplementation(() => ({
      emit: (event: string, payload: any) => {
        if (event === 'userListMounted' && payload?.setUsers) {
          payload.setUsers(mockUsers);
        }
      },
    }));

    navigation = {
      navigate: jest.fn(),
      setParams: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders user names from the FlatList', async () => {
    const { findByText } = render(
      <UsersList navigation={navigation} route={route} />
    );

    expect(await findByText('Doe, John')).toBeTruthy();
    expect(await findByText('Smith, Jane')).toBeTruthy();
  });

  it('navigates to UserForm with the selected user on press', async () => {
    const { findByText } = render(
      <UsersList navigation={navigation} route={route} />
    );

    const userRow = await findByText('Doe, John');
    fireEvent.press(userRow);

    expect(navigation.navigate).toHaveBeenCalledWith(
      'UserForm',
      expect.objectContaining({
        user: expect.objectContaining({ username: 'u1' }),
        roles: [],
      }),
    );
  });
});