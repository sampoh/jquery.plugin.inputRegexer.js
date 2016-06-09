(function($){

$.fn.inputRegexer = function(option){
	//Default option
	var def = {
		"pattern":""
	};
	//Convert a string attribute to object
	if(typeof(option) == 'string'){
		option = {"pattern":option};
	}
	//Merge option
	var opts = $.extend({},def,option);

	if(opts.pattern != ''){
		//Handle events
		$(this).on('keyup change',function(){
			var str = $(this).val();
			var newVal = '';
			for(var i=0;i<str.length;i++){
				try{
					if(str.charAt(i).match(opts.pattern)){
						newVal += str.charAt(i);
					}
				}catch(e){ console.log(e); }
			}
			if(str != newVal){
				//Set new value and keep cursor position
				var pos = getCaret($(this).get(0)) - 1;
				$(this).val(newVal);
				$(this).get(0).selectionStart = pos;
				$(this).get(0).selectionEnd = pos;
			}
		});
	}

	return this;

	function getCaret(node){
		if(node.selectionStart){
			return node.selectionStart;
		}else if(!document.selection){
   			return 0;
		}
		var c = "\001",
		sel = document.selection.createRange(),
		dul = sel.duplicate(),
		len = 0;
		dul.moveToElementText(node);
		sel.text = c;
		len = dul.text.indexOf(c);
		sel.moveStart('character',-1);
		sel.text = "";
		return len;
	}

};

})(jQuery);
