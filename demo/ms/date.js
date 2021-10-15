function datechange(date,reg){
    let [year,month,day] = reg.trim().split(' ')[0].split('-')
    let [hour,min,m] = reg.trim().split(' ')[1].split(':')
    console.log(year,month,day,hour,min,m)
    //未完成，待续
}

datechange(new Date(),'YYYY-MM-DD HH:mm:ss')