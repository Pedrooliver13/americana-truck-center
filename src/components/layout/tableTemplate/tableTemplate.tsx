/* eslint-disable @typescript-eslint/no-explicit-any */

// Packages
import { ReactElement, ChangeEvent, RefObject, useState } from 'react';
import { TableProps, Tour } from 'antd';
import { Link } from 'react-router-dom';
import {
  PlusOutlined as PlusOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  QuestionCircleOutlined as QuestionCircleOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Table, Card, Input, Tooltip, Button } from 'components/core';
import { ButtonHideColumns, PdfButton, XlsxButton } from 'components/shared';

// Hooks
import { useGetHiddenColumns } from 'hooks/core';

// Utils
import { debounce } from 'utils/debounce';

// Styles
import * as Styled from './styles';

interface TableTemplateProps {
  header: {
    title: string;
    buttonLabel: string;
    buttonLink: string;
  };
  table: TableProps & {
    defaultCheckedList: Array<string>;
    isLoading?: boolean;
  };
  exports: {
    xlsx: {
      filename: string;
    };
    pdf: {
      filename: string;
    };
  };
  tour: {
    isOpenTourState: Array<any>;
    steps: Array<any>;
    ref1: RefObject<any>;
    ref2: RefObject<any>;
    ref3: RefObject<any>;
    ref4: RefObject<any>;
    ref5: RefObject<any>;
    ref6: RefObject<any>;
  };
}

export const TableTemplate = (props: TableTemplateProps): ReactElement => {
  const [filteredData, setFilteredData] = useState(props?.table?.dataSource);

  const { newColumns, options, checkedList, setCheckedList } =
    useGetHiddenColumns({
      columns: props?.table?.columns as Array<any>,
      defaultCheckedList: props?.table?.defaultCheckedList as Array<string>,
    });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const data = props?.table?.dataSource as Array<any>;

    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) => {
        return String(item[key]).toLowerCase().includes(search);
      });
    });

    setFilteredData(filteredData);
  };

  return (
    <Styled.TableTemplateContainer className="container">
      <header className="table-template__header">
        <h1>
          {props?.header?.title}
          <Tooltip title="Fazer tour da página" placement="bottom">
            <div>
              <QuestionCircleOutlinedIcon
                id="info-icon"
                onClick={() => props?.tour?.isOpenTourState[1](true)}
              />
            </div>
          </Tooltip>
        </h1>

        <Link to={props?.header?.buttonLink ?? '/'} ref={props?.tour?.ref1}>
          <Button size="middle" type="primary" icon={<PlusOutlinedIcon />}>
            {props?.header?.buttonLabel}
          </Button>
        </Link>
      </header>

      <Card className="table-template-card">
        <div className="table-template-card__actions">
          <div
            className="table-template-card__actions--search"
            ref={props?.tour?.ref2}
          >
            <Input
              id="task-search"
              size="large"
              placeholder="Pesquisar"
              allowClear
              autoComplete="off"
              prefix={<SearchOutlinedIcon />}
              onChange={debounce(handleSearch, 300)}
            />
          </div>

          <div className="table-template-card__actions--columns">
            <XlsxButton
              filename={props?.exports?.xlsx?.filename}
              data={props?.table?.dataSource as Array<any>}
              ref={props?.tour?.ref3}
            />
            <PdfButton
              filename={props?.exports?.pdf?.filename}
              data={props?.table?.dataSource as Array<any>}
              ref={props?.tour?.ref4}
            />
            <ButtonHideColumns
              ref={props?.tour?.ref5}
              {...{ options, checkedList, setCheckedList }}
            />
          </div>
        </div>

        <div ref={props?.tour?.ref6}>
          <Table
            {...props?.table}
            dataSource={filteredData}
            id="table-template"
            data-cy="table-template"
            columns={newColumns}
            size="small"
            bordered
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 5,
              pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
            }}
          />
        </div>
      </Card>

      <Tour
        open={props?.tour?.isOpenTourState[0]}
        onClose={() => props?.tour?.isOpenTourState[1](false)}
        steps={props?.tour?.steps}
        zIndex={999999}
      />
    </Styled.TableTemplateContainer>
  );
};
