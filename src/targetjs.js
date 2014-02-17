(function() {
	targetjs = {
		bindTo: function(src, tgt, option) {
			aaa = src;
			bbb = tgt;

			var ret = {};
			if(option == null) option = {};

			if(option.autoRefresh === true) {
				var _id = setInterval(function() {
					ret.refresh();
				}, 100);
			}

			var _preLeft = -1;
			var _preTop = -1;
			var _preWidth = -1;
			var _preHeight = -1;
			ret.refresh = function() {
				var _left = targetjs.getLeft(tgt);
				var _top = targetjs.getTop(tgt);
				var _width = tgt.offsetWidth;
				var _height = tgt.offsetHeight;

				if(
					_preLeft != _left ||
					_preTop != _top ||
					_preWidth != _width ||
					_preHeight != _height
				) {
					var _parent = targetjs.getParent(src);
					var _parentLeft = targetjs.getLeft(_parent);
					var _parentTop = targetjs.getTop(_parent);

					src.style.position = "absolute";
					src.style.left = (_left - _parentLeft) + "px";
					src.style.top = (_top - _parentTop) + "px";
					src.style.width = _width + "px";
					src.style.height = _height + "px";

					_preLeft = _left;
					_preTop = _top;
					_preWidth = _width;
					_preHeight = _height;
				}
			}
			ret.refresh();

			return ret;
		},
		getTop: function(e){ 
			var offset = e.offsetTop;
			if(e.offsetParent != null) offset += targetjs.getTop(e.offsetParent);
			return offset;
		},
		getLeft: function(e){ 
			var offset = e.offsetLeft;
			if(e.offsetParent != null) offset += targetjs.getLeft(e.offsetParent);
			return offset;
		},
		getStyle: function(obj, attr){
			if(obj.currentStyle)
				return obj.currentStyle[attr];
			else
				return getComputedStyle(obj,false)[attr];
		},
		getParent: function(e) {
			if(e == null) return null;
			if(targetjs.getStyle(e.offsetParent) != "static")
				return e.offsetParent;
			return targetjs.getParent(e.offsetParent);
		}
	};
})();