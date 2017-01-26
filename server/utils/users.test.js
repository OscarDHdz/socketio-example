const expect = require('expect');

const {Users} = require('./users');




describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Oscar',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Brenda',
      room: 'Node Course'
    }, {
      id: '3',
      name: 'Mike',
      room: 'React Course'
    }]
  })

  it('Should add new user', () => {
    users.addUser(1, 'Oscar', 'My Room');
    expect(users.users.length).toEqual(4);
  });

  it('Should should return users for Node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList.length).toEqual(2);
  });

  it('Should should return an user By Id', () => {
    var userOne = users.getUser('1');
    expect(userOne).toInclude({
      id: '1',
      name: 'Oscar',
      room: 'Node Course'
    });
  });

  it('Should remove a user By Id', () => {
    var userOne = users.removeUser('1');
    expect(users.getUserList('Node Course').length).toBe(1);
    expect(userOne).toInclude({
      id: '1',
      name: 'Oscar',
      room: 'Node Course'
    });
  });

  it('Should should not remove a user', () => {
    var userOne = users.removeUser('15');
    expect(users.getUserList('Node Course').length).toBe(2);

  });

});
