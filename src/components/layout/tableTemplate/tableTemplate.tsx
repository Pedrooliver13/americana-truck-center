/* eslint-disable @typescript-eslint/no-explicit-any */

// Packages
import {
  ReactElement,
  ChangeEvent,
  RefObject,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
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
import { useIsMobile } from 'hooks/core/useMobile';

// Utils
import { debounce } from 'utils/debounce';

// Styles
import * as Styled from './styles';

interface TableTemplateProps {
  header: {
    title: string;
    buttonLabel: string;
    buttonLink: string;
    extraButtons?: ReactNode;
  };
  table: TableProps & {
    defaultCheckedList: Array<string>;
    isLoading?: boolean;
  };
  exports: {
    xlsx: {
      customComponent?: ReactElement;
      filename: string;
      data?: Array<any>;
    };
    pdf: {
      filename: string;
      data?: Array<any>;
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
  const isMobile = useIsMobile();
  const [filteredData, setFilteredData] = useState<Array<any> | null>(null);

  const { newColumns, options, checkedList, setCheckedList } =
    useGetHiddenColumns({
      columns: props?.table?.columns as Array<any>,
      defaultCheckedList: props?.table?.defaultCheckedList as Array<string>,
    });

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;

      const normalize = (str: string) =>
        String(str)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ç/g, 'c')
          .replace(/Ç/g, 'C')
          .toLowerCase();

      const normalizedSearch = normalize(search);
      const data = props?.table?.dataSource ?? [];

      const filteredData = data.filter((item) =>
        Object.keys(item).some((key) =>
          normalize(item[key]).includes(normalizedSearch)
        )
      );

      setFilteredData(filteredData);
    },
    [props.table?.dataSource, setFilteredData]
  );

  useEffect(() => {
    if (props?.table?.isLoading) {
      setFilteredData(null);
      return;
    }

    setFilteredData(props.table.dataSource as Array<any>);
  }, [props.table.dataSource, props?.table?.isLoading]);

  return (
    <Styled.TableTemplateContainer className="container">
      <header className="table-template__header">
        <h1>
          {props?.header?.title}
          <Tooltip title="Fazer tour da página" placement="bottom">
            {!isMobile && (
              <div>
                <QuestionCircleOutlinedIcon
                  id="info-icon"
                  onClick={() => props?.tour?.isOpenTourState[1](true)}
                />
              </div>
            )}
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
              id="table-search"
              size="large"
              placeholder="Pesquisar"
              allowClear
              autoComplete="off"
              prefix={<SearchOutlinedIcon />}
              onChange={debounce(handleSearch, 300)}
            />
          </div>

          <div className="table-template-card__actions--columns">
            {props?.header?.extraButtons && props.header.extraButtons}
            {!props?.exports.xlsx.customComponent ? (
              <XlsxButton
                filename={props?.exports?.xlsx?.filename}
                data={props?.exports?.xlsx?.data as Array<any>}
                ref={props?.tour?.ref3}
              />
            ) : (
              <div ref={props?.tour.ref3}>
                {props?.exports.xlsx.customComponent}
              </div>
            )}

            <PdfButton
              filename={props?.exports?.pdf?.filename}
              data={props?.exports?.pdf?.data as Array<any>}
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
            dataSource={filteredData ?? []}
            id="table-template"
            data-cy="table-template"
            columns={newColumns}
            size="small"
            bordered
            scroll={{ x: 400 }}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 10,
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
