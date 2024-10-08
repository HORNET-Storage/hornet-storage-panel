import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { useSidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { useResponsive } from '@app/hooks/useResponsive';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { tabletOnly } = useResponsive();
  const sidebarNavigation = useSidebarNavigation(); // Call the function to get the navigation items

  const sidebarNavFlat = useMemo(() => {
    return sidebarNavigation.reduce(
      (result: SidebarNavigationItem[], current: SidebarNavigationItem) =>
        result.concat(current.children && current.children.length > 0 ? current.children : current),
      [],
    );
  }, [sidebarNavigation]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
    const newSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];
    setSelectedKeys(newSelectedKeys);

    const openedSubmenu = sidebarNavigation.find(({ children }) =>
      children?.some(({ url }) => url === location.pathname),
    );
    const newOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];
    setOpenKeys(newOpenKeys);
  }, [location.pathname, sidebarNavFlat, sidebarNavigation]);

  return (
    <S.Menu
      style={{ zIndex: 3 }}
      mode="inline"
      $tabletOnly={tabletOnly}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={() => setCollapsed(true)}
      items={sidebarNavigation.map((nav) => {
        const isSubMenu = nav.children?.length;

        return {
          key: nav.key,
          title: t(nav.title),
          label: isSubMenu ? t(nav.title) : <Link to={nav.url || ''}>{t(nav.title)}</Link>,
          icon: nav.icon,
          children:
            isSubMenu &&
            nav.children &&
            nav.children.map((childNav) => ({
              key: childNav.key,
              label: <Link to={childNav.url || ''}>{t(childNav.title)}</Link>,
              title: t(childNav.title),
            })),
        };
      })}
    />
  );
};

export default SiderMenu;
