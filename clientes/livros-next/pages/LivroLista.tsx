import type { NextPage } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Livro from "@/classes/modelo/Livro";
import Head from "next/head";
import { Menu } from "@/componentes/Menu";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import ControleLivro from "@/classes/controle/ControleLivros";

const controleLivro =  new ControleLivro();

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        if (!carregado) {
            controleLivro.obterLivros()
            .then(dados => {
                setLivros(dados);
                setCarregado(true);
            });
        }
    }, [carregado]);

    const excluir = (codigo: string) => {
		controleLivro.excluir(codigo)
        .then(() => {
            setCarregado (false);
        })
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Loja Next</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Catálogo de livros
                </h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="col-2 text-left p-2 bg-dark text-light">Título</th>
                            <th className="col-6 text-left p-2 bg-dark text-light">Resumo</th>
                            <th className="col-2 text-left p-2 bg-dark text-light">Editora</th>
                            <th className="col-2 text-left p-2 bg-dark text-light">Autores</th>
                        </tr>
                        </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <LinhaLivro key={index} livro={livro} excluir={() => excluir(livro.codigo)} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default LivroLista;