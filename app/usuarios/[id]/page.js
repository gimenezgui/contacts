"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

const DetalhesUsuario = () => {
  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarInformacoes = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUsuario(response.data);
      } catch (error) {
        setErro(error);
      }
    };

    buscarInformacoes();
  }, [id]);

  console.log(usuario);

  return (
    <main>
      <h1>Detalhes do Usuário</h1>
      <Link href="/">Voltar para a página inicial!</Link>
    </main>
  );
};

export default DetalhesUsuario;
