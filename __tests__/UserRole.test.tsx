import React, { type ComponentType } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CheckBox } from '@rneui/themed';
import UserRole from '../src/view/components/UserRole';
import { RoleEnum } from '../src/model/enum/RoleEnum';
import { ApplicationConstants } from '../src/ApplicationConstants';

const CheckBoxComponent = CheckBox as unknown as ComponentType<any>;

describe('UserRole', () => {
  let navigation: any;
  let emitMock: jest.Mock;

  const route = {
    key: 'UserRole-key',
    name: 'UserRole',
    params: {
      user: {
        username: 'u1',
        first: 'John',
        last: 'Doe',
        email: '',
        password: '',
        confirm: '',
        department: {},
      },
    },
  } as any;

  const getCheckBoxByTitle = (checkBoxes: any[], title: string) => {
    const checkBox = checkBoxes.find((cb) => cb.props.title === title);
    expect(checkBox).toBeDefined();
    return checkBox;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const rn = require('react-native');

    emitMock = jest.fn((event: string, payload: any) => {
      if (
        event === ApplicationConstants.USER_ROLE_MOUNTED &&
        payload?.setData
      ) {
        payload.setData([RoleEnum.ADMIN]);
      }
    });

    jest.spyOn(rn, 'NativeEventEmitter').mockImplementation(() => ({
      emit: emitMock,
    }));

    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all roles from RoleEnum.combo', () => {
    const { getByText } = render(
      <UserRole navigation={navigation} route={route} />
    );

    RoleEnum.combo.forEach((role: RoleEnum) => {
      expect(getByText(role.value)).toBeTruthy();
    });
  });

  it('emits mounted and fetch events', async () => {
    render(<UserRole navigation={navigation} route={route} />);

    await waitFor(() => {
      expect(emitMock).toHaveBeenCalledWith(
        ApplicationConstants.USER_ROLE_MOUNTED,
        expect.objectContaining({
          USER_ROLE_FETCH: 'UserRoleFetch',
          setData: expect.any(Function),
        })
      );

      expect(emitMock).toHaveBeenCalledWith('UserRoleFetch', { id: 'u1' });
    });
  });

  it('loads initial selected role', async () => {
    const { UNSAFE_getAllByType } = render(
      <UserRole navigation={navigation} route={route} />
    );

    await waitFor(() => {
      const checkBoxes = UNSAFE_getAllByType(CheckBoxComponent);
      const adminCheckBox = getCheckBoxByTitle(
        checkBoxes,
        RoleEnum.ADMIN.value
      );

      expect(adminCheckBox.props.checked).toBe(true);
    });
  });

  it('toggles role selection', async () => {
    const { UNSAFE_getAllByType } = render(
      <UserRole navigation={navigation} route={route} />
    );

    await waitFor(() => {
      const checkBoxes = UNSAFE_getAllByType(CheckBoxComponent);
      const adminCheckBox = getCheckBoxByTitle(
        checkBoxes,
        RoleEnum.ADMIN.value
      );

      expect(adminCheckBox.props.checked).toBe(true);
    });

    let checkBoxes = UNSAFE_getAllByType(CheckBoxComponent);
    let adminCheckBox = getCheckBoxByTitle(
      checkBoxes,
      RoleEnum.ADMIN.value
    );

    fireEvent.press(adminCheckBox);

    checkBoxes = UNSAFE_getAllByType(CheckBoxComponent);
    adminCheckBox = getCheckBoxByTitle(
      checkBoxes,
      RoleEnum.ADMIN.value
    );

    expect(adminCheckBox.props.checked).toBe(false);
  });

  it('navigates on Save', async () => {
    const { getByText } = render(
      <UserRole navigation={navigation} route={route} />
    );

    await waitFor(() => {
      expect(getByText('Save')).toBeTruthy();
    });

    fireEvent.press(getByText('Save'));

    expect(navigation.navigate).toHaveBeenCalledWith('UserForm', {
      user: route.params.user,
      roles: [RoleEnum.ADMIN],
    });
  });

  it('goes back on Cancel', () => {
    const { getByText } = render(
      <UserRole navigation={navigation} route={route} />
    );

    fireEvent.press(getByText('Cancel'));
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('emits unmounted event', () => {
    const { unmount } = render(
      <UserRole navigation={navigation} route={route} />
    );

    unmount();

    expect(emitMock).toHaveBeenCalledWith(
      ApplicationConstants.USER_ROLE_UNMOUNTED
    );
  });
});