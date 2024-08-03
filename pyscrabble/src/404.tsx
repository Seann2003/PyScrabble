import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 md:p-12 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Oops!
          </h1>
          <h2 className="text-2xl text-gray-600">
            The page you're looking for can't be found.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
