import { 
    Button,
    ButtonBehavior,
} from 'buttons';

import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

import {
    SystemKeyboard
} from 'keyboard';

import { 
    RadioGroup, 
    RadioGroupBehavior
} from 'buttons';

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';

var calorieCounter = {'Plate of Spaghetti': 600, 'Banana':105,
	'Big Mac': 563, 'Slice of Bread': 79, 'Plate of Pad Thai': 889, 
	'Boba Milk Tea with Grass Jelly': 316,
	'Grande Caramel Frappuccino': 420, 'Pop Tart': 200, 'Medium Fries': 365,
	'Taco': 189, 'Chocolate Cake': 350, 'Chorizo Fiesta Omellete': 1990, 
	'Coconut Water (1bottle)': 120, 'Cup of Black Coffee': 5
};
var mutatedCalories = {'Plate of Spaghetti': 600, 'Banana':105,
	'Big Mac': 563, 'Slice of Bread': 79, 'Plate of Pad Thai': 889, 
	'Boba Milk Tea with Grass Jelly': 316,
	'Grande Caramel Frappuccino': 420, 'Pop Tart': 200, 'Medium Fries': 365,
	'Taco': 189, 'Chocolate Cake': 350, 'Chorizo Fiesta Omellete': 1990, 
	'Coconut Water (1bottle)': 120, 'Cup of Black Coffee': 5
};
var foodNamesOrdered = ['Plate of Spaghetti', 'Banana',
	'Big Mac', 'Slice of Bread', 'Plate of Pad Thai', 
	'Boba Milk Tea with Grass Jelly',
	'Grande Caramel Frappuccino', 'Pop Tart', 'Medium Fries',
	'Taco', 'Chocolate Cake', 'Chorizo Fiesta Omellete', 
	'Coconut Water (1bottle)', 'Cup of Black Coffee'];

//Global Vars:
var numInput = "";
var selectedFoodItem = "";

//Global Funcs:
var convert = function(){
	var caloricIntake = calorieCounter[selectedFoodItem] * Number(numInput);
	for (var i = 0; i < foodNamesOrdered.length; i++) {
		mutatedCalories[foodNamesOrdered[i]] = (caloricIntake / calorieCounter[foodNamesOrdered[i]]).toFixed(2);
	};
};
var resetGlobalVariables = function(){
	numInput = "";
	selectedFoodItem = "";
	mutatedCalories = {'Plate of Spaghetti': 600, 'Banana':105,
	'Big Mac': 563, 'Slice of Bread': 79, 'Plate of Pad Thai': 889, 
	'Boba Milk Tea with Grass Jelly': 316,
	'Grande Caramel Frappuccino': 420, 'Pop Tart': 200, 'Medium Fries': 365,
	'Taco': 189, 'Chocolate Cake': 350, 'Chorizo Fiesta Omellete': 1990, 
	'Coconut Water (1bottle)': 120, 'Cup of Black Coffee': 5
	};
};
var createNewHome = function() {
	return new startContainerTemplate({skin: whiteSkin, style: homeText,
			str1: 'Welcome to Calorie Converter.',
			str2: 'Click Anywhere to Continue.'
		});
};
var createNewMain = function(){
	return new MainContainerTemplate({contentToScrollVertically: inputColumnContent({style: startText})});
};
var createNewCalorieConverted = function(){
	var convertedContainer = new MainContainerTemplate({contentToScrollVertically: calorieColumnContent({startText})});
	return convertedContainer;
};

let whiteSkin = new Skin({ fill: "white" });
let darkGraySkin = new Skin({ fill: "#202020" });
let roseSkin = new Skin({ fill: "#F7CAC9"})
let serenitySkin = new Skin({ fill: "#92A8D1", borders: {left: 2, right: 2, top: 2, bottom: 2}, stroke: 'gray'})
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });

let startText = new Style({font: '20px', color: '#F7CAC9'});
let homeText = new Style({font: '20px', color: 'black'});
let foodColRightStyle = new Style({left: 0, right: 0, font: 'bold 15px', color: "#F7CAC9"});
let fieldStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let resetStyle = new Style({color: 'white', font: '20px', left: 0, right: 0, top: 0, bottom: 0});
let fieldHintStyle = new Style({ color: 'black', font: '20px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
/*
=================
Button Templates:
=================
*/
let singleButtonTemplate = Button.template($ => ({
    top: 5, bottom: 5, left: 5, right: 5,
    contents: [
        Label($, {left: 0, right: 0, height: 55, string: $.textForLabel, style: homeText, skin: serenitySkin})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            var func = $.func;
            func();
            for (var i = 0; i < foodNamesOrdered.length; i++) {
				trace("Caloric intake for " + foodNamesOrdered[i] + " = " + mutatedCalories[foodNamesOrdered[i]] + "\n");	
			};
            application.delegate("goConvert");
        }
    }
}));
let radioButtonTemplate = RadioGroup.template($ => ({
    top: 10, bottom: 10, left: 10, right: 10,
    style: startText,
    Behavior: class extends RadioGroupBehavior {
        onRadioButtonSelected(buttonName) {
            selectedFoodItem = buttonName;
        }
    }
}));

/*
=====================
Food Column Template:
=====================
*/
var LabeledFood = Line.template($ => ({
	left: 0, right: 0,
	contents: [
		Label( $, {name: $.name, right: 0, string: $.string, style: foodColRightStyle} )
	]
}));

class customColumnBehavior extends Behavior{
	onCreate(column, data) {
		this.data = data;
	}
	onDisplaying(column) {
		var data = this.data;
		var foodStr = "foodNames" in data ? data.foodNames : "please add,buttonNames,and,selected,properties,to data";
		var foodNames = foodStr.split(",");
		for (var i=0; i < foodNames.length; i++) {
			var foodName = foodNames[i];
			var calorieCount = String(mutatedCalories[foodName]);
			var food = new LabeledFood({name: foodName, string: calorieCount + " items of " + foodName});
			food.coordinates = { left : 0, top : undefined, left : undefined, bottom : undefined };
			column.add( food );
		}
	}
};

var foodColumnTemplate = Column.template($ => ({
	top: 10,
	active: true,
	Behavior: customColumnBehavior
}));

/*
===============
Field Template:
===============
*/
let textEnterField = Container.template($ => ({ 
    top: 5, left: 5, width: 175, height: 50, 
    skin: nameInputSkin, 
    contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, 
            active: true, 
            Behavior: FieldScrollerBehavior, 
            clip: true, 
            contents: [
                Label($, {left: 0, top: 0, bottom: 0,skin: fieldLabelSkin,style: fieldStyle,anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            numInput = data.name;
                            label.container.hint.visible = (data.name.length == 0);
                    }},
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle, string: "Enter # of items...", name: "hint"
                }),
]}) ]}));

