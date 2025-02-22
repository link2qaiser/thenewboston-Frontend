import styled from 'styled-components';

import Pattern from './profile-pattern.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  position: relative;

  &::after {
    background-image: url(${Pattern});
    content: '';
    height: 125px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

export const OutletContainer = styled.div`
  height: 100%;
  margin-top: 33px;
  overflow-y: auto;
`;
