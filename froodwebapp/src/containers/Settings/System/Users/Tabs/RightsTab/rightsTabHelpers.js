import { unionBy } from 'lodash';

export const columns = [{
  title: 'Select',
  dataIndex: 'isActive',
  type: 'checkbox',
  width: '50%'
}, {
  title: 'Rigths Attaches to Role',
  dataIndex: 'name',
  width: '50%'
}];

export const prepareRole = (roles, rights, roleId) => {
  let role;
  const allRights = rights.map(right => ({ ...right, isActive: false }));

  if (roleId) {
    role = roles.find(rl => rl.id === Number(roleId));
  } else {
    [role] = roles;
  }

  if (role && role.rights) {
    const newRights = role.rights.map(right => ({
      ...right,
      isActive: true
    }));

    return {
      ...role,
      rights: unionBy(newRights, allRights, 'id')
    };
  }

  return {
    ...role,
    rights: allRights
  };
};
