import prisma from './prisma';
import { expandEvents } from './rrule';

const resolvers = {
  Query: {
    listEvents: async (_, args, ctx) => {
      const events = await prisma.event.findMany({
        include: {
          eventDetails: true,
          // exceptions: { include: { eventDetails: true } },
          // cancellations: true,
        },
      });
      return expandEvents(events);
    },
  },
};

export default resolvers;
