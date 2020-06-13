import prisma from '../prisma';

const addEvent = async () => {
  return prisma.event.create({
    data: {
      id: '0df2c627-a35e-43bb-869d-0916dbfa03cd',
      rule: 'DTSTART:20201101T180000Z\nRRULE:FREQ=DAILY',
      eventDetails: {
        create: {
          title: 'Yoga',
          description: 'mindful yoga',
          price: 1000,
          spaces: 20,
          duration: 1,
        },
      },
    },
  });
};

const addEventException = async () => {
  return prisma.event.update({
    where: {
      id: '0df2c627-a35e-43bb-869d-0916dbfa03cd',
    },
    data: {
      exceptions: {
        create: {
          originalDate: new Date(Date.UTC(2020, 10, 2, 18)),
          date: new Date(Date.UTC(2020, 10, 2, 9)),
          eventDetails: {
            create: {
              title: 'Yoga in the morning',
              description: 'mindful yoga',
              price: 2000,
              spaces: 20,
              duration: 1,
            },
          },
        },
      },
    },
  });
};

const addEventCancellation = async () => {
  return prisma.event.update({
    where: {
      id: '0df2c627-a35e-43bb-869d-0916dbfa03cd',
    },
    data: {
      cancellations: {
        create: {
          originalDate: new Date(Date.UTC(2020, 10, 5, 18)),
        },
      },
    },
  });
};

const seed = async () => {
  // await addEvent();
  // await addEventException();
  // await addEventCancellation();

  console.log('seed complete!');
};

seed();
