import React from "react";
import Header from "../features/Header";
import Projects from "../features/Projects";
import Contact from "../features/Contact";
import Experiences from "../features/Experiences";
import Skills from "../features/Skills";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 30rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  margin: 0 auto;
  gap: 1rem;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <Contact />
      <Experiences />
      <Projects />
      <Skills />
    </Container>
  );
};

export default Home;
