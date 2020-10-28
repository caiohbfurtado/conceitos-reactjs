import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    (async function settedRepos () {
      await api
        .get('/repositories')
        .then(res => setRepositories(res.data))
        .catch(err => console.log(err))
    }())
  },[])

  async function handleAddRepository() {
    const repository = {
      title: 'Novo Repo',
      url: 'www.novorepo.com.br',
      techs:['ReactJS', 'Node.js'],
    }

    await api
      .post('/repositories', repository)
      .then(res => setRepositories([...repositories, res.data]))
      .catch(err => console.log(err))
  }

  async function handleRemoveRepository(id) {
    await api
      .delete(`/repositories/${id}`)
      .then(res => setRepositories(repositories.filter(repo => repo.id !== id)))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && 
          repositories.map((repo, index) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
