import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;

  label {
    margin-bottom: 16px;
    font-weight: ${({ theme }) => theme.plainTextWeight.medium};
    font-size: ${({ theme }) => theme.plainTextSize.medium};
    color: ${({ theme, labelColor }) => labelColor || theme.color.black};
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
`;

export const Select = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  ${({ theme, error }) => theme && css`
    font-weight: ${theme.plainTextWeight.regular};
    font-size: ${theme.plainTextSize.large};
    color: ${theme.color.black};
    background: ${theme.color.white};
    border: 1px solid ${(error ? theme.color.red : theme.color.gray.solid)};
  `}
  line-height: 24px;
  box-shadow: 0px 4px 32px rgba(218, 228, 255, 0.16);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  outline: none;
  overflow-x: auto;
  overflow-y: hidden;

  ${({ active }) => active && css`
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}

  ::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.blue};
  }

  svg {
    fill: ${({ theme }) => theme.color.gray.solid};
  }
`;

export const Values = styled.div`
  display: flex;
`;

export const Options = styled.div`
  position: absolute;
  top: 58px;
  left: 0;
  display: ${({ active }) => (active ? 'block' : 'none')};
  width: 100%;
  max-height: 300px;
  padding: 0 4px 4px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray.solid};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow-y: auto;
  z-index: 20;
`;

export const Option = styled.div`
  width: 100%;
  padding: 16px 20px;
  ${({ theme }) => theme && css`
  font-weight: ${theme.plainTextWeight.regular};
  font-size: ${theme.plainTextSize.large};
  color: ${theme.color.black};
  `}
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'rgba(114, 151, 255, 0.5)' : 'none')};

  &:hover {
    background: ${({ selected, theme }) => (selected ? 'rgba(114, 151, 255, 0.5)' : theme.color.gray.light)};
  }

  ${({ focused }) => focused && css`
    background: ${({ selected, theme }) => (selected ? 'rgba(114, 151, 255, 0.5)' : theme.color.gray.light)};
    border: 1px solid ${({ theme }) => theme.color.blue};
  `}
`;

export const SingleValue = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font: inherit;
  color: inherit;
  line-height: inherit;
  background-color: ${({ theme }) => theme.color.gray.light};
  border-radius: 5px;
  border: none;
  outline: none;

  &:not(:last-child) {
    margin-right: 25px;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.blue};
  }

  svg {
    fill: ${({ theme }) => theme.color.gray.medium};
    width: 15px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const Alert = styled.p`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  font-weight: ${({ theme }) => theme.plainTextWeight.regular};
  font-size: ${({ theme }) => theme.plainTextSize.small};
  color: ${({ theme }) => theme.color.red};
  word-break: normal;
  letter-spacing: -0.24px;
  z-index: 10;
`;
