"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

class DataPointCardSettings extends FormattingSettingsCard {
  colored = new formattingSettings.ToggleSwitch({
    name: "colored",
    displayName: "Show in colors",
    value: false,
  });

  name: string = "colorScheme";
  displayName?: string = "Dependecy tree visual properties";
  slices: Array<FormattingSettingsSlice> = [this.colored];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
  dataPointCard = new DataPointCardSettings();

  cards = [this.dataPointCard];
}
