import React, {useState, useEffect} from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  
  const [repositories, setRepos] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories',{
      title: `My repo ${Date.now()}`,
      url: "https://github.com/stgonzales/concepts-nodejs-3",
      techs: [
        "NodeJs",
        "React"
      ]
    })

    const repo = response.data
    setRepos([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response => {
      if(response.status === 204) {
        const repoIndex = repositories.findIndex(repo => repo.id === id)
        repositories.splice(repoIndex,1)
        setRepos([...repositories]);
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id ? repo.id : 0}>{repo.title} <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
