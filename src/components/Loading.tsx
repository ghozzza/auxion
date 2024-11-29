import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-800 dark:border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
