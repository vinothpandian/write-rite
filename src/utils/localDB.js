import { Value } from 'slate';
import { emptyValue } from '.';

export const storeLocally = (id, writing) => {
  const data = {
    timestamp: Date.now(),
    writing,
  };

  localStorage.setItem(id, JSON.stringify(data));
};

export const getWritingLocally = (id) => {
  const data = localStorage.getItem(id);

  if (!data) {
    return {
      timestamp: null,
      writing: emptyValue,
    };
  }

  const { timestamp, writing } = JSON.parse(data);

  return {
    timestamp,
    writing: Value.fromJSON(writing),
  };
};
