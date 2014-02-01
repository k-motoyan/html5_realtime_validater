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
        for (node in Browser.document.querySelectorAll(form_class)) {
            new Validater(Utils.NodeToElement(node), input_class).set();
        }
    }
}