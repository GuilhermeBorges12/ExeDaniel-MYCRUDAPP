import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLivro, getLivroById, updateLivro } from '../services/api';
interface Livro {
    title: string;
    Autor: string;
    Ano: number;
    Gênero: string;
    NumPag: number;
}
function LivroForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [livro, setLivro] = useState<Livro>({
        title: '',
        Autor: '',
        Gênero: '',
        Ano: 0,
        NumPag: 0,
    });
    useEffect(() => {
        if (id) {
            loadLivro();
        }
    }, [id]);
    const loadLivro = async () => {
        try {
            const response = await getLivroById(id as string);
            setLivro(response.data);
        } catch (error) {
            console.error("Error loading livro data", error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLivro({
            ...livro,
            [e.target.title]: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateLivro(id, livro);
            } else {
                await createLivro(livro);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving livro", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>title</label>
                <input
                    type="text"
                    title="title"
                    value={livro.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    title="Autor"
                    value={livro.Autor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Ano</label>
                <input
                    type="number"
                    title="Ano"
                    value={livro.Ano}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Número de Páginas</label>
                <input
                    type="number"
                    title="NumPag"
                    value={livro.NumPag}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}
export default LivroForm;