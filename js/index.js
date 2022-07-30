let fruits = [
    {id:1, title: 'Strawberry', price: 20, img: 'https://unsplash.com/photos/xnRg3xDcNnE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fGZydWl0c3xlbnwwfHx8fDE2NTkwNjEyNzY&force=true&w=640'},
    {id:2, title: 'Cherry', price: 30, img: 'https://unsplash.com/photos/vbAEHCrvXZ0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fGZydWl0c3xlbnwwfHx8fDE2NTkwNjEyNzY&force=true&w=640'},
    {id:3, title: 'Orange', price: 15, img: 'https://unsplash.com/photos/U1iYwZ8Dx7k/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5MTAzOTQ1&force=true&w=640'}
];

const toHtml = fruit => `
<div class="col col-lg-4">
    <div class="card">
        <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Check price</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Remove</a>
        </div>
    </div>
</div>
`;

function render(){
    const html = fruits.map(toHtml).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render(); //render fruits cards

const priceModal = $.modal({
    title: `Price:`,
    width: '400px',
    closable: true,
    footerButtons: [
        {text: 'Close', type: 'primary', handler(){
            priceModal.close();
        }}
    ]
});

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);
    
    if(btnType === 'price'){
        priceModal.setContent(`Price for 1kg: $${fruit.price}`);
        priceModal.open();
    } else if (btnType === 'remove') {
        $confirm({
            title: 'Are you sure?',
            content: `<p>You want to remove fruit: ${fruit.title}</p>`
        })
            .then(() => {
                fruits = fruits.filter(f => f.id !== id);
                render();
            })
            .catch(() => {
                console.log('Cancel')
            })
    }
})