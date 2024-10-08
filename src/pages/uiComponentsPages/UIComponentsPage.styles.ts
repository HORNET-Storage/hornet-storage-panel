import styled from 'styled-components';
import { BaseCard as CommonCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCollapse } from '@app/components/common/BaseCollapse/BaseCollapse';
import { LAYOUT, media } from '@app/styles/themes/constants';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { InfoCircleOutlined } from '@ant-design/icons';
export const Card = styled(CommonCard)`
  width: 100%;
  margin-bottom: 1.25rem;
  .ant-card-head-title {
    font-size: 1rem;
  }
  .ant-card-body {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    align-items: center;
  }
  .ant-card-body:before {
    display: none;
  }
  .ant-card-body:after {
    display: none;
  }
  &.ant-card-bordered {
    border: 1px solid var(--border-color);
  }
`;
export const InfoCircleOutlinedIcon = styled(InfoCircleOutlined)`
  color: var(--text-light-color);
  font-size: .75rem;
  align-self: start;
  padding-top .2rem;
  padding-right: .5rem;
  cursor: pointer;
`;
export const NewBucketContainer = styled.div`
  padding: 1rem 0rem 0rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const InfoCard = styled(CommonCard)`
  width: 100%;
  padding: 0.7rem 1.2rem;
  .ant-card-head-title {
    font-size: 1rem;
  }
  .ant-card-body {
    flex-wrap: nowrap;

    display: flex;
    flex-direction: row;
    gap: 0rem;
    align-items: center;

    padding: 0;
  }
  .ant-card-body:before {
    display: none;
  }
  .ant-card-body:after {
    display: none;
  }
  &.ant-card-bordered {
    border: 1px solid var(--border-color);
  }
`;

export const InputsWrapper = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const CollapseWrapper = styled(BaseCollapse)`
  width: 40rem;
`;

export const RightSideCol = styled(BaseCol)`
  padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  background-color: var(--sider-background-color);
  overflow-y: auto;
`;

export const LeftSideCol = styled(BaseCol)`
  @media only screen and ${media.xl} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
    height: calc(100vh - ${LAYOUT.desktop.headerHeight});
    overflow: auto;
  }
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 250px;

  .ant-card-body {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
`;

export const Space = styled.div`
  margin: 1rem 0;
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 15px;

  background: black;

  min-height: 300px;
  overflow-y: auto;
`;

export const Item = styled.div`
  background: red;
  height: 150px;
  flex-shrink: 0;
`;

export const SwitchContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Adjust the gap as needed for spacing between switches
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 20%; // Adjusted width
`;

interface CheckboxLabelProps {
  isActive: boolean;
}
export const CheckboxLabel = styled.label<CheckboxLabelProps>`
  color: ${(props) => (props.isActive ? 'themeObject[theme].textMain' : 'themeObject[theme].textLight')};
  font-size: 14px;
  transition: color 0.3s;
`;
// Scaling up the BaseSwitch by increasing its dimensions
export const LargeSwitch = styled(BaseSwitch)`
  transform: scale(1.05); // Adjust the scale factor as needed
  transform-origin: center;
  & .modeSwitch{
   background-image: linear-gradient(to right,red,red), linear-gradient(to right,var(--background-color),var(--background-color));
}
} 

`;

// Style the label span to match the switch size
export const LabelSpan = styled.span`
  color: themeObject[theme].textMain; // White color for text to enhance readability
  font-size: 1.2em; // Increase the font size to match the switch scale
  line-height: 1.5em; // Adjust line height to vertically center with the switch
  display: flex; // Use flex to align items if necessary
  align-items: center; // Center align to match switch height
  padding-right: 10px; // Optional padding for visual spacing
`;
export const HeadingContainer = styled.div`
  margin-bottom: 1.25rem;
`;
