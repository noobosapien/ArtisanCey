import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, {
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: Rancho, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 5rem;
  background: ${theme.palette.common.white};
  border: 1px solid ${theme.palette.common.gray};
  border-radius: 0.75em;
  margin-top: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.common.black};

  &:hover {
    background: ${theme.palette.common.white};
    border-color: ${theme.palette.common.gray};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.common.greenBlue};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: Rancho, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  width: 5rem;
  margin: 10px 0;
  background: ${theme.palette.common.white};
  border: 1px solid ${theme.palette.common.darkGray};
  border-radius: 0.75em;
  color: ${theme.palette.common.black};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.common.greenBlue};
    color: ${theme.palette.common.white};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.common.gray};
    color: ${theme.palette.common.white};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.common.greenBlue};
    color: ${theme.palette.common.white};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.common.lightGray};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.common.gray};
    color: ${theme.palette.common.white};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function ReviewSort({ sort, setSort }) {
  return (
    <div>
      <CustomSelect value={sort} onChange={setSort}>
        <StyledOption value={'latest'}>Latest</StyledOption>
        <StyledOption value={'oldest'}>Oldest</StyledOption>
        <StyledOption value={'highest'}>Highest</StyledOption>
        <StyledOption value={'lowest'}>Lowest</StyledOption>
      </CustomSelect>
    </div>
  );
}
