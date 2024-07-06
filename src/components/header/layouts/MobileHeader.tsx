import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import * as S from '../Header.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

const handleScrollToTop = () => {
  document.querySelector('#main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleTouchStart = (event: React.TouchEvent) => {
  const target = event.target as HTMLElement;
  if (target.closest('.header-button')) {
    return;
  }
  handleScrollToTop();
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
  return (
    <BaseRow onTouchStart={handleTouchStart} justify="space-between" align="middle">
      <BaseCol>
        <ProfileDropdown />
      </BaseCol>

      <BaseCol>
        <BaseRow align="middle">
          <BaseCol className="mobile-header-button">
            <NotificationsDropdown />
          </BaseCol>

          <BaseCol className="mobile-header-button">
            <HeaderSearch />
          </BaseCol>

          <BaseCol className="mobile-header-button">
            <SettingsDropdown />
          </BaseCol>
        </BaseRow>
      </BaseCol>

      <S.BurgerCol className="mobile-header-button">
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </BaseRow>
  );
};
