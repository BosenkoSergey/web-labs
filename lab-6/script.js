
const clearLocalstorage = document.querySelector('.clear-localstorage');

clearLocalstorage.addEventListener('click' , () => {
    localStorage.clear();
    location.reload();
})
// додавання нового акордеона

const btnAdd = document.querySelector('.btn-add'),
    wrapperAcordeon = document.querySelector('.wrapper-acordeon');
let count = 0;
btnAdd.addEventListener('click', () => {
    const titleText = document.querySelector('#title'),
        descriptionText = document.querySelector('#description');
    let newAccordeon = document.createElement('div');
    newAccordeon.classList.add('acordeon');
    newAccordeon.innerHTML = `
        <div class="title-acordeon">
            <p>
                ${titleText.value}
            </p>
            <p>&rsaquo;</p>
        </div>
        <div class="description-acordeon">
            <p>
               ${descriptionText.value}
            </p>
        </div>
    `;
    wrapperAcordeon.append(newAccordeon);
    count++;
    localStorage.setItem(count, newAccordeon.innerHTML);
    acc();
});
for (var i = 0; i < localStorage.length; i++) {
        let tt = document.createElement('div');
        tt.classList.add('acordeon');
        tt.innerHTML = localStorage.getItem(localStorage.key(i));
        wrapperAcordeon.append(tt);
}


// функціонал аккорда


function acc() {
    let descriptionAcordeon = document.querySelectorAll('.description-acordeon'),
        titleAcordeon = document.querySelectorAll('.title-acordeon');

    function hidenAccordeon() {
        descriptionAcordeon.forEach(item => {
            item.style.display = 'none';
        })
    };

    function OpenAccordeon(i) {
        descriptionAcordeon[i].style.display = 'block';
    }
    hidenAccordeon();
    OpenAccordeon(i = 0);

    titleAcordeon.forEach((item, i) => {
        item.addEventListener('click', (event) => {
            hidenAccordeon();
            OpenAccordeon(i);
        })
    })

}
acc();
