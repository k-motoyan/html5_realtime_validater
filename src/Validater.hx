package ;

import haxe.Json;
import js.Browser;
import js.html.Element;
import js.html.Event;
import js.html.Node;
import js.html.NodeList;
import externs.HTML5Element;

typedef ValidaterConfig = {
    ?delay: Int
}

typedef ValidateMsgDataMap = {
    ?required: String,
    ?maxlength: String,
    ?min: String,
    ?max: String,
    ?type: String,
    ?step: String,
    ?pattern: String,
    ?custom: String
}

/**
 * HTML5 Realtime Validater.
 * Validation proccess class.
 * 
 * @author k-motoyan
 */
class Validater {
    private static var config: ValidaterConfig = {
        delay: 100
    };

    private var form: HTML5Element;

    private var inputs: NodeList;

    private var submit: Element;

    public function new(form: Element, input_class: String) {
        this.form   = untyped form;
        this.inputs = form.querySelectorAll(input_class);
        this.submit = form.querySelector("button[type=submit]");
        this.setConfig(form);
    }

    private function setConfig(form: Element): Void {
        if (Type.typeof(untyped form.dataset.html5ValidaterConfig) == TNull) return;
        
        var config: ValidaterConfig = Json.parse( untyped form.dataset.html5ValidaterConfig );
        if (Type.typeof(config.delay) == TNull) Validater.config.delay = config.delay;
    }

    public function set(): Void {
        this.submit.setAttribute("disabled", "");
        for (input in this.inputs) {
            input.addEventListener("input", attacheValidateEvent, false);
        }
    }

    private inline function attacheValidateEvent(e: Event): Void {
        Utils.groupSetAttribute(this.inputs, "disabled", "", validate.bind( untyped e.target ));
        Utils.groupRemoveAttribute(this.inputs, "disabled");
        if (true == this.form.checkValidity()) this.submit.removeAttribute("disabled");
    }

    private inline function validate(element: HTML5Element): Void {
        element.removeAttribute("disabled");
        element.setCustomValidity( getValidityMessage(element) );

        if (false == element.checkValidity()) {
            this.submit.removeAttribute("disabled");
            this.submit.click();
            this.submit.setAttribute("disabled", "");
        }
    }

    private inline function getValidityMessage(element: HTML5Element): String {
        var messages: ValidateMsgDataMap =
        if (Type.typeof(untyped element.dataset.validateMsg) != TNull) {
            Json.parse(untyped element.dataset.validateMsg);
        } else {
            {};
        }

        return if (true == element.validity.valueMissing && Type.typeof(messages.required) != TNull) {
            messages.required;
        } else if (true == element.validity.typeMismatch && Type.typeof(messages.type) != TNull) {
            messages.type;
        } else if (true == element.validity.patternMismatch && Type.typeof(messages.pattern) != TNull) {
            messages.pattern;
        } else if (true == element.validity.rangeUnderflow && Type.typeof(messages.min) != TNull) {
            messages.min;
        } else if (true == element.validity.rangeOverflow && Type.typeof(messages.max) != TNull) {
            messages.max;
        } else if (true == element.validity.stepMismatch && Type.typeof(messages.step) != TNull) {
            messages.step;
        } else if (true == element.validity.tooLong && Type.typeof(messages.maxlength) != TNull) {
            messages.maxlength;
        } else if (true == element.validity.customError && Type.typeof(messages.custom) != TNull) {
            messages.custom;
        } else {
            "";
        }
    }
}