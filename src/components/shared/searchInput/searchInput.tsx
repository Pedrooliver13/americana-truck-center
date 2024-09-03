import { Select, BaseSelectRef } from '../../core/fields/select/select';

// Packages
import { ReactElement, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined as SearchOutlinedIcon } from '@ant-design/icons';

export const SearchInput = (): ReactElement => {
  const navigate = useNavigate();
  const searchRef = useRef<BaseSelectRef>(null);

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (!searchRef.current) return;

      if (event.altKey && event.key === 'k') {
        searchRef.current?.focus();
      }
    });
  }, []);

  return (
    <Select
      id="search-input"
      data-cy="search-input"
      className="content__search--input"
      suffixIcon={<SearchOutlinedIcon />}
      showSearch
      placeholder="Navegar (ALT + K)"
      optionFilterProp="label"
      maxTagCount={0}
      value={null}
      onChange={(value) => {
        navigate(value);
        searchRef.current?.blur();
      }}
      options={[
        { value: '/', label: 'Dashboard - Página' },
        { value: '/clients', label: 'Clientes - Página' },
        { value: '/clients/new', label: 'Clientes - Página de Cadastro' },
        { value: '/tasks', label: 'Serviços - Página' },
        { value: '/tasks/new', label: 'Serviços - Página de Cadastro' },
        { value: '/prices', label: 'Preços - Página' },
      ]}
      ref={searchRef}
    />
  );
};
