// Packages
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultOptionType } from 'antd/es/select';
import { toast } from 'react-toastify';
import * as zod from 'zod';
import moment from 'moment';

// Hooks
import { useTasksCount } from 'hooks/tasks/useTasksCount';
import { useTasksContext } from 'hooks/tasks/useTasksContext';

// Models
import { Clients } from 'models/clients/clients';
import { Drivers } from 'models/drivers/drivers';
import { PostTask } from 'models/tasks/tasks';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  phone: zod.string().nullable(),
  code: zod.string(),
  driverDocument: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .nullable(),
  document: zod.string().min(1, { message: 'Campo obrigatório' }).nullable(),
  vehicle: zod.string().nullable(),
  client: zod.string().optional().nullable(),
  driver: zod.string().optional().nullable(),
  licensePlate: zod.string().nullable(),
  fleet: zod.string().nullable(),
  observation: zod.string().optional().nullable(),
  search: zod.string().optional().nullable(),
});

export type FormValues = zod.infer<typeof schema>;

export const useTaskForm = () => {
  const {
    id,
    navigate,
    pricesList,
    clientListOptions,
    driverListOptions,
    taskItem,
    createTask,
    isLoading,
  } = useTasksContext();

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      driverDocument: '',
      document: '',
      code: '',
      vehicle: '',
      client: null,
      driver: null,
      licensePlate: '',
      fleet: '',
      observation: '',
    },
    values: taskItem,
    resolver: zodResolver(schema),
  });

  const searchValue = watch('search');
  const client = watch('client');

  const {
    totalPrice,
    totalItems,
    listServices,
    setServicesSelectedList,
    handleChangeAddNewServiceInList,
  } = useTasksCount(taskItem?.services ?? []);

  const handlers = {
    handleChangeAddNewServiceInList,
    handleChangeClient: (
      _value: string,
      option: DefaultOptionType | DefaultOptionType[]
    ): void => {
      const clientOption = option as Clients;
      setServicesSelectedList([]);

      if (!clientOption) {
        return setValue('client', '');
      }

      selects.servicesOptions?.forEach((item) => {
        setValue(item?.name as keyof FormValues, '0');
      });

      setValue('document', clientOption?.document);
      clearErrors('document');
      setFocus('vehicle');
    },
    handleChangeDriver: (
      _value: string,
      option: DefaultOptionType | DefaultOptionType[]
    ): void => {
      const driverOption = option as Drivers;

      if (!driverOption) {
        return setValue('driver', '');
      }

      clearErrors('name');
      clearErrors('phone');
      clearErrors('driverDocument');
      setValue('name', driverOption?.name);
      setValue('phone', driverOption?.phone);
      setValue('code', driverOption?.code);
      setValue('driverDocument', driverOption?.document);
      setFocus('client');
    },
    handleNewItem: async (): Promise<void> => {
      const value = watch();
      const currentClient = clientListOptions?.find(
        (clientOption) => clientOption?.id === watch('client')
      );

      if (listServices.length <= 0) {
        toast.error('Selecione ao menos um serviço!');
        return;
      }

      delete value.search;

      const prepareData = {
        ...value,
        currentClient: currentClient ?? '',
        clientName: currentClient?.name,
        licensePlate: value?.licensePlate?.toUpperCase(),
        total: totalPrice,
        services: listServices,
        createdAt: taskItem?.createdAt ?? moment().format('YYYY-MM-DD'),
      };

      createTask(prepareData as PostTask);
    },
  };

  const selects = {
    servicesOptions: useMemo(() => {
      const services = taskItem?.services ?? pricesList ?? [];

      if (!id) {
        // ? preenche os campos com 0 quando for adicionar uma nova tarefa
        services?.forEach((item) => {
          !watch(item?.name as keyof FormValues)
            ? setValue(item?.name as keyof FormValues, '0')
            : null;
        });
      }

      if (!client) {
        return services
          .filter((service) => {
            const isSameName =
              searchValue &&
              service?.name.toLowerCase() === String(searchValue).toLowerCase();

            const isSameType =
              searchValue &&
              service?.type.toLowerCase() === String(searchValue).toLowerCase();

            return !searchValue || isSameName || isSameType;
          })
          .filter((service) => !service?.client);
      }

      return services
        .filter((service) => {
          const isSameName =
            searchValue &&
            service?.name
              .toLowerCase()
              .includes(String(searchValue).toLowerCase());

          const isSameType =
            searchValue &&
            service?.type
              .toLowerCase()
              .includes(String(searchValue).toLowerCase());

          return !searchValue || isSameName || isSameType;
        })
        .filter(
          (service) => client === service?.client || !service?.client || !client
        );
    }, [
      taskItem?.services,
      pricesList,
      id,
      setValue,
      client,
      searchValue,
      watch,
    ]),
  };

  return {
    totalPrice,
    totalItems,
    listServices,

    handlers,

    id,
    navigate,
    clientListOptions,
    driverListOptions,
    taskItem,
    createTask,
    isLoading,
    watch,
    control,
    handleSubmit,
    setValue,
    setFocus,
    errors,
    selects,
  };
};
