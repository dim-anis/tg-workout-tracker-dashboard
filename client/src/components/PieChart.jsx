import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";

const CircleText = styled.text`
  font-size: var(--fs-700);
  font-weight: bold;
  color: ${(props) => props.theme.textColorSecondary};
`;

const CustomLayerComponent = (myProps) => (layerProps) => {
  const { centerX, centerY } = layerProps;

  return (
    <CircleText
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {myProps}
    </CircleText>
  );
};

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 50em) {
    display: none;
  }
`;

const DataTitle = styled.p`
  font-size: var(--fs-300);
  color: ${(props) => props.theme.textColorSecondary};
  margin: 0;
`;

const PieChart = ({ data, total, title }) => (
  <ChartWrapper>
    <ResponsivePie
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      innerRadius={0.8}
      activeOuterRadiusOffset={8}
      colors={["hsl(222, 69%, 70%)", "hsl(0, 0%, 85%)"]}
      layers={["arcs", CustomLayerComponent(total)]}
    />
    <DataTitle>{title}</DataTitle>
  </ChartWrapper>
);

export default PieChart;
