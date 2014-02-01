package externs;

import js.html.Element;

/**
 * HTML5 constraint validation API
 * 
 * @author k-motoyan
 */
extern class HTML5Element extends Element {
    /** validity list. */
    var validity(default, null): HTML5Validity;

    /** whether to validate. */
    var willValidate(default, null): Bool;

    /** validated message. */
    var validationMessage(default, null): String;

    /** set a validation message. */
    function setCustomValidity(messeage: String): Void;    

    /** check to form. */
    function checkValidity(): Bool;
}