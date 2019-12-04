/*
 * @autor Brian César Rodríguez Castro
 * Controller 
 * Pagina de control de catalogo de actividades
 */

// Cargando sistema
(function($) {

	"use strict"; // Start of use strict

	var SufeeAdmin = {

		cpuLoad : function() {

			var data = [], totalPoints = 300;

			function getRandomData() {

				if (data.length > 0)
					data = data.slice(1);

				// Do a random walk

				while (data.length < totalPoints) {

					var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev
							+ Math.random() * 10 - 5;

					if (y < 0) {
						y = 0;
					} else if (y > 100) {
						y = 100;
					}

					data.push(y);
				}

				// Zip the generated y values with the x values

				var res = [];
				for (var i = 0; i < data.length; ++i) {
					res.push([ i, data[i] ])
				}

				return res;
			}

			// Set up the control widget

			var updateInterval = 30;
			$("#updateInterval").val(updateInterval).change(function() {
				var v = $(this).val();
				if (v && !isNaN(+v)) {
					updateInterval = +v;
					if (updateInterval < 1) {
						updateInterval = 1;
					} else if (updateInterval > 3000) {
						updateInterval = 3000;
					}
					$(this).val("" + updateInterval);
				}
			});

			var plot = $.plot("#cpu-load", [ getRandomData() ], {
				series : {
					shadowSize : 0
				// Drawing is faster without shadows
				},
				yaxis : {
					min : 0,
					max : 100
				},
				xaxis : {
					show : false
				},
				colors : [ "#007BFF" ],
				grid : {
					color : "transparent",
					hoverable : true,
					borderWidth : 0,
					backgroundColor : 'transparent'
				},
				tooltip : true,
				tooltipOpts : {
					content : "Y: %y",
					defaultTheme : false
				}

			});

			function update() {

				plot.setData([ getRandomData() ]);

				// Since the axes don't change, we don't need to call plot.setupGrid()

				plot.draw();
				setTimeout(update, updateInterval);
			}

			update();

		},

		lineFlot : function() {

			var sin = [], cos = [];

			for (var i = 0; i < 10; i += 0.1) {
				sin.push([ i, Math.sin(i) ]);
				cos.push([ i, Math.cos(i) ]);
			}

			var plot = $.plot("#flot-line", [ {
				data : sin,
				label : "sin(x)"
			}, {
				data : cos,
				label : "cos(x)"
			} ], {
				series : {
					lines : {
						show : true
					},
					points : {
						show : true
					}
				},
				yaxis : {
					min : -1.2,
					max : 1.2
				},
				colors : [ "#007BFF", "#DC3545" ],
				grid : {
					color : "#fff",
					hoverable : true,
					borderWidth : 0,
					backgroundColor : 'transparent'
				},
				tooltip : true,
				tooltipOpts : {
					content : "'%s' of %x.1 is %y.4",
					shifts : {
						x : -60,
						y : 25
					}
				}
			});
		},

		pieFlot : function() {
			var data = [ {
				label : "Desarrollo",
				data : 1,
				color : "#ee5253"
			}, {
				label : "Recursos humanos",
				data : 4,
				color : "#2e86de"
			}, {
				label : "Preventa",
				data : 2,
				color : "#1dd1a1"
			}, {
				label : "Mesa de servicio",
				data : 6,
				color : "#f368e0"
			}, {
				label : "Comercial",
				data : 5,
				color : "#FFC312"
			} ];

			var plotObj = $.plot($("#flot-pie"), data, {
				series : {
					pie : {
						show : true,
						radius : 1,
						innerRadius : 0.2,
						label : {
							show : false,

						}
					}
				},
				grid : {
					hoverable : true
				},
				tooltip : {
					show : true,
					content : "%p.0%, %s, n=%n", // show percentages, rounding to 2 decimal places
					shifts : {
						x : 20,
						y : 0
					},
					defaultTheme : false
				}
			});
		},

		pieFlot2 : function(dataExt) {

			var data = dataExt;

			var plotObj = $.plot($("#flot-pie2"), data, {
				series : {
					pie : {
						show : true,
						radius : 1,
						innerRadius : 0.4,
						label : {
							show : false,

						}
					}
				},
				grid : {
					hoverable : true
				},
				tooltip : {
					show : true,
					content : "%p.0%, %s, n=%n", // show percentages, rounding to 2 decimal places
					shifts : {
						x : 20,
						y : 0
					},
					defaultTheme : false
				}
			});
		},
		pieFlot3 : function() {

			var data = [ {
				label : "Personal",
				data : 36,
				color : "#1B9CFC"
			}, {
				label : "Laboral",
				data : 25,
				color : "#EA2027"
			} ];

			var plotObj = $.plot($("#flot-pie3"), data, {
				series : {
					pie : {
						show : true,
						radius : 1,
						innerRadius : 0.7,
						label : {
							show : false,

						}
					}
				},
				grid : {
					hoverable : true
				},
				tooltip : {
					show : true,
					content : "%p.0%, %s, n=%n", // show percentages, rounding to 2 decimal places
					shifts : {
						x : 20,
						y : 0
					},
					defaultTheme : false
				}
			});
		},

		line2Flot : function() {

			// first chart
			var chart1Options = {
				series : {
					lines : {
						show : true
					},
					points : {
						show : true
					}
				},
				xaxis : {
					mode : "time",
					timeformat : "%m/%d",
					minTickSize : [ 1, "day" ]
				},
				grid : {
					hoverable : true
				},
				legend : {
					show : false
				},
				grid : {
					color : "#fff",
					hoverable : true,
					borderWidth : 0,
					backgroundColor : 'transparent'
				},
				tooltip : {
					show : true,
					content : "y: %y"
				}
			};
			var chart1Data = {
				label : "chart1",
				color : "#007BFF",
				data : [ [ 1354521600000, 6322 ], [ 1355040000000, 6360 ],
						[ 1355223600000, 6368 ], [ 1355306400000, 6374 ],
						[ 1355487300000, 6388 ], [ 1355571900000, 6393 ] ]
			};
			$.plot($("#chart1"), [ chart1Data ], chart1Options);
		},
		//barras
		barFlot : function() {

			// second chart
			var flotBarOptions = {
				series : {
					bars : {
						show : true,
						barWidth : 235450000
					}
				},
				xaxis : {
					ticks : [ [ 1325376000000, 'Desarrollo' ],
							[ 1328054400000, 'Preventa' ],
							[ 1330560000000, 'Comercial' ],
							[ 1333238400000, 'Recursos humanos' ],
							[ 1335830400000, 'Mesa de servicio' ] ]
				},
				yaxis : {
					axisLabelUseCanvas : true,
					axisLabelFontSizePixels : 12,
					axisLabelFontFamily : 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
					axisLabelPadding : 33,
					tickSize : 10

				},
				grid : {
					hoverable : true
				},
				legend : {
					show : false
				},
				grid : {
					color : "#fff",
					hoverable : true,
					borderWidth : -1,
					labelMargin : 10,
					backgroundColor : 'transparent'
				},
				tooltip : {
					show : true,
					content : "x: %x, y: %y"
				}
			};
			var flotBarData = {
				color : "#007BFF",
				data : [ [ 1325376000000, 29 ], [ 1328054400000, 20 ],
						[ 1330560000000, 30 ], [ 1333238400000, 40 ],
						[ 1335830400000, 50 ] ]
			};
			$.plot($("#flotBar"), [ flotBarData ], flotBarOptions);

		},
		//**fin barras
		plotting : function() {

			var d1 = [ [ 20, 20 ], [ 42, 60 ], [ 54, 20 ], [ 80, 80 ] ];

			//flot options
			var options = {
				legend : {
					show : false
				},
				series : {
					label : "Curved Lines Test",
					curvedLines : {
						active : true,
						nrSplinePoints : 20
					}
				},

				grid : {
					color : "#fff",
					hoverable : true,
					borderWidth : 0,
					backgroundColor : 'transparent'
				},
				tooltip : {
					show : true,
					content : "%s | x: %x; y: %y"
				},
				yaxes : [ {
					min : 10,
					max : 90
				}, {
					position : 'right'
				} ]
			};

			//plotting
			$.plot($("#flotCurve"), [ {
				data : d1,
				lines : {
					show : true,
					fill : true,
					fillColor : "rgba(0,123,255,.15)",
					lineWidth : 3
				},
				//curve the line  (old pre 1.0.0 plotting function)
				curvedLines : {
					apply : true,
					show : true,
					fill : true,
					fillColor : "rgba(0,123,255,.15)",

				}
			}, {
				data : d1,
				points : {
					show : true,
					fill : true,
					fillColor : "rgba(0,123,255,.15)",
				}
			} ], options);
		}

	};

	function initEmpSelect() {
		var data = [ {
			label : "Sin empleado<br>seleccionado",
			data : 1,
			color : "#c8d6e5"
		} ];
		SufeeAdmin.pieFlot2(data);
		$(".selectEmpleado").change(function() {
			var str = "";
			$(".selectEmpleado option:selected").each(function() {
				str += jQuery(this).text() + " ";
				if (jQuery(this).val() == 1) {
					var data = [ {
						label : "Personal",
						data : 1,
						color : "#ee5253"
					}, {
						label : "Laboral",
						data : 4,
						color : "#2e86de"
					} ];
					SufeeAdmin.pieFlot2(data);
				} else if (jQuery(this).val() == 2) {
					var data = [ {
						label : "Personal",
						data : 76,
						color : "#ee5253"
					}, {
						label : "Laboral",
						data : 14,
						color : "#2e86de"
					} ];
					SufeeAdmin.pieFlot2(data);
				} else if (jQuery(this).val() == 3) {
					var data = [ {
						label : "Personal",
						data : 20,
						color : "#ee5253"
					}, {
						label : "Laboral",
						data : 14,
						color : "#2e86de"
					} ];
					SufeeAdmin.pieFlot2(data);
				} else if (jQuery(this).val() == 4) {
					var data = [ {
						label : "Personal",
						data : 30,
						color : "#ee5253"
					}, {
						label : "Laboral",
						data : 11,
						color : "#2e86de"
					} ];
					SufeeAdmin.pieFlot2(data);
				} else if (jQuery(this).val() == 5) {
					var data = [ {
						label : "Personal",
						data : 31,
						color : "#ee5253"
					}, {
						label : "Laboral",
						data : 12,
						color : "#2e86de"
					} ];
					SufeeAdmin.pieFlot2(data);
				} else if (jQuery(this).val() == 0) {
					var data = [ {
						label : "Sin empleado<br>seleccionado",
						data : 1,
						color : "#c8d6e5"
					} ];
					SufeeAdmin.pieFlot2(data);
				}
			});

		});

	}

	$(document).ready(function() {

		startingSystemMenu();
		//SufeeAdmin.cpuLoad();
		//SufeeAdmin.lineFlot();

		SufeeAdmin.pieFlot();
		//SufeeAdmin.line2Flot();
		//SufeeAdmin.barFlot();

		//SufeeAdmin.pieFlot2();
		SufeeAdmin.pieFlot3();
		//SufeeAdmin.plotting();

		initEmpSelect();

	});

})(jQuery);