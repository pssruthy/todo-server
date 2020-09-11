const DONE = 'done';
const PROCESSING = 'processing';
const UNDONE = 'undone';

const toggleStatus = {
  [UNDONE]: PROCESSING,
  [PROCESSING]: DONE,
  [DONE]: UNDONE,
};

const getDefaultStatus = () => UNDONE;

const getNextStatus = (currentStatus) => toggleStatus[currentStatus];

module.exports = { getDefaultStatus, getNextStatus };
