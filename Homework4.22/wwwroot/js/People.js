$(() => {
    function generatePeople() {
        $("#people-table tbody td").remove();
        $.get('/home/getpeople', ppl => {
            ppl.forEach(person => {
                $("#people-table tbody").append(`
                            <tr data-person-first="${person.firstName}" data-person-last="${person.lastName}" data-person-age="${person.age}">
                            <td>${person.firstName}</td>
                            <td>${person.lastName}</td>
                            <td>${person.age}</td>
                            <td><button data-person-id='${person.id}' class ="btn btn-success btn-block edit">Edit</button></td>
                            <td><button data-person-id='${person.id}' class ="btn btn-danger btn-block delete">Delete</button></td>
                            </tr>`);
            });
        });
    };
    generatePeople();

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();
        const person = {
            firstName,
            lastName,
            age
        };
        $.post('/home/addperson', person, function (p) {
            generatePeople();
        });
        $("#first-name").val('');
        $("#last-name").val('');
        $("#age").val('');
  });
    $("#people-table").on('click', '.edit', function () {
        const id = $(this).data('person-id');

        $("#firstName-model").val($(this).closest('tr').data('person-first'));
        $("#lastName-model").val($(this).closest('tr').data('person-last'));
        $("#age-model").val($(this).closest('tr').data('person-age'));
        $("#my-modal").modal();
        $("#save-changes-btn").on('click', function () {
            const firstName = $("#firstName-model").val();
            const lastName = $("#lastName-model").val();
            const age = $("#age-model").val();
            const person = {
                id,
                firstName,
                lastName,
                age
            };
            $("#my-modal").modal('hide');
            $.post('/home/editperson', person, function () {
                generatePeople();
            });
        });
    });
    $("#people-table").on('click', '.delete', function () {
        const id = $(this).data('person-id');
        $.post(`/home/deleteperson?id=${id}`, function () {
            generatePeople();
        });
    });  
});