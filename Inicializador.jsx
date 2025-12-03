import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OwnerList() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    const res = await axios.get('http://localhost:3001/owners');
    setOwners(res.data);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Tem certeza? Se o dono tiver pets, não será excluído.")) {
        try {
            await axios.delete(`http://localhost:3001/owners/${id}`);
            loadOwners();
        } catch (error) {
            alert("Erro ao excluir. Verifique se o dono possui pets cadastrados.");
        }
    }
  };

  return (
    <div>
      <h2>Lista de Donos</h2>
      <Link to="/owners/new"><button>Cadastrar Novo Dono</button></Link>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.name}</td>
              <td>{owner.phone}</td>
              <td>{owner.address}</td>
              <td>
                <button onClick={() => handleDelete(owner.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerList;
