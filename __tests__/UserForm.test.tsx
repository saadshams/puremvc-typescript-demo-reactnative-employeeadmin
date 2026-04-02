import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import UsersForm from '../src/view/components/UserForm';
import { UserVO } from '../src/model/valueObject/UserVO';
import { DeptEnum } from '../src/model/enum/DeptEnum';
import { RoleEnum } from '../src/model/enum/RoleEnum';

// 🔥 helper لتقليل التكرار
const setupEmitter = (mockUser: any) => {
  const rn = require('react-native');
  let api: any;

  return jest.spyOn(rn, 'NativeEventEmitter').mockImplementation(() => ({
    emit: (event: string, payload: any) => {
      if (event === 'userFormMounted') {
        api = payload;
      }

      if (event === 'UserFormFetch' && api?.setUser) {
        api.setUser(mockUser);
      }
    },
  }));
};

describe('UserForm', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('prefills visible input values from the route user', async () => {
    const mockUser = new UserVO(
      'u123',
      'John',
      'Doe',
      'john.doe@example.com',
      'secret',
      DeptEnum.ACCT
    );

    const emitterSpy = setupEmitter(mockUser);

    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setParams: jest.fn(),
    };

    const route = {
      key: 'UserForm-key',
      name: 'UserForm',
      params: { user: mockUser, roles: [] },
    } as any;

    const { getAllByDisplayValue, findByDisplayValue } = render(
      <UsersForm navigation={navigation as any} route={route} />
    );

    expect(await findByDisplayValue('John')).toBeTruthy();
    expect(await findByDisplayValue('Doe')).toBeTruthy();
    expect(await findByDisplayValue('john.doe@example.com')).toBeTruthy();
    expect(await findByDisplayValue('u123')).toBeTruthy();

    // password + confirm
    expect(getAllByDisplayValue('secret').length).toBeGreaterThanOrEqual(2);

    emitterSpy.mockRestore();
  });

  it('shows validation error when required fields are missing', async () => {
    const emptyUser = new UserVO();

    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setParams: jest.fn(),
    };

    const route = {
      key: 'UserForm-key',
      name: 'UserForm',
      params: { user: emptyUser, roles: [] },
    } as any;

    const { getByText, findByText } = render(
      <UsersForm navigation={navigation as any} route={route} />
    );

    fireEvent.press(getByText(/save/i));

    expect(await findByText(/required/i)).toBeTruthy();
  });

  it('shows validation error for empty department when pressing Save/Update', async () => {
    const mockUser = new UserVO(
      'u123',
      'John',
      'Doe',
      'john.doe@example.com',
      'secret',
      DeptEnum.NONE_SELECTED
    );

    const emitterSpy = setupEmitter(mockUser);

    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setParams: jest.fn(),
    };

    const route = {
      key: 'UserForm-key',
      name: 'UserForm',
      params: { user: mockUser, roles: [RoleEnum.ADMIN] },
    } as any;

    const { getByText, findByText } = render(
      <UsersForm navigation={navigation as any} route={route} />
    );

    fireEvent.press(getByText(/save|update/i));

    expect(await findByText(/department/i)).toBeTruthy();

    emitterSpy.mockRestore();
  });

});