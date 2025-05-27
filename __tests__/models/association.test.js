const sequelize = require('../../src/config/database');
const User = require('../../src/models/User');
const Accomodation = require('../../src/models/Accomodation');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('CASCADE delete', () => {
  it('ska ta bort accomodations direkt när en user raderas', async () => {

    const user = await User.create({
      username: 'melissa',
      email: 'melissa@outlook.com'
    });


    await Accomodation.create({
      adress: 'Lagfartsvägen 46',
      stad: 'Stockholm',
      land: 'Sverige',
      postnummer: '14558',
      hyra: 7000,
      rum: 2,
      userId: user.id
    });



    await user.destroy();


    const kvarBoenden = await Accomodation.findAll({ where: { userId: user.id } });
    expect(kvarBoenden.length).toBe(0);
  });
});
