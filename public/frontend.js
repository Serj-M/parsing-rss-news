const objSelect = {
    cnt: '',
    category: ''
};

let btn = document.getElementById("btn");

btn.addEventListener('click', function() {
    objSelect.cnt = document.getElementById("countSelect").value;
    objSelect.category = document.getElementById("categorySelect").value;
    strUrl = `/yandex/${objSelect.cnt}/news/for/${objSelect.category}`;
    // console.log(objSelect, strUrl);
    document.location.href = strUrl;
});