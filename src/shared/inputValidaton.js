export function isFullName(name)
{
    var index = name.search(" ");
    if(index==-1)
        return false;

    var firstName = name.slice(0,index);
    var lastName = name.slice(index+1);
    var indexTwoLast= lastName.search(" ");
    var resLast= true;

    if(indexTwoLast!=-1)
    {
        var one=lastName.slice(0,indexTwoLast);
        var two = lastName.slice(indexTwoLast+1);
        resLast= (isWord(one) && isWord(two));
    }
    return isWord(firstName) && isWord(lastName) && resLast;
};

export function isWord(str)
{
    var res= (/^[A-Za-z]/.test(str) || /^[\u0590-\u05FF]/.test(str));
    return res;
};

export function isId(id)
{
    if (id.length !== 9 || isNaN(id)) {  
        return false;
    }
    let sum = 0, incNum;
    for (const i in id) {
        incNum = Number(id[i]) * ((i % 2) + 1); 
        sum += (incNum > 9) ? incNum - 9 : incNum;  
    }
    return (sum % 10 === 0);
}

export function isPhoneNum(num)
{
    var phoneNum;
    var index = num.search("-");
    if(index!=-1)
        phoneNum = num.replace("-", "");
    else
        phoneNum=num;

    var res= (/^[0-9]/.test(phoneNum) && ((phoneNum.length==10) || (phoneNum.length==9)));
    return res;
};

export function isValidPassword(password)
{
    var res;

    if(password.length>=8){
        if(/^[A-Za-z0-9]/.test(password)){
            res=true;
        }
        else{
            res=false;
        }
    }
    else{
        res=false;
    }

    return res;
};

export function IsValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }