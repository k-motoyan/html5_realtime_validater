import externs.HTML5Element;
import js.html.Element;
import js.html.EventTarget;
import js.html.NodeList;
import js.html.Node;

/**
 * HTML5 Realtime Validater.
 * Utilities class.
 * 
 * @author k-motoyan
 */
class Utils {
    public static function groupSetAttribute(elements: NodeList, attr: String, val: String, ?cb: Void -> Void): Void {
        for (node in elements) {
            NodeToElement(node).setAttribute(attr, val);
        }
        if (Type.typeof(cb) != TNull) cb();
    }
    
    public static function groupRemoveAttribute(elements: NodeList, attr: String, ?cb: Void -> Void): Void {
        for (node in elements) {
            NodeToElement(node).removeAttribute(attr);
        }
        if (Type.typeof(cb) != TNull) cb();
    }

    public static inline function NodeToElement(node: Node): HTML5Element {
        return untyped node;
    }
}