(function (){
    var promise = interview(1)
        .then(()=>{
            return interview(2)
        })
        .then(()=>{
            return interview(3)
        })
        .then(()=>{
            console.log('smile')
        })
        .catch((err)=>{
            console.log('cry at ' + err.round);
        })



    function interview(round) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve('success');

                } else {
                    var err = new Error('fail');
                    err.round = round;
                    reject(err);
                }

            }, 500)
        })

    }
})();

