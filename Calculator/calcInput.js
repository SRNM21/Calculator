function backspace()
{
    if (hasDigit()) 
    {
        totalDigits--
        setEntry(getEntry().slice(0, -1), false)
    }
    else 
    {
        reset()
    }
}

function toogleSign()
{
    if (!isNegative() && hasDigit())
    {
        fromOper = false
        setEntry(isNegative ? getEntry().substring(1) : NEGATIVE + getEntry(), false);
    }
}

function setDecimal()
{
    if (!hasDecimal())
    {
        fromOper = false

        if (totalDigits === 0 && isEntryEmpty())
        {
            addDigit(DEFAULT)
            totalDigits--
        }

        totalDigits++
        setEntry(getEntry().concat(POINT), true)
    }
}

function tryAddDigit()
{
    let digit = $(this).data("val")
    fromOper = false

    try
    {
        let temp = parseInt(digit)

        if (temp === 0 && totalDigits === 0)
        {
            return
        }

        if (temp >= 0 && temp < 10)
        {
            addDigit(digit)
        }
    }
    catch(e)
    {
        setEntry(ERROR, true)
    }
}

function setOperation(code)
{
    const operMap = {
        1: ADD_SYMBOL,
        2: SUBTRACT_SYMBOL,
        3: MULTIPLY_SYMBOL,
        4: DIVIDE_SYMBOL,
    }

    const oper = operMap[code]

    if (code === 5)
    {
        if (!(isPrevEntryEmpty() || fromRes))
        {
            entryNum = hasDigit() ? tryParse(getEntry()) : 0
        
            prevResult = calculate(operator)
            prevEntryNum = prevResult
        
            setPrevEntry(`${getPrevEntry()} ${entryNum} ${EQUAL_SYMBOL}`)
            setEntry(prevResult, true)
            fromRes = true  
            
        }
    }
    else
    {           
        if (fromOper) // Able to alter/change operator before entering 2nd entry
        {
            setPrevEntry(`${getPrevEntry().slice(0, -2)} ${oper}`)
        }
        else 
        {
            if (fromRes)
            {
                prevEntryNum = getEntry()
                setPrevEntry(`${prevEntryNum} ${oper}`)
            }
            else if (!isPrevEntryEmpty()) // Calculate pending entries if entry is full
            {
                entryNum = tryParse(getEntry())
                prevResult = calculate(operator)
                prevEntryNum = prevResult

                setPrevEntry(`${prevResult} ${oper}`)
            }
            else
            {
                prevEntryNum = tryParse(getEntry())
                setPrevEntry(`${hasDigit() ? prevEntryNum : DEFAULT} ${oper}`) // Add 0 if entry is empty
            }

            operator = code
        }
        
        resetAll()
    }
}