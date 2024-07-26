import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WalletTransaction } from '@app/api/activity.api';
import { Dates } from '@app/constants/Dates';
import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
import { CurrencyTypeEnum } from '@app/interfaces/interfaces';
import * as S from './ActivityStoryItem.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { convertSatsToCurrency } from '@app/utils/utils';

export const ActivityStoryItem: React.FC<WalletTransaction> = ({ witness_tx_id, date, output, value, sats }) => {
  const { t } = useTranslation();
  const currency = useAppSelector((state) => state.currency);
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyTypeEnum>(currency.currency); //use state just incase no current price
  const [currentValue, setCurrentValue] = useState<number>(() =>
    currency.currency == CurrencyTypeEnum.USD ? parseFloat(value) : convertSatsToCurrency(sats, currency.currentPrice),
  );

  useEffect(() => {
    if (currency.currency === CurrencyTypeEnum.USD || !currency.currentPrice) {
      setCurrentCurrency(currency.currency);
      setCurrentValue(parseFloat(value));
    } else {
      if (currency.currency !== currentCurrency) {
        setCurrentCurrency(currency.currency);
      }
      setCurrentValue(convertSatsToCurrency(sats, currency.currentPrice));
    }
  }, [currency.currentPrice, value, sats]);

  return (
    <S.TransactionCard>
      <BaseRow gutter={[20, 20]} wrap={true} align="middle">
        <BaseCol span={24}>
          <S.Label>{t('Witness Transaction ID')}:</S.Label>
          <S.Address style={{ color: 'var(--text-main)' }}>{witness_tx_id}</S.Address>
        </BaseCol>
        <BaseCol span={24}>
          <S.Label>{t('Output')}:</S.Label>
          <S.Output>{output}</S.Output>
        </BaseCol>
        <BaseCol span={12}>
          <S.Label>{t('Date')}:</S.Label>
          <S.DateText>{Dates.getDate(date).format('L LTS')}</S.DateText>
        </BaseCol>
        <BaseCol span={12} style={{ textAlign: 'right' }}>
          <S.Label>{t('Value')}:</S.Label>
          <S.Value>{getCurrencyPrice(formatNumberWithCommas(currentValue), currentCurrency)}</S.Value>
        </BaseCol>
      </BaseRow>
    </S.TransactionCard>
  );
};

export default ActivityStoryItem;
