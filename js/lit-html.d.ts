/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
export declare const html: (strings: TemplateStringsArray, ...values: any[]) => TemplateResult;
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
export declare const svg: (strings: TemplateStringsArray, ...values: any[]) => TemplateResult;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
export declare class TemplateResult {
    template: Template;
    values: any[];
    constructor(template: Template, values: any[]);
}
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 */
export declare function render(result: TemplateResult, container: Element | DocumentFragment, partCallback?: PartCallback): void;
/**
 * A placeholder for a dynamic expression in an HTML template.
 *
 * There are two built-in part types: AttributePart and NodePart. NodeParts
 * always represent a single dynamic expression, while AttributeParts may
 * represent as many expressions are contained in the attribute.
 *
 * A Template's parts are mutable, so parts can be replaced or modified
 * (possibly to implement different template semantics). The contract is that
 * parts can only be replaced, not removed, added or reordered, and parts must
 * always consume the correct number of values in their `update()` method.
 *
 * TODO(justinfagnani): That requirement is a little fragile. A
 * TemplateInstance could instead be more careful about which values it gives
 * to Part.update().
 */
export declare class TemplatePart {
    type: string;
    index: number;
    name: string | undefined;
    rawName: string | undefined;
    strings: string[] | undefined;
    constructor(type: string, index: number, name?: string | undefined, rawName?: string | undefined, strings?: string[] | undefined);
}
export declare class Template {
    parts: TemplatePart[];
    element: HTMLTemplateElement;
    svg: boolean;
    constructor(strings: TemplateStringsArray, svg?: boolean);
    /**
     * Returns a string of HTML used to create a <template> element.
     */
    private _getHtml(strings, svg?);
}
export declare const getValue: (part: Part, value: any) => any;
export declare type DirectiveFn = (part: Part) => any;
export declare const directive: <F extends DirectiveFn>(f: F) => F;
export interface Part {
    instance: TemplateInstance;
    size?: number;
}
export interface SinglePart extends Part {
    setValue(value: any): void;
}
export interface MultiPart extends Part {
    setValue(values: any[], startIndex: number): void;
}
export declare class AttributePart implements MultiPart {
    instance: TemplateInstance;
    element: Element;
    name: string;
    strings: string[];
    size: number;
    constructor(instance: TemplateInstance, element: Element, name: string, strings: string[]);
    setValue(values: any[], startIndex: number): void;
}
export declare class NodePart implements SinglePart {
    instance: TemplateInstance;
    startNode: Node;
    endNode: Node;
    private _previousValue;
    constructor(instance: TemplateInstance, startNode: Node, endNode: Node);
    setValue(value: any): void;
    private _insert(node);
    private _setNode(value);
    private _setText(value);
    private _setTemplateResult(value);
    private _setIterable(value);
    protected _setPromise(value: Promise<any>): void;
    clear(startNode?: Node): void;
}
export declare type PartCallback = (instance: TemplateInstance, templatePart: TemplatePart, node: Node) => Part;
export declare const defaultPartCallback: (instance: TemplateInstance, templatePart: TemplatePart, node: Node) => Part;
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
export declare class TemplateInstance {
    _parts: Part[];
    _partCallback: PartCallback;
    template: Template;
    constructor(template: Template, partCallback?: PartCallback);
    update(values: any[]): void;
    _clone(): DocumentFragment;
}
