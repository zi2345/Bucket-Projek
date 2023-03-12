$(document).ready(function () {
    show_bucket();
});
//funsi menampilkan
function show_bucket() {
    $('#bucket-list').empty()
    $.ajax({
        type: "GET",
        url: "/bucket",
        data: {},
        success: function (response) {
            let rows = response['buckets']
            for (let i = 0; i < rows.length; i++) {
                let bucket = rows[i]['bucket']
                let num = rows[i]['num']
                let done = rows[i]['done']

                let temp_html = ''
                if (done === 0) {
                    temp_html = `<li>
                            <h2>✅ ${bucket}</h2>
                            <button onclick="done_bucket(${num})" type="button" class="btn btn-outline-primary">Done!</button>
                            <button onclick="delete_bucket(${num})" type="button" class="btn btn-outline-primary" >Delete!</button>
                        </li>`
                } else {
                    temp_html = `<li>
                            <h2 class="done">✅ ${bucket}</h2>
                        </li>`
                }
                $('#bucket-list').append(temp_html)
            }
        }
    });
}
//fungsi menyimpan
function save_bucket() {
    let bucket = $('#bucket').val()
    $.ajax({
        type: "POST",
        url: "/bucket",
        data: { bucket_give: bucket },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}
//fungsi done
function done_bucket(num, temp_html) {
    $.ajax({
        type: "POST",
        url: "/bucket/done",
        data: { 'num_give': num },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}
function delete_bucket(num) {
    $.ajax({
        type: "POST",
        url: "/bucket/delete",
        data: { 'num_give': num },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}