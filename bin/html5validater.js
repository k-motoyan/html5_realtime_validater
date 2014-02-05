(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HTMLTypeCast = function() { }
HTMLTypeCast.__name__ = true;
HTMLTypeCast.NodeToElement = function(node) {
	return node;
}
HTMLTypeCast.NodeToInputElement = function(node) {
	return node;
}
HTMLTypeCast.NodeToFormElement = function(node) {
	return node;
}
HTMLTypeCast.ElementToInputElement = function(element) {
	return element;
}
HTMLTypeCast.ElementToButtonElement = function(element) {
	return element;
}
HTMLTypeCast.EventTargetToInputElement = function(target) {
	return target;
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
var Main = function() { }
$hxExpose(Main, "HTML5RealtimeValidater");
Main.__name__ = true;
Main.main = function() {
	try {
		var _g = 0, _g1 = js.Browser.document.querySelectorAll(Main.form_class);
		while(_g < _g1.length) {
			var form = _g1[_g];
			++_g;
			new Validater(form,js.Browser.document.querySelectorAll(Main.input_class)).set();
		}
	} catch( msg ) {
		if( js.Boot.__instanceof(msg,String) ) {
			console.log("Error: " + msg);
		} else throw(msg);
	}
}
var Std = function() { }
Std.__name__ = true;
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
}
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
Type.__name__ = true;
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
var Utils = function() { }
Utils.__name__ = true;
Utils.groupSetAttribute = function(node_list,attr,val,cb) {
	var _g = 0;
	while(_g < node_list.length) {
		var node = node_list[_g];
		++_g;
		node.setAttribute(attr,val);
	}
	if(Type["typeof"](cb) != ValueType.TNull) cb();
}
Utils.groupRemoveAttribute = function(node_list,attr,cb) {
	var _g = 0;
	while(_g < node_list.length) {
		var node = node_list[_g];
		++_g;
		node.removeAttribute(attr);
	}
	if(Type["typeof"](cb) != ValueType.TNull) cb();
}
var Validater = function(form,inputs) {
	this.form = form;
	this.inputs = inputs;
	this.submit = form.querySelector("button[type=submit]");
	this.setConfig(form);
};
Validater.__name__ = true;
Validater.prototype = {
	getValidateCaseByMessage: function(element,messages) {
		return true == element.validity.valueMissing && Type["typeof"](messages.required) != ValueType.TNull?messages.required:true == element.validity.typeMismatch && Type["typeof"](messages.type) != ValueType.TNull?messages.type:true == element.validity.patternMismatch && Type["typeof"](messages.pattern) != ValueType.TNull?messages.pattern:true == element.validity.rangeUnderflow && Type["typeof"](messages.min) != ValueType.TNull?messages.min:true == element.validity.rangeOverflow && Type["typeof"](messages.max) != ValueType.TNull?messages.max:true == element.validity.stepMismatch && Type["typeof"](messages.step) != ValueType.TNull?messages.step:true == element.validity.tooLong && Type["typeof"](messages.maxlength) != ValueType.TNull?messages.maxlength:true == custom.Same.validity(element) && Type["typeof"](messages.same) != ValueType.TNull?messages.same:true == element.validity.customError && Type["typeof"](messages.custom) != ValueType.TNull?messages.custom:"";
	}
	,getValidityMessage: function(element) {
		var messages = Type["typeof"](element.getAttribute("data-validate-msg")) != ValueType.TNull?haxe.Json.parse(element.getAttribute("data-validate-msg")):{ };
		return true == element.validity.valueMissing && Type["typeof"](messages.required) != ValueType.TNull?messages.required:true == element.validity.typeMismatch && Type["typeof"](messages.type) != ValueType.TNull?messages.type:true == element.validity.patternMismatch && Type["typeof"](messages.pattern) != ValueType.TNull?messages.pattern:true == element.validity.rangeUnderflow && Type["typeof"](messages.min) != ValueType.TNull?messages.min:true == element.validity.rangeOverflow && Type["typeof"](messages.max) != ValueType.TNull?messages.max:true == element.validity.stepMismatch && Type["typeof"](messages.step) != ValueType.TNull?messages.step:true == element.validity.tooLong && Type["typeof"](messages.maxlength) != ValueType.TNull?messages.maxlength:true == custom.Same.validity(element) && Type["typeof"](messages.same) != ValueType.TNull?messages.same:true == element.validity.customError && Type["typeof"](messages.custom) != ValueType.TNull?messages.custom:"";
	}
	,clickSubmit: function() {
		this.submit.removeAttribute("disabled");
		this.submit.click();
		this.submit.setAttribute("disabled","");
	}
	,validate: function(element) {
		element.removeAttribute("disabled");
		element.setCustomValidity(this.getValidityMessage(element));
		if(false == element.checkValidity()) {
			this.submit.removeAttribute("disabled");
			this.submit.click();
			this.submit.setAttribute("disabled","");
		}
	}
	,attacheValidateEvent: function(e) {
		Utils.groupSetAttribute(this.inputs,"disabled","",(function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this.validate),e.target));
		Utils.groupRemoveAttribute(this.inputs,"disabled");
		if(true == this.form.checkValidity()) this.submit.removeAttribute("disabled");
	}
	,set: function() {
		this.submit.setAttribute("disabled","");
		var _g = 0, _g1 = this.inputs;
		while(_g < _g1.length) {
			var input = _g1[_g];
			++_g;
			input.addEventListener("input",$bind(this,this.attacheValidateEvent),false);
		}
	}
	,setConfig: function(form) {
		var config = haxe.Json.parse(form.getAttribute("data-html5-validater-config"));
		if(Type["typeof"](config) != ValueType.TNull && Type["typeof"](config.delay) == ValueType.TNull) Validater.config.delay = config.delay;
	}
	,__class__: Validater
}
var custom = {}
custom.Same = function() { }
custom.Same.__name__ = true;
custom.Same.validity = function(element) {
	if(false == element.hasAttribute("same")) return false;
	var target = js.Browser.document.getElementById(element.getAttribute("same"));
	if(Type["typeof"](target) == ValueType.TNull) throw "validity \"same\" target id not found.";
	if(element.value == target.value) return false;
	return true;
}
var haxe = {}
haxe.Json = function() {
};
haxe.Json.__name__ = true;
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45, digit = !minus, zero = c == 48;
		var point = false, e = false, pm = false, end = false;
		while(true) {
			c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = f | 0;
		return i == f?i:f;
	}
	,invalidNumber: function(start) {
		throw "Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start);
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.str.charCodeAt(this.pos++);
				switch(c) {
				case 114:
					buf.b += "\r";
					break;
				case 110:
					buf.b += "\n";
					break;
				case 116:
					buf.b += "\t";
					break;
				case 98:
					buf.b += "";
					break;
				case 102:
					buf.b += "";
					break;
				case 47:case 92:case 34:
					buf.b += String.fromCharCode(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.b += String.fromCharCode(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(c != c) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.b;
	}
	,parseRec: function() {
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						obj[field] = this.parseRec();
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 114 || this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 97 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 115 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
js.Browser.__name__ = true;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(typeof(JSON) != "undefined") haxe.Json = JSON;
Main.form_class = ".html5-validation-form";
Main.input_class = ".html5-validation-input";
Validater.config = { delay : 100};
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
})();