/*
=================
Screen Templates:
=================
*/
//Start Screen Template
let startContainerTemplate = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	skin: $.skin,
	contents: [
		new Column({
			left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				Label($, {left: 0, right: 0, top: 0, bottom: 0, string: $.str1, style: $.style}),
				Label($, {left: 0, right: 0, top: 0, bottom: 0, string: $.str2, style: $.style})
]})]}));

//Set Up Start Screen
application.behavior = Behavior({
	onLaunch: function(application){
		resetGlobalVariables();
		application.empty();
		application.skin = new Skin({fill: 'white'});
		application.active = true;
		this.home = createNewHome();
		application.add(this.home);
	},
	onTouchEnded: function(application){
		application.active = false;
		application.empty();
		trace("here1 \n");
		this.MainContainer = createNewMain();
		trace("here2 \n");
		application.add(this.MainContainer);
	},
	goHome: function(application){
		resetGlobalVariables();
		application.empty();
		this.home = createNewHome();
		application.add(this.home);
		application.active = true;
	},
	goConvert: function(application){
		application.empty();
		this.convertedContainer = new createNewCalorieConverted();
		application.add(this.convertedContainer);
		application.active = true;
	}
});

//Main Screen Template
let MainContainerTemplate = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: whiteSkin,
    contents: [
    	VerticalScroller($, { 
            active: true, top: 5, bottom: 0,
            contents: [
                $.contentToScrollVertically,
                VerticalScrollbar()   
            ]                     
        })
    ]
}));


//Reset Button Template
let resetContainer = Container.template($ =>({
	exclusiveTouch: true,
	active: true,
	left: 5, right: 5, top: 5, bottom: 0,
	contents:[
		Label($, {
			hidden: false,
			left: 0, right: 0, top: 0, bottom: 0,
			skin: $.skin,
			string: $.string,
			style: resetStyle
		})
	],
	behavior: Behavior({
		onBackgroundChange: function(container, data){
			container.skin = data.newSkin;
		},
		onTouchEnded: function(container, data){
			application.delegate("goHome");
		}
	})
}));
// var resetCont = new resetContainer({ skin: darkGraySkin, string: "Reset Button" });
// var calcCaloriesButton = new singleButtonTemplate({ func: convert, textForLabel: "Convert Calories" });


//Input Screen Column Container
let inputColumnContent = Column.template($ => ({
	style: $.style,
	top: 0, left: 0, right: 0,
	contents: [
		new Line({ 
	        left: 0, right: 0, top: 0,
	        contents:[
	            new textEnterField({name: ""}),
	            new resetContainer({ skin: serenitySkin, string: "Reset Button" })
            ]
        }),
     	new Line({ 
	        left: 0, right: 0, top: 0,
	        contents:[
	            new radioButtonTemplate({buttonNames: Object.keys(calorieCounter).join()}),
            ]
        }),
        new Column({
        	left: 0, right: 0, top: 0,
        	contents:[
        		new singleButtonTemplate({ func: convert, textForLabel: "Convert Calories" })
        	]
        })
	]
}));

//Calorie Counter Screen Container
let calorieColumnContent = Column.template($ => ({
	style: $.style,
	top: 0, left: 0, right: 0,
	contents: [
		new Container({ 
	        left: 0, right: 0, top: 0,
	        contents:[
	            new textEnterField({name: ""}),
	            new resetContainer({ skin: serenitySkin, string: "Start Over" })
            ]
        }),
		new Column({ 
	        left: 0, right: 0, top: 0,
	        contents:[
				new Label({left: 0, right: 0, style: homeText, string: "Total Amount of Calories: " + String(calorieCounter[selectedFoodItem] * Number(numInput))}),
				new Text({left: 0, right: 0, string: numInput + " Items of " + selectedFoodItem + " is equivalent to:", style: homeText}),
            	new foodColumnTemplate({foodNames: Object.keys(calorieCounter).join()})
            ]

        })
	]
}));

