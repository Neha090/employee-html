var arr = [];
function getEmployeesFromString(str) {
    try {
        if (!str) {
            return [];
        }
        return JSON.parse(str);
    } catch (e) {
        return [];
    }
}

function addEmp(empId = null, name = null, dept = null) {
    arr = getEmployeesFromString(localStorage.getItem("employee"));
    if (empId != null) {
        document.forms["emp"]["empId"].value = empId;
        document.forms["emp"]["name"].value = name;
        document.forms["emp"]["dept"].value = dept;
        document.getElementById("empId").disabled = true;
        deleteEmp(empId);
        return;
    }
    else if(empId == null) {
        empId = document.forms["emp"]["empId"].value;
        name = document.forms["emp"]["name"].value;
        dept = document.forms["emp"]["dept"].value;
    }

    var emp = { "empId": empId, "name": name, "dept": dept };

    arr.push(emp);
    localStorage.setItem("employee", JSON.stringify(arr));
    readEmp();
}

function readEmp() {
    var res = getEmployeesFromString(localStorage.getItem("employee"));
    stringEmp = "<tr><th> EmpID</th><th>Name</th><th>Department</th><th>Actions</th></tr >";
    for (let i = 0; i < res.length; i++) {
        stringEmp += "<tr><td>" + res[i].empId + "</td>" +
            "<td>" + res[i].name + "</td>" +
            "<td>" + res[i].dept +
            "</td> <td><span id='clickableAwesomeFont'> <i class='fa fa-pencil-square-o' onclick='updateEmp(" + res[i].empId + ")'aria-hidden='true'></i></span>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;" +
            "<span id='clickableAwesomeFont'><i class='fa fa-trash'aria-hidden='true' onclick='deleteEmp(" + res[i].empId + ")'></i></span></td></tr>";
    }

    document.getElementById("result").innerHTML = stringEmp;
    window.onload = readEmp;
}

window.onload = readEmp;
//var ever = setInterval(readEmp, 10000);

window.addEventListener("storage", function () {
    readEmp();
}, false);

function show() {
    var x = document.getElementById("empForm");
    if (x.style.display == "block") { x.style.display = "none"; }
    else {
        x.style.display = "block";
    }
}

function deleteEmp(empId) {
    console.log("delete");
    arr = getEmployeesFromString(localStorage.getItem("employee"));
    var index = arr.findIndex((element) => { return element.empId == empId });
    arr.splice(index, 1);
    console.log(arr);
    localStorage.removeItem("employee");
    localStorage.setItem("employee", JSON.stringify(arr));
    readEmp();
    console.log(arr);

}

function updateEmp(empId) {
    console.log("update");
    arr = getEmployeesFromString(localStorage.getItem("employee"));
    var index = arr.findIndex((element) => { return element.empId == empId });
    alert("Kindly make the updates as required");
    show();
    addEmp(empId, arr[index].name, arr[index].dept);


}