// Packages
import { useContext } from 'react';

// Contexts
import { TasksContext } from 'contexts/tasksContext';

export const useTasksContext = () => {
  return useContext(TasksContext);
};
