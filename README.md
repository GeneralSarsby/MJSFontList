# MJSFontList
Find which fonts are avaliable in the brower by checking against fallback fonts

###Motivation
There is no list clientside of fonts that are avaliable for use in CSS or for use on Canvas contexts. MJSFontList makes a list. It is not exaustive, but should be enough to offer some choice in a user facing option. MJSFontList also provides methods to check if any font is available.

###Method
Internally we draw a test string `'agAmMqQwWlLi1'` on an offscreen canvas using a selected font, then use `toDataURL("image/png");` to get a string of the pixels on the canvas, and use `hashCode(img);` to hash the long string down to a 32 bit integer.
We compare the hash of each font to the hash of the fallback fonts. If they are the same it means the brower didn't use the font chosen, because it didn't exist. Font with a hash different from the fallback fonts are fonts avaliable.
The string  `'agAmMqQwWlLi1'` is chosen for it's likely hood of creating unique pixels on the canvas for different fonts.

For performance, the test canvas is chosen to be small, only 15px by 100px.
The test string is drawn with a font size of 10px using `fillText()`.

MJSFontList only does an initial check agains a short list of 30-ish fonts that are likely to be on the system. This includes the typical web-safe fonts, some common Microsoft fonts, and common fonts on OSX/iOS.

###API
`MJSFontList.fontList` is an array of fonts found that are avaliable.
These are fonts that don't use the fallback font.
  
`MJSFontList.hasFont(fontName)` is true if the font is not a fallback font.
i.e.   `MJSFontList.hasFont('Times New Roman') -> True`.
  
`MJSFontList.getFontMetric(fontName)` returns a 32bit integer that represents what was drawn.
If the font metric of two fonts is the same, then one of the fonts was drawn with a fallback font, as isn't avaliable.
This is how `hasFont` works.
   
