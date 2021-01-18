import React from 'react';
import { Link } from 'react-router-dom';

type PageTemplateProps = {
  children: React.ReactElement;
  search?: React.ReactElement;
}

const PageTemplate = ({search, children}: PageTemplateProps) => {

  // Return the App component.
  return (
    <div className="flex flex-col mx-auto antialiased font-mono min-h-screen">
      <header className="flex flex-col sticky top-0">
        <nav className="bg-gray-200 px-4 py-4 flex flex-wrap">
          <div className="flex-grow">
            <Link to="/"><h1>Movie DB</h1></Link>
          </div>
          {search &&
            <div>
            {search}
            </div>
          }
        </nav>
      </header>
      <main className="flex-grow px-4 py-4 flex w-full">
        {children}
      </main>
      <footer className="w-full py-4 bg-gray-200 bottom-0">
        <div className="text-center">Powered by <a href="https://www.themoviedb.org/">The Movie DB</a>.</div>
      </footer>
    </div>
  );
}

export default PageTemplate;
