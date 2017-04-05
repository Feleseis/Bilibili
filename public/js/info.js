$(document).ready( function () {
    $('#up-list').DataTable({
        "searching": false,
        "info": false,
        "lengthChange": false,
        "aLengthMenu": [25],
        "ordering": false,
        "pagingType": "numbers"

    });
    $('#videolist').DataTable({
        'searching': false,
        "columnDefs": [
            { "orderable": false, "targets": 0 }
        ],
        "aLengthMenu": [ 20, 50, 100 ],
        "info": false,
        "pagingType": "full_numbers"
    });
});
