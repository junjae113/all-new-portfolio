import { useState } from 'react';

export default function useVaccination(initial = []) {
  const [vaccination, setVaccination] = useState(initial);

  const toggleVaccination = (type) => {
    setVaccination(prev => {
      const isSelected = prev.includes(type);

      if (type === 'none') {
        return isSelected ? [] : ['none'];
      }

      const withoutNone = prev.filter(v => v !== 'none');

      if (isSelected) {
        return withoutNone.filter(v => v !== type);
      } else {
        return [...withoutNone, type];
      }
    });
  };

  return { vaccination, toggleVaccination };
}
