// Packages
import { ReactElement } from 'react';
import { DatePicker } from 'antd';
import Chart, { Props } from 'react-apexcharts';

// Styles
import * as Styled from './styles';

// Hooks
import { useDashboardContext } from 'hooks/dashboard/useDashboardContext';

export const SalesOverview = (): ReactElement => {
  const { chartDataList, setChartDateValue } = useDashboardContext();

  const categories = chartDataList.map((chartData) => chartData?.createdAt);
  const data = chartDataList.map((chartData) => chartData?.value);

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: ['#5D87FF', '#49BEFF'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '15%',
        borderRadius: [2],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: true,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
    options: {
      theme: 'dark',
    },
  };

  const seriescolumnchart = [
    {
      name: 'Ganhos deste dia',
      data,
    },
  ];

  return (
    <Styled.SalesOverviewContainer>
      <header className="salesOverview__header">
        <h2>Detalhe das vendas</h2>

        <div>
          <DatePicker.RangePicker
            id="chartDate"
            name="chartDate"
            lang="pt-br"
            format={{
              format: 'DD/MM/YYYY',
              type: 'mask',
            }}
            onChange={(_event, dateString) => setChartDateValue(dateString)}
          />
        </div>
      </header>

      <Chart
        options={optionscolumnchart as Props}
        series={seriescolumnchart}
        type="bar"
        height={250}
        width={'100%'}
      />
    </Styled.SalesOverviewContainer>
  );
};
