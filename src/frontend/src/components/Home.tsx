import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='container'>
      <header className='jumbotron'>
        <h1>Welcome to Restaurant Finder Application</h1>
        <p>This is a demo application using RAG</p>
      </header>
      <div className='mt-4'>
        <div className='d-flex'>
          <Link to='/login' className='btn btn-primary me-2'>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;