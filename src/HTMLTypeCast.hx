package ;
import js.html.ButtonElement;
import js.html.EventTarget;
import js.html.FormElement;
import js.html.InputElement;
import js.html.Node;
import js.html.Element;

/**
 * HTML5 Realtime Validater.
 * html dom type casts.
 * 
 * @author k-motoyan
 */
class HTMLTypeCast {
    public static inline function NodeToElement(node: Node): Element {
        return untyped node;
    }
    public static inline function NodeToInputElement(node: Node): InputElement {
        return untyped node;
    }
    public static inline function NodeToFormElement(node: Node): FormElement {
        return untyped node;
    }
    public static inline function ElementToInputElement(element: Element): InputElement {
        return untyped element;
    }
    public static inline function ElementToButtonElement(element: Element): ButtonElement {
        return untyped element;
    }
    public static inline function EventTargetToInputElement(target: EventTarget): InputElement {
        return untyped target;
    }
}