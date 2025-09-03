// Packages
import { ReactElement } from 'react';
import { DatePicker } from 'antd';
import Chart, { Props } from 'react-apexcharts';

// Hooks
import { useDashboardContext } from 'hooks/dashboard/useDashboardContext';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Styles
import * as Styled from './styles';

// Models
import { ETaskStatus } from 'models/tasks/tasks';

export const SalesOverview = (): ReactElement => {
  const { theme } = useGlobalContext();
  const { chartData, setChartDateValue } = useDashboardContext();

  const getValues = (currentStatus: ETaskStatus) => {
    return (
      chartData.series.find((task) => task.name === currentStatus)?.data || []
    );
  };

  const optionscolumnchart = {
    theme: {
      mode: theme,
    },
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
    },
    colors: ['#5D87FF', '#FEC53D', '#EF3826'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '100%',
        columnWidth: '70%',
        borderRadius: [8],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: true,
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 3,
    },
    xaxis: {
      categories: chartData?.categories,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Pago',
      data: getValues(ETaskStatus.PAID_OFF),
    },
    {
      name: 'Faturar',
      data: getValues(ETaskStatus.INVOICE),
    },
    {
      name: 'A Receber',
      data: getValues(ETaskStatus.RECEIVABLE),
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
            onChange={(_event, dateString) => {
              if (!Array.isArray(dateString)) {
                return;
              }

              setChartDateValue(dateString.filter(Boolean));
            }}
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
