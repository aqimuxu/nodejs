interview((err,res)=>{
    if(err){
        console.log('cry at 1');
        return;
    }
    interview((err, res)=>{
        if(err){
            console.log('cry at 2');
            return;
        }
        interview((err, res)=> {
            if (err) {
                console.log('cry at 3');
                return;
            }
            console.log('smile');
        })
    })
})


function interview(callback) {
    setTimeout(() => {
        if (Math.random() > 0.2) {
            callback(null, 'success');
        } else {
            callback(new Error('fail'));
        }
    }, 500)
}