import { useEffect, useState } from 'react';
import { getLivros, deleteLivro } from '../services/api';
import { Link } from 'react-router-dom';
interface Livro {
 id: string;
 title: string;
 Autor: string;
 Gênero: string;
 Ano: number;
 NumPag: number;
}
function LivroList() {
 const [livros, setLivros] = useState<Livro[]>([]);
 useEffect(() => {
 loadLivros();
 }, []);
 const loadLivros = async () => {
 const response = await getLivros();
 setLivros(response.data);
 };
 const handleDelete = async (id: string) => {
 await deleteLivro(id);
 loadLivros();
 };
 return (
 <div>
 <h1>Livro List</h1>
 <Link to="/add">Add Livro</Link>
 <ul>
 {livros.map((livro) => (
 <li key={livro.id}>
 {livro.title} - {livro.Autor} - {livro.Gênero} - {livro.Ano} - {livro.NumPag} páginas
 <Link to={`/edit/${livro.id}`}>Edit</Link>
 <button onClick={() => handleDelete(livro.id)}>Delete</button>
 </li>
 ))}
 </ul>
 </div>
 );
}
export default LivroList;