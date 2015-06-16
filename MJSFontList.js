MJSFontList = (function () {
var fallbackFonts = ['sans-serif','serif','monospace','cursive'];//,'fantasy']; //some of the fall back fonts.
//however some of these might not be included ether.
//some of the most common fonts. don't want a massive list. just enought of the popular ones.
var testFonts = ["Arial", "Arial Black", "Baskerville", "Batang", "Big Caslon", "Book Antiqua",
 "Brush Script MT", "Calibri", "Candara", "Century Gothic", "Charcoal", "Comic Sans MS",
 "Copperplate", "Courier", "Didot", "Droid Sans", "Droid Serif",
 "Franklin Gothic Medium", "Futura", "Gadget", "Garamond", "Geneva", "Georgia",
 "Goudy Old Style", "Helvetica", "Impact", "Lato", "Lora", "Lucida Console",
 "Lucida Grande", "Lucida Sans Unicode", "Monaco", "Open Sans Condensed", "Oswald",
 "PT Sans", "Palatino", "Palatino Linotype", "Roboto", "Rockwell", "Rockwell Extra Bold",
 "Segoe UI", "Source Sans Pro", "Tahoma", "Times New Roman", "Trebuchet MS", "Ubuntu-Title",
 "Verdana", "cursive"];

function hashCode(s) {
  var hash = 0, i, chr, len;
  if (s.length == 0) return hash;
  for (i = 0, len = s.length; i < len; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var theBody = document.getElementsByTagName("body")[0];

var testString = ['agAmMqQwWlLi1'];//symbols that are lickly different between fonts.

var testcanvas = document.createElement("canvas");
//smaller the faster
var cw = 100;
var ch = 15;
testcanvas.width = cw;
testcanvas.height = ch;
var cf = "10px "
var ctx = testcanvas.getContext('2d');

function getFontMetric(font){
	ctx.clearRect(0,0,cw,ch);
	ctx.font = cf + font;
	ctx.fillText(testString,0,ch/2);
	var img = testcanvas.toDataURL("image/png");
	return hashCode(img);
}
function hasFont(font){
return fallbackHashes.indexOf(getFontMetric(font)) == -1;
}

var fallbackHashes =[];
for (var i = 0;i<fallbackFonts.length;i++){
	fallbackHashes.push(getFontMetric(fallbackFonts[i]))
}
var workingFonts = fallbackFonts;
for (var i=0;i<testFonts.length;i++){
	if ( hasFont(testFonts[i]) ){
		workingFonts.push(testFonts[i]);
	}
}

return {fontList:workingFonts,hasFont:hasFont,getFontMetric:getFontMetric}

}());
