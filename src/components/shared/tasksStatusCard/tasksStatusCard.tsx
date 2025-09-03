// Packages
import { ReactElement } from 'react';
import { DatePicker } from 'antd';

// Components
import { Table, Tag } from 'components/core';

// Hooks
import { useDashboardContext } from 'hooks/dashboard/useDashboardContext';

// Utils
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

export const TasksStatusCard = (): ReactElement => {
  const { tasksPendingList, setPaymentStatusDateValue } = useDashboardContext();

  return (
    <Styled.TaskStatusContainer>
      <header>
        <h2>Faturamento</h2>

        <div>
          <DatePicker.RangePicker
            id="paymentStatusDate"
            name="paymentStatusDate"
            lang="pt-br"
            format={{
              format: 'DD/MM/YYYY',
              type: 'mask',
            }}
            onChange={(_event, dateString) => {
              if (!Array.isArray(dateString)) {
                return;
              }

              setPaymentStatusDateValue(dateString.filter(Boolean));
            }}
          />
        </div>
      </header>

      <Table
        rowKey="id"
        dataSource={tasksPendingList}
        columns={[
          {
            title: 'Cliente',
            dataIndex: 'clientName',
            key: 'clientName',
          },
          {
            title: 'Total Pago',
            dataIndex: 'totalPaidOff',
            key: 'totalPaidOff',
            responsive: ['md'],
            render: (value) => (
              <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
            ),
          },
          {
            title: 'Total a Faturar',
            dataIndex: 'totalInvoice',
            key: 'totalInvoice',
            responsive: ['md'],
            render: (value) => (
              <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
            ),
          },
          {
            title: 'Total a Receber',
            dataIndex: 'totalReceivable',
            key: 'totalReceivable',
            responsive: ['md'],
            render: (value) => (
              <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
            ),
          },
        ]}
      />
    </Styled.TaskStatusContainer>
  );
};
