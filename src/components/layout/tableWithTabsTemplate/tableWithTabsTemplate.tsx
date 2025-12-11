/* eslint-disable @typescript-eslint/no-explicit-any */

// Packages
import {
  ReactElement,
  ChangeEvent,
  RefObject,
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import { TableProps, Tabs, Tour } from 'antd';
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

// Styles
import * as Styled from './styles';

interface TableWithTabsTemplateProps {
  header: {
    title: string;
    buttonLabel: string;
    buttonLink: string;
    extraButtons?: ReactNode;
  };
  tabs: Array<{
    key: string;
    label: string;
    dataSource: TableProps['dataSource'];
    tabIcon?: ReactElement;
  }>;
  table: TableProps & {
    defaultCheckedList: Array<string>;
    rowSelection?: TableProps['rowSelection'] & {
      setSelectedRowKeys?: (keys: Array<string | number>) => void;
    };
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

export const TableWithTabsTemplate = (
  props: TableWithTabsTemplateProps
): ReactElement => {
  const isMobile = useIsMobile();

  const [activeTabKey, setActiveTabKey] = useState<string>(
    props.tabs[0]?.key || ''
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const { newColumns, options, checkedList, setCheckedList } =
    useGetHiddenColumns({
      columns: props?.table?.columns as Array<any>,
      defaultCheckedList: props?.table?.defaultCheckedList as Array<string>,
    });

  // Atualiza o valor de busca com debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const activeTab = useMemo(
    () => props.tabs.find((tab) => tab.key === activeTabKey),
    [activeTabKey, props.tabs]
  );

  const filteredData = useMemo(() => {
    if (!activeTab) return [];
    if (!debouncedSearch.trim()) return activeTab.dataSource ?? [];

    const normalize = (str: string) =>
      String(str)
        .normalize('NFD') // separa acentos
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/ç/g, 'c') // trata cedilha minúscula
        .replace(/Ç/g, 'C') // trata cedilha maiúscula
        .toLowerCase();

    const normalizedSearch = normalize(debouncedSearch);

    return (activeTab.dataSource ?? []).filter((item) =>
      Object.keys(item).some((key) =>
        normalize(item[key]).includes(normalizedSearch)
      )
    );
  }, [activeTab, debouncedSearch]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  return (
    <Styled.TableWithTabsTemplateContainer className="container">
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
        <Tabs
          activeKey={activeTabKey}
          type="card"
          onChange={(key) => {
            setActiveTabKey(key);
            props?.table?.rowSelection?.setSelectedRowKeys?.([]);
          }}
        >
          {props?.tabs.map((tabItem) => (
            <Tabs.TabPane
              tab={tabItem.label}
              key={tabItem.key}
              icon={tabItem.tabIcon}
            >
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
                    value={searchValue}
                    onChange={handleSearch}
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
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>

      <Tour
        open={props?.tour?.isOpenTourState[0]}
        onClose={() => props?.tour?.isOpenTourState[1](false)}
        steps={props?.tour?.steps}
        zIndex={999999}
      />
    </Styled.TableWithTabsTemplateContainer>
  );
};
