package custom;
import js.Browser;
import js.html.InputElement;

/**
 * HTML5 Realtime Validater
 * custom validation rule, same on other input.
 * 
 * @author k-motoyan
 */
class Same {
    public static function validity(element: InputElement): Bool {
        if (false == element.hasAttribute("same")) {
            return false;
        }
        
        var target = Browser.document.getElementById(element.getAttribute("same"));
        if (Type.typeof(target) == TNull) {
            throw 'validity "same" target id not found.';
        }

        if (element.value == HTMLTypeCast.ElementToInputElement(target).value) {
            return false;
        }
        return true;
    }
}