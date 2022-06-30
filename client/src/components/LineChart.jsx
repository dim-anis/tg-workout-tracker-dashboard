import styled from "styled-components";
import { linearGradientDef } from '@nivo/core'
import { ResponsiveLine } from '@nivo/line';

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const ChartTitle = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  align-self: start;
  font-size: 1.25rem;
`;

const TooltipContainer = styled.div`
  background-color: var(--bg-light);
  padding: 5px 10px;
  border-radius: 0px 0px 5px 5px;
  border-top: 2px solid hsl(222, 69%, 70%); 
  box-shadow: var(--shadow-elevation-medium);
  margin: 0;
`;

const Data = styled.p`
  margin: 0;
  padding: 0;
`;

const TextBig = styled.em`
  font-size: 2rem;
  font-style: normal;
  border-bottom: 2px solid hsl(222, 69%, 70%);
  padding: 0.25rem;
`;


const LineChart = ({ data, title, titleValue, yValueUnit, min, max, xValueType, yValueType, margin }) => {
  return (
    <ChartContainer>
      {title && <ChartTitle>{title} <TextBig>{titleValue}</TextBig> {yValueUnit}</ChartTitle>}
      <ResponsiveLine
        data={[{
          id: `workout${yValueType}`,
          data: data
        }]}
        margin={margin}
        xScale={{ 
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day'
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            stacked: false,
            min: min || Math.min(...data.map(item => item.y)),
            max: max || Math.max(...data.map(item => item.y))
        }}
        padding={0}
        colors="hsl(222, 69%, 70%)"
        animate={true}
        enableLabel={false}
        enableArea={true}
        axisTop={null}
        axisRight={null}
        pointLabelYOffset={-12}
        areaBaselineValue={ Math.min(...data.map(item => item.y)) }
        axisLeft={{
          format: (value) => `${value.toLocaleString()}`,
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 5
        }}
        axisBottom={{
          format: "%b %d",
          tickValues: 'every 3 day',
          tickSize: 3,
          tickPadding: 10,
          tickRotation: 0,
        }}
        curve={'monotoneX'}
        pointSize={5}
        useMesh={true}
        tooltip={({point}) => {
          return (
            <TooltipContainer>
              <Data>{`${xValueType}: ${point.data.xFormatted}`}</Data>
              <Data>{`${yValueType}: ${point.data.yFormatted} ${yValueUnit || ""}`}</Data>
            </TooltipContainer>
          )
        }}
        defs={[
          linearGradientDef('gradientA', [
              { offset: 0, color: 'hsl(222, 69%, 70%)' },
              { offset: 100, color: 'hsl(222, 69%, 70%)', opacity: 0.2 },
          ]),
        ]}
        fill={[{ match: '*', id: 'gradientA' }]}
      />
    </ChartContainer>
  );
};

export default LineChart;