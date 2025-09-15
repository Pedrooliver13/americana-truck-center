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

  const getValuesPie = (currentStatus: ETaskStatus) => {
    return getValues(currentStatus)?.reduce((acc, val) => acc + val, 0);
  };

  /* BAR CHART */
  const optionsColumnChart = {
    theme: {
      mode: theme,
    },
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    colors: ['#5D87FF', '#FEC53D', '#EF3826'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 600,
      },
      background: {
        enabled: true,
        foreColor: '#000',
        borderRadius: 4,
        opacity: 0.7,
      },
    },
    stroke: {
      show: false,
    },
    grid: {
      strokeDashArray: 4,
      borderColor: '#000',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    xaxis: {
      categories: chartData?.categories,
      labels: {
        rotate: -25,
        style: {
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '13px',
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        radius: 12,
      },
      fontSize: '13px',
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

  /* DONUT CHART */
  const donutOptionsColumnChart = {
    theme: {
      mode: theme,
    },
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    stroke: {
      show: false,
    },
    colors: ['#5D87FF', '#FEC53D', '#EF3826'],
    labels: ['Pago', 'Faturar', 'A Receber'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#cbd5e1',
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '13px',
        fontWeight: 600,
        colors: ['#333'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 4,
        padding: 4,
        opacity: 0.7,
        dropShadow: {
          enabled: true,
          blur: 2,
          opacity: 0.3,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.4,
      },
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      y: {
        formatter: (val: number) => `${val} itens`,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
      itemMargin: {
        horizontal: 10,
        vertical: 6,
      },
      markers: {
        radius: 12,
        size: 10,
      },
    },
  };

  const donutSeriesColumnChart = [
    getValuesPie(ETaskStatus.PAID_OFF),
    getValuesPie(ETaskStatus.INVOICE),
    getValuesPie(ETaskStatus.RECEIVABLE),
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

      <Styled.SalesOverviewChartsList>
        <Chart
          options={optionsColumnChart as Props}
          series={seriescolumnchart}
          type="bar"
          height={250}
          width={'100%'}
        />

        <Chart
          options={donutOptionsColumnChart as Props}
          series={donutSeriesColumnChart}
          type="donut"
          height={280}
          width={'100%'}
        />
      </Styled.SalesOverviewChartsList>
    </Styled.SalesOverviewContainer>
  );
};
