import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";

const CustomLayerComponent = (myProps) => (layerProps) => {
  const { centerX, centerY } = layerProps;

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "3rem",
        fontWeight: "bold"
      }}
    >
      {myProps}
    </text>
  );
};

const ChartWrapper = styled.div`
  height: 90%;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 560px) {
    font-size: 0.75rem;
  }
`;

const DataTitle = styled.p`
  font-size: 1rem;
  color: var(--text-light-muted);
  margin: 0;
  font-weight: 200;

  @media (max-width: 560px) {
    font-size: 0.75rem;
  }
`;

const PieChart = ({ data, total, title }) => (
  <ChartWrapper>
    <ResponsivePie
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      innerRadius={0.8}
      activeOuterRadiusOffset={8}
      colors={['hsl(222, 69%, 70%)', 'hsl(0, 0%, 85%)']}
      layers={['arcs', CustomLayerComponent(total)]}
    />
    <DataTitle>{title}</DataTitle>
  </ChartWrapper>
)

export default PieChart;