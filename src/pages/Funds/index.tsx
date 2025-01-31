import { useCallback } from 'react';

import {
  AddIcon,
  Empty,
  TooltipIconButton,
  Page,
  Row
} from '../../components';
import { useModal } from '../../hooks';
import { useNotification } from '../../hooks/useNotification';
import {
  useCreateFundMutation,
  useDeleteFundMutation,
  useFetchFundsQuery
} from '../../services/funds';
import { Fund } from '../../types';
import { NotificationType } from '../../types/notification';

import FundCard from './components/FundCard';
import FundModal from './components/FundModal';

const Funds = (): JSX.Element => {
  const { isOpenModal, hideModal, openModal } = useModal();
  const { data: funds = [], isLoading } = useFetchFundsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [ deleteFund ] = useDeleteFundMutation();
  const [ createFund ] = useCreateFundMutation();
  const { notificationContext, openNotification } = useNotification();
  const isEmptyComponent: boolean = !(funds.length || isLoading);

  const handleCreateNewFund = useCallback((fund: Fund) => {
    void createFund(fund)
      .then(() => {
        openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was created successfully!`);
        hideModal();
      });
  }, [ createFund, hideModal, openNotification ]);

  const handleDeleteFund = useCallback((fund: Fund) => {
    void deleteFund(fund.id ?? 0)
      .then(() => {
        openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was deleted successfully!`);
      });
  }, [ createFund, hideModal, openNotification ]);

  return (
    <Page
      title="Funds"
      data-testid="funds-page-content"
      extra={
        <TooltipIconButton
          tooltip="Add fund"
          data-testid="create-fund-btn"
          icon={<AddIcon />}
          onClick={openModal}
        />
      }
    >
      {notificationContext}
      {isEmptyComponent && <Empty description="No funds" data-testid="empty-funds"/>}
      <Row gutter={[ 16, 16 ]}>
        {funds?.map((fund: Fund) => (
          <FundCard
            key={fund.id}
            fund={fund}
            onDelete={handleDeleteFund}
          />
        ))}
      </Row>
      <FundModal
        isOpen={isOpenModal}
        onCancel={hideModal}
        onSave={handleCreateNewFund}
      />
    </Page>
  );
};

export default Funds;
