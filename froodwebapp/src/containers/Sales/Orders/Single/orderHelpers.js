const canBeEditedUntilPickedStatuses = [
  'not saved',
  'draft',
  'confirmed',
  'backorder',
  'partialallocated',
  'allocated',
  'pickprogress',
  'picked'
];

const canBeEditedUntilAllocatedStatuses = [
  'not saved',
  'draft',
  'confirmed',
  'backorder',
  'partialallocated',
  'allocated'
];

export const canBeEditedUntilPicked = status => (
  status !== 'canceled' &&
  canBeEditedUntilPickedStatuses.includes(status.toLowerCase())
);

export const canBeEditedUntilAllocated = status => (
  status !== 'canceled' &&
  canBeEditedUntilAllocatedStatuses.includes(status.toLowerCase())
);
