import powerbi from "powerbi-visuals-api";
import "./../style/visual.less";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private root;
    private ellipse;
    private text;
    private padding;
    private target;
    private updateCount;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
}
