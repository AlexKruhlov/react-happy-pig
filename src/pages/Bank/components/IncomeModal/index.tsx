import { Form } from 'antd';
import { memo } from 'react';

import { BasicModal, Input, Select, SelectOption } from '../../../../components';
import { IncomeSource } from '../../../../constants/bank';
import { useUpdateIncomeMutation } from '../../../../services/bank';
import { Income } from '../../../../types';
import { disablePreviousDate } from '../../../../utils/date';

import {
  IFormValues,
  createInitFormValues,
  createNewIncome,
  updateSelectedIncome
} from './helpers';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 }
};

interface IIncomeModalProps {
  isOpen: boolean;
  income: Income | null;
  onCreate: (income: Income) => void;
  onCancel: () => void
}

function IncomeModal ({ isOpen, income, onCreate, onCancel }: IIncomeModalProps): JSX.Element | null {
  if (!isOpen) {
    return null;
  }
  const title: string = income ? 'Edit income' : 'Add new income';
  const sourceOptions = Object.entries(IncomeSource);
  const initialValues = createInitFormValues(income);
  const [ updateIncome ] = useUpdateIncomeMutation();
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: IFormValues): void => {
    if (income) {
      void updateIncome(updateSelectedIncome(values, income));
    } else {
      onCreate(createNewIncome(values));
    }
    onCloseModal();
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText={income ? 'Edit' : 'Add'}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="income-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="source"
          label="Source"
          rules={[ { required: true, message: 'Please input source!' } ]}
        >
          <Select
            placeholder="Select source of income"
            allowClear
          >
            {sourceOptions.map(([ key, value ]) => (
              <SelectOption key={key} value={key}>{value}</SelectOption>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[ { required: true, message: 'Please input amount!' } ]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="modal-income-amount" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          data-testid="date"
          rules={[ { required: true, message: 'Please input date!' } ]}
        >
          <Input type="datepicker" disabledDate={disablePreviousDate} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
}

export default memo(IncomeModal);
