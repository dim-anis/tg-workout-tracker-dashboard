import styled from "styled-components";

import { ResponsiveLine } from "@nivo/line";

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

const Container = styled.div`
  height: 100%;
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  height: ${(props) => props.height};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 50em) {
    gap: 2rem;
  }
`;

const ChartTitle = styled.h2`
  width: 100%;
  display: flex;
  margin: 0;
  align-items: baseline;
  font-size: var(--fs-600);
  justify-content: space-between;
`;

const TitleContainer = styled.div``;

const TooltipContainer = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.bgColorSecondary};
  padding: 0.5rem 1rem;
  border-radius: 0px 0px 5px 5px;
  border-top: 2px solid hsl(222, 69%, 70%);
  box-shadow: var(--shadow-elevation-medium);
  margin: 0;
`;

const TooltipDataMain = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: var(--fs-300);
`;

const TooltipDataSecondary = styled.p`
  margin: 0;
  padding: 0;
  font-size: var(--fs-200);
  color: ${(props) => props.theme.textColorSecondary};
`;

const TextBig = styled.em`
  font-size: var(--fs-700);
  font-style: normal;
`;

const Title = styled.p`
  font-size: var(--fs-300);
  margin: 0;
  color: ${(props) => props.theme.textColorSecondary};
  font-weight: normal;
`;

const PeriodContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PeriodButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textColorSecondary};
  font-size: var(--fs-200);
  cursor: pointer;
`;

const LineChart = ({
  data,
  title,
  titleValue,
  yValueUnit,
  min,
  max,
  margin,
  height,
  setPeriod,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container>
      {title && (
        <ChartTitle>
          <TitleContainer>
            <TextBig>{titleValue}</TextBig> {yValueUnit}
            <Title>{title}</Title>
          </TitleContainer>
          <PeriodContainer>
            <PeriodButton onClick={() => setPeriod(4)}>1W</PeriodButton>
            <PeriodButton onClick={() => setPeriod(8)}>2W</PeriodButton>
            <PeriodButton onClick={() => setPeriod(16)}>1M</PeriodButton>
            <PeriodButton onClick={() => setPeriod(96)}>6M</PeriodButton>
          </PeriodContainer>
        </ChartTitle>
      )}
      <ChartContainer height={height}>
        <ResponsiveLine
          data={[
            {
              id: `stats`,
              data: data,
            },
          ]}
          enableGridX={false}
          enableGridY={false}
          margin={margin}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            precision: "day",
          }}
          xFormat="time:%B %d"
          yScale={{
            type: "linear",
            stacked: false,
            min: min || Math.min(...data.map((item) => item.y)),
            max: max || Math.max(...data.map((item) => item.y)),
          }}
          padding={0}
          colors={
            theme === "light" ? "hsl(210, 98%, 47%)" : "hsl(215, 100%, 70%)"
          }
          animate={true}
          enableLabel={false}
          enableArea={false}
          pointLabelYOffset={-12}
          areaBaselineValue={Math.min(...data.map((item) => item.y))}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{
            format: "%b %d",
            tickValues:
              data.length <= 4
                ? "every 1 day"
                : data.length > 4 && data.length <= 8
                ? "every 2 day"
                : data.length > 8 && data.length <= 16
                ? "every 4 day"
                : "every 30 day",
            tickSize: null,
            tickPadding: 20,
          }}
          curve={"catmullRom"}
          pointSize={5}
          useMesh={true}
          theme={{
            fontSize: "var(--fs-300)",
            axis: {
              ticks: {
                text: {
                  fill:
                    theme === "light" ? "var(--bg-dark)" : "var(--bg-light)",
                },
              },
            },
          }}
          tooltip={({ point }) => {
            return (
              <TooltipContainer>
                <TooltipDataMain>{`${new Intl.NumberFormat().format(
                  point.data.yFormatted
                )} ${yValueUnit || ""}`}</TooltipDataMain>
                <TooltipDataSecondary>{`${point.data.xFormatted}`}</TooltipDataSecondary>
              </TooltipContainer>
            );
          }}
        />
      </ChartContainer>
    </Container>
  );
};

export default LineChart;
