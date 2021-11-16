import React, { useState, useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useTheme } from 'styled-components';
import {
  Wrapper, SelectContainer, Select, Values, Options, Option, SingleValue, Alert,
} from './MultiSelectDropdown.style';
import { ReactComponent as DropdownIcon } from '../../assets/icons/angle-down.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/cancel.svg';

export const MultiSelectDropdown = ({
  options, current, fieldName, label, error,
}) => {
  const node = useRef();

  const [selectIsActive, setSelectIsActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(current);
  const [activeOption, setActiveOption] = useState(0);

  const theme = useTheme();

  const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();

  useEffect(() => {
    if (error) {
      setFieldError(fieldName, 'Occupation is required');
    }
  }, [error]);

  console.log(error);

  // open select
  const showOptions = () => {
    setSelectIsActive(!selectIsActive);
    setFieldTouched(fieldName);
  };

  // select option by clicking, removing by clicking the second time
  const selectOption = (option) => {
    if (selectedOptions.includes(option)) {
      const filtered = selectedOptions.filter((item) => item !== option);
      setSelectedOptions(filtered);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // remove value from select field
  const handleRemove = (option) => {
    const filtered = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(filtered);
  };

  // close select when clicking outside
  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setSelectIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // implementation of keyboard control: up and down, select option by press Enter
  useEffect(() => {
    window.onkeydown = (e) => {
      if (node.current && node.current.contains(e.target)) {
        if (e.key === 'ArrowDown' && activeOption < options.length) {
          setActiveOption(activeOption + 1);
        } else if (e.key === 'ArrowUp' && activeOption > 0) {
          setActiveOption(activeOption - 1);
        } else if (e.key === 'Enter') {
          if (activeOption !== 0) {
            selectOption(options[activeOption - 1]);
          }
          setSelectIsActive(!selectIsActive);
          setActiveOption(0);
        }
      }
    };
  }, [selectIsActive, activeOption]);

  // transmitting data to the outside
  useEffect(() => {
    setFieldValue(fieldName, selectedOptions.join(', '));
  }, [selectedOptions, fieldName]);

  return (
    <Wrapper>
      {label && <label>{label}</label>}
      <SelectContainer ref={node}>
        <Select
          active={selectIsActive}
          onClick={showOptions}
          role="listbox"
          tabIndex="0"
          theme={theme}
          error={error}
        >
          <Values>
            {selectedOptions.map((i) => (
              <SingleValue key={`selected-${i}`} onClick={(e) => handleRemove(e.currentTarget.innerText)} tabIndex="0" role="listitem" theme={theme}>
                {i}
                <RemoveIcon />
              </SingleValue>
            ))}
          </Values>
          <DropdownIcon />
        </Select>
        <Options active={selectIsActive} theme={theme} role="list">
          {options.map((opt, index) => (
            <Option
              key={opt}
              role="option"
              selected={selectedOptions.includes(opt)}
              focused={activeOption === index + 1}
              onClick={(e) => selectOption(e.target.innerText)}
              theme={theme}
            >
              {opt}
            </Option>
          ))}
        </Options>
        {error && <Alert>{error}</Alert>}
      </SelectContainer>
    </Wrapper>
  );
};
