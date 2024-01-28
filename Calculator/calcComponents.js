const num_buttons = $(".num_panel")
const opr_buttons = $(".opr_panel")

const PREV_ENTRY_LBL = $("#prev_entry")
const ENTRY_LBL = $("#entry")

// UTIL BUTTONS
const CLEAR_ENTRY_BTN = $("#util_ce")
const CLEAR_BTN = $("#util_c")
const DEL_BTN = $("#util_del")
const SIGN_BTN = $("#num_sign")
const POINT_BTN = $("#num_point")   

const MAXIMUM_DIGIT = 16
const DEFAULT = "0"
const POINT = "."
const NEGATIVE = "-"
const EQUALS = "="
const ERROR = "Error!"

const ADD = "add"
const SUBTRACT = "subtract"
const MULTIPLY = "multiply"
const DIVIDE = "divide"
const EQUAL = "equal"

const ADD_SYMBOL = "+"
const SUBTRACT_SYMBOL = "-"
const MULTIPLY_SYMBOL = "x"
const DIVIDE_SYMBOL = "÷"
const EQUAL_SYMBOL = "="

// NECESSITIES 
var operator = 0

var prevEntryTxt = ""
var entryTxt = ""

var prevEntryNum = 0
var entryNum = 0

var fromOper = true
var fromRes = false

var totalDigits = 0
var prevResult = 0