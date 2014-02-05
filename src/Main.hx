package ;

import js.Browser;

/**
 * HTML5 Realtime Validater.
 * 
 * @author k-motoyan
 */
@:expose("HTML5RealtimeValidater")
class Main {
    private static var form_class : String = ".html5-validation-form";
    private static var input_class: String = ".html5-validation-input";

    public static function main(): Void {
        try {
            for (form in Browser.document.querySelectorAll(form_class)) {
                new Validater(
                    HTMLTypeCast.NodeToFormElement(form),
                    Browser.document.querySelectorAll(input_class)
                ).set();
            }
        } catch (msg: String) {
            trace("Error: " + msg);
        }
    }
}