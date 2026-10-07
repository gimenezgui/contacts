import Link from "next/link";

const UserCard = ({ nome, removerUsuario, id }) => {
  return (
    <div className="mb-5 flex gap-4">
      <h2>{nome}</h2>
      <Link href={`/usuarios/${id}`}>Ver Detalhes</Link>
      <button onClick={removerUsuario}>Remover Contato</button>
    </div>
  );
};

export default UserCard;
