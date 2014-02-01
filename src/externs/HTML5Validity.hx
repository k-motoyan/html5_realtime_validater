package externs;

/**
 * HTML5 constraint validation API.
 * validity calss methods.
 * 
 * @author k-motoyan
 */
extern class HTML5Validity {
    /** attribute "required" and "number, date, and more..." validity status. */
    var valueMissing(default, null): Bool;

    /** attribute "email, url" validity status. */
    var typeMismatch(default, null): Bool;

    /** attribute "pattern" validity status. */
    var patternMismatch(default, null): Bool;

    /** attribute "maxlenght" validity status. */
    var tooLong(default, null): Bool;

    /** attribute "min" validity status. */
    var rangeUnderflow(default, null): Bool;

    /** attribute "max" validity status. */
    var rangeOverflow(default, null): Bool;

    /** attribute "step" validity status. */
    var stepMismatch(default, null): Bool;

    /** custom validity status. */
    var customError(default, null): Bool;

    /** form validity status. */
    var valid(default, null): Bool;
}