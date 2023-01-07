import styled from 'styled-components';

import { ArrowLeftIcon } from '../../Icons';
import { Title } from '../../Typography/Title';
import { Card } from '../../Card';

export const TitleStyled = styled(Title)`
  display: flex;
  align-items: center;
  min-height: 3rem;
  color: #1c3463e0!important;
`;

export const ArrowIconStyled = styled(ArrowLeftIcon)`
  margin-right: .5rem;
  cursor: pointer;
  color: #1c3463e0;
  
  &:hover {
    color: rgba(55, 76, 115, 0.88);
  }
`;

export const CardStyled = styled(Card)`
  height: calc(100% - 5rem);
  overflow: auto;
  padding-bottom: 1rem;
`;

export const SectionStyled = styled.section`
  height: 100%;
`;
