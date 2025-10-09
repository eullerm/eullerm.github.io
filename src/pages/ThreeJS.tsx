import React from "react";
import styled from "@emotion/styled";
import Text from "../components/Text";
import Timer3D from "../components/3D/Timer3D";
import Skeleton from "../components/Skeleton";

interface Example {
  id: "timer" | "cube";
  name: string;
  component: React.FC<any>;
  description: string;
}

const TimerExample: React.FC = () => <Timer3D seconds={60} />;

const CubeExample: React.FC = () => (
  <div
    style={{
      padding: "2rem",
      fontSize: "1.5rem",
      color: "white",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text as="h4">Exemplo 3D Genérico (Placeholder)</Text>
    <Text as="p">Este é um placeholder para um futuro Cubo ou modelo 3D.</Text>
    <Skeleton style={{ width: "80%", height: "200px", marginTop: "1rem" }} />
  </div>
);

const examplesData: Example[] = [
  {
    id: "timer",
    name: "Contador 3D Interativo",
    component: TimerExample,
    description:
      "Demonstra um relógio 3D interativo construído com Three.js puro, com botões funcionais e animação de alarme.",
  },
  {
    id: "cube",
    name: "Modelos e Geometrias",
    component: CubeExample,
    description:
      "Exemplo mostrando o carregamento de um modelo GLTF e manipulação de materiais PBR.",
  },
];

const DEFAULT_ID = examplesData[0].id;

const PageWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

const SplitContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 6rem);
  overflow: hidden;
`;

const Sidebar = styled.div`
  flex: 0 0 18rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.field};
  padding: 0;
`;

const Item = styled.div<{ isActive: boolean }>`
  padding: 0 1rem;
  align-content: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  height: 3rem;
  border-left: 3px solid
    ${(props) => (props.isActive ? props.theme.primary?.color : "transparent")};
  background-color: ${(props) =>
    props.isActive ? props.theme.fieldHover : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme.fieldHover};
    border-left-color: ${(props) =>
      props.isActive ? props.theme.primary?.color : props.theme.fieldHover};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
`;

const DetailHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderStrong};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const ThreeJSGallery: React.FC = () => {
  const [activeExampleId, setActiveExampleId] = React.useState<Example["id"]>(
    () => {
      if (typeof window === "undefined") return DEFAULT_ID;
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get("exampleId");

      return examplesData.some((ex) => ex.id === urlId)
        ? (urlId as Example["id"])
        : DEFAULT_ID;
    }
  );

  const handleCardClick = (id: Example['id']) => {
    setActiveExampleId(id);
    const newUrl = `${window.location.pathname}?exampleId=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get("exampleId");
      const validId = examplesData.some((ex) => ex.id === urlId)
        ? urlId as Example["id"]
        : DEFAULT_ID;
      setActiveExampleId(validId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activeExample = examplesData.find((ex) => ex.id === activeExampleId);
  const ExampleToRender = activeExample?.component ?? (() => null);

  return (
    <PageWrapper>
      <SplitContainer>
        <Sidebar>
          {examplesData.map((example) => (
            <Item
              key={example.id}
              isActive={example.id === activeExampleId}
              onClick={() => handleCardClick(example.id)}
            >
              <Text as="span">{example.name}</Text>
            </Item>
          ))}
        </Sidebar>

        <MainContent>
          {activeExample ? (
            <>
              <DetailHeader>
                <Text as="h5">{activeExample.name}</Text>
                <Text as="span">{activeExample.description}</Text>
              </DetailHeader>

              <ExampleToRender />
            </>
          ) : (
            <Text as="p">Selecione um item da lista lateral.</Text>
          )}
        </MainContent>
      </SplitContainer>
    </PageWrapper>
  );
};

export default ThreeJSGallery;
