"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import * as d3 from "d3";

import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
  private root: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private ellipse: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private text: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private padding: number = 20;

  private target: HTMLElement;
  private updateCount: number;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);

    this.root = d3.select(options.element).append("svg");
    this.ellipse = this.root
      .append("ellipse")
      .style("fill", "rgba(255, 255, 0 , 0.5)")
      .style("stroke", "rgba(0, 0, 0, 1.0)")
      .style("stroke-width", "4");

    this.text = this.root
      .append("text")
      .text("HEllo D3")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("fill", "rgba(255, 255, 0 , 0.5)")
      .style("stroke", "rgba(0, 0, 0, 1.0)")
      .style("stroke-width", "4");

    this.target = options.element;
    this.updateCount = 0;
  }

  public update(options: VisualUpdateOptions) {
    console.log("Visual update", options);

    this.root
      .attr("width", options.viewport.width)
      .attr("height", options.viewport.height);

    var plot = {
      xOffset: this.padding,
      yOffset: this.padding,
      width: options.viewport.width - this.padding * 2,
      height: options.viewport.height - this.padding * 2,
    };

    this.ellipse
      .attr("cx", plot.xOffset + plot.width * 0.5)
      .attr("cy", plot.yOffset + plot.height * 0.5)
      .attr("rx", plot.width * 0.5)
      .attr("ry", plot.height * 0.5);

    var fontSizeForWidth: number = plot.width * 0.2;
    var fontSizeForHeight: number = plot.height * 0.35;
    var fontSize: number = d3.min([fontSizeForWidth, fontSizeForHeight]);

    this.text
      .attr("x", plot.xOffset + plot.width / 2)
      .attr("y", plot.yOffset + plot.height / 2)
      .attr("width", plot.width)
      .attr("height", plot.height)
      .attr("font-size", fontSize);
  }
}
