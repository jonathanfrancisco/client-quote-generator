import React from 'react';
// import { Switch } from 'react-native';
import { Switch } from 'react-native-switch';
import twTheme from '@app/tailwind.config';

interface Props {
  isToggled: boolean;
  onToggle: (value: boolean) => void;
}

const SwitchField = ({ isToggled, onToggle }: Props) => {
  return (
    <Switch
      onValueChange={(value) => {
        onToggle(value);
      }}
      value={isToggled}
      backgroundInactive={'#CCD2E3'}
      backgroundActive={twTheme.theme.extend.colors.sunlife.primaryDarker}
      renderActiveText={false}
      renderInActiveText={false}
      circleBorderWidth={0}
      circleSize={22}
      containerStyle={{
        paddingVertical: 18,
      }}
      switchWidthMultiplier={3}
    />
  );
};

export default SwitchField;
