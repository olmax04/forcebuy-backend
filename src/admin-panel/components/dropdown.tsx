import React from 'react';
import {
  DropDown,
  DropDownTrigger,
  DropDownMenu,
  DropDownItem,
  Button,
  Label,
  Box,
} from '@admin-bro/design-system';
import { BasePropertyProps } from 'admin-bro';

const Dropdown: React.FC<BasePropertyProps> = (props) => {
  const [value, setValue] = React.useState<'user' | 'admin'>('user');
  const { property, record, onChange } = props;

  React.useEffect(() => {
    onValueChange(value);
  }, []);

  const onValueChange = (value: string) => {
    onChange({
      ...record,
      params: {
        ...record.params,
        [property.name]: value,
      },
    });
  };

  return (
    <Box>
      <Label>{property.label}</Label>
      <DropDown stick="left">
        <DropDownTrigger>
          <Button type="button">{value}</Button>
        </DropDownTrigger>
        <DropDownMenu>
          <DropDownItem
            onClick={function noRefCheck() {
              setValue('admin');
              onValueChange(value);
            }}
          >
            admin
          </DropDownItem>
          <DropDownItem
            onClick={function noRefCheck() {
              setValue('user');
              onValueChange(value);
            }}
          >
            user
          </DropDownItem>
        </DropDownMenu>
      </DropDown>
    </Box>
  );
};

export default Dropdown;
