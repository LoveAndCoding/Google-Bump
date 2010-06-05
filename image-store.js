var image_store = {
	
	multi_upArrow : 	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAOJJREFUeNpi%2BP%2F%2F" +
						"PwM6BgIuILYC0VjlcWmQCG04hksjdg1hjUd" +
						"VG%2FZ%2FBdHYNDJCFTMwMjKCNBhIx%2FZ0" +
						"8GjZGTOxcXH9%2B%2FXt25drh84%2BXVxSA" +
						"ZS7AFT7DawWrBOqQTZ1eguvtqMZEwcvN1AQ" +
						"5AyGfz8%2Bf%2F18df%2Bpx7Mza2AaGaFOM" +
						"pDPWdjIq%2B9mwczOy8PExMgAkgC54d%2B%" +
						"2F%2Fwx%2Ff37%2B8vnirhMPp8TXgzSC5Kx" +
						"Uilc2sDEzM7KzMjNxADErCxMjM9D6v0Bjf%" +
						"2F%2F59%2F%2FH77%2F%2FfgLxr79%2F%2F" +
						"9%2FpDW%2BA28RAPLgAEGAAY5%2Bk2Ib1C%" +
						"2BEAAAAASUVORK5CYII%3D",
	
	multi_downArrow :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAOJJREFUeNpiZGBg4AJiAw" +
						"biwQUWkAbZ9FnN%2F%2F%2F8Yvr%2F6yfz%" +
						"2F39%2FGP%2F%2F%2FcXE8B8owwhEzGz%2F" +
						"GJlY%2FjOysf9lZGH793hmWi0jzCb57IWNP" +
						"Jq2lkBF3ECNDAz%2FgboYGRmAGhiAhnz9cv" +
						"3w8YdT4%2BtBNjH%2BB0oyMjKCNSoXrWzg0" +
						"nayZGLl5GGAWvXv9%2Fcv367uO363L7wBpA" +
						"Go%2FhsTyJEgBkgAJMH58OhpfqYfX%2Fk5m" +
						"BlANIiPrIEBqgGOoU61cu%2Fccch79buvIB" +
						"rEB4mjqEPmIGv06d15BJsGrJqQNWLTAMIAA" +
						"QYAJLynOOE%2FN%2BkAAAAASUVORK5CYII%" +
						"3D",
	
	vid_popout : 		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAJtJREFUeNpiXL9%2BPQ" +
						"MlgAVK%2BwGxOZL4SSDeRIoB5lueuFTBBH1" +
						"k9rRBDUA3GMMCFnQZqOaT2AxGUwMCm1jQJU" +
						"AakBScRGLDAZKaTUxoCk%2FCDEFyejUaRgE" +
						"wAzZBJTfhMIRgICLHxElkFxEygAmJbY5kK7" +
						"KLiDaALDDwBrDgEG8lxwDk6MMLkGMI2YBNa" +
						"MkUH8CZFzYRmwthACDAAJ6pRbpH2M60AAAA" +
						"AElFTkSuQmCC",
	
	vid_noembed :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAIdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwgImXKF3RxkL8YCYnNy" +
						"eHB6gJ8gfKfkBdgChixaGbEZggLLs1zciU3" +
						"QPkBQLwhZfLzAKjcf2TvMBFh8waoIVhdgi8" +
						"WAtAMwRuN2PyHbjNWr7KgOQ3uP6if0V2C4V" +
						"UmYkIaXzgx4YkuBmLkGId%2BZgIIMAA%2Fg" +
						"yWd%2ForwUQAAAABJRU5ErkJggg%3D%3D",
	
	media_close :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAKdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQsACY6RM%2BQJjEnISI4iYk8O" +
						"DagBMc1qrHkiBKxCHosmtBuLds6ov%2FYcZ" +
						"gu4FmGYQ2A3VgKIZxICq%2BY%2FhBShwhSl" +
						"EotHZrljDAApC0TTsxmJBKKFYCEW3BZdmqk" +
						"QjNgNWY3E6toDFasBqLAHmis8QFiy24PIz1" +
						"oBFdgEjNJFg0wwPWPSEhO4CZEPQQSpyUoZr" +
						"GPDcCBBgANKNMbOvj7dYAAAAAElFTkSuQmC" +
						"C",
	
	image_slideshow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAGtJREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQsACIlKmfIHxiXUOI4iYk8MDMQCbJB" +
						"7wn1gv%2FCclDP7j0PAfj%2BH%2F0V3ASIJL" +
						"GEmNhf%2BURiMjJQYwEpuQ%2FpOg%2BT9KQk" +
						"JS%2BJ9ImxnRDSA5%2FuEmDXhmotgAgAADAF" +
						"GQFx04us8gAAAAAElFTkSuQmCC",
	
	image_left_arrow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAF1JREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQkCxASwwRsqUL%2BhyML8xYtM4J4cH" +
						"rwv%2BU%2BIFZM2MpBpAkmaUMMDibELeYKRu" +
						"LEBNJNkLTNicRUpMMOHyG7GGMOELIGIA49DP" +
						"TAABBgBMsBIfaeHnDgAAAABJRU5ErkJggg%3" +
						"D%3D",
	
	image_right_arrow :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAFpJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwwRsqUL7jUwPzIiCw4J" +
						"4eHZBf8J9cLjPgMIdYFOA1hIeREPN5hpG4s" +
						"oIcygUBkJDUM%2FuOyiIkSzaSGAVYvMg79z" +
						"AQQYACovRIfeUjOIwAAAABJRU5ErkJggg%3" +
						"D%3D"
	
}