"use client";

import UserCard from "./components/UserCard";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

import axios from "axios";

const Home = () => {
  const [pesquisa, setPesquisa] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  const inputRef = useRef(null);

  const cadastrarUsuario = async (event) => {
    event.preventDefault();

    const novoUsuario = {
      id: Date.now(),
      name: nome,
      email: email,
      telefone: telefone,
    };

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        novoUsuario
      );

      setUsuarios((usuariosAtuais) => {
        return [...usuariosAtuais, response.data];
      });

      setNome("");
      setEmail("");
      setTelefone("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
        setErro("Não foi possível carregar os usuários!");
      } finally {
        setLoading(false);
      }
    };
    buscarUsuarios();
  }, []);

  console.log(usuarios);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(
      (usuario) =>
        usuario.name.toLowerCase().includes(pesquisa.toLowerCase()) ||
        usuario.email.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }, [usuarios, pesquisa]);

  const removerUsuario = useCallback((id) => {
    setUsuarios((usuariosAtuais) => {
      return usuariosAtuais.filter((usuario) => usuario.id !== id);
    });
  }, []);

  return (
    <main className="m-8">
      <div className="mb-5">
        <h1 className="text-2xl mb-8">Cadastro de Contatos</h1>

        <form onSubmit={cadastrarUsuario}>
          <div className="mb-5">
            <p className="mb-2">Digite aqui o nome do contato</p>
            <input
              placeholder="Digite aqui o nome..."
              type="text"
              value={nome}
              onChange={(event) => event.target.value}
            />
          </div>

          <div className="mb-5">
            <p>Digite aqui o e-mail do contato</p>
            <input
              placeholder="Digite aqui o e-mail..."
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-5">
            <p>Digite aqui o telefone do contato</p>
            <input
              placeholder="Digite aqui o telefone..."
              type="text"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
            />
          </div>

          <button type="submit" className="mb-5">
            Cadastrar
          </button>
        </form>

        <div className="mb-5">
          <p>Pesquisar Contato</p>
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar Cadastro..."
            value={pesquisa}
            onChange={(event) => setPesquisa(event.target.value)}
            className="mb-3 mt-3"
          />
          <p>Nome Digitado: {pesquisa}</p>
        </div>
      </div>
      <div>
        {loading ? (
          <p>Carregando Usuários...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <UserCard
              id={usuario.id}
              key={usuario.id}
              nome={usuario.name}
              email={usuario.email}
              removerUsuario={() => removerUsuario(usuario.id)}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
