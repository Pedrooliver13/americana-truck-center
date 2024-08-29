// Packages
import { ReactElement } from 'react';
import Chart, { Props } from 'react-apexcharts';

// Styles
import * as Styled from './styles';

export const SalesOverview = (): ReactElement => {
  const optionscolumnchart = {
    chart: {
      events: {
        mounted: (chart: Props) => {
          chart.windowResizeHandler();
        },
      },
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
        columnWidth: '35%',
        borderRadius: [6],
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
      enabled: false,
    },
    legend: {
      show: true,
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
      categories: [
        '16/08',
        '17/08',
        '18/08',
        '19/08',
        '20/08',
        '21/08',
        '22/08',
        '23/08',
      ],
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
      name: 'Ganhos deste mês',
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: 'Gastos deste mês',
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];

  return (
    <Styled.SalesOverviewContainer>
      <header className="salesOverview__header">
        <h2>Detalhe das vendas</h2>
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
