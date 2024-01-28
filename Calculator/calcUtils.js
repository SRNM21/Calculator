window.onload = updateEntryLabel()

CLEAR_ENTRY_BTN.on("click", clearEntry)
CLEAR_BTN.on("click", clearAll)
DEL_BTN.on("click", backspace)
SIGN_BTN.on("click", toogleSign)
POINT_BTN.on("click", setDecimal)

num_buttons.each(function() 
{
    $(this).on("click", tryAddDigit)
})

opr_buttons.each(function() 
{
    $(this).on("click", operatorFunc)
})

function resetAll()
{
    entryNum = 0
    fromOper = true
    fromRes = false
    prevResult = 0
    totalDigits = 0
    decimalFlag = false
    negativeFlag = false
    setEntry("", false)
}

function tryParse(num)
{
    try
    {
        let temp_num = parseFloat(num)
        return temp_num
    }
    catch(e)
    {
        setEntry(ERROR, true)
        updateEntryLabel()
    }
}

function updateEntryLabel(flag)
{
    ENTRY_LBL.text(totalDigits > 0 || flag ? getEntry() : DEFAULT)
}

function updatePrevEntryLabel()
{
    PREV_ENTRY_LBL.text(getPrevEntry())
}

function setEntry(val, flag)
{
    entryTxt = String(val)
    updateEntryLabel(flag)
}

function setPrevEntry(val)
{
    prevEntryTxt = String(val)
    updatePrevEntryLabel()
}

function getEntry()
{
    return entryTxt
}

function getPrevEntry()
{
    return prevEntryTxt
}

function isEntryEmpty()
{
    return getEntry().length === 0
}

function isPrevEntryEmpty()
{
    return getPrevEntry().length === 0
}

function hasDigit()
{
    return totalDigits > 0
}

function hasDecimal()
{
    return getEntry().indexOf(".") !== -1
}

function isNegative()
{
    return getEntry().indexOf("-") !== -1
}

function clearEntry()
{
    resetAll()
}

function clearAll()
{
    prevEntryNum = 0
    setPrevEntry("")
    clearEntry()
}

function addDigit(val)
{
    totalDigits++
    setEntry(getEntry().concat(val), true)
}

function operatorFunc() 
{
    const operMap = {
        [ADD]: 1,
        [SUBTRACT]: 2,
        [MULTIPLY]: 3,
        [DIVIDE]: 4,
        [EQUAL]: 5
    }

    let operator = $(this).data("operation")
    let operationValue = operMap[operator]

    if (operationValue !== undefined) 
    {
        setOperation(operationValue)
    }
}

function calculate(opr)
{
    let num1 = parseFloat(prevEntryNum)
    let num2 = parseFloat(entryNum)

    return {
        1: num1 + num2,
        2: num1 - num2,
        3: num1 * num2,
        4: num1 / num2,
    }[opr];
}