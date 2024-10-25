"use client";

import styled from 'styled-components';

const Header = styled.header`
  background-color: #fff;
  padding: 20px;
`;

const Button = styled.button`
  background-color: white;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #005bb5;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
`;

export default function Home() {
  return (
    <div>
      <Header>
        <img src="../logoLacrei.svg" alt="Logo Lacrei Saúde" />
        <nav>
          <Ul>
            <li>
              <Button>Quem somos nós</Button>
            </li>
            <li>
              <Button>Ajuda</Button>
            </li>
            <li>
              <Button>Entrar</Button>
            </li>
          </Ul>
        </nav>
      </Header>
      <main>
        <section>
          <article>
            <h1>Olá, você está no Lacrei Saúde</h1>
            <p>
              Aqui está uma breve descrição do projeto...
            </p>
            <div>
              <Button>Para pacientes</Button>
              <Button>Para profissionais</Button>
            </div>
          </article>
        </section>
      </main>
      <footer>
        <p>Iniciativa da corporação desde 2021 - atual</p>
      </footer>
    </div>
  );
}
