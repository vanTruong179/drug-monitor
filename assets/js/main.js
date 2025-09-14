let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function (event) {//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})



$("#update_drug").submit(function (event) {
    event.preventDefault(); // ngăn reload trang

    var unindexed_array = $(this).serializeArray(); // lấy dữ liệu từ form
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']; // biến thành object {field: value}
    });

    // Lấy protocol động (http hoặc https)
    let protocol = location.protocol;

    var request = {
        "url": `${protocol}//${url}/api/drugs/${data.id}`, // API PUT động
        "method": "PUT",
        "data": data
    };

    $.ajax(request)
        .done(function (response) {
            alert(data.name + " Updated Successfully!");
            window.location.href = "/manage"; // redirect sau khi update
        })
        .fail(function (xhr, status, error) {
            alert("Error updating drug: " + error);
        });
});


if (window.location.pathname == "/manage") {
    let $ondelete = $("table tbody td a.delete"); // chọn các link delete

    $ondelete.click(function (e) {
        e.preventDefault(); // ngăn link redirect

        let id = $(this).attr("data-id"); // lấy id từ attribute data-id

        // Lấy protocol động (http hoặc https)
        let protocol = location.protocol;
        let request = {
            "url": `${protocol}//${url}/api/drugs/${id}`,
            "method": "DELETE"
        };

        if (confirm("Do you really want to delete this drug?")) {
            $.ajax(request)
                .done(function (response) {
                    alert("Drug deleted Successfully!");
                    location.reload(); // reload lại trang để cập nhật danh sách
                })
                .fail(function (xhr, status, error) {
                    alert("Error deleting drug: " + error);
                });
        }
    });
}


if (window.location.pathname == "/purchase") {
    $("#drug_days").submit(function (event) {
        event.preventDefault();

        let days = +$("#days").val();
        if (!days || days <= 0) {
            alert("Please enter a valid number of days!");
            return;
        }

        let protocol = location.protocol;
        let apiUrl = `${protocol}//${url}/api/drugs`;

        $.ajax({
            url: apiUrl,
            method: "GET"
        })
        .done(function (drugs) {
            $("#purchase_table").show();
            let tbody = $("#purchase_table tbody");
            tbody.empty();

            drugs.forEach((drug, index) => {
                let pills = days * (drug.perDay || 0);

                let cardsToBuy = Math.ceil(pills / drug.card);
                let packsToBuy = Math.ceil(pills / drug.pack);
                let cardPerPack = drug.pack / drug.card;

                let row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${escapeHtml(drug.name)}</td>
                        <td>${cardsToBuy} (${cardPerPack} ${cardPerPack < 2 ? "card" : "cards"} per pack)</td>
                        <td>${packsToBuy}</td>
                    </tr>
                `;
                tbody.append(row);
            });

            alert("Drugs calculated for " + days + " days!");
        })
        .fail(function (xhr, status, error) {
            alert("Error fetching drugs: " + error);
        });
    });
}


