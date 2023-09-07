"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import * as d3 from "d3";

import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

interface DependecyPoint {
  source: string;
  target: string;
  value: number;
}

export class Visual implements IVisual {
  private settings: FormattingSettingsService;
  private formattingSettings: VisualFormattingSettingsModel;

  private rootSvg: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private group: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private group2: d3.Selection<SVGElement, {}, HTMLElement, any>;

  constructor(options: VisualConstructorOptions) {
    this.rootSvg = d3.select(options.element).append("svg");
    this.settings = new FormattingSettingsService();
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings = this.settings.populateFormattingSettingsModel(
      VisualFormattingSettingsModel,
      options.dataViews
    );

    console.log("for");
    console.log("Formatting", this.formattingSettings.dataPointCard);

    if (this.group != null) {
      this.group.remove();
    }

    if (this.group2 != null) {
      this.group2.remove();
    }

    console.log("Visual update", options);

    let data: DependecyPoint[] =
      options.dataViews[0].table.rows.map<DependecyPoint>((d) => {
        return {
          source: d[0] as string,
          target: d[1] as string,
          value: parseFloat(d[2] as string),
        };
      });

    const names = d3.sort(
      d3.union(
        data.map((d) => d.source),
        data.map((d) => d.target)
      )
    );

    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const { source, target, value } of data)
      matrix[index.get(source)][index.get(target)] += value;

    const width: number = options.viewport.width;
    const height: number = options.viewport.height;
    this.rootSvg.attr("width", width);
    this.rootSvg.attr("height", height);

    const innerRadius = Math.min(width, height) * 0.5 - 90;
    const outerRadius = innerRadius + 10;

    const chord = d3
      .chordDirected()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const ribbon = d3
      .ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);

    const colors = d3.quantize(
      this.formattingSettings.dataPointCard.colored.value
        ? d3.interpolateRainbow
        : d3.interpolateGreys,
      names.length
    );

    const chords = chord(matrix);

    this.rootSvg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

    this.group = this.rootSvg.append("g");

    const group = this.group.selectAll().data(chords.groups).join("g");

    group
      .append("path")
      .attr("fill", (d) => colors[d.index])
      .attr("d", arc as any);

    group
      .append("text")
      .each((d: any) => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr(
        "transform",
        (d: any) => `
          rotate(${(d.angle * 180) / Math.PI - 90})
          translate(${outerRadius + 5})
          ${d.angle > Math.PI ? "rotate(180)" : ""}
        `
      )
      .attr("text-anchor", (d: any) => (d.angle > Math.PI ? "end" : null))
      .text((d: any) => names[d.index] as any);

    group.append("title").text(
      (d) => `${names[d.index]}
        ${d3.sum(
          chords,
          (c) => ((c.source.index === d.index) == true ? 1 : 0) * c.source.value
        )} outgoing →
        ${d3.sum(
          chords,
          (c) => ((c.target.index === d.index) == true ? 1 : 0) * c.source.value
        )} incoming ←`
    );

    this.group2 = this.rootSvg.append("g");
    this.group2
      .attr("fill-opacity", 0.75)
      .selectAll()
      .data(chords)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", (d) => colors[d.target.index])
      .attr("d", ribbon as any)
      .append("title")
      .text(
        (d) =>
          `${names[d.source.index]} → ${names[d.target.index]} ${
            d.source.value
          }`
      );
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.settings.buildFormattingModel(this.formattingSettings);
  }
}
