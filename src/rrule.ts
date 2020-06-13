import {
  Event,
  EventDetails,
  EventException,
  EventCancellation,
} from '@prisma/client';
import { addMonths } from 'date-fns';
import { orderBy } from 'lodash';
import { RRuleSet, rrulestr } from 'rrule';

const startDate = new Date(Date.UTC(2020, 10, 1));

// Default
// ---------------------------------

// type EventWithDetails = Event & {
//   eventDetails: EventDetails;
// };

// const expandEvent = (event: EventWithDetails) => {
//   const rrule = rrulestr(event.rule);
//   const rruleSet = new RRuleSet();

//   rruleSet.rrule(rrule);
//   const dates = rruleSet.between(startDate, addMonths(startDate, 1));

//   return dates.map((date) => ({
//     ...event.eventDetails,
//     date: date.toISOString(),
//   }));
// };

// Exceptions
// ---------------------------------

// type EventWithDetails = Event & {
//   eventDetails: EventDetails;
//   exceptions: (EventException & {
//     eventDetails: EventDetails;
//   })[];
// };

// const expandEvent = (event: EventWithDetails) => {
//   const rrule = rrulestr(event.rule);
//   const rruleSet = new RRuleSet();

//   rruleSet.rrule(rrule);
//   event.exceptions.map((exception) => {
//     rruleSet.exdate(exception.originalDate);
//   });
//
//   const dates = rruleSet.between(startDate, addMonths(startDate, 1));

//   const allEvents = dates
//     .map((date) => ({
//       ...event.eventDetails,
//       date: date.toISOString(),
//     }))
//     .concat(
//       event.exceptions.map((exception) => ({
//         ...exception.eventDetails,
//         date: exception.date.toISOString(),
//       })),
//     );

//   return orderBy(allEvents, (event) => event.date);
// };

// Exceptions and Cancellations
// ---------------------------------

type EventWithDetails = Event & {
  eventDetails: EventDetails;
  exceptions: (EventException & {
    eventDetails: EventDetails;
  })[];
  cancellations: EventCancellation[];
};

const expandEvent = (event: EventWithDetails) => {
  const rrule = rrulestr(event.rule);
  const rruleSet = new RRuleSet();

  rruleSet.rrule(rrule);
  event.exceptions.map((exception) => {
    rruleSet.exdate(exception.originalDate);
  });
  event.cancellations.map((cancellation) => {
    rruleSet.exdate(cancellation.originalDate);
  });

  const dates = rruleSet.between(startDate, addMonths(startDate, 1));

  const allEvents = dates
    .map((date) => ({
      ...event.eventDetails,
      date: date.toISOString(),
    }))
    .concat(
      event.exceptions.map((exception) => ({
        ...exception.eventDetails,
        date: exception.date.toISOString(),
      })),
    );

  return orderBy(allEvents, (event) => event.date);
};

export const expandEvents = (events) => {
  return events.flatMap(expandEvent);
};
