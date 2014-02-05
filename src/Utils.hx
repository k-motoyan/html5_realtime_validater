import js.html.NodeList;

/**
 * HTML5 Realtime Validater.
 * Utilities class.
 * 
 * @author k-motoyan
 */
class Utils {
    public static function groupSetAttribute(node_list: NodeList, attr: String, val: String, ?cb: Void -> Void): Void {
        for (node in node_list) {
            HTMLTypeCast.NodeToElement(node).setAttribute(attr, val);
        }
        if (Type.typeof(cb) != TNull) cb();
    }
    
    public static function groupRemoveAttribute(node_list: NodeList, attr: String, ?cb: Void -> Void): Void {
        for (node in node_list) {
            HTMLTypeCast.NodeToElement(node).removeAttribute(attr);
        }
        if (Type.typeof(cb) != TNull) cb();
    }
}