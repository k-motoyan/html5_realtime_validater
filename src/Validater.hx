package ;

import custom.Same;
import haxe.Json;
import js.html.ButtonElement;
import js.html.Event;
import js.html.FormElement;
import js.html.InputElement;
import js.html.NodeList;

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
    ?same: String,
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

    private var form: FormElement;

    private var inputs: NodeList;

    private var submit: ButtonElement;

    public function new(form: FormElement, inputs: NodeList) {
        this.form   = form;
        this.inputs = inputs;
        this.submit = HTMLTypeCast.ElementToButtonElement( form.querySelector("button[type=submit]") );
        this.setConfig(form);
    }

    private inline function setConfig(form: FormElement): Void {
        var config: ValidaterConfig = Json.parse( form.getAttribute("data-html5-validater-config") );
        if (Type.typeof(config) != TNull && Type.typeof(config.delay) == TNull) Validater.config.delay = config.delay;
    }

    public function set(): Void {
        this.submit.setAttribute("disabled", "");
        for (input in this.inputs) {
            HTMLTypeCast.NodeToInputElement(input).addEventListener("input", attacheValidateEvent, false);
        }
    }

    private inline function attacheValidateEvent(e: Event): Void {
        Utils.groupSetAttribute(this.inputs, "disabled", "", validate.bind( HTMLTypeCast.EventTargetToInputElement(e.target) ));
        Utils.groupRemoveAttribute(this.inputs, "disabled");
        if (true == this.form.checkValidity()) this.submit.removeAttribute("disabled");
    }

    private inline function validate(element: InputElement): Void {
        element.removeAttribute("disabled");
        element.setCustomValidity( getValidityMessage(element) );
        if (false == element.checkValidity()) this.clickSubmit();
    }

    private inline function clickSubmit(): Void {
        this.submit.removeAttribute("disabled");
        this.submit.click();
        this.submit.setAttribute("disabled", "");
    }

    private inline function getValidityMessage(element: InputElement): String {
        var messages: ValidateMsgDataMap =
        if (Type.typeof( element.getAttribute("data-validate-msg") ) != TNull) {
            Json.parse( element.getAttribute("data-validate-msg") );
        } else {
            {};
        }
        return this.getValidateCaseByMessage(element, messages);
    }
    
    private inline function getValidateCaseByMessage(element: InputElement, messages: ValidateMsgDataMap): String {
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
        } else if (true == Same.validity(element) && Type.typeof(messages.same) != TNull) {
            messages.same;
        } else if (true == element.validity.customError && Type.typeof(messages.custom) != TNull) {
            messages.custom;
        } else {
            "";
        }
    }
}