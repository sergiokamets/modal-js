$confirm = function(options){
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: true,
            onClose: function(){
                modal.destroy();
            },
            content: options.content,
            footerButtons: [
                {text: 'Close', type: 'secondary', handler(){
                    modal.close();
                    reject();
                }},
                {text: 'Remove', type: 'danger', handler(){
                    modal.close();
                    resolve();
                }}
            ]
        });

        setTimeout(()=>{
            modal.open();
        }, 100);
    })
}